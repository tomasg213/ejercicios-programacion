import os
import numpy as np
from typing import List, Dict, Tuple
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))


class Document:
    def __init__(self, id: str, title: str, content: str):
        self.id = id
        self.title = title
        self.content = content
        self.embedding = None


class VectorStore:
    def __init__(self):
        self.documents: List[Document] = []
    
    def add_document(self, doc: Document):
        self.documents.append(doc)
    
    def add_documents(self, documents: List[Dict]):
        for doc_data in documents:
            doc = Document(
                id=doc_data["id"],
                title=doc_data["title"],
                content=doc_data["content"]
            )
            self.documents.append(doc)
    
    def generate_embeddings(self, model: str = "text-embedding-3-small"):
        print("Generando embeddings...")
        for doc in self.documents:
            doc.embedding = self.get_embedding(doc.content, model)
            print(f"  - {doc.title}")
    
    def get_embedding(self, text: str, model: str = "text-embedding-3-small"):
        response = client.embeddings.create(input=text, model=model)
        return response.data[0].embedding
    
    @staticmethod
    def cosine_similarity(a, b) -> float:
        return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
    
    def retrieve(self, query: str, top_k: int = 3) -> List[Tuple[Document, float]]:
        query_embedding = self.get_embedding(query)
        
        similarities = []
        for doc in self.documents:
            if doc.embedding:
                sim = self.cosine_similarity(query_embedding, doc.embedding)
                similarities.append((doc, sim))
        
        similarities.sort(key=lambda x: x[1], reverse=True)
        return similarities[:top_k]


class RAGSystem:
    def __init__(self, vector_store: VectorStore):
        self.vector_store = vector_store
        self.system_prompt = """Eres un asistente de atención al cliente.
Responde la pregunta usando ÚNICAMENTE la información proporcionada en el contexto.
Si la respuesta no está en el contexto, indica que no tienes esa información."""
    
    def query(self, question: str, use_reranking: bool = False, top_k: int = 3) -> Tuple[str, List[Document]]:
        if use_reranking:
            relevant_docs = self._retrieve_with_reranking(question, top_k)
        else:
            results = self.vector_store.retrieve(question, top_k)
            relevant_docs = [d[0] for d in results]
        
        context = "\n\n".join([
            f"[{doc.title}]\n{doc.content}" 
            for doc in relevant_docs
        ])
        
        prompt = f"""{self.system_prompt}

Contexto:
{context}

Pregunta: {question}

Respuesta (en español):"""

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=500
        )
        
        return response.choices[0].message.content, relevant_docs
    
    def _retrieve_with_reranking(self, query: str, top_k: int) -> List[Document]:
        candidates = self.vector_store.retrieve(query, top_k * 2)
        return [c[0] for c in candidates[:top_k]]