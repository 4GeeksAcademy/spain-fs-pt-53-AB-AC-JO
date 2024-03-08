from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    username = db.Column(db.String(50), unique=True, nullable=False)
    visibility = db.Column(db.String(10), nullable=False, default='public', server_default='public')
    
    __table_args__ = (
        db.CheckConstraint('visibility IN (\'public\', \'private\')', name='visibility_check'),
    )

    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'is_active': self.is_active,
            'username': self.username,
            'visibility': self.visibility
        }

class Book(db.Model):
    book_id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    author = db.Column(db.String(50), nullable=False)
    published_year = db.Column(db.Integer, nullable=False)
    review = db.Column(db.Text, nullable=True)
    pages = db.Column(db.Integer, nullable=False)
    thumbnail = db.Column(db.String(200), nullable=False)
    small_thumbnail = db.Column(db.String(200), nullable=False)
    google_id = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def serialize(self):
        return {
            "book_id": self.book_id,
            "title": self.title,
            "author": self.author,
            "published_year": self.published_year,
            "review": self.review,
            "pages": self.pages,
            "thumbnail": self.thumbnail,
            "small_thumbnail": self.small_thumbnail,
            "google_id": self.google_id,
            "user_id": self.user_id,
        }

class Review(db.Model):
    review_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('book.book_id'), nullable=False)
    comment = db.Column(db.Text, nullable=True)

    user = db.relationship('User', backref=db.backref('reviews', lazy=True))
    book = db.relationship('Book', backref=db.backref('reviews', lazy=True))

    def serialize(self):
        return {
            "review_id": self.review_id,
            "user_id": self.user_id,
            "book_id": self.book_id,
            "comment": self.comment,
        }