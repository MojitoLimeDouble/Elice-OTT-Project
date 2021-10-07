from db_connect import db
from datetime import datetime

# 사용자 정보
class User(db.Model):
    __tablename__   = 'user'
    id = db.Column(db.Integer, primary_key=True,
                nullable=False, autoincrement=True)
    email = db.Column(db.String(50),  nullable=False,unique=True)
    nickname = db.Column(db.String(30), nullable=False, unique=True)
    password = db.Column(db.String(64), nullable=False)
    photolink = db.Column(db.Text,nullable=False, default="./static/default.png")
    

    def __init__(self, email, nickname, password):
        self.email = email
        self.nickname = nickname
        self.password = password

    def to_dict(self):
        return {
            'email': self.email,
            'photolink': self.photolink,
            'nickname': self.nickname
        }
    
    friends = db.relationship("Friend", backref="user", lazy=True)
    potato_baskets = db.relationship("Potato_Basket", backref="user", lazy=True)
    movie_potato_baskets = db.relationship("Potato_Basket", backref="movie", lazy=True)
    tv_potato_baskets = db.relationship("Potato_Basket", backref="tv", lazy=True)
    

# 친구 정보
class Friend(db.Model):
    __tablename__ = 'friend'
    #id = db.Column(db.Integer, primary_key=True,
    #               nullable=False, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    nickname = db.Column(db.String(30), nullable=False, unique=True)
    photolink   = db.Column(db.String(255),nullable=False, default="./static/default.png")
    def to_dict(self):
        return {
            'nickname': self.nickname,
            'photolink': self.photolink
        }

# 영화 정보
class Movie(db.Model):
    __tablename__ = 'movie'
    id = db.Column(db.Integer, primary_key=True,
                nullable=False, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    poster_path = db.Column(db.String(255),nullable=False)
    genres = db.Column(db.String(255),nullable=False)
    overview = db.Column(db.Text, nullable=False)
    release_date = db.Column(db.Date,nullable=False)
    popularity = db.Column(db.Float, nullable=False)
    like_count = db.Column(db.Integer, nullable=False, default=0)
    positive_comment = db.Column(db.String(255),nullable=False)
    negative_comment = db.Column(db.String(255),nullable=False)
    origin_country = db.Column(db.String(100),nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'poster_path': self.poster_path,
            'genres': self.genres,
            'overview': self.overview,
            'release_date': self.release_date,
            'popularity': self.popularity,
            'positive_comment': self.positive_comment,
            'negative_comment': self.negative_comment,
            'origin_country': self.origin_country
        }

# TV 정보
class Tv(db.Model):
    __tablename__ = 'tv'
    id = db.Column(db.Integer, primary_key=True,
                nullable=False, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    poster_path = db.Column(db.String(255),nullable=False)
    genres = db.Column(db.String(255),nullable=False)
    overview = db.Column(db.Text, nullable=False)
    first_air_date = db.Column(db.Date,nullable=False)
    last_air_date = db.Column(db.Date,nullable=False)
    popularity = db.Column(db.Float, nullable=False)
    like_count = db.Column(db.Integer, nullable=False, default=0)
    positive_comment = db.Column(db.String(255),nullable=False)
    negative_comment = db.Column(db.String(255),nullable=False)
    origin_country = db.Column(db.String(100),nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'poster_path': self.poster_path,
            'genres': self.genres,
            'overview': self.overview,
            'first_air_date': self.first_air_date,
            'last_air_date': self.last_air_date,
            'popularity': self.popularity,
            'positive_comment': self.positive_comment,
            'negative_comment': self.negative_comment,
            'origin_country': self.origin_country
        }

# 감자 바구니(좋아요 리스트)
class  Potato_Basket(db.Model):
    __tablename__ = 'potato_basket'
    id = db.Column(db.Integer, primary_key=True,
                    nullable=False, autoincrement=True) # 프라이머리 문제땜에 id 생성할 수 밖에 없었다
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'))
    tv_id = db.Column(db.Integer, db.ForeignKey('tv.id'))

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'movie_id': self.movie_id,
            'tv_id': self.tv_id
        }