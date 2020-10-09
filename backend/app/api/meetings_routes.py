from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, Meeting

meetings_routes = Blueprint('meetings', __name__)


@meetings_routes.route('/', methods=['GET'])
def get_meetings():
    meetings = Meeting.query.all()
    data = [meeting.to_dict() for meeting in meetings]
    return {"meetings": data}


@meetings_routes.route('/create', methods=['POST'])
def create_meeting():
    meeting = Meeting(
        title=request.json.get('title'),
        host_id=request.json.get('userId'),
        description=request.json.get('description'),
        date=request.json.get('date'),
        time=request.json.get('time'),
        location=request.json.get('location'),
        lat=request.json.get('lat'),
        lng=request.json.get('lng'),
        virtual=request.json.get('virtual'),
        zoom_id=request.json.get('zoomId')
    )
    db.session.add(meeting)
    db.session.commit()

    return {"meeting": meeting.to_dict()}, 200
