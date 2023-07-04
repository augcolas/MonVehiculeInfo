# ---> installer les dépendances (la première fois après un clone, checkout, pull)
# python3 -m venv venv
# source venv/bin/activate
# pip install -r requirements.txt

# ---> lancer le serveur
# source venv/bin/activate
# flask --app main run

import datetime
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy import or_
import hashlib
import datetime
import requests

app = Flask(__name__)
#removing cors
CORS(app)

# Configurer la base de données
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

# Définir le modèle de données
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(50))
    firebase_uuid = db.Column(db.String(50), unique=True)
    expoToken = db.Column(db.String(50))
    vehicles = db.relationship('Vehicle', backref='user', lazy=True)

class Vehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50))
    brand = db.Column(db.String(50))
    color = db.Column(db.String(50))
    license_plate = db.Column(db.String(50))
    state = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

class Conversation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    contact_id= db.Column(db.Integer, db.ForeignKey('user.id'))
    license_plate = db.Column(db.String(50))
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicle.id'))
    messages = db.relationship('Message', backref='conversation', lazy=True)

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(50))
    date = db.Column(db.DateTime, nullable=False, default=datetime.datetime)
    conversation_id = db.Column(db.Integer, db.ForeignKey('conversation.id'))
    user_id = db.Column(db.Integer, nullable=False)

# Creer la base de données
with app.app_context():
    db.create_all()

@app.route('/')
def hello():
    return 'The application is running...'


# Route pour les utilisateurs

# Route pour récupérer tous les utilisateurs
@app.route('/users', methods=['GET'])
def get_utilisateurs():
    users = User.query.all()
    result = []
    for user in users:
        result.append({'id': user.id, 'name': user.name, 'email': user.email, 'firebase_uuid':user.firebase_uuid, 'expoToken':user.expoToken})
    return jsonify(result)

# Route pour récupérer un utilisateur
@app.route('/users/<id>', methods=['GET'])
def get_utilisateur(id):
    user = User.query.filter_by(firebase_uuid=id).first()
    return jsonify({'id': user.id, 'name': user.name, 'email': user.email, 'firebase_uuid':user.firebase_uuid, 'expoToken':user.expoToken})

# Route pour créer un nouvel utilisateur
@app.route('/users', methods=['POST'])
def creer_utilisateur():
    data = request.get_json()
    new_user = User(name=data['name'], email=data['email'], firebase_uuid=data['firebase_uuid'], vehicles=data['vehicles'])

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Utilisateur créé avec succès'})

@app.route('/users/<id>/session', methods=['POST'])
def updateSession(id):
    data = request.get_json()
    user = User.query.filter_by(firebase_uuid=id).first()
    user.expoToken = data['expoToken']
    db.session.commit()
    return jsonify({"session": user.expoToken})

# Route pour les véhicules
# Route pour récupérer tous les véhicules
@app.route('/vehicles', methods=['GET'])
def get_vehicules():
    vehicles = Vehicle.query.all()
    result = []
    for vehicle in vehicles:
        result.append({
            'id': vehicle.id,
            'type': vehicle.type,
            'brand': vehicle.brand,
            'color': vehicle.color,
            'license_plate': vehicle.license_plate,
            'user_id': vehicle.user_id,
            'state': vehicle.state
        })
    return jsonify(result)


# Route pour récupérer un véhicule
@app.route('/vehicles/<id>', methods=['GET'])
def get_vehicule(id):
    vehicle = Vehicle.query.get(id)
    return jsonify({
        'id': vehicle.id,
        'type': vehicle.type,
        'brand': vehicle.brand,
        'color': vehicle.color,
        'license_plate': vehicle.license_plate,
        'user_id': vehicle.user_id,
        'state': vehicle.state
    })

# Route pour récupérer un utilisateur selon une plaque d'immatriculation
@app.route('/user/get_by_license_plate/<lp>', methods=['GET'])
def get_vehicle_by_license_plate(lp):
    vehicle = Vehicle.query.filter_by(license_plate=lp).first()
    returned_object = {}
    # le vehicule n'existe pas dans la base de données
    if vehicle is None:
        returned_object = {'message': 'Le véhicule n\'existe pas dans la base de données'}
    else:
        user = User.query.get(vehicle.user_id)
        # l'utilisateur n'existe pas dans la base de données
        if user is None:
            returned_object = {'message': 'L\'utilisateur n\'existe pas dans la base de données'}
        else:
            returned_object = {'id': user.id, 'name': user.name, 'email': user.email}

    app.logger.info(returned_object)
    return jsonify(returned_object)

# Route pour récupérer un utilisateur selon l'id d'un vehicule
@app.route('/user/get_by_vehicle_id/<vehicleId>', methods=['GET'])
def get_vehicle_by_vehicle_id(vehicleId):
    vehicle = Vehicle.query.get(vehicleId)
    returned_object = {}
    # le vehicule n'existe pas dans la base de données
    if vehicle is None:
        returned_object = {'message': 'Le véhicule n\'existe pas dans la base de données'}
    else:
        user = User.query.get(vehicle.user_id)
        # l'utilisateur n'existe pas dans la base de données
        if user is None:
            returned_object = {'message': 'L\'utilisateur n\'existe pas dans la base de données'}
        else:
            returned_object = {'id': user.id, 'name': user.name, 'email': user.email}

    app.logger.info(returned_object)
    return jsonify(returned_object)

# Route pour récupérer tous les véhicules d'un utilisateur
@app.route('/vehicles/user/<user_id>', methods=['GET'])
def get_vehicules_user(user_id):
    vehicles = Vehicle.query.filter_by(user_id=user_id).all()
    result = []
    for vehicle in vehicles:
        result.append({
            'id': vehicle.id,
            'type': vehicle.type,
            'brand': vehicle.brand,
            'color': vehicle.color,
            'license_plate': vehicle.license_plate,
            'user_id': vehicle.user_id,
            'state': vehicle.state
        })
    return jsonify(result)

# Route pour créer un nouveau véhicule
@app.route('/vehicles', methods=['POST'])
def creer_vehicule():
    data = request.get_json()
    app.logger.info(data)
    new_vehicle = Vehicle(type=data['type'], brand=data['brand'], color=data['color'],license_plate=data['license_plate'],user_id=data['user_id'],state=data['state'])
    db.session.add(new_vehicle)
    db.session.commit()
    #return the new vehicle
    return jsonify({
        'id': new_vehicle.id,
        'type': new_vehicle.type,
        'brand': new_vehicle.brand,
        'color': new_vehicle.color,
        'license_plate': new_vehicle.license_plate,
        'user_id': new_vehicle.user_id,
        'state': new_vehicle.state
    })

# Route pour supprimer un véhicule
@app.route('/vehicles/<id>', methods=['DELETE'])
def supprimer_vehicule(id):
    vehicle = Vehicle.query.get(id)
    db.session.delete(vehicle)
    db.session.commit()
    return jsonify({'message': 'Véhicule supprimé avec succès'})


# Routes pour les conversations / messages

# Route pour récupérer toutes les conversations d'un utilisateur
@app.route('/conversations/user/<user_id>', methods=['GET'])
def get_conversations_user(user_id):
    conversations = Conversation.query.filter(or_(Conversation.user_id == user_id, Conversation.contact_id == user_id)).all()
    result = []
    for conversation in conversations:
        result.append({
            'id': conversation.id,
            'user_id': conversation.user_id,
            'contact_id': conversation.contact_id,
            'license_plate': conversation.license_plate,
        })
    return jsonify(result)

# Route pour récupérer une conversation entre 2 utilisateurs selon leur id
@app.route('/conversations/exist', methods=['GET'])
def get_conversation_by_users():
    user_id = request.args.get('user_id')
    contact_id = request.args.get('contact_id')
    conversation = Conversation.query.filter_by(user_id=user_id, contact_id=contact_id).first()

    #if conversation not found
    if conversation is None:
        return jsonify({
            'message': 'Conversation not found'
        })
    else:
        return jsonify({
            'id': conversation.id,
            'user_id': conversation.user_id,
            'contact_id': conversation.contact_id,
        })

# Route pour créer une nouvelle conversation
@app.route('/conversations', methods=['POST'])
def creer_conversation():
    data = request.get_json()
    app.logger.info('data :',data)
    new_conversation = Conversation(user_id=data['user_id'], contact_id=data['contact_id'], license_plate=data['license_plate'], vehicle_id=data['vehicle_id'])
    db.session.add(new_conversation)
    db.session.commit()

    return jsonify({
        'id': new_conversation.id,
        'user_id': new_conversation.user_id,
        'contact_id': new_conversation.contact_id,
        'license_plate': new_conversation.license_plate
        'vehicle_id': new_conversation.vehicle_id
    })

# Route pour supprimer une conversation
@app.route('/conversations/<id>', methods=['DELETE'])
def supprimer_conversation(id):
    conversation = Conversation.query.get(id)
    # messages = Message.query.filter_by(id=id).all() # TODO: check
    db.session.delete(conversation)
    db.session.commit()
    return jsonify({'message': 'Conversation supprimée avec succès'})

# Route pour récupérer les messages d'une conversation
@app.route('/conversations/<id>/messages', methods=['GET'])
def get_messages_conversation(id):
    conversation = Conversation.query.get(id)
    if(conversation is None):
        return jsonify({'message': 'Conversation not found'})
    messages = conversation.messages
    result = []
    for message in messages:
        result.append({
            'id': message.id,
            'content': message.content,
            'date': message.date,
            'conversation_id': message.conversation_id,
            'user_id': message.user_id
        })
    return jsonify(result)


# Route pour créer un message dans une conversation
@app.route('/conversations/<id>/messages', methods=['POST'])
def creer_message(id):
    data = request.get_json()
    conversation = Conversation.query.get(id)
    app.logger.info(data)

    # vérif user_id est bien rempli
    if 'content' not in data or 'user_id' not in data:
        return jsonify({'error': 'Content and user_id are required.'}), 400

    new_message = Message(content=data['content'], date=datetime.datetime.now(), conversation_id=id, user_id=data['user_id'])
    db.session.add(new_message)
    db.session.commit()

    if(conversation.user_id == data['user_id']):
        sendNotif(conversation.contact_id, conversation.user_id, data['content'])
    else:
        sendNotif(conversation.user_id, conversation.contact.id, data['content'])


    return jsonify({
        'id': new_message.id,
        'content': new_message.content,
        'date': new_message.date,
        'conversation_id': new_message.conversation_id,
        'user_id': new_message.user_id
    })

def sendNotif(receiver_id, sender_id, content):
    receiver_user = User.query.get(receiver_id)
    sender_user = User.query.get(sender_id)
    if receiver_user.expoToken is not None:
        params ={
            "to": receiver_user.expoToken,
            "sound": "default",
            "title": sender_user.name+" vous a envoyé un message",
            "body": content
        }
        response = requests.post("https://exp.host/--/api/v2/push/send", json=params)
        print(response)



if __name__ == '__main__':
    app.run(host='0.0.0.0')
