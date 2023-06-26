from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

# Définir le modèle de données
class Utilisateur(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(50))
    email = db.Column(db.String(50))
    password = db.Column(db.String(50))

# creer la base de données
with app.app_context():
    db.create_all()

# Route pour récupérer tous les utilisateurs
@app.route('/utilisateurs', methods=['GET'])
def get_utilisateurs():
    utilisateurs = Utilisateur.query.all()
    result = []
    for utilisateur in utilisateurs:
        result.append({'id': utilisateur.id, 'nom': utilisateur.nom})
    return jsonify(result)

# Route pour créer un nouvel utilisateur
@app.route('/utilisateurs', methods=['POST'])
def creer_utilisateur():
    data = request.get_json()
    nouveau_utilisateur = Utilisateur(nom=data['nom'])
    nouveau_utilisateur.email = data['email']
    nouveau_utilisateur.password = data['password']

    db.session.add(nouveau_utilisateur)
    db.session.commit()
    return jsonify({'message': 'Utilisateur créé avec succès'})

if __name__ == '__main__':
    app.run()