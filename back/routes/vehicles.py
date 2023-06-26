from main import app, db, Vehicle
from flask import jsonify, request

# Route pour récupérer tous les véhicules
@app.route('/vehicles', methods=['GET'])
def get_vehicules():
    vehicles = Vehicle.query.all()
    result = []
    for vehicle in vehicles:
        result.append({'id': vehicle.id, 'type': vehicle.type, 'brand': vehicle.brand, 'color': vehicle.color, 'license_plate': vehicle.license_plate})
    return jsonify(result)

# Route pour récupérer un véhicule
@app.route('/vehicles/<id>', methods=['GET'])
def get_vehicule(id):
    vehicle = Vehicle.query.get(id)
    return jsonify({'id': vehicle.id, 'type': vehicle.type, 'brand': vehicle.brand, 'color': vehicle.color, 'license_plate': vehicle.license_plate})

# Route pour récupérer tous les véhicules d'un utilisateur
@app.route('/vehicles/user/<user_id>', methods=['GET'])
def get_vehicules_user(user_id):
    vehicles = Vehicle.query.filter_by(user_id=user_id).all()
    result = []
    for vehicle in vehicles:
        result.append({'id': vehicle.id, 'type': vehicle.type, 'brand': vehicle.brand, 'color': vehicle.color, 'license_plate': vehicle.license_plate})
    return jsonify(result)

# Route pour créer un nouveau véhicule
@app.route('/vehicles', methods=['POST'])
def creer_vehicule():
    data = request.get_json()
    new_vehicle = Vehicle(type=data['type'], brand=data['brand'], color=data['color'], license_plate=data['license_plate'], user_id=data['user_id'])
    db.session.add(new_vehicle)
    db.session.commit()
    return jsonify({'message': 'Véhicule créé avec succès'})