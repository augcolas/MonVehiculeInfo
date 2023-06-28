# ---> installer les dépendances (la première fois après un clone, checkout, pull)
# python3 -m venv venv
# source venv/bin/activate
# pip install -r requirements.txt

# ---> lancer le serveur
# source venv/bin/activate
# flask --app main run

from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import hashlib

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
    password = db.Column(db.String(50))
    vehicles = db.relationship('Vehicle', backref='user', lazy=True)

class Vehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50))
    brand = db.Column(db.String(50))
    color = db.Column(db.String(50))
    license_plate = db.Column(db.String(50))
    state = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

# creer la base de données
with app.app_context():
    db.create_all()

@app.route('/')
def hello():
    return 'this application running'

# Route pour les utilisateurs
# Route pour récupérer tous les utilisateurs

@app.route('/users', methods=['GET'])
def get_utilisateurs():
    users = User.query.all()
    result = []
    for user in users:
        result.append({'id': user.id, 'name': user.name, 'email': user.email, 'password': user.password})
    return jsonify(result)

# Route pour récupérer un utilisateur
@app.route('/users/<id>', methods=['GET'])
def get_utilisateur(id):
    user = User.query.get(id)
    return jsonify({'id': user.id, 'name': user.name, 'email': user.email, 'password': user.password})

# Route pour créer un nouvel utilisateur
@app.route('/users', methods=['POST'])
def creer_utilisateur():
    data = request.get_json()
    hashed_password = hashlib.md5(data['password'].encode()).hexdigest()
    new_user = User(name=data['name'], email=data['email'], password=hashed_password, vehicles=data['vehicles'])

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Utilisateur créé avec succès'})

# Route pour récupérer un utilisateur par email
@app.route('/users/get_by_email', methods=['GET'])
def get_user_by_email():
    email = request.args.get('email')  # Récupère la valeur de l'email dans la requête
    user = User.query.filter_by(email=email).first()  # Filtrer les utilisateurs par email
    return jsonify({'id': user.id, 'name': user.name, 'email': user.email, 'password': user.password})

# Route pour vérifier un mot de passe
@app.route('/users/<id>/check-password', methods=['POST'])
def check_password(id):
    data = request.get_json()
    hashed_password = hashlib.md5(data['password'].encode()).hexdigest()
    user = User.query.get(id)

    if user.password == hashed_password:
        object = {'message': 'Mot de passe correct','result': True}
    else:
        object = {'message': 'Mot de passe incorrect','result': False}

    response = jsonify(object)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response




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


if __name__ == '__main__':
    app.run(host='0.0.0.0')
