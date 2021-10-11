from flask import request, Blueprint, jsonify,abort
from models import *
from flask_jwt_extended import *
import requests, json

bp = Blueprint('like', __name__, url_prefix='/api')

@bp.route('/like',  methods=['PATCH'])
@jwt_required()
def like():
    data = request.json
    content_id = data['id']
    like = data['likes'] #  그 영화, tv에서 likes 칼럼이 필요가 없을 듯 여기서는 말고
    category = data['category']

    user_id = get_jwt_identity()
    if like == 1:
        if category == "movie":
            potato = Potato_Basket(user_id=user_id, movie_id=content_id)
            movie = Movie.query.filter(Movie.id==content_id).first()
            movie.like_count += 1

            Movie.query.filter_by(id=content_id).update(
                {'like_count': movie.like_count})

        if category == "tv":
            potato = Potato_Basket(user_id=user_id, tv_id=content_id)
            tv = Tv.query.filter(Tv.id==content_id).first()
            tv.like_count += 1

            Tv.query.filter_by(id=content_id).update(
                {'like_count': tv.like_count})
            
        db.session.add(potato)
    
    if like == 0:
        if category == "movie":
            potato = Potato_Basket.query.filter(Potato_Basket.user_id==user_id, Potato_Basket.movie_id==content_id).first()
            movie = Movie.query.filter(Movie.id==content_id).first()
            movie.like_count -= 1

            Movie.query.filter_by(id=content_id).update(
                {'like_count': movie.like_count})
        
        if category == "tv":
            potato = Potato_Basket.query.filter(Potato_Basket.user_id==user_id, Potato_Basket.tv_id==content_id).first()
            tv = Tv.query.filter(Tv.id==content_id).first()
            tv.like_count -= 1

            Tv.query.filter_by(id=content_id).update(
                {'like_count': tv.like_count})

        db.session.delete(potato)
    db.session.commit()
    try:
        
        return jsonify({'result': 'success'})

    except Exception as e:
        db.session.rollback()
        abort(400,{'error': 'str(e)'} )

# 숫자 리스트로 좋아요 누른 리스트 표시
@bp.route('/like/list',  methods=['GET'])
@jwt_required()
def like_watch():
    data = request.json
    category = data['category']

    user_id = get_jwt_identity()
    potato = Potato_Basket.query.filter(Potato_Basket.user_id==user_id).all()

    if category == "movie":
        like_list = [movie.movie_id for movie in potato if movie.movie_id]
    if category == "tv":
        like_list = [tv.tv_id for tv in potato if tv.tv_id]
        print(like_list)
    return jsonify(like_list)