from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from ..schemas.usuario import UsuarioCreate, UsuarioResponse, Token
from ..services.auth import auth_service
from ..dependencies.auth import get_current_user

router = APIRouter(prefix="/auth", tags=["autenticación"])


@router.post("/register")
def register(usuario: UsuarioCreate):
    try:
        return auth_service.register(usuario)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/token", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    token = auth_service.authenticate(form_data.username, form_data.password)
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales inválidas"
        )
    return {"access_token": token, "token_type": "bearer"}


@router.get("/perfil")
def perfil(current_user: dict = Depends(get_current_user)):
    return {"success": True, "data": current_user}