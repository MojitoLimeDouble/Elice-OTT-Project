import itertools
from flask import request, Blueprint, jsonify,abort
from models import *
import config
from sqlalchemy import create_engine


bp = Blueprint('movie-list', __name__, url_prefix='/api')
engine = create_engine(config.SQLALCHEMY_DATABASE_URI)

@bp.route('/movie/list', methods=['GET'])
def movie_list():
    movie_list = Movie.query.order_by(Movie.popularity.desc())
    movies = [Movie.to_dict(movie) for movie in movie_list]
    for movie in movie_list:
        cast=Movie.to_dict(movie).get('cast')
        print(Movie.to_dict(movie))
        
        print(Movie.to_dict(movie).get('cast'))
    return jsonify(movies)

@bp.route('/movie/list/sorted', methods=['POST'])
def movie_list_sorted():

    data = request.json
    creiteria = data['sort_criteria']

    # 인기순 내림차순
    if creiteria == '인기도 높은 순':
        movie_list_popularity_desc = Movie.query.order_by(Movie.popularity.desc())
        movie = [Movie.to_dict(movie) for movie in movie_list_popularity_desc]

    # 인기순 오름차순
    if creiteria == '인기도 낮은 순':
        movie_list_popularity_asc = Movie.query.order_by(Movie.popularity.asc())
        movie = [Movie.to_dict(movie) for movie in movie_list_popularity_asc]

    # 방영일순 최신
    if creiteria == '최신 작품 순':
        movie_list_air_desc = Movie.query.order_by(Movie.release_date.desc())
        movie = [Movie.to_dict(movie) for movie in movie_list_air_desc]

    # 방영일순 오래된순
    if creiteria == '오래된 작품 순':
        movie_list_air_asc = Movie.query.order_by(Movie.release_date.asc())
        movie = [Movie.to_dict(movie) for movie in movie_list_air_asc]

    # 제목순
    if creiteria == '제목 순':
        movie_list_name = engine.execute("SELECT * FROM Movie ORDER BY (CASE WHEN SUBSTRING(title,1,1) RLIKE '[ㄱ-ㅎ가-힣]' THEN 1 WHEN SUBSTRING(title,1,1) RLIKE '[a-zA-Z]' THEN 2 ELSE 3 END),title")
        movie = [Movie.to_dict(movie) for movie in movie_list_name]

    return jsonify(movie)

@bp.route('/movie/list/filter', methods=['POST'])
def movie_list_filter():

    data = request.json
    genre = data['sort_criteria']
    filter_id = []
    movies = []

    movie_all = Movie.query.order_by(Movie.id.asc())
    movie_list =[[Movie.to_dict(movie).get('genres'), Movie.to_dict(movie).get('id')] for movie in movie_all]

    for i in range(len(movie_list)):
        if genre in movie_list[i][0]:
            filter_id.append(movie_list[i][1])
            
    for i in filter_id:
        movie = Movie.query.filter(Movie.id == i).first()
        movies.append(Movie.to_dict(movie))
 
    print(filter_id)

    return jsonify(movies)