from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime

db = SQLAlchemy()

user_rewards = db.Table('follow_table',
  db.Column('follower_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
  db.Column('following_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
)

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(30), nullable=False)
  email = db.Column(db.String(30), nullable=False, unique=True)
  hashed_password = db.Column(db.String(100), nullable=False)
  created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)
  updated_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.utcnow)

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
      "username": self.username,
      "email": self.email,
      "created_at": self.created_at.strftime("%B %Y")
    }


# class Pledge(db.Model):
#   __tablename__ = 'pledges'

#   id = db.Column(db.Integer, primary_key=True)
#   pledge_amount = db.Column(db.Integer, nullable=False)
#   reward_id = db.Column(db.Integer, db.ForeignKey("rewards.id"))
#   backer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
#   project_id = db.Column(
#       db.Integer, db.ForeignKey("projects.id"), nullable=False)
#   created_at = db.Column(db.DateTime, nullable=False,
#                          default=datetime.datetime.utcnow)
#   updated_at = db.Column(db.DateTime, nullable=False,
#                          default=datetime.datetime.utcnow)

#   backer = db.relationship("User", foreign_keys=[backer_id])
#   project = db.relationship("Project", foreign_keys=[project_id])
#   reward = db.relationship("Reward", foreign_keys=[reward_id])

#   def to_dict():
#     return {
#         "id": self.id,
#         "pledge_amount": self.pledge_amount,
#         "reward_id": self.reward_id,
#         "backer_id": self.backer_id,
#         "project_id": self.project_id
#     }
