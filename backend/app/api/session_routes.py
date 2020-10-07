from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, db
from flask_jwt_extended import create_access_token, jwt_required
from flask_login import current_user

session_routes = Blueprint('session', __name__)


@session_routes.route('', methods=['POST', 'DELETE'])
def login_user():
  if(request.method == 'POST'):
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    user = User.query.filter(User.email == email).first()
    user_data = user.to_dict()
    if(user and user.check_password(password)):
      print('~~~~~~~~~~~~~~~')
      print('LOGGED IN SUCCESFUL')
      print('~~~~~~~~~~~~~~~')
      session['user'] = user.to_dict()
      return {"user": session['user']}, 200
    else:
      return jsonify({"msg": "Incorrect email or password."}), 400
  elif(request.method == 'DELETE'):
    session.pop('user', None)
    return {'msg': 'successfully logged out'}


@session_routes.route('/current', methods=['GET'])
def load_user():
  if 'user' in session:
    user = session['user']
    return {"user": session['user']}, 200
  else:
    return {"msg": "user not loaded"}
