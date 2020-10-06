from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, follow_table # SampleModel

with app.app_context():
  db.drop_all()
  db.create_all()

# USERS
  ian = User(username = 'Ian', email = 'ian@aa.io', password = 'password')
  javier = User(username = 'Javier', email = 'javier@aa.io', password = 'password')
  dean = User(username = 'Dean', email = 'dean@aa.io', password = 'password')
  angela = User(username = 'Angela', email = 'angela@aa.io', password = 'password')
  soonmi = User(username = 'Soon-Mi', email = 'soonmi@aa.io', password = 'password')
  alissa = User(username = 'Alissa', email = 'alissa@aa.io', password = 'password')
  demo = User(id = 555, username = 'Demo', email = 'demo@odaat.com', password = 'password')

  # followTable1 = follow_table(follower_id=1, followed_id= 2)
  # followTable2 = follow_table(follower_id=1, followed_id=3)


  

  # db.session.add(followTable1)
  # db.session.add(followTable2)
  db.session.add(ian)
  db.session.add(javier)
  db.session.add(dean)
  db.session.add(angela)
  db.session.add(soonmi)
  db.session.add(alissa)
  db.session.add(demo)

  db.session.commit()
