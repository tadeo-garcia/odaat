from flask import Blueprint, jsonify, redirect, url_for, session, request
from app.models import User, Meeting, db

meetings_routes = Blueprint('meetings', __name__)


@meetings_routes.route('/search_by_id', methods=['GET'])
def get_meeting():
    meetingId = request.args.get('id', None)
    meeting = Meeting.query.get(meetingId)
    meeting = meeting.to_dict()
    return {"meeting": meeting}, 200


@meetings_routes.route('/', methods=['GET'])
def get_meetings():
    meetings = Meeting.query.all()
    data = [meeting.to_dict() for meeting in meetings]
    return {"meetings": data}


@meetings_routes.route('/meetings_by_host_id', methods=['GET'])
def get_meetings_by_host_id():
    hostId = request.args.get('id', None)
    meetings = Meeting.query.filter(Meeting.host_id == hostId).all()
    data = [meeting.to_dict() for meeting in meetings]
    print(data)
    return {"meetings": data}, 200


@meetings_routes.route('/create', methods=['POST'])
def create_meeting():
    virtual = request.json.get('virtual')
    official = request.json.get('official')
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


@meetings_routes.route('/create', methods=['DELETE'])
def delete_meeting():
    meetingId = request.json.get("meetingId")
    meeting = Meeting.query.filter(Meeting.id == meetingId).first()
    db.session.delete(meeting)
    db.session.commit()
    meetings = Meeting.query.all()
    data = [meeting.to_dict() for meeting in meetings]
    return {"meetings": data}


@meetings_routes.route('/update', methods=['PUT'])
def update_meeting():
    meetingId = request.json.get('currentMeetingId')
    meeting = Meeting.query.filter(Meeting.id == meetingId).first()
    new_title = request.json.get('title')
    new_description = request.json.get('description')
    new_date = request.json.get('date')
    new_time = request.json.get('time')
    new_location = request.json.get('location')
    new_lat = request.json.get('lat')
    new_lng = request.json.get('lng')
    new_official = request.json.get('official')
    new_virtual = request.json.get('virtual')
    new_zoom_id = request.json.get('zoomId')

    if new_title:
        meeting.title = new_title

    if new_description:
        meeting.description = new_description
    if new_date:
        meeting.date = new_date
    if new_time:
        meeting.time: new_time
    if new_official:
        meeting.official = new_official
    if new_virtual:
        meeting.virtual = new_virtual
    if new_zoom_id:
        meeting.zoom_id = new_zoom_id
    if new_location:
        meeting.location = new_location
        meeting.lat = new_lat
        meeting.lng = new_lng
    else:
        meeting.location = meeting.location
        meeting.lat = meeting.lat
        meeting.lng = meeting.lng

    db.session.add(meeting)
    db.session.commit()

    return {"meeting": meeting.to_dict(), "msg": "Meeting updated successfully!"}, 200
