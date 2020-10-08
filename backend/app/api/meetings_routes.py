from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, Meeting

projects_routes = Blueprint('meetings', __name__)


@meetings_routes.route('/')
def get_meetings():
    meetings = Meeting.query.all()
    data = [meetings.to_dict() for meeting in meetings]
    return {"meetings": data}
