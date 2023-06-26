from main import app, db, User
from flask import jsonify, request

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
    new_user = User(name=data['name'], email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'Utilisateur créé avec succès'})