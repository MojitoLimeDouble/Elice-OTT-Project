from werkzeug.exceptions import abort
from flask import request, Blueprint, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import *
from models import *
from werkzeug.utils import secure_filename
import random
import os

bcrypt = Bcrypt()
bp = Blueprint('mypage', __name__, url_prefix='/api')

# 회원 프로필 조회
@bp.route("/mypage", methods=["GET"])
@jwt_required()
def mypage():
    
    current_user_id = get_jwt_identity()
    user = User.query.filter(User.id==current_user_id).first()
    
    return jsonify(User.to_dict(user))

# 유저 프로필 사진 변경
@bp.route("/mypage/modify/photo", methods=["PATCH"])
@jwt_required()
def mypage_photo():
    user_id = get_jwt_identity
    if request.method == 'PATCH':
        data = request.files['file']
        if not data:
            abort(404, '파일이 존재하지 않습니다.')

        file_location = './static/image/' + str(random.random()) + secure_filename(data.filename)
        data.save(file_location)

        User.query.filter_by(id==user_id).update({'photolink':file_location})

        db.session.commit()
        return jsonify({"result": "success"})

# 친구의 닉네임을 검색
@bp.route("/mypage/find/friend", methods=['POST'])
@jwt_required()
def mypage_search():
    if request.method == "POST":
        data = request.json
        nickname = data['nickname']

        user_id = get_jwt_identity()

        user = User.query.filter(User.nickname==nickname).first()

        if user_id != user.id:
            return jsonify(User.to_dict(user))
        else:
            return jsonify({'result': 'fail'})

# 친구 추가
@bp.route("/mypage/add/friend", methods=['POST'])
@jwt_required()
def mypage_add_friend():
    if request.method == "POST":
        data = request.json
        nickname = data['nickname']

        user_id = get_jwt_identity()
        
        user = User.query.filter(User.nickname==nickname).first()
        
        if user_id != user.id:
            is_friend = Friend.query.filter(Friend.user_id==user_id, Friend.nickname==nickname).first()

            if not is_friend: 
                friend = Friend(user_id=user_id, nickname=user.nickname, photolink=user.photolink)
                db.session.add(friend)
                db.session.commit()
                return Friend.to_dict(friend)

        return jsonify({'result': 'fail'})
        
# 친구 목록 조회
@bp.route("/mypage/list/friend", methods=['GET'])
@jwt_required()
def mypage_list_friend():
    user_id = get_jwt_identity()
    friend_list = Friend.query.filter(Friend.user_id==user_id).all()
    friends = [Friend.to_dict(i) for i in friend_list]
    return jsonify(friends)

# 회원 탈퇴(15일 이후 삭제는 미적용)
@bp.route("/mypage/delete/user", methods=['DELETE'])
@jwt_required()
def delete_user():
    user_id = get_jwt_identity()
    user_delete = User.query.get(user_id)
    frined_delete = Friend.query.get(user_id)

    db.session.delete(user_delete)
    db.session.delete(frined_delete)

    db.session.commit()

    return '회원 탈퇴를 성공했습니다.'