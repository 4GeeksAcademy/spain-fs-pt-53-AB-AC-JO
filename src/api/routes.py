"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)


# Allow CORS requests to this API
CORS(api, resources={r"/api/*": {"origins": 'https://expert-winner-5gx76wgr744f7w4w-3000.app.github.dev'}})


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"msg": "User not found"}), 401
    if user.password != password:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():
    email = get_jwt_identity()
    dictionary = {"message": "Hello user " + email}
    return jsonify(dictionary)

@api.after_request
def add_cors_headers(response):
   response.headers['Access-Control-Allow-Origin'] = 'https://expert-winner-5gx76wgr744f7w4w-3000.app.github.dev'
   response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
   response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE'
   return response

@api.route("/user", methods=["POST"])
def add_user():
    email = request.json.get("email")
    password = request.json.get("password")
    is_active = True

    required_fields = [email, password, is_active]

    if any(field is None for field in required_fields):
        return jsonify({'error': 'You must provide an email and a password'}), 400
    
    user = User.query.filter_by(email=email).first()

    if user:
        return jsonify({"msg": "This user already has an account"}), 401
    
    try:
        new_user = User(email=email, password=password, is_active=is_active)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'response': 'User added successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400
    
@api.route("/privateuser", methods=["GET"])
@jwt_required()
def get_user():
    email = get_jwt_identity()
    dictionary = {"message": "Hello, this was a private check with your user " + email}
    return jsonify(dictionary)
