from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, Meeting, db

meetings_routes = Blueprint('meetings', __name__)


@meetings_routes.route('/', methods=['GET'])
def get_meetings():
    meetings = Meeting.query.all()
    data = [meeting.to_dict() for meeting in meetings]
    return {"meetings": data}


@meetings_routes.route('/create', methods=['POST'])
def create_meeting():
    virtual = request.json.get('virtual')
    official = request.json.get('official')
    if(virtual == 'on'):
        virtual = True
    else:
        virtual = False
    if(official == 'on'):
        official = True
    else:
        official = False
    meeting = Meeting(
        host_id=request.json.get('userId'),
        title=request.json.get('title'),
        location=request.json.get('location'),
        description=request.json.get('description'),
        date=request.json.get('date'),
        time=request.json.get('time'),
        lat=request.json.get('lat'),
        lng=request.json.get('lng'),
        virtual=virtual,
        zoom_id=request.json.get('zoomId'),
        official=official

    )
    db.session.add(meeting)
    db.session.commit()

    return {"meeting": meeting.to_dict()}, 200
