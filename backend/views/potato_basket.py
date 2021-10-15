from flask import request, Blueprint, jsonify,abort
from models import *
from flask_jwt_extended import *
from easydict import EasyDict as edict
import requests, json, collections
import csv, os
import pandas as pd

bp = Blueprint('potato_basket', __name__, url_prefix='/api')
# 완전 끝남 (1차)
@bp.route('/potato_basket/<string:nickname>',  methods=['GET'])
@jwt_required()
def potato_basket(nickname):
    
    user_id = get_jwt_identity()

    potato = Potato_Basket.query.filter(Potato_Basket.user_id == user_id).all()

    movie_potato_id = {"movie" :[Movie.to_dict(Movie.query.filter(Movie.id == movie.movie_id).first()) for movie in potato if movie.movie_id]}
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
    potato = Potato_Basket.query.filter(Potato_Basket.user_id == user.id).all()

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
    s_movie_genres_counts = sorted(movie_genres_counts.items(), key=(lambda x:x[1]),reverse=True)
    movie_keywords_counts = collections.Counter(sum(movie_potato_keywords, []))
    s_movie_keywords_counts = sorted(movie_keywords_counts.items(), key=(lambda x:x[1]),reverse=True)
    movie_origin_country_counts = collections.Counter(sum(movie_potato_origin_country, []))
    s_movie_origin_country_counts = sorted(movie_origin_country_counts.items(), key=(lambda x:x[1]),reverse=True)
    movie_cast_counts = collections.Counter(sum(movie_potato_cast, []))
    s_movie_cast_counts = sorted(movie_cast_counts.items(), key=(lambda x:x[1]),reverse=True)
    movie_director_counts = collections.Counter(sum(movie_potato_director, []))
    s_movie_director_counts = sorted(movie_director_counts.items(), key=(lambda x:x[1]),reverse=True)
    movie_positive_comment_counts = collections.Counter(sum(movie_potato_positive_comment, []))
    s_movie_positive_comment_counts = sorted(movie_positive_comment_counts.items(), key=(lambda x:x[1]),reverse=True)
    movie_negative_comment_counts = collections.Counter(sum(movie_potato_negative_comment, []))
    s_movie_negative_comment_counts = sorted(movie_negative_comment_counts.items(), key=(lambda x:x[1]),reverse=True)

    return jsonify({"genres" : s_movie_genres_counts, "keywords" : s_movie_keywords_counts,"country" : s_movie_origin_country_counts, "cast" : s_movie_cast_counts,"director": s_movie_director_counts, 
                "positive" : s_movie_positive_comment_counts, "negative" : s_movie_negative_comment_counts})


@bp.route('/potato_basket/<string:nickname>/tv', methods=['GET'])
def potato_basket_tv_analysis(nickname):

    user = User.query.filter(User.nickname == nickname).first()
    potato = Potato_Basket.query.filter(Potato_Basket.user_id == user.id).all()


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
    s_tv_genres_counts = sorted(tv_genres_counts.items(), key=(lambda x:x[1]),reverse=True)
    tv_keywords_counts = collections.Counter(sum(tv_potato_keywords, []))
    s_tv_keywords_counts = sorted(tv_keywords_counts.items(), key=(lambda x:x[1]),reverse=True)
    tv_origin_country_counts = collections.Counter(sum(tv_potato_origin_country, []))
    s_tv_origin_country_counts = sorted(tv_origin_country_counts.items(), key=(lambda x:x[1]),reverse=True)
    tv_cast_counts = collections.Counter(sum(tv_potato_cast, []))
    s_tv_cast_counts = sorted(tv_cast_counts.items(), key=(lambda x:x[1]),reverse=True)
    tv_director_counts = collections.Counter(sum(tv_potato_director, []))
    s_tv_director_counts = sorted(tv_director_counts.items(), key=(lambda x:x[1]),reverse=True)
    tv_positive_comment_counts = collections.Counter(sum(tv_potato_positive_comment, []))
    s_tv_positive_comment_counts = sorted(tv_positive_comment_counts.items(), key=(lambda x:x[1]),reverse=True)
    tv_negative_comment_counts = collections.Counter(sum(tv_potato_negative_comment, []))
    s_tv_negative_comment_counts = sorted(tv_negative_comment_counts.items(), key=(lambda x:x[1]),reverse=True)

    return jsonify({"genres" : s_tv_genres_counts, "keywords" : s_tv_keywords_counts,"country" : s_tv_origin_country_counts, "cast" : s_tv_cast_counts,"director": s_tv_director_counts, 
                "positive" : s_tv_positive_comment_counts, "negative" : s_tv_negative_comment_counts})


