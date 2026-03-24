import re
import os
from openai import AsyncOpenAI

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))


async def analyze(code: str, language: str) -> dict:
    issues = []
    suggestions = []
    
    if "var " in code and language == "javascript":
        issues.append({"type": "warning", "message": "Use 'let' or 'const' instead of 'var'"})
    
    if re.search(r"console\.log", code):
        suggestions.append("Remove console.log statements in production code")
    
    if len(code.split('\n')) > 100:
        suggestions.append("Consider breaking down into smaller functions")
    
    if "==" in code or "!=" in code:
        issues.append({"type": "warning", "message": "Use === or !== for strict comparison"})
    
    lines = len(code.split('\n'))
    functions = len(re.findall(r"function\s+\w+|const\s+\w+\s*=|def\s+\w+", code))
    
    metrics = {
        "lines": lines,
        "functions": functions,
        "estimatedComplexity": "medium" if functions > 5 else "low"
    }
    
    return {
        "issues": issues,
        "suggestions": suggestions,
        "metrics": metrics
    }


async def analyze_performance(code: str, language: str) -> dict:
    suggestions = []
    
    if re.search(r"\.forEach\(", code):
        suggestions.append("Consider using for...of for better performance")
    
    if re.search(r"JSON\.parse\(.+\.stringify", code):
        suggestions.append("Avoid unnecessary stringify/parse cycles")
    
    if language in ["javascript", "typescript"]:
        if "document.getElementById" in code or "document.querySelector" in code:
            suggestions.append("Cache DOM queries for reuse")
    
    return {"suggestions": suggestions, "type": "performance"}


async def analyze_security(code: str, language: str) -> dict:
    issues = []
    suggestions = []
    
    if re.search(r"eval\s*\(", code):
        issues.append({"severity": "high", "message": "Avoid eval() - security risk"})
    
    if re.search(r"innerHTML\s*=", code):
        issues.append({"severity": "medium", "message": "Use textContent instead of innerHTML to prevent XSS"})
    
    if re.search(r"password|secret|api[_-]?key", code, re.IGNORECASE):
        suggestions.append("Ensure sensitive data is not hardcoded")
    
    return {"issues": issues, "suggestions": suggestions, "type": "security"}
