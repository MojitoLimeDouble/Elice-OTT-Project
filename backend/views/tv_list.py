from flask import request, Blueprint, jsonify
from models import *
from sqlalchemy import create_engine
import config

bp = Blueprint('tv-list', __name__, url_prefix='/api')
engine = create_engine(config.SQLALCHEMY_DATABASE_URI)

@bp.route('/tv/list', methods=['GET'])
def tv_list():
    tv_list = Tv.query.order_by(Tv.popularity.desc())
    tv = [Tv.to_dict(tv) for tv in tv_list]

    return jsonify(tv)

@bp.route('/tv/list/sorted', methods=['POST'])
def tv_list_sorted():
    data = request.json
    creiteria = data['sort_criteria']
    
    # 인기순 내림차순
    if creiteria == '인기도 높은 순':
        tv_list_popularity_desc = Tv.query.order_by(Tv.popularity.desc())
        tv = [Tv.to_dict(tv) for tv in tv_list_popularity_desc]

    # 인기순 오름차순
    if creiteria == '인기도 낮은 순':
        tv_list_popularity_asc = Tv.query.order_by(Tv.popularity.asc())
        tv = [Tv.to_dict(tv) for tv in tv_list_popularity_asc]

    # 방영일순 최신
    if creiteria == '최신 작품 순':
        tv_list_air_desc = Tv.query.order_by(Tv.first_air_date.desc())
        tv = [Tv.to_dict(tv) for tv in tv_list_air_desc]

    # 방영일순 오래된순
    if creiteria == '오래된 작품 순':
        tv_list_air_asc = Tv.query.order_by(Tv.first_air_date.asc())
        tv = [Tv.to_dict(tv) for tv in tv_list_air_asc]

    # 제목순
    if creiteria == '제목 순':
        tv_list_name = engine.execute("SELECT * FROM Tv ORDER BY (CASE WHEN SUBSTRING(name,1,1) RLIKE '[ㄱ-ㅎ가-힣]' THEN 1 WHEN SUBSTRING(name,1,1) RLIKE '[a-zA-Z]' THEN 2 ELSE 3 END),name")
        #tv_list_name = Tv.query.order_by(bin(Tv.name).asc())
        tv = [Tv.to_dict(tv) for tv in tv_list_name]

    return jsonify(tv)


@bp.route('/tv/list/filter', methods=['POST'])
def tv_list_filter():
    data = request.json
    genre = data['sort_criteria']
    filter_id = []
    tvs = []

    tv_all = Tv.query.order_by(Tv.id.asc())
    tv_list =[[Tv.to_dict(tv).get('genres'), Tv.to_dict(tv).get('id')] for tv in tv_all]
 

    for i in range(len(tv_list)):
        if genre in tv_list[i][0]:
            filter_id.append(tv_list[i][1])

    for i in filter_id:
        tv = Tv.query.filter(Tv.id == i).first()
        tvs.append(Tv.to_dict(tv))
 
    
    return jsonify(tvs)