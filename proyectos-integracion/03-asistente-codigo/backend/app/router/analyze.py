from fastapi import APIRouter
from app.models.schemas import AnalyzeRequest
from app.services import analysis_service

router = APIRouter()


@router.post("")
async def analyze_code(request: AnalyzeRequest):
    result = await analysis_service.analyze(request.code, request.language)
    return result


@router.post("/performance")
async def analyze_performance(request: AnalyzeRequest):
    result = await analysis_service.analyze_performance(request.code, request.language)
    return result


@router.post("/security")
async def analyze_security(request: AnalyzeRequest):
    result = await analysis_service.analyze_security(request.code, request.language)
    return result
