from main import app, db, Vehicle
from flask import jsonify, request

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