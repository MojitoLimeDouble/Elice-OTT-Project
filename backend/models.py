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
    photolink = db.Column(db.Text,nullable=False, default="./static/image/default.png")
    

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
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
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
    poster_path = db.Column(db.String(255),nullable=True)
    overview = db.Column(db.Text, nullable=True)
    release_date = db.Column(db.Date,nullable=True)
    runtime = db.Column(db.Integer, nullable=True)
    popularity = db.Column(db.Float, nullable=False)
    origin_country = db.Column(db.String(100),nullable=True)
    genres = db.Column(db.Text,nullable=True)
    keywords = db.Column(db.Text,nullable=True)
    like_count = db.Column(db.Integer, nullable=False)
    positive_comment = db.Column(db.String(255),nullable=False)
    negative_comment = db.Column(db.String(255),nullable=False)
    cast = db.Column(db.Text,nullable=True)
    director = db.Column(db.Text,nullable=True)
    rank = db.Column(db.Integer,nullable=True)

    def to_dict(self):
        # 출연진
        line_cast = self.cast.replace("[", '')
        line_cast = line_cast.replace('"', '')
        line_cast = line_cast.replace("'", '')
        line_cast = line_cast.replace("]", '')
        cast_list = line_cast.split(', ')
        
        # 국가
        line_coun = self.origin_country.replace("[", '')
        line_coun = line_coun.replace('"', '')
        line_coun = line_coun.replace("'", '')
        line_coun = line_coun.replace("]", '')
        country_list = line_coun.split(', ')

        # 키워드
        line_key = self.keywords.replace("[", '')
        line_key = line_key.replace('"', '')
        line_key = line_key.replace("'",'')
        line_key = line_key.replace("]", '')
        keyword_list = line_key.split(', ')

        # 장르
        line_gen = self.genres.replace("[", '')
        line_gen = line_gen.replace('"', '')
        line_gen = line_gen.replace("'", '')
        line_gen = line_gen.replace("]", '')
        genre_list = line_gen.split(', ')

        # 감독
        line_direc = self.director.replace("[", '')
        line_direc = line_direc.replace('"', '')
        line_direc = line_direc.replace("'", '')
        line_direc = line_direc.replace("]", '')
        director_list = line_direc.split(', ')

        # 긍정어
        line_posi = self.positive_comment.replace(" ", '')
        positive_list = line_posi.split(',')
    
        # 부정어
        line_nega = self.negative_comment.replace(" ",'')
        negative_list = line_nega.split(',')
        
        # 카테고리
        category = "movie"
      
        return {
            'id': self.id,
            'title': self.title,
            'poster_path': self.poster_path,
            'overview': self.overview,
            'release_date': self.release_date,
            'runtime' : self.runtime,
            'genres': genre_list,
            'popularity' : self.popularity,
            'like_count' : self.like_count,
            'positive_comment': positive_list,
            'negative_comment': negative_list,
            'cast' : cast_list,
            'director' : director_list,
            'keywords' : keyword_list,
            'origin_country' : country_list,
            'category' : category
        }

# TV 정보
class Tv(db.Model):
    __tablename__ = 'tv'
    id = db.Column(db.Integer, primary_key=True,
                nullable=False, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    poster_path = db.Column(db.String(255),nullable=False)
    overview = db.Column(db.Text, nullable=False)
    first_air_date = db.Column(db.Date,nullable=False)
    runtime = db.Column(db.Integer, nullable=True)
    popularity = db.Column(db.Float, nullable=False)
    origin_country = db.Column(db.String(100),nullable=True)
    genres = db.Column(db.Text,nullable=True)
    keywords = db.Column(db.Text,nullable=True)
    like_count = db.Column(db.Integer, nullable=False)
    positive_comment = db.Column(db.String(255),nullable=False)
    negative_comment = db.Column(db.String(255),nullable=False)
    cast = db.Column(db.Text,nullable=True)
    director = db.Column(db.Text,nullable=True)
    rank = db.Column(db.Integer,nullable=True)

    def to_dict(self):
        # 출연진
        line_cast = self.cast.replace("[", '')
        line_cast = line_cast.replace('"', '')
        line_cast = line_cast.replace("'", '')
        line_cast = line_cast.replace("]", '')
        cast_list = line_cast.split(', ')
        
        # 국가
        line_coun = self.origin_country.replace("[", '')
        line_coun = line_coun.replace('"', '')
        line_coun = line_coun.replace("'", '')
        line_coun = line_coun.replace("]", '')
        country_list = line_coun.split(', ')

        # 키워드
        line_key = self.keywords.replace("[", '')
        line_key = line_key.replace('"', '')
        line_key = line_key.replace("'",'')
        line_key = line_key.replace("]", '')
        keyword_list = line_key.split(', ')

        # 장르
        line_gen = self.genres.replace("[", '')
        line_gen = line_gen.replace('"', '')
        line_gen = line_gen.replace("'", '')
        line_gen = line_gen.replace("]", '')
        genre_list = line_gen.split(', ')

        # 감독
        line_direc = self.director.replace("[", '')
        line_direc = line_direc.replace('"', '')
        line_direc = line_direc.replace("'", '')
        line_direc = line_direc.replace("]", '')
        director_list = line_direc.split(', ')

        # 긍정어
        line_posi = self.positive_comment.replace(" ", '')
        positive_list = line_posi.split(',')
    
        # 부정어
        line_nega = self.negative_comment.replace(" ",'')
        negative_list = line_nega.split(',')

        # 카테고리
        category = "tv"

        return {
            'id': self.id,
            'title': self.name,
            'poster_path': self.poster_path,
            'overview': self.overview,
            'release_date': self.first_air_date,
            'runtime' : self.runtime,
            'genres': genre_list,
            'popularity' : self.popularity,
            'like_count' : self.like_count,
            'positive_comment': positive_list,
            'negative_comment': negative_list,
            'cast' : cast_list,
            'director' : director_list,
            'keywords' : keyword_list,
            'origin_country' : country_list,
            'category' : category
        }

# 감자 바구니(좋아요 리스트)
class  Potato_Basket(db.Model):
    __tablename__ = 'potato_basket'
    id = db.Column(db.Integer, primary_key=True,
                    nullable=False, autoincrement=True) 
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'))
    tv_id = db.Column(db.Integer, db.ForeignKey('tv.id'))

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'movie_id': self.movie_id,
            'tv_id': self.tv_id
        }
