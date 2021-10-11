from flask import request, Blueprint, jsonify,abort
from models import *


bp = Blueprint('movie-list', __name__, url_prefix='/api')

@bp.route('/movie/list', methods=['GET'])
def movie_list():
    movie_list = Movie.query.order_by(Movie.popularity.desc())
    movies = [Movie.to_dict(movie) for movie in movie_list]
    
    return jsonify(movies)
