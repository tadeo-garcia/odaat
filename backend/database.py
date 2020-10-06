from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, follow_table # SampleModel

with app.app_context():
  db.drop_all()
  db.create_all()

# USERS
  ian = User(username = 'Ian', password = 'password')
  javier = User(username = 'Javier', password = 'password')
  dean = User(username = 'Dean', password = 'password')
  angela = User(username = 'Angela', password = 'password')
  soonmi = User(username = 'Soon-Mi', password = 'password')
  alissa = User(username = 'Alissa', password = 'password')
  demo = User(id = 555, username = 'Demo', password = 'password')

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
