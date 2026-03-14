from flask import request, jsonify, Blueprint
from api.models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    if body is None:
        return jsonify({"msg": "Body cannot be empty"}), 400

    email = body.get('email')
    password = body.get('password')

    if not email or not password:
        return jsonify({"msg": "Email and password are required"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"msg": "User already exists"}), 400

    new_user = User(
        email=email,
        is_active=True,
        )
    new_user.password = generate_password_hash(body["password"])

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Cuenta Creada", "user": new_user.serialize()}), 201

@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    user = User.query.filter_by(email=email,).one_or_none()
    if user is None or not user.check_password(password):
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id }), 200

@api.route("/private", methods = ["GET"])
@jwt_required
def private_info():

    current_user = get_jwt_identity()

    user = User.query.get(current_user)

    if user is None:
        return jsonify({"msg": "usuario no encontrado"})
    
    return jsonify ({
        "id": user.id,
        "email" : user.email,
        "msg" : "si lees esto es porque eres un usuario con un token valido"
    }), 200