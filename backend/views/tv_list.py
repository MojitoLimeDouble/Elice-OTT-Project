from flask import request, Blueprint, jsonify
from models import *

bp = Blueprint('tv-list', __name__)

@bp.route('/tv/list', methods=['GET'])
def tv_list():
    tv_list = Tv.query.order_by(Tv.popularity.desc())
    tv = [Tv.to_dict(tv) for tv in tv_list]

    return jsonify(tv)