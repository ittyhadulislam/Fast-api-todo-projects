import bcrypt
import jwt
import datetime

# DB Connection String

# MS SQL
# DATABASE_CONNECTION_URL = "mssql+aioodbc://sa:azmain@localhost:1433/TodoDb?driver=ODBC+Driver+17+for+SQL+Server"

# Postgresql
DATABASE_CONNECTION_URL = (
    "postgresql+asyncpg://postgres:azmain@host.docker.internal:5432/todo_db"
)

# Token encode and decode
SECRET_KEY = "szF1/soeqrEPDV3ujsCpQ43JqQ0IhfWjDP3+fVF4KR4="
ALGORITHM = "HS256"


# Decode And Encode
def encode_token(user_id: str, email: str):
    exp = datetime.datetime.now() + datetime.timedelta(hours=24)
    payload = {"user_id": user_id, "email": email, "exp": exp}
    token = jwt.encode(payload, SECRET_KEY, ALGORITHM)
    return token


def decode_token(token: str):
    data = jwt.decode(token, SECRET_KEY, ALGORITHM)
    return data


# Password Hashing and Verify
def hash_password(password: str):
    salt = bcrypt.gensalt()
    hashed_pass = bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")
    return hashed_pass


def verify_password(password: str, hashed_password: str):
    result = bcrypt.checkpw(password.encode("utf-8"), hashed_password.encode("utf-8"))
    return result
