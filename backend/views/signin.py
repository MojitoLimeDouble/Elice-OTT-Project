from werkzeug.exceptions import abort
from flask import request, Blueprint, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import *
from models import *
from oauth2client.contrib.flask_util import UserOAuth2

bcrypt = Bcrypt()
bp = Blueprint('signin', __name__)

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
        refresh_token = create_access_token(identity = user_id)
        return jsonify(
            result = 'success',
            access_token = access_token,
            refresh_token = refresh_token
        )
    except Exception as e:
        abort(400,"토큰이 발급되지 않았습니다.")        


@bp.route('/test')
# @oauth2.required
def test():
    return "구글 로그인 성공임"
