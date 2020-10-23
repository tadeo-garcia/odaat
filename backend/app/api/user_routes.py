from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, db, follow_table
from flask_jwt_extended import create_access_token, jwt_required
from flask_login import current_user

user_routes = Blueprint('user', __name__)


@user_routes.route('/signup', methods=['POST'])
def signup_user():
    try:
        user = User(
            username=request.json.get('username', None),
            email=request.json.get('email', None),
            password=request.json.get('password', None)
        )
        db.session.add(user)
        db.session.commit()
        email = user.email
        session["user"] = user.to_dict()
        return {"user": user.to_dict()}, 200
    except:
        return jsonify({"msg": "Bad data for signup."}), 400


@user_routes.route('/update', methods=['PUT'])
def update_user_info():
    currentUserId = request.json.get("currentUserId")
    user = User.query.filter(User.id == currentUserId).first()
    new_username = request.json.get("username")
    new_password = request.json.get("password")
    new_bio = request.json.get("bio")
    new_interests = request.json.get("interests")
    new_sobriety_date = request.json.get("sobrietyDate")
    new_display_sd = request.json.get("displaySobrietyDate")
    print('~~~~~~~~~')
    print(new_display_sd)
    new_sponsor = request.json.get("sponsor")
    new_sponsee = request.json.get("sponsee")

    if new_username:
        check_username = User.query.filter(
            User.username == new_username).first()
        if check_username:
            return jsonify({"msg": "Username already exists, please try again"}), 401
    if new_username is None:
        if new_password:
            user.password = new_password
        if new_bio:
            user.bio = new_bio
        if new_interests:
            user.interests = new_interests
        if new_sobriety_date:
            user.sobriety_date = new_sobriety_date
        if new_display_sd:
            user.display_sd = True
        user.display_sd = new_display_sd
        if new_sponsor:
            user.sponsor = True
        user.sponsor = new_sponsor
        if new_sponsee:
            user.sponsee = True
        user.sponsee = new_sponsee
        db.session.add(user)
        db.session.commit()
        return {"user": user.to_dict(), "msg": "Profile Updated Successfully"}, 200
    if new_username:
        user.username = new_username
    if new_password:
        user.password = new_password
    if new_bio:
        user.bio = new_bio
    if new_interests:
        user.interests = new_interests
    if new_sobriety_date:
        user.sobriety_date = new_sobriety_date
    if new_display_sd:
        user.display_sd = True
    user.display_sd = new_display_sd
    if new_sponsor:
        user.sponsor = True
    user.sponsor = new_sponsor
    if new_sponsee:
        user.sponsee = True
    user.sponsee = new_sponsee
    db.session.add(user)
    db.session.commit()
    return {"user": user.to_dict(), "msg": "Profile Updated Successfully"}, 200


@user_routes.route('/user_by_id', methods=['GET'])
def get_user_by_id():
    userId = request.args.get('id', None)
    user = User.query.filter(User.id == userId).first()
    return {"user": user.to_dict()}, 200


@user_routes.route('/follow_by_id', methods=['GET'])
def follow_user_by_id():
    currentUserId = request.args.get('current_user_id')
    profileId = request.args.get('profile_id')
    currentUser = User.query.filter(User.id == currentUserId).first()
    profileUser = User.query.filter(User.id == profileId).first()
    try:
        currentUser.follow(profileUser)
        db.session.commit()
        followers = User.query.join(follow_table, (follow_table.c.follower_id == User.id)).filter(
            follow_table.c.followed_id == profileId)
        data = [user.to_dict() for user in followers]
        return {"followers": data}, 200
    except:
        return jsonify({"msg": "Unable to follow this user"}), 400


@user_routes.route('/unfollow_by_id', methods=['GET'])
def unfollow_user_by_id():
    currentUserId = request.args.get('current_user_id')
    profileId = request.args.get('profile_id')
    currentUser = User.query.filter(User.id == currentUserId).first()
    profileUser = User.query.filter(User.id == profileId).first()
    try:
        currentUser.unfollow(profileUser)
        db.session.commit()
        followers = User.query.join(follow_table, (follow_table.c.follower_id == User.id)).filter(
            follow_table.c.followed_id == profileId)
        data = [user.to_dict() for user in followers]
        return {"followers": data}, 200
    except:
        return jsonify({"msg": "Unable to unfollow this user"}), 400


@user_routes.route('/following_by_id', methods=['GET'])
def get_following():
    userId = request.args.get('id', None)
    following = User.query.join(follow_table, (follow_table.c.followed_id == User.id)).filter(
        follow_table.c.follower_id == userId)

    data = [user.to_dict() for user in following]
    return {"following": data}, 200


@user_routes.route('/followers_by_id', methods=['GET'])
def get_followers():
    userId = request.args.get('id', None)
    followers = User.query.join(follow_table, (follow_table.c.follower_id == User.id)).filter(
        follow_table.c.followed_id == userId)
    data = [user.to_dict() for user in followers]
    return {"followers": data}, 200
