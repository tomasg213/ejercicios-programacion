from fastapi import APIRouter
from app.models.schemas import ReviewRequest, ExplainRequest, RefactorRequest, TestRequest
from app.services import openai_service

router = APIRouter()


@router.post("")
async def review_code(request: ReviewRequest):
    result = await openai_service.review_code(request.code, request.language)
    return {"review": result}


@router.post("/explain")
async def explain_code(request: ExplainRequest):
    result = await openai_service.explain_code(request.code)
    return {"explanation": result}


@router.post("/refactor")
async def refactor_code(request: RefactorRequest):
    result = await openai_service.refactor_code(request.code)
    return {"refactored": result}


@router.post("/generate-test")
async def generate_tests(request: TestRequest):
    result = await openai_service.generate_tests(request.code)
    return {"tests": result}
