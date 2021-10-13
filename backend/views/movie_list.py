import itertools
from flask import request, Blueprint, jsonify,abort
from models import *


bp = Blueprint('movie-list', __name__, url_prefix='/api')

@bp.route('/movie/list', methods=['GET'])
def movie_list():
    movie_list = Movie.query.order_by(Movie.popularity.desc())
    movies = [Movie.to_dict(movie) for movie in movie_list]
    for movie in movie_list:
        cast=Movie.to_dict(movie).get('cast')
        print(Movie.to_dict(movie))
        
        print(Movie.to_dict(movie).get('cast'))
    return jsonify(movies)

@bp.route('/movie/list/sorted', methods=['GET'])
def movie_list_sorted():
    # 인기순 내림차순
    movie_list_popularity_desc = Movie.query.order_by(Movie.popularity.desc())
    movie = [movie.to_dict(movie) for movie in movie_list_popularity_desc]

    # 인기순 오름차순
    movie_list_popularity_asc = Movie.query.order_by(Movie.popularity.asc())
    movie = [movie.to_dict(movie) for movie in movie_list_popularity_asc]

    # 방영일순 최신
    movie_list_air_desc = Movie.query.order_by(Movie.first_air_date.desc())
    movie = [movie.to_dict(movie) for movie in movie_list_air_desc]

    # 방영일순 오래된순
    movie_list_air_asc = Movie.query.order_by(Movie.first_air_date.asc())
    movie = [movie.to_dict(movie) for movie in movie_list_air_asc]

    # 제목순 오름차순
    movie_list_name = Movie.query.order_by(Movie.name.asc())
    movie = [movie.to_dict(movie) for movie in movie_list_name]

    # 제목순 내림차순 
    movie_list_name = Movie.query.order_by(Movie.name.desc())
    movie = [movie.to_dict(movie) for movie in movie_list_name]

    return jsonify(movie)


@bp.route('/movie/list/filter', methods=['GET'])
def movie_list_filter():
    data = request.json
    genre = data['genre']
    filter_id = []
    movies = []

    movie_all = Movie.query.order_by(Movie.id.asc())
    movie =[[Movie.to_dict(movie).get('genres'), Movie.to_dict(movie).get('id')] for movie in movie_all]
    print(len(movie))

    for i in range(len(movie)):
        if genre in movie[i][0]:
            filter_id.append(movie[i][1])
    for i in filter_id:
        movie = Movie.query.filter(Movie.id == i).first()
        movies.append(Movie.to_dict(movie))
 
    print(filter_id)

    return jsonify(movies)