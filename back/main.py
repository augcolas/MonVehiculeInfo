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
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))

# creer la base de données
with app.app_context():
    db.create_all()

@app.route('/')
def hello():
    return 'this application running'

# Route pour les utilisateurs
import routes.users

# Route pour les véhicules
import routes.vehicles
if __name__ == '__main__':
    app.run()