from flask import request, Blueprint, jsonify,abort
from models import *
from flask_jwt_extended import *
from operator import itemgetter
import requests, json, random, itertools

bp = Blueprint('main', __name__, url_prefix='/api')

@bp.route('/top_rated', methods=['GET'])
def top_rated():
    
    response_movie = requests.get("https://api.themoviedb.org/3/movie/popular?api_key=71ee3d022e284d4675ce65473e39a1b9&language=ko-KR&append_to_response=images&include_image_language=en,null")
    response_tv = requests.get("https://api.themoviedb.org/3/tv/popular?api_key=71ee3d022e284d4675ce65473e39a1b9&language=ko-KR&append_to_response=images&include_image_language=en,null")

    top_data_movie = response_movie.json()['results']
    top_data_tv = response_tv.json()['results']

    top_contents = []
    
    # movie 데이터 넣기
    for i in top_data_movie:
        row = { 'id': i['id'], 'popularity': i['popularity'], 'title':i['title'], 'poster_path': i['poster_path'],'release_date': i['release_date'], 'category': 'movie'}
        top_contents.append(row)

    # tv 데이터 넣기
    for i in top_data_tv:
        row = { 'id': i['id'], 'popularity': i['popularity'], 'name':i['name'], 'poster_path': i['poster_path'],'first_air_date': i['first_air_date'], 'category': 'tv'}
        top_contents.append(row)

    a = sorted(top_contents, key=itemgetter('popularity'))
    b = sorted(a, key=itemgetter('popularity'), reverse=True)
    
    return jsonify(b[0:10])
    

@bp.route('/movie/hit', methods=['GET'])
def movie_hit():

    movies1_list = []
    movies2_list = []
    movies3_list = []
    movies4_list = []
    movies5_list = []
    
    items = [i for i in range(20)]
    numbers = list(itertools.combinations(items,4))
    number = random.choice(numbers)

    print("야!!!!!!",number,number[0])

    movie_list_1 = Movie.query.filter(Movie.rank == 1).all()
    movies_1 = [Movie.to_dict(movie) for movie in movie_list_1]
    movies1_list.append(movies_1[0])
    movies_spare = movies_1[1:]
    for i in number:
        movies1_list.append(movies_spare[i])
    #print(movies1_list)

    movie_list_2 = Movie.query.filter(Movie.rank == 2).all()
    movies_2 = [Movie.to_dict(movie) for movie in movie_list_2]
    movies2_list.append(movies_2[0])
    movies_spare = movies_2[1:]
    for i in number:
        movies2_list.append(movies_spare[i])
    #print(movies2_list)

    movie_list_3 = Movie.query.filter(Movie.rank == 3).all()
    movies_3 = [Movie.to_dict(movie) for movie in movie_list_3]
    movies3_list.append(movies_3[0])
    movies_spare = movies_3[1:]
    for i in number:
        movies3_list.append(movies_spare[i])
    #print(movies3_list)

    movie_list_4 = Movie.query.filter(Movie.rank == 4).all()
    movies_4 = [Movie.to_dict(movie) for movie in movie_list_4]
    movies4_list.append(movies_4[0])
    movies_spare = movies_4[1:]
    for i in number:
        movies4_list.append(movies_spare[i])
    #print(movies4_list)

    movie_list_5 = Movie.query.filter(Movie.rank == 5).all()
    movies_5 = [Movie.to_dict(movie) for movie in movie_list_5]
    movies5_list.append(movies_5[0])
    movies_spare = movies_5[1:]
    for i in number:
        movies5_list.append(movies_spare[i])
    #print(movies5_list)
    

    return jsonify({"top1": movies1_list},{"top2": movies2_list},{"top3": movies3_list},{"top4": movies4_list},{"top5": movies5_list})


@bp.route('/tv/hit', methods=['GET'])
def tv_hit():

    tvs1_list = []
    tvs2_list = []
    tvs3_list = []
    tvs4_list = []
    tvs5_list = []
    
    items = [i for i in range(20)]
    numbers = list(itertools.combinations(items,4))
    number = random.choice(numbers)

    print("야!!!!!!",number,number[0])

    tv_list_1 = Tv.query.filter(Tv.rank == 1).all()
    tvs_1 = [Tv.to_dict(tv) for tv in tv_list_1]
    tvs1_list.append(tvs_1[0])
    tvs_spare = tvs_1[1:]
    for i in number:
        tvs1_list.append(tvs_spare[i])
    #print(tvs1_list)

    tv_list_2 = Tv.query.filter(Tv.rank == 2).all()
    tvs_2 = [Tv.to_dict(tv) for tv in tv_list_2]
    tvs2_list.append(tvs_2[0])
    tvs_spare = tvs_2[1:]
    for i in number:
        tvs2_list.append(tvs_spare[i])
    #print(tvs2_list)

    tv_list_3 = Tv.query.filter(Tv.rank == 3).all()
    tvs_3 = [Tv.to_dict(tv) for tv in tv_list_3]
    tvs3_list.append(tvs_3[0])
    tvs_spare = tvs_3[1:]
    for i in number:
        tvs3_list.append(tvs_spare[i])
    #print(tvs3_list)

    tv_list_4 = Tv.query.filter(Tv.rank == 4).all()
    tvs_4 = [Tv.to_dict(tv) for tv in tv_list_4]
    tvs4_list.append(tvs_4[0])
    tvs_spare = tvs_4[1:]
    for i in number:
        tvs4_list.append(tvs_spare[i])
    #print(tvs4_list)

    tv_list_5 = Tv.query.filter(Tv.rank == 5).all()
    tvs_5 = [Tv.to_dict(tv) for tv in tv_list_5]
    tvs5_list.append(tvs_5[0])
    tvs_spare = tvs_5[1:]
    for i in number:
        tvs5_list.append(tvs_spare[i])
    #print(tvs5_list)
    

    return jsonify({"top1": tvs1_list},{"top2": tvs2_list},{"top3": tvs3_list},{"top4": tvs4_list},{"top5": tvs5_list})