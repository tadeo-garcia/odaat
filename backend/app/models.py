from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime

db = SQLAlchemy()

follow_table = db.Table('follow_table',
                        db.Column('follower_id', db.Integer, db.ForeignKey(
                            'users.id'), primary_key=True),
                        db.Column('followed_id', db.Integer, db.ForeignKey(
                            'users.id'), primary_key=True)
                        )

sponsor_table = db.Table('sponsor_table',
                         db.Column('sponsor_id', db.Integer, db.ForeignKey(
                             'users.id'), primary_key=True),
                         db.Column('sponsee_id', db.Integer, db.ForeignKey(
                             'users.id'), primary_key=True)
                         )


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(55), nullable=False, unique=True)
    hashed_password = db.Column(db.String(100), nullable=False)
    zipcode = db.Column(db.Integer)
    sponsor = db.Column(db.Boolean, default=False)
    sponsee = db.Column(db.Boolean, default=False)
    picture = db.Column(db.String(200))
    bio = db.Column(db.String(1000))
    sobriety_date = db.Column(db.Date)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)

    meeting = db.relationship('Meeting', backref='User', lazy=True)
    followed = db.relationship('User', secondary=follow_table,
                               primaryjoin=(follow_table.c.follower_id == id),
                               secondaryjoin=(
                                   follow_table.c.followed_id == id),
                               backref=db.backref('follow_table', lazy='dynamic'), lazy='dynamic')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "zipcode": self.zipcode,
            "sponsor": self.sponsor,
            "sponsee": self.sponsee,
            "picture": self.picture,
            "bio": self.bio,
            "created_at": self.created_at.strftime("%B %Y")
        }

    def follow(self, user):
        if not self.is_following(user):
            self.followed.remove(user)

    def unfollow(self, user):
        if self.is_following(user):
            self.followed.remove(user)

    def is_following(self, user):
        return self.followed.filter(
            followers.c.followed_id == user.id).count() > 0


user_meeting = db.Table('user_meeting',
                        db.Column('user_id', db.Integer, db.ForeignKey(
                            'users.id'), primary_key=True),
                        db.Column('meeting_id', db.Integer, db.ForeignKey('meetings.id'), primary_key=True))


class Meeting(db.Model):
    __tablename__ = 'meetings'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    host_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(1000), nullable=False)
    description = db.Column(db.String(1000), nullable=False)
    date = db.Column(db.Date(), nullable=False)
    time = db.Column(db.Time, nullable=False)
    location = db.Column(db.String(1000), nullable=False)
    virtual = db.Column(db.Boolean, default=False)
    zoom_id = db.Column(db.String, default=None)
    official = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False,
                           default=datetime.datetime.utcnow)

    host = db.relationship("User", foreign_keys=[host_id])
    attendees = db.relationship("User", lazy='subquery')

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "host_id": self.host_id,
            "description": self.description,
            "date": self.date,
            "time": self.time,
            "location": self.location,
            "virtual": self.virtual,
            "zoom_id": self.zoom_id,
        }
