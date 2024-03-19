"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Users
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/login", methods=["POST"])
def login():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    if not user:
        response_body["message"] = "email o passwortd incorrecto"
        return response_body, 401
    access_token = create_access_token(identity=user.serialize())
    response_body["acces_token"] = access_token
    response_body["message"] = "usuario logeado con exito"
    response_body["results"] = user.serialize()
    return response_body, 200

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    response_body = {}
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    if current_user["email"] == "test@test":
        response_body["message"] = "Perfil de Pedro, tiene acceso"
        print(current_user)
        return response_body, 200
    response_body["message"] = "Perfil sin acceso"
    return response_body, 402
    
@api.route("/signup", methods=["POST"])
def signup():
    response_body = {}
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user_exists = db.session.query(db.exists().where(Users.email == email)).scalar()
    if user_exists:
        response_body["message"] = "El email ya esta registrado"
        return jsonify(response_body), 400
    new_user = Users(email=email, password=password, is_active=True)
    db.session.add(new_user)
    db.session.commit()
    access_token = create_access_token(identity=new_user.serialize())
    response_body["access_token"] = access_token
    response_body["message"] = "Usuario registrado con exito"
    response_body["user"] = new_user.serialize()
    return jsonify(response_body), 201