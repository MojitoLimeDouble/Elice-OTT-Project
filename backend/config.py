import os
from datetime import timedelta

BASE_DIR = os.path.dirname(__file__)

SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:비번명@127.0.0.1:디비명/potcha?charset=utf8mb4"
SQLALCHEMY_TRACK_MODIFICATIONS = 1
secret_key = 'asdasdasdasd'

JWT_SECRET_KEY = "super-secret"  
JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)