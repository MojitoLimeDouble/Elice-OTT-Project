from flask import request, Blueprint, jsonify,abort
from models import *
from flask_jwt_extended import *
from easydict import EasyDict as edict
import requests, json, collections

bp = Blueprint('potato_basket', __name__, url_prefix='/api')
# 완전 끝남 (1차)
@bp.route('/potato_basket/<string:nickname>',  methods=['GET'])
def potato_basket(nickname):
    print(nickname)
    
    user = User.query.filter(User.nickname == nickname).first()
    print(user.id)
    new = user.id
    potato = Potato_Basket.query.filter(Potato_Basket.user_id == new).all()

    movie_potato_id = {"movie" :[Movie.to_dict(Movie.query.filter(Movie.id == movie.movie_id).first()) for movie in potato if movie.movie_id]}
    print(movie_potato_id)

    tv_potato_id = {"tv" : [Tv.to_dict(Tv.query.filter(Tv.id == tv.tv_id).first()) for tv in potato if tv.tv_id]}

    
    return jsonify(movie_potato_id, tv_potato_id)

@bp.route('/potato_basket/<string:nickname>/movie', methods=['GET'])
def potato_basket_movie_analysis(nickname):
    # 1. db에서 영화와 tv의 데이터를 가져온다.
    # 2. 가져온 데이터(tv 따로 영화)에서 cast, director, 장르, 국가, 키워드 합치기
    # 3. cast, director, 장르, 국가, 키워드 합치기 중복 값 지우기
    # 4. json 형태로 보내주기
    # 5. 만약 찐감자에서 사라지면????

    user = User.query.filter(User.nickname == nickname).first()
    new = user.id
    potato = Potato_Basket.query.filter(Potato_Basket.user_id == new).all()

    movie_potato_id = {"movie" :[Movie.to_dict(Movie.query.filter(Movie.id == movie.movie_id).first()) for movie in potato if movie.movie_id]}

    movie_potato_genres = []
    movie_potato_keywords = []
    movie_potato_origin_country = []
    movie_potato_cast = []
    movie_potato_director = []
    movie_potato_positive_comment = []
    movie_potato_negative_comment = []
    
    movie_test = edict(movie_potato_id)
    movie_test2 = movie_test.movie

    movie_list = []
    for i in range(0, len(movie_test2)):
        movie_potato_genres.append(movie_test2[i]['genres'])
        movie_potato_keywords.append(movie_test2[i]['keywords'])
        movie_potato_origin_country.append(movie_test2[i]['origin_country'])
        movie_potato_cast.append(movie_test2[i]['cast'])
        movie_potato_director.append(movie_test2[i]['director'])
        movie_potato_positive_comment.append(movie_test2[i]['positive_comment'])
        movie_potato_negative_comment.append(movie_test2[i]['negative_comment'])

    movie_genres_counts = collections.Counter(sum(movie_potato_genres, []))
    movie_keywords_counts = collections.Counter(sum(movie_potato_keywords, []))
    movie_origin_country_counts = collections.Counter(sum(movie_potato_origin_country, []))
    movie_cast_counts = collections.Counter(sum(movie_potato_cast, []))
    movie_director_counts = collections.Counter(sum(movie_potato_director, []))
    movie_positive_comment_counts = collections.Counter(sum(movie_potato_positive_comment, []))
    movie_negative_comment_counts = collections.Counter(sum(movie_potato_negative_comment, []))

    return jsonify(movie_genres_counts, movie_keywords_counts, movie_origin_country_counts, movie_cast_counts, movie_director_counts, 
                movie_positive_comment_counts, movie_negative_comment_counts)


@bp.route('/potato_basket/<string:nickname>/tv', methods=['GET'])
def potato_basket_tv_analysis(nickname):

    user = User.query.filter(User.nickname == nickname).first()
    new = user.id
    potato = Potato_Basket.query.filter(Potato_Basket.user_id == new).all()

    tv_potato_id = {"tv" : [Tv.to_dict(Tv.query.filter(Tv.id == tv.tv_id).first()) for tv in potato if tv.tv_id]}

    tv_potato_genres = []
    tv_potato_keywords = []
    tv_potato_origin_country = []
    tv_potato_cast = []
    tv_potato_director = []
    tv_potato_positive_comment = []
    tv_potato_negative_comment = []
    
    tv_test = edict(tv_potato_id)
    tv_test2 = tv_test.tv

    tv_list = []
    for i in range(0, len(tv_test2)):
        tv_potato_genres.append(tv_test2[i]['genres'])
        tv_potato_keywords.append(tv_test2[i]['keywords'])
        tv_potato_origin_country.append(tv_test2[i]['origin_country'])
        tv_potato_cast.append(tv_test2[i]['cast'])
        tv_potato_director.append(tv_test2[i]['director'])
        tv_potato_positive_comment.append(tv_test2[i]['positive_comment'])
        tv_potato_negative_comment.append(tv_test2[i]['negative_comment'])

    tv_genres_counts = collections.Counter(sum(tv_potato_genres, []))
    tv_keywords_counts = collections.Counter(sum(tv_potato_keywords, []))
    tv_origin_country_counts = collections.Counter(sum(tv_potato_origin_country, []))
    tv_cast_counts = collections.Counter(sum(tv_potato_cast, []))
    tv_director_counts = collections.Counter(sum(tv_potato_director, []))
    tv_positive_comment_counts = collections.Counter(sum(tv_potato_positive_comment, []))
    tv_negative_comment_counts = collections.Counter(sum(tv_potato_negative_comment, []))

    return jsonify(tv_genres_counts, tv_keywords_counts, tv_origin_country_counts, tv_cast_counts, tv_director_counts, 
                tv_positive_comment_counts, tv_negative_comment_counts)
