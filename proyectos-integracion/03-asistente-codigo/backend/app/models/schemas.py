from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class MessageCreate(BaseModel):
    session_id: str
    content: str
    role: str = "user"
    code_snippet: Optional[str] = None


class Message(BaseModel):
    id: int
    session_id: str
    role: str
    content: str
    code_snippet: Optional[str]
    timestamp: datetime


class ChatRequest(BaseModel):
    message: str
    code: Optional[str] = None
    session_id: Optional[str] = "default"


class AnalyzeRequest(BaseModel):
    code: str
    language: str = "javascript"


class ReviewRequest(BaseModel):
    code: str
    language: str = "javascript"


class ExplainRequest(BaseModel):
    code: str


class RefactorRequest(BaseModel):
    code: str


class TestRequest(BaseModel):
    code: str
