from flask import request, Blueprint, jsonify,abort
from models import *
from flask_jwt_extended import *
from easydict import EasyDict as edict
import requests, json, collections
import csv, os
import pandas as pd

bp = Blueprint('potato_basket', __name__, url_prefix='/api')
# 완전 끝남 (1차)
@bp.route('/potato_basket/<string:nickname>',  methods=['GET'])
@jwt_required()
def potato_basket(nickname):
    
    user_id = get_jwt_identity()

    potato = Potato_Basket.query.filter(Potato_Basket.user_id == user_id).all()

    movie_potato_id = {"movie" :[Movie.to_dict(Movie.query.filter(Movie.id == movie.movie_id).first()) for movie in potato if movie.movie_id]}
    tv_potato_id = {"tv" : [Tv.to_dict(Tv.query.filter(Tv.id == tv.tv_id).first()) for tv in potato if tv.tv_id]}

    
    return jsonify(movie_potato_id, tv_potato_id)

@bp.route('/potato_basket/<string:nickname>/movie', methods=['GET'])
@jwt_required()
def potato_basket_movie_analysis(nickname):
    # 1. db에서 영화와 tv의 데이터를 가져온다.
    # 2. 가져온 데이터(tv 따로 영화)에서 cast, director, 장르, 국가, 키워드 합치기
    # 3. cast, director, 장르, 국가, 키워드 합치기 중복 값 지우기
    # 4. json 형태로 보내주기
    # 5. 만약 찐감자에서 사라지면????

    user_id = get_jwt_identity()
    potato = Potato_Basket.query.filter(Potato_Basket.user_id == user_id).all()

    movie_potato_id = {"movie" :[Movie.to_dict(Movie.query.filter(Movie.id == movie.movie_id).first()) for movie in potato if movie.movie_id]}

    movie_potato_genres = []
    movie_potato_keywords = []
    movie_potato_origin_country = []
    movie_potato_cast = []
    movie_potato_director = []
    movie_potato_positive_comment = []
    movie_potato_negative_comment = []
    
    movie_test = edict(movie_potato_id)
    movie_test2 = movie_test.movie

    movie_list = []
    for i in range(0, len(movie_test2)):
        movie_potato_genres.append(movie_test2[i]['genres'])
        movie_potato_keywords.append(movie_test2[i]['keywords'])
        movie_potato_origin_country.append(movie_test2[i]['origin_country'])
        movie_potato_cast.append(movie_test2[i]['cast'])
        movie_potato_director.append(movie_test2[i]['director'])
        movie_potato_positive_comment.append(movie_test2[i]['positive_comment'])
        movie_potato_negative_comment.append(movie_test2[i]['negative_comment'])

    movie_genres_counts = collections.Counter(sum(movie_potato_genres, []))
    s_movie_genres_counts = sorted(movie_genres_counts.items(), key=(lambda x:x[1]),reverse=True)
    movie_keywords_counts = collections.Counter(sum(movie_potato_keywords, []))
    s_movie_keywords_counts = sorted(movie_keywords_counts.items(), key=(lambda x:x[1]),reverse=True)
    movie_origin_country_counts = collections.Counter(sum(movie_potato_origin_country, []))
    s_movie_origin_country_counts = sorted(movie_origin_country_counts.items(), key=(lambda x:x[1]),reverse=True)
    movie_cast_counts = collections.Counter(sum(movie_potato_cast, []))
    s_movie_cast_counts = sorted(movie_cast_counts.items(), key=(lambda x:x[1]),reverse=True)
    movie_director_counts = collections.Counter(sum(movie_potato_director, []))
    s_movie_director_counts = sorted(movie_director_counts.items(), key=(lambda x:x[1]),reverse=True)
    movie_positive_comment_counts = collections.Counter(sum(movie_potato_positive_comment, []))
    s_movie_positive_comment_counts = sorted(movie_positive_comment_counts.items(), key=(lambda x:x[1]),reverse=True)
    movie_negative_comment_counts = collections.Counter(sum(movie_potato_negative_comment, []))
    s_movie_negative_comment_counts = sorted(movie_negative_comment_counts.items(), key=(lambda x:x[1]),reverse=True)

    return jsonify({"genres" : s_movie_genres_counts, "keywords" : s_movie_keywords_counts,"country" : s_movie_origin_country_counts, "cast" : s_movie_cast_counts,"director": s_movie_director_counts, 
                "positive" : s_movie_positive_comment_counts, "negative" : s_movie_negative_comment_counts})


@bp.route('/potato_basket/<string:nickname>/tv', methods=['GET'])
@jwt_required()
def potato_basket_tv_analysis(nickname):

    user_id = get_jwt_identity()
    potato = Potato_Basket.query.filter(Potato_Basket.user_id == user_id).all()

    tv_potato_id = {"tv" : [Tv.to_dict(Tv.query.filter(Tv.id == tv.tv_id).first()) for tv in potato if tv.tv_id]}

    tv_potato_genres = []
    tv_potato_keywords = []
    tv_potato_origin_country = []
    tv_potato_cast = []
    tv_potato_director = []
    tv_potato_positive_comment = []
    tv_potato_negative_comment = []
    
    tv_test = edict(tv_potato_id)
    tv_test2 = tv_test.tv

    tv_list = []
    for i in range(0, len(tv_test2)):
        tv_potato_genres.append(tv_test2[i]['genres'])
        tv_potato_keywords.append(tv_test2[i]['keywords'])
        tv_potato_origin_country.append(tv_test2[i]['origin_country'])
        tv_potato_cast.append(tv_test2[i]['cast'])
        tv_potato_director.append(tv_test2[i]['director'])
        tv_potato_positive_comment.append(tv_test2[i]['positive_comment'])
        tv_potato_negative_comment.append(tv_test2[i]['negative_comment'])

    tv_genres_counts = collections.Counter(sum(tv_potato_genres, []))
    s_tv_genres_counts = sorted(tv_genres_counts.items(), key=(lambda x:x[1]),reverse=True)
    tv_keywords_counts = collections.Counter(sum(tv_potato_keywords, []))
    s_tv_keywords_counts = sorted(tv_keywords_counts.items(), key=(lambda x:x[1]),reverse=True)
    tv_origin_country_counts = collections.Counter(sum(tv_potato_origin_country, []))
    s_tv_origin_country_counts = sorted(tv_origin_country_counts.items(), key=(lambda x:x[1]),reverse=True)
    tv_cast_counts = collections.Counter(sum(tv_potato_cast, []))
    s_tv_cast_counts = sorted(tv_cast_counts.items(), key=(lambda x:x[1]),reverse=True)
    tv_director_counts = collections.Counter(sum(tv_potato_director, []))
    s_tv_director_counts = sorted(tv_director_counts.items(), key=(lambda x:x[1]),reverse=True)
    tv_positive_comment_counts = collections.Counter(sum(tv_potato_positive_comment, []))
    s_tv_positive_comment_counts = sorted(tv_positive_comment_counts.items(), key=(lambda x:x[1]),reverse=True)
    tv_negative_comment_counts = collections.Counter(sum(tv_potato_negative_comment, []))
    s_tv_negative_comment_counts = sorted(tv_negative_comment_counts.items(), key=(lambda x:x[1]),reverse=True)

    return jsonify({"genres" : s_tv_genres_counts, "keywords" : s_tv_keywords_counts,"country" : s_tv_origin_country_counts, "cast" : s_tv_cast_counts,"director": s_tv_director_counts, 
                "positive" : s_tv_positive_comment_counts, "negative" : s_tv_negative_comment_counts})

@bp.route('/potato_basket/<string:nickname>/recommend', methods=['GET'])
@jwt_required()
def potato_basket_recommend(nickname):
    url_movie = "http://127.0.0.1:5000/api/potato_basket/%s/movie" %nickname
    url_tv = "http://127.0.0.1:5000/api/potato_basket/%s/tv" %nickname
    m_genre_dict = {}
    t_genre_dict = {}
    m_country_dict = {}
    t_country_dict = {}
    m_keyword_dict = {}
    t_keyword_dict = {}
    m_cast_dict = {}
    t_cast_dict = {}
    m_director_dict = {}
    t_director_dict = {}


    response_movie = requests.get(url_movie)
    response_tv = requests.get(url_tv)
    movie_genres = response_movie.json()['genres']
    tv_genres = response_tv.json()['genres']
    movie_keywords = response_movie.json()['keywords']
    tv_keywords = response_tv.json()['keywords']
    movie_country = response_movie.json()['country']
    tv_country = response_tv.json()['country']
    movie_cast = response_movie.json()['cast']
    tv_cast = response_tv.json()['cast']
    movie_director = response_movie.json()['director']
    tv_director = response_tv.json()['director']
    
    for i in range(len(movie_genres)):
        m_genre_dict[movie_genres[i][0]] = movie_genres[i][1]
    for i in range(len(movie_country)):
        m_country_dict[movie_country[i][0]] = movie_country[i][1]
    for i in range(len(movie_keywords)):
        m_keyword_dict[movie_keywords[i][0]] = movie_keywords[i][1]
    # for i in range(len(movie_cast)):
    #     m_cast_dict[movie_cast[i][0]] = movie_cast[i][1]
    # for i in range(len(movie_director)):
    #     m_director_dict[movie_director[i][0]] = movie_director[i][1]

    for i in range(len(tv_genres)):
        t_genre_dict[tv_genres[i][0]] = tv_genres[i][1]
    for i in range(len(tv_country)):
        t_country_dict[tv_country[i][0]] = tv_country[i][1]
    for i in range(len(tv_keywords)):
        t_keyword_dict[tv_keywords[i][0]] = tv_keywords[i][1]
    print(t_genre_dict, m_genre_dict)
    

    #print(m_genre_dict, m_country_dict,m_keyword_dict, m_cast_dict, m_director_dict)
    movie_db = Movie.query.order_by(Movie.id.asc())
    tv_db = Tv.query.order_by(Tv.id.asc())
    
    movies =[Movie.to_dict(movie) for movie in movie_db]
    tvs =[Tv.to_dict(tv) for tv in tv_db]
    print(len(movies))
    
    contents_id = []
    sepa = []
    gen_score = []
    coun_score = []
    key_score = []
    cast_score = []
    direc_score = []

    user_id = get_jwt_identity()
    
    potato = Potato_Basket.query.filter(Potato_Basket.user_id == user_id)
    movie_id_list = [Potato_Basket.to_dict(movie).get("movie_id") for movie in potato]
    tv_id_list = [Potato_Basket.to_dict(tv).get("tv_id") for tv in potato]
    
    for movie in movies:

        if movie.get('id') not in movie_id_list:
            contents_id.append(movie.get('id'))
            sepa.append(0)

            sum_list = []
            for x in movie.get('genres'):
                #print(x)
                if x in m_genre_dict:
                    sum_list.append(m_genre_dict[x])
                else:
                    sum_list.append(0)
            gen_score.append(sum(sum_list))

            sum_list = []
            for x in movie.get('keywords'):
                #print(x)
                if x in m_keyword_dict:
                    sum_list.append(m_keyword_dict[x])
                else:
                    sum_list.append(0)
            key_score.append(sum(sum_list))

            sum_list = []
            for x in movie.get('origin_country'):
                #print(x)
                if x in m_country_dict:
                    sum_list.append(m_country_dict[x])
                else:
                    sum_list.append(0)
            coun_score.append(sum(sum_list))

        # sum_list = []
        # for x in movie.get('cast')[:5]:
        #     print(x)
        #     if x in m_cast_dict:
        #         sum_list.append(m_cast_dict[x])
        #     else:
        #         sum_list.append(0)
        # cast_score.append(sum(sum_list))

        # sum_list = []
        # for x in movie.get('director'):
        #     print(x)
        #     if x in m_director_dict:
        #         sum_list.append(m_director_dict[x])
        #     else:
        #         sum_list.append(0)
        # direc_score.append(sum(sum_list))
    
    # tv
    for tv in tvs:
        
        #print(movie)
        if tv.get('id') not in tv_id_list:
            contents_id.append(tv.get('id'))
            sepa.append(1)

            sum_list = []
            for x in tv.get('genres'):
                #print(x)
                if x in t_genre_dict:
                    sum_list.append(t_genre_dict[x])
                else:
                    sum_list.append(0)
            gen_score.append(sum(sum_list))

            sum_list = []
            for x in tv.get('keywords'):
                #print(x)
                if x in t_keyword_dict:
                    sum_list.append(t_keyword_dict[x])
                else:
                    sum_list.append(0)
            key_score.append(sum(sum_list))

            sum_list = []
            for x in tv.get('origin_country'):
                #print(x)
                if x in t_country_dict:
                    sum_list.append(t_country_dict[x])
                else:
                    sum_list.append(0)
            coun_score.append(sum(sum_list))

        # sum_list = []
        # for x in tv.get('cast')[:5]:
        #     print(x)
        #     if x in m_cast_dict:
        #         sum_list.append(m_cast_dict[x])
        #     else:
        #         sum_list.append(0)
        # cast_score.append(sum(sum_list))

        # sum_list = []
        # for x in tv.get('director'):
        #     print(x)
        #     if x in m_director_dict:
        #         sum_list.append(m_director_dict[x])
        #     else:
        #         sum_list.append(0)
        # direc_score.append(sum(sum_list))

    if os.path.isfile('score_board.csv'):
        pass
    else:
        with open('score_board.csv', 'w', newline='') as output_file:
            f = csv.writer(output_file)
            #f.writerow(["id","popularity", "genre_score", "country_score","keyword_score","total_score"]) "cast_score","director_score"
            f.writerow(["id", "genre_score","country_score", "keyword_score","type","total_score"])

    with open('score_board.csv', 'a', encoding='UTF-8', newline='') as output_file:

        f = csv.writer(output_file)

        for i in range(len(gen_score)):
            total_score = gen_score[i]*0.5 + coun_score[i]*0.3+key_score[i]*0.2 #+cast_score[i]+direc_score[i]

            #print(movie_id[i], gen_score[i], coun_score[i],key_score[i],total_score)

            f.writerow([contents_id[i], gen_score[i], coun_score[i], key_score[i],sepa[i] ,total_score])
            #f.writerow([pop[i], gen_score[i], coun_score[i], key_score[i],total_score])

    df = pd.read_csv("score_board.csv")
    df = df.sort_values(by=['total_score'], axis=0, ascending=False)
    print(df)
    df_reco = df[:10]
    reco_con = df_reco[['id','type']]
    recommend = []
    print(reco_con)
    for row in reco_con.iterrows():

        # 영화면      
        con_id = row[1]['id']
        if row[1]['type'] == 0:
            movie = Movie.query.filter(Movie.id==con_id).first()
            recommend.append(Movie.to_dict(movie))
        # tv면
        if row[1]['type'] == 1:
            tv = Tv.query.filter(Tv.id==con_id).first()
            recommend.append(Tv.to_dict(tv))

    os.remove('score_board.csv')


    return jsonify(recommend)
