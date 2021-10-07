from flask import request, Blueprint, jsonify,abort
from models import *
from flask_jwt_extended import *
import requests, json

bp = Blueprint('main', __name__)

@bp.route('/movie/top_rated',  methods=['GET'])
def movie_top_rated():

    response = requests.get("https://api.themoviedb.org/3/movie/popular?api_key=71ee3d022e284d4675ce65473e39a1b9&language=ko-KR&append_to_response=images&include_image_language=en,null")


    if response.status_code != 200:
        abort(response.status_code,"API가 정상 호출되지 않았습니다.")  
    else:
        top_data = response.json()['results']
        dd = []

        for i in top_data:
            print(i['title'], i['poster_path'],i['release_date'])
            row = {'title':i['title'], 'poster_path': i ['poster_path'],'release_date': i['release_date']}

            dd.append(row)

        return jsonify(dd)

@bp.route('/tv/top_rated',  methods=['GET'])
def tv_top_rated():

    response = requests.get("https://api.themoviedb.org/3/tv/popular?api_key=71ee3d022e284d4675ce65473e39a1b9&language=ko-KR&append_to_response=images&include_image_language=en,null")


    if response.status_code != 200:
        abort(response.status_code,"API가 정상 호출되지 않았습니다.")  
    else:
        top_data = response.json()['results']
        dd = []
        for i in top_data:
            print(i['name'], i['poster_path'],i['first_air_date'])
            row = {'name':i['name'], 'poster_path': i ['poster_path'],'first_air_date': i['first_air_date']}

            dd.append(row)

        return jsonify(dd)