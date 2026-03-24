import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///default.db')
    REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
