from flask import request, Blueprint, jsonify
from models import *

bp = Blueprint('tv-list-sorted', __name__)

@bp.route('/tv/list/sorted', methods=['GET'])
def tv_list_sorted():
    # 인기순 내림차순
    tv_list_popularity_desc = Tv.query.order_by(Tv.popularity.desc())
    tv = [Tv.to_dict(tv) for tv in tv_list_popularity_desc]

    # 인기순 오름차순
    tv_list_popularity_asc = Tv.query.order_by(Tv.popularity.asc())
    tv = [Tv.to_dict(tv) for tv in tv_list_popularity_asc]

    # 방영일순 최신
    tv_list_air_desc = Tv.query.order_by(Tv.first_air_date.desc())
    tv = [Tv.to_dict(tv) for tv in tv_list_air_desc]

    # 방영일순 오래된순
    tv_list_air_asc = Tv.query.order_by(Tv.first_air_date.asc())
    tv = [Tv.to_dict(tv) for tv in tv_list_air_asc]

    # 제목순
    tv_list_name = Tv.query.order_by(Tv.name.asc())
    tv = [Tv.to_dict(tv) for tv in tv_list_name]

    return jsonify(tv)