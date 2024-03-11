"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Book, Review
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager

api = Blueprint('api', __name__)

# Hay que modificar la URL de puerto 3000 (Nuestro front) en la línea 19 y 49
# Allow CORS requests to this API
CORS(api, resources={r"/api/*": {"origins": 'https://crispy-space-umbrella-4j79xjxrj54j2qrpj-3000.app.github.dev'}})


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 401
    if user.password != password:
        return jsonify({"msg": "Email o contraseña incorrectos"}), 401

    access_token = create_access_token(identity=user.id)
    return jsonify(access_token=access_token)


@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():
    user = get_jwt_identity()
    dictionary = {"message": "Hello user " + user}
    return jsonify(dictionary)

@api.route("/user", methods=["POST"])
def add_user():
    email = request.json.get("email")
    password = request.json.get("password")
    is_active = True
    username = request.json.get("username")
    visibility = request.json.get("visibility", "public")  

    required_fields = [email, password, username, is_active]

    if visibility not in ["public", "private"]:
        return jsonify({'error': 'Invalid visibility value. Use "public" or "private"'}), 400
    
    if any(field is None for field in required_fields):
        return jsonify({'error': 'You must provide an email, a password, and a username'}), 400

    user = User.query.filter_by(email=email).first()

    if user:
        return jsonify({"msg": "This user already has an account"}), 401

    try:
        new_user = User(email=email, password=password, is_active=is_active, username=username)
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


@api.route('/reviews', methods=['POST'])
def add_review():
    title = request.json.get("title")
    author = request.json.get("author")
    published_year = request.json.get("published_year")
    pages = request.json.get("pages")
    thumbnail = request.json.get("thumbnail")
    small_thumbnail = request.json.get("small_thumbnail")
    google_id = request.json.get("google_id")
    user_id = request.json.get("user_id")
    comment = request.json.get("comment")

    # Check if the book already exists in the database
    book = Book.query.filter_by(title=title, author=author, published_year=published_year, google_id=google_id).first()

    if not book:
        # If the book doesn't exist, add it to the database
        book = Book(title=title, author=author, published_year=published_year, pages=pages, thumbnail=thumbnail, small_thumbnail=small_thumbnail, google_id=google_id)
        db.session.add(book)
        db.session.commit()

    # Add the review to the database
    comment = request.json.get("comment")
    review = Review(user_id=user_id, book=book, comment=comment)
    db.session.add(review)
    db.session.commit()

    return jsonify({'message': 'Review added successfully'})

@api.route('/reviews', methods=['GET'])
def get_reviews():
    reviews = Review.query.all()
    result = []
    for review in reviews:
        review_data = review.serialize()
        review_data['book'] = review.book.serialize()
        result.append(review_data)
    return jsonify(result)

@api.route('/reviews/<int:review_id>', methods=['GET'])
def get_review(review_id):
    review = Review.query.get_or_404(review_id)
    review_data = review.serialize()
    return jsonify(review_data)

@api.after_request
def add_cors_headers(response):
   response.headers['Access-Control-Allow-Origin'] = 'https://crispy-space-umbrella-4j79xjxrj54j2qrpj-3000.app.github.dev'
   response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
   response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE'
   return response
