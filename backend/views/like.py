from flask import request, Blueprint, jsonify,abort
from sqlalchemy.sql.functions import user
from models import *
from flask_jwt_extended import *
import requests, json

bp = Blueprint('like', __name__, url_prefix='/api')

# like 버튼 누르면 업데이트
@bp.route('/like',  methods=['PATCH'])
@jwt_required()
def like():
    data = request.json
    content_id = data['id']
    like = data['likes'] 
    category = data['category']

    user_id = get_jwt_identity()

    if like == True: # 리스트에 있으면 추가 불가 중복 코드 작성
        if category == "movie":
            is_potato = Potato_Basket.query.filter(Potato_Basket.user_id==user_id, Potato_Basket.movie_id==content_id).first()
            potato = Potato_Basket(user_id=user_id, movie_id=content_id)

            movie = Movie.query.filter(Movie.id==content_id).first()

            if movie and not is_potato:
                movie.like_count += 1
            if not movie:
                abort(400,"해당하는 영화가 없습니다.")  
            if is_potato:
                abort(400,"좋아요는 중복이 불가합니다.")  

            Movie.query.filter_by(id=content_id).update(
                {'like_count': movie.like_count})

        if category == "tv":
            is_potato = Potato_Basket.query.filter(Potato_Basket.user_id==user_id, Potato_Basket.tv_id==content_id).first()
            potato = Potato_Basket(user_id=user_id, tv_id=content_id)
            tv = Tv.query.filter(Tv.id==content_id).first()

            if tv and not is_potato:
                tv.like_count += 1
            if not tv:
                abort(400,"해당하는 TV 프로그램이 없습니다.")  
            if is_potato:
                abort(400,"좋아요는 중복이 불가합니다.")  

            Tv.query.filter_by(id=content_id).update(
                {'like_count': tv.like_count})
            
        db.session.add(potato)
    
    if like == False: # 리스트에 없으면 삭제 불가 코드 작성
        if category == "movie":
            potato = Potato_Basket.query.filter(Potato_Basket.user_id==user_id, Potato_Basket.movie_id==content_id).first()
            movie = Movie.query.filter(Movie.id==content_id).first()

            if movie and potato:
                movie.like_count -= 1
            if not movie:
                abort(400,"해당하는 영화가 없습니다.")  
            if not potato:
                abort(400,"취소할 좋아요가 없습니다.")  

            Movie.query.filter_by(id=content_id).update(
                {'like_count': movie.like_count})
        
        if category == "tv":
            potato = Potato_Basket.query.filter(Potato_Basket.user_id==user_id, Potato_Basket.tv_id==content_id).first()
            tv = Tv.query.filter(Tv.id==content_id).first()

            if tv and potato:
                tv.like_count -= 1
            if not tv:
                abort(400,"해당하는 TV 프로그램이 없습니다.")  
            if not potato:
                abort(400,"취소할 좋아요가 없습니다.")

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
@bp.route('/like/list',  methods=['POST'])
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