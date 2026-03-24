from openai import AsyncOpenAI
import os
import re

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))


async def chat(messages: list[dict]) -> str:
    response = await client.chat.completions.create(
        model="gpt-4",
        messages=messages,
        max_tokens=2000
    )
    return response.choices[0].message.content


async def explain_code(code: str) -> str:
    response = await client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a code explainer. Explain the following code clearly and concisely."},
            {"role": "user", "content": f"Explain this code:\n\n{code}"}
        ],
        max_tokens=1000
    )
    return response.choices[0].message.content


async def refactor_code(code: str) -> str:
    response = await client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a code refactoring expert. Refactor the code to be more clean and efficient."},
            {"role": "user", "content": f"Refactor this code:\n\n{code}"}
        ],
        max_tokens=2000
    )
    return response.choices[0].message.content


async def generate_tests(code: str) -> str:
    response = await client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a testing expert. Generate comprehensive unit tests for the code."},
            {"role": "user", "content": f"Generate tests for:\n\n{code}"}
        ],
        max_tokens=2000
    )
    return response.choices[0].message.content


async def review_code(code: str, language: str) -> str:
    response = await client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": f"You are a code reviewer for {language}. Review the code and provide feedback on best practices, potential bugs, and improvements."},
            {"role": "user", "content": f"Review this {language} code:\n\n{code}"}
        ],
        max_tokens=1500
    )
    return response.choices[0].message.content
