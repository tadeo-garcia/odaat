from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, Meeting

meetings_routes = Blueprint('meetings', __name__)


@meetings_routes.route('/', methods=['GET'])
def get_meetings():
    meetings = Meeting.query.all()
    print("~~~~~~~~~~~~~~")
    print(meetings)
    data = [meeting.to_dict() for meeting in meetings]
    return {"meetings": data}
