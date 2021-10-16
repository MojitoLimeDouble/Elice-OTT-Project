from werkzeug.exceptions import abort
from flask import request, Blueprint, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import *
from models import *
from werkzeug.utils import secure_filename
import random
import os, requests, csv, json
import pandas as pd


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
    user_id = get_jwt_identity()
    if request.method == 'PATCH':
        data = request.files['file']
        if not data:
            abort(404, '파일이 존재하지 않습니다.')

        file_location = './static/image/' + str(random.random()) + str(secure_filename(data.filename))
        data.save(file_location)
        
        User.query.filter_by(id=user_id).update({'photolink':file_location})

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

        if user:
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
    
    friend_list = Friend.query.filter(Friend.user_id == user_id).all()
    potato_list = Potato_Basket.query.filter(Potato_Basket.user_id == user_id).all()
    user = User.query.filter(User.id == user_id).first()

    for friend in friend_list:
        db.session.delete(friend)
        db.session.commit()
    for potato in potato_list:
        if potato.movie_id:
            movie = Movie.query.filter(Movie.id == potato.movie_id).first()
            movie.like_count -= 1
            db.session.delete(potato)
            db.session.commit()
        if potato.tv_id:
            tv = Tv.query.filter(Tv.id == potato.tv_id).first()
            tv.like_count -= 1
            db.session.delete(potato)
            db.session.commit()

    db.session.delete(user)

    try:
        db.session.commit()
        return jsonify({'result': 'success'})

    except Exception as e:
        db.session.rollback()
        abort(400,{'error': 'str(e)'} )


@bp.route('/mypage/recommend', methods=['GET'])
@jwt_required()
def potato_basket_recommend():

    user_id = get_jwt_identity()
    user = User.query.filter(User.id==user_id).first()
    nickname = user.nickname
    url_movie = "http://127.0.0.1:5000/api/potato_basket/%s/movie" %nickname
    url_tv = "http://127.0.0.1:5000/api/potato_basket/%s/tv" %nickname

    # 추천 콘텐츠 리스트
    recommend = []

    # 새로운 채점표 생성
    m_genre_dict = {}
    t_genre_dict = {}
    m_country_dict = {}
    t_country_dict = {}
    m_keyword_dict = {}
    t_keyword_dict = {}
    # m_cast_dict = {}
    # t_cast_dict = {}
    # m_director_dict = {}
    # t_director_dict = {}

    # 찜한 콘텐츠 분석 데이터 받기
    response_movie = requests.get(url_movie)
    response_tv = requests.get(url_tv)

    print(response_movie)


    movie_genres = response_movie.json()['genres']
    tv_genres = response_tv.json()['genres']

    if movie_genres == [] and tv_genres == []:
        abort(400,"분석할 감자 바구니가 없습니다.")

    movie_keywords = response_movie.json()['keywords']
    tv_keywords = response_tv.json()['keywords']
    movie_country = response_movie.json()['country']
    tv_country = response_tv.json()['country']
    # movie_cast = response_movie.json()['cast']
    # tv_cast = response_tv.json()['cast']
    # movie_director = response_movie.json()['director']
    # tv_director = response_tv.json()['director']
    
    # 채점표 초기 설정
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
    # cast_score = []
    # direc_score = []
    
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
