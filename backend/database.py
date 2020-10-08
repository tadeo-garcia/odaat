from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, Meeting

with app.app_context():
  db.drop_all()
  db.create_all()

# USERS
  ian = User(username = 'Ian', email='ian@odaat.com', password = 'password')
  javier = User(username = 'Javier', email='javier@odaat.com', password = 'password')
  dean = User(username = 'Dean', email='dean@odaat.com', password = 'password')
  angela = User(username = 'Angela', email='angela@odaat.com',  password = 'password')
  soonmi = User(username='Soon-Mi', email='soon-mi@odaat.com', password='password')
  alissa = User(username='Alissa', email='alissa@odaat.com', password='password')
  demo = User(id = 555, username = 'Demo', email='demo@odaat.com', password = 'password')


  db.session.add(ian)
  db.session.add(javier)
  db.session.add(dean)
  db.session.add(angela)
  db.session.add(soonmi)
  db.session.add(alissa)
  db.session.add(demo)

  db.session.commit()
