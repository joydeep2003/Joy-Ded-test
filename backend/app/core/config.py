import os

class Settings:
    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@db:5432/taskflow")
    JWT_SECRET = os.getenv(
        "JWT_SECRET",
        "supersecretkeythatismorethan32characterslong"  # ✅ FIXED
    )
    JWT_ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_HOURS = 24

settings = Settings()