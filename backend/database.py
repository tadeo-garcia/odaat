from app.models import User, Meeting
from app import app, db
from dotenv import load_dotenv
load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()

# USERS
    ian = User(username='Ian', email='ian@odaat.com',
               password='password', zipcode=75214, bio='I love the outdoors and meeting new people', sobriety_date='2019-09-04')
    javier = User(username='Javier', email='javier@odaat.com',
                  password='password')
    dean = User(username='Dean', email='dean@odaat.com', password='password')
    angela = User(username='Angela', email='angela@odaat.com',
                  password='password')
    soonmi = User(username='Soon-Mi', email='soon-mi@odaat.com',
                  password='password')
    alissa = User(username='Alissa', email='alissa@odaat.com',
                  password='password')
    demo = User(id=555, username='Demo',
                email='demo@odaat.com', password='password', sobriety_date='2019-09-04', bio='I love meeting new people, and have been a member of AA for a couple of years now. "It works if you work it!"', interests='biking, hiking and riding my motorcycle')

    db.session.add(ian)
    db.session.add(javier)
    db.session.add(dean)
    db.session.add(angela)
    db.session.add(soonmi)
    db.session.add(alissa)
    db.session.add(demo)

    demo.followed.append(ian)
    demo.followed.append(javier)
    demo.followed.append(dean)

    ian.followed.append(javier)
    ian.followed.append(angela)
    ian.followed.append(demo)

    angela.followed.append(ian)
    angela.followed.append(demo)

# MEETINGS

    meeting1 = Meeting(host_id='1', title='Clean Air Meeting',
                       description='This meeting is closed; only those who have a desire to stop drinking may attend.',
                       date='2020-10-31', time='18:00:00', location='16541 Addison Rd, Addison, TX 75001', lat=32.976290, lng=-96.830360,  virtual=True, zoom_id='555xyz', official=True)

    meeting2 = Meeting(host_id='2', title='Serenity Group Meeting',
                       description='Discussion based meeting. This meeting is open and anyone may attend.',
                       date='2020-10-31', time='18:00:00', location='106 S Elm St, Sherman, TX 75090', lat=33.635950, lng=-96.611990, virtual=True, zoom_id='555xyz', official=True)

    meeting3 = Meeting(host_id='3', title='The Gift of Sobriety',
                       description='This meeting is closed; only those who have a desire to stop drinking may attend.',
                       date='2020-10-31', time='18:00:00', location='1350 W Walnut Hill Ln Irving, TX 75038', lat=32.884670, lng=-96.972900, virtual=True, zoom_id='555xyz', official=True)

    meeting4 = Meeting(host_id='4', title='Cornerstone Group Meeting',
                       description='This meeting is closed; only those who have a desire to stop drinking may attend.',
                       date='2020-10-31', time='07:00:00', location='9090 Skillman St, Dallas, TX 75243', lat=32.896060, lng=-96.721440, virtual=True, zoom_id='555xyz', official=True)

    meeting5 = Meeting(host_id='555', title='Unidad Meeting',
                       description='This meeting is closed; only those who have a desire to stop drinking may attend. Meeting is in Spanish.',
                       date='2020-10-31', time='18:00:00', location='4532 Columbia Ave Dallas, TX 75226', lat=32.792220, lng=-96.766520, virtual=True, zoom_id='555xyz', official=True)

    meeting6 = Meeting(host_id='555', title='31 De Octubre',
                       description='This meeting is closed; only those who have a desire to stop drinking may attend. Meeting is in Spanish.',
                       date='2020-10-31', time='18:00:00', location='7911 Lake June Rd Dallas, TX 75217', lat=32.734635, lng=-96.686310, virtual=True, zoom_id='555xyz', official=True)

    db.session.add(meeting1)
    db.session.add(meeting2)
    db.session.add(meeting3)
    db.session.add(meeting4)
    db.session.add(meeting5)
    db.session.add(meeting6)

    db.session.commit()
