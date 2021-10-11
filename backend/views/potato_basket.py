from flask import request, Blueprint, jsonify,abort
from models import *
from flask_jwt_extended import *
import requests, json

bp = Blueprint('potato_basket', __name__, url_prefix='/api')
# 완전 끝남 (1차)
@bp.route('/potato_basket/<string:nickname>',  methods=['GET'])
def potato_basket(nickname):
    print(nickname)
    
    user = User.query.filter(User.nickname == nickname).first()
    print(user.id)
    new = user.id
    potato = Potato_Basket.query.filter(Potato_Basket.user_id == new).all()
 
    moive_potato_id = {"movie" :[Movie.to_dict(Movie.query.filter(Movie.id == movie.movie_id).first()) for movie in potato if movie.movie_id]}
    print(moive_potato_id)

    tv_potato_id = {"tv" : [Tv.to_dict(Tv.query.filter(Tv.id == tv.tv_id).first()) for tv in potato if tv.tv_id]}

    return jsonify(moive_potato_id, tv_potato_id)

