from werkzeug.exceptions import abort
from flask import request, Blueprint, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import *
from models import *

bcrypt = Bcrypt()
bp = Blueprint('user', __name__, url_prefix='/api')

@bp.route('/signup', methods=['POST'])
def register():
    data = request.json

    email = data['email']
    nickname = data['nickname']
    
    check_email = User.query.filter(User.email == email).first()
    check_nickname = User.query.filter(User.nickname == nickname).first()

    if check_email:
        abort(400,"이미 사용중인 이메일입니다.")
    if check_nickname:
        abort(400,"이미 사용중인 닉네임입니다.")

    password = data['password']

    pw_hash = bcrypt.generate_password_hash(password).decode()
    
    user = User(email=email, nickname=nickname, password=pw_hash)
    
    db.session.add(user)

    try:
        db.session.commit()
        return jsonify({'result': 'success'})

    except Exception as e:
        db.session.rollback()
        abort(400,{'error': 'str(e)'} )

@bp.route('/login', methods=['POST'])
def login():
    if request.method != 'POST':
        abort(400, "알맞은 요청 방식이 아닙니다.")

    data = request.json
    email = data['email']
    password = data['password']

    user = User.query.filter(User.email == email).first()

    if not user:
        abort(400,"ID가 일치하는 사용자가 없습니다.")

    user_id = user.id

    if not bcrypt.check_password_hash(user.password, password):
        abort(400, "비밀번호가 일치하지 않습니다.")
        
    try:
        access_token = create_access_token(identity = user_id, fresh=True)
        refresh_token = create_refresh_token(identity = user_id)
        photolink=User.to_dict(user).get('photolink')
        nickname = User.to_dict(user).get('nickname')

        return jsonify(
            result = 'success',
            photolink = photolink,
            nickname = nickname,
            access_token = access_token,
            refresh_token = refresh_token
        )
    except Exception as e:
        abort(400,"토큰이 발급되지 않았습니다.")        


# @bp.route('/logout', methods=['POST'])
# @jwt_required()
# def logout():

#     jwt_blocklist = set()
#     print(jwt_blocklist)
#     jti =get_jwt()['jti']
#     print(jti)
#     jwt_blocklist.add(jti)
#     print(jwt_blocklist)

#     return jsonify({'message' : 'success'})

@bp.route('/protected', methods=['GET'])
@jwt_required
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@bp.route('/refresh', methods=['GET'])
@jwt_required(fresh=True)
def refresh():
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user)
    return jsonify(access_token=access_token, current_user=current_user)

@bp.route('/refresh_long', methods=['GET'])
@jwt_required(fresh=True)
def refreshLong():
    cur_user = get_jwt_identity()
    delta = datetime.timedelta(days=1)
    access_token = create_access_token(identity=cur_user, expires_delta=delta)
    return jsonify(access_token=access_token)