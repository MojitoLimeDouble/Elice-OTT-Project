from flask import request, Blueprint, jsonify
from models import *

bp = Blueprint('tv-list', __name__, url_prefix='/api')

@bp.route('/tv/list', methods=['GET'])
def tv_list():
    tv_list = Tv.query.order_by(Tv.popularity.desc())
    tv = [Tv.to_dict(tv) for tv in tv_list]

    return jsonify(tv)

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


@bp.route('/tv/list/filter', methods=['GET'])
def tv_list_filter():
    data = request.json
    genre = data['genre']
    filter_id = []
    tvs = []

    tv_all = Tv.query.order_by(Tv.id.asc())
    tv =[[Tv.to_dict(tv).get('genres'), Tv.to_dict(tv).get('id')] for tv in tv_all]
    print(len(tv))

    for i in range(len(tv)):
        if genre in tv[i][0]:
            filter_id.append(tv[i][1])
    for i in filter_id:
        tv = Tv.query.filter(Tv.id == i).first()
        tvs.append(Tv.to_dict(tv))
 
    print(filter_id)
    
    return jsonify(tvs)