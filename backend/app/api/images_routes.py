from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, db
from flask_jwt_extended import create_access_token, jwt_required
from werkzeug.utils import secure_filename
from .s3class import AwsS3UploadClass
from flask_login import current_user
import boto3
import os


image_routes = Blueprint('image', __name__)

BUCKET_NAME = os.environ.get('BUCKET_NAME')
ACCESS_ID = os.environ.get('ACCESS_ID')
ACCESS_KEY = os.environ.get('ACCESS_KEY')
REGION_NAME = os.environ.get('REGION_NAME')


@image_routes.route('/profile_picture', methods=['GET', 'POST'])
def load_profile_picture():
    if request.method == 'POST':
        currentUserId = request.form.get('id', None)
        file = request.files['file'] or None
        if file == None:
            return jsonify({"error": "file is required for upload"})
        file.filename = secure_filename(file.filename)
        folder = f'{currentUserId}/images/profile_pictures/{file.filename}'
        file_path = folder + file.filename
        s3.upload_fileobj(file, BUCKET_NAME, file_path, ExtraArgs={
            "ContentType": file.content_type, "ACL": "public-read"})
        external_link = f'{BUCKET_URL}/{folder}{file.filename}'


@image_routes.route('/banner_picture', methods=['GET', 'POST'])
def load_banner_picture():
    if request.method == 'POST':
        currentUserId = request.form.get('id', None)
        file = request.files['file'] or None
        if file == None:
            return jsonify({"error": "file is required for upload"})
        file.filename = secure_filename(file.filename)
        folder = f'{currentUserId}/images/banner_pictures/{file.filename}'
        file_path = folder + file.filename
        s3.upload_fileobj(file, BUCKET_NAME, file_path, ExtraArgs={
            "ContentType": file.content_type, "ACL": "public-read"})
        external_link = f'{BUCKET_URL}/{folder}{file.filename}'
