from flask import Flask, request, jsonify
from db_connect import db
from flask_migrate import Migrate
from models import *
from flask_cors import CORS
from flask_jwt_extended import *

import config

def create_app():
    app = Flask(__name__)
    jwt = JWTManager(app)
    CORS(app)
    
    app.config.from_object(config)    

    db.init_app(app)
    Migrate().init_app(app, db)


    from views import user, main, tv_list, movie_list, mypage, detail, like, potato_basket
    app.register_blueprint(user.bp)
    app.register_blueprint(main.bp)
    app.register_blueprint(tv_list.bp)
    app.register_blueprint(movie_list.bp)
    app.register_blueprint(mypage.bp)
    app.register_blueprint(detail.bp)
    app.register_blueprint(like.bp)
    app.register_blueprint(potato_basket.bp)

    return app


if __name__ == '__main__':
    create_app().run('127.0.0.1', 5000, debug=True)