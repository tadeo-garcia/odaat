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


@user_routes.route('/user_by_id', methods=['GET'])
def get_user_by_id():
    userId = request.args.get('id', None)
    user = User.query.filter(User.id == userId).first()
    return {"user": user.to_dict()}, 200


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
