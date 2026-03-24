from datetime import datetime, timedelta
from typing import Optional
import jwt
import bcrypt
from ..schemas.usuario import UsuarioCreate, UsuarioResponse

SECRET_KEY = "mi-secreto"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 15


class AuthService:
    def __init__(self):
        self.usuarios_db: dict[str, dict] = {}

    def register(self, usuario: UsuarioCreate) -> dict:
        if usuario.email in self.usuarios_db:
            raise ValueError("Email ya registrado")
        
        hashed = bcrypt.hashpw(usuario.password.encode(), bcrypt.gensalt())
        user_data = {
            "email": usuario.email,
            "nombre": usuario.nombre,
            "password": hashed.decode(),
            "rol": usuario.rol
        }
        self.usuarios_db[usuario.email] = user_data
        return {"success": True, "message": "Usuario registrado"}

    def authenticate(self, username: str, password: str) -> Optional[str]:
        if username not in self.usuarios_db:
            return None
        
        usuario = self.usuarios_db[username]
        if not bcrypt.checkpw(password.encode(), usuario["password"].encode()):
            return None
        
        return self.create_token({"sub": usuario["email"], "rol": usuario["rol"]})

    def create_token(self, data: dict) -> str:
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    def verify_token(self, token: str) -> dict:
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
            return payload
        except jwt.ExpiredSignatureError:
            raise ValueError("Token expirado")
        except jwt.InvalidTokenError:
            raise ValueError("Token inválido")

    def get_user(self, email: str) -> Optional[dict]:
        return self.usuarios_db.get(email)


auth_service = AuthService()