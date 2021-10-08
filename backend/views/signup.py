from werkzeug.exceptions import abort
from flask import request, Blueprint, jsonify
from flask_bcrypt import Bcrypt
from models import *

bp = Blueprint('signup', __name__, url_prefix='/api')
bcrypt = Bcrypt()


@bp.route('/signup', methods=['POST'])
def register():
    data = request.json

    email = data['email']
    nickname = data['nickname']
    
    check_email = User.query.filter(User.email == email).first()
    check_nickname = User.query.filter(User.nickname == nickname).first()

    if check_email or check_nickname:
        return jsonify({'result': 'fail'})


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