from main import app, db, User
from flask import jsonify, request
import hashlib

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