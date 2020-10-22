from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, db
from flask_jwt_extended import create_access_token, jwt_required
from werkzeug.utils import secure_filename
from flask_login import current_user
import boto3
import os

image_routes = Blueprint('image', __name__)

BUCKET_URL = os.environ.get('BUCKET_URL')
BUCKET_NAME = os.environ.get('BUCKET_NAME')
ACCESS_ID = os.environ.get('ACCESS_ID')
ACCESS_KEY = os.environ.get('ACCESS_KEY')
REGION_NAME = os.environ.get('REGION_NAME')

s3 = boto3.client('s3', region_name=REGION_NAME, aws_access_key_id=ACCESS_ID,
                  aws_secret_access_key=ACCESS_KEY)


@image_routes.route('/profile_picture', methods=['GET', 'PUT'])
def load_profile_picture():
    if request.method == 'PUT':
        currentUserId = request.form.get('id', None)
        user = User.query.filter(User.id == currentUserId).first()
        file = request.files['file'] or None
        if file == None:
            return jsonify({"error": "file is required for upload"})
        file.filename = secure_filename(file.filename)
        folder = f'users/{currentUserId}/profile_pictures/'
        file_path = folder + file.filename
        s3.upload_fileobj(file, BUCKET_NAME, file_path, ExtraArgs={
            "ContentType": file.content_type, "ACL": "public-read"})
        external_link = f'{BUCKET_URL}/{folder}{file.filename}'
        if external_link:
            user.picture = external_link
            db.session.add(user)
            db.session.commit()
            return {"user": user.to_dict(), "msg": "Picture uploaded successfully"}


@image_routes.route('/banner_picture', methods=['GET', 'PUT'])
def load_banner_picture():
    if request.method == 'PUT':
        currentUserId = request.form.get('id', None)
        user = User.query.filter(User.id == currentUserId).first()
        file = request.files['file'] or None
        if file == None:
            return jsonify({"error": "file is required for upload"})
        file.filename = secure_filename(file.filename)
        folder = f'users/{currentUserId}/banner_pictures/'
        file_path = folder + file.filename
        s3.upload_fileobj(file, BUCKET_NAME, file_path, ExtraArgs={
            "ContentType": file.content_type, "ACL": "public-read"})
        external_link = f'{BUCKET_URL}/{folder}{file.filename}'
        if external_link:
            user.banner = external_link
            db.session.add(user)
            db.session.commit()
            return {"user": user.to_dict(), "msg": "Picture uploaded successfully"}
