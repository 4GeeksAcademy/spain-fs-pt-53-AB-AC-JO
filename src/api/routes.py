"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Book, Review
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import generate_password_hash, check_password_hash

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager


api = Blueprint('api', __name__)

# Hay que modificar la URL de puerto 3000 (Nuestro front) en la línea 21 y 210!!!!

# Allow CORS requests to this API
CORS(api, resources={r"/api/*": {"origins": 'https://crispy-space-umbrella-4j79xjxrj54j2qrpj-3000.app.github.dev:3000/'}})


# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.
@api.route("/token", methods=["POST"])
def create_token():
    
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    
    user = User.query.filter_by(email=email).first()

    if not user or not password:
        return jsonify({"msg": "Se necesita email y contraseña"}), 400

    
    if not user:
        return jsonify({"msg": "Email no encontrado"}), 401

    
    if not check_password_hash(user.hash, password):
        return jsonify({"msg": "Email o contraseña incorrectos"}), 401

    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)


@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if user:
        dictionary = {"message": "Hello user " + user.username}
        return jsonify(dictionary)
    else:
        return jsonify({"message": "User not found"}), 404

@api.route("/user", methods=["POST"])  #Registro usuario
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
        return jsonify({'error': 'Debes facilitar un mail, usuario y contraseña válidos'}), 400


    hashed = generate_password_hash(password).decode('utf-8')
    user = User.query.filter_by(email=email).first()
    

    if user:
        return jsonify({"msg": "Este usuario ya tiene una cuenta registrada"}), 401

    try:
        new_user = User(email=email, hash=hashed, is_active=is_active, username=username, visibility=visibility)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'response': 'Usuario añadido correctamente'}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 400
    

@api.route("/change_password", methods=["PUT"])
@jwt_required() 
def change_password():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "Email not found"}), 401

    current_password = request.json.get("current_password", None)
    new_password = request.json.get("new_password", None)
    
    if not current_password or not new_password:
        return jsonify({"msg": "Current and new passwords are required"}), 400

    if not check_password_hash(user.hash, current_password):
        return jsonify({"msg": "Current password is incorrect"}), 401

    hashed = generate_password_hash(new_password).decode('utf-8')
    user.hash = hashed
    db.session.commit()

    return jsonify({"msg": "Password changed successfully"}), 200

@api.route('/user/visibility', methods=['PUT'])
@jwt_required()
def update_user_visibility():
    email = get_jwt_identity()
    user_query = User.query.filter_by(email=email).first()
    if not user_query:
        return jsonify({"msg": "Email not found"}), 401

    data = request.json
    if 'visibility' not in data:
        return jsonify(error='Missing visibility field in the request body'), 400

    updated_visibility = data['visibility']
    if updated_visibility not in ['public', 'private']:
        return jsonify(error='Invalid visibility. Must be "public" or "private".'), 400

    user = User.query.filter_by(email=email).first()
    user.visibility = updated_visibility
    db.session.commit()

    return jsonify(User.serialize(user)), 200
   
@api.route("/privateuser", methods=["GET"])
@jwt_required()
def get_user():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if user:
        dictionary = {"message": f"Hello, this was a private check with your user {user.username}"}
    else:
        dictionary = {"message": "User not found"}
    return jsonify(dictionary)

@api.route('/reviews', methods=['POST'])  #Añadir review, primero confirma si el libro ya está en la base de datos para no duplicarlo
@jwt_required()
def add_review():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({'error': 'User not found'}), 404
    
    title = request.json.get("title")
    author = request.json.get("author")
    published_year = request.json.get("published_year")
    pages = request.json.get("pages")
    thumbnail = request.json.get("thumbnail")
    small_thumbnail = request.json.get("small_thumbnail")
    google_id = request.json.get("google_id")
    comment = request.json.get("comment")

    # Confirmación si el libro está en DB
    book = Book.query.filter_by(title=title, author=author, published_year=published_year, google_id=google_id).first()
    
    if not book:
        # Si el libro no existe en DB lo añade
        book = Book(title=title, author=author, published_year=published_year, pages=pages, thumbnail=thumbnail, small_thumbnail=small_thumbnail, google_id=google_id)
        db.session.add(book)
        db.session.commit()

    # Añade la review a DB
    review = Review(user_id=user.id, book=book, comment=comment)
    db.session.add(review)
    db.session.commit()

    return jsonify({'message': 'Reseña añadida correctamente'})

@api.route('/reviews', methods=['GET'])  # Obtiene todas las reviews de usuarios con visibilidad 'public'
def get_reviews():
    reviews = Review.query.filter(Review.user.has(User.visibility == 'public')).all()
    result = []
    for review in reviews:
        review_data = review.serialize()
        review_data['book'] = review.book.serialize()
        result.append(review_data)
    return jsonify(result)

@api.route('/reviews/<int:review_id>', methods=['GET']) #Obtiene review por ID de review
def get_review(review_id):
    review = Review.query.get_or_404(review_id)
    review_data = review.serialize()
    return jsonify(review_data)

@api.route('/reviews/<int:review_id>', methods=['PUT']) #Modifica review por ID de review, confirma que el mail que la creó es el mismo que la modifica.
@jwt_required()
def update_review_comment(review_id):
    email = get_jwt_identity()
    review = Review.query.join(User, Review.user_id == User.id).filter(Review.review_id == review_id, User.email == email).first()
    if review is None:
        return jsonify({'error': 'No está autorizado para modificar esta review'}), 401

    comment = request.json.get("comment")
    if not comment:
        return jsonify({'error': 'Se requiere una review'}), 400

    review.comment = comment
    db.session.commit()

    return jsonify({'message': 'Review actualizada correctamente'})

@api.route('/reviews/<int:review_id>', methods=['DELETE']) #Borra la review por ID, verifica que el mail que la creó es el que hace la petición de borrado.
@jwt_required()
def delete_review(review_id):
    email = get_jwt_identity()
    review = Review.query.join(User, Review.user_id == User.id).filter(Review.review_id == review_id, User.email == email).first()
    if review is None:
        return jsonify({'error': 'No autorizado, sólo el creador de la reseña puede borrarla'}), 401

    db.session.delete(review)
    db.session.commit()

    return jsonify({'message': 'Reseña eliminada correctamente'})

@api.route('/reviews/current_user', methods=['GET'])  #Obtiene las reviews creadas por un usuario filtrando por mail
@jwt_required()
def get_current_user_reviews():
    email = get_jwt_identity()
    user = User.query.filter_by(email=email).first()
    if user is None:
        return jsonify({'error': 'User not found'}), 404

    reviews = Review.query.filter_by(user_id=user.id).all()
    serialized_reviews = [r.serialize() for r in reviews]
    return jsonify(serialized_reviews)

@api.after_request
def add_cors_headers(response):
   response.headers['Access-Control-Allow-Origin'] = 'https://crispy-space-umbrella-4j79xjxrj54j2qrpj-3000.app.github.dev'
   response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
   response.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE'
   return response
