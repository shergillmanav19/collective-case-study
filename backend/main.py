from fastapi import FastAPI
from pydantic import BaseModel
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://collective-case-study-fe.vercel.app"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

predefined_responses = {
    # Greetings
    "hello": "Hi there! Welcome to the study chatbot. Type Astronomy, Biology, Chemistry, Physics, or Mathematics to learn more about them.",
    "hi": "Hi there! Welcome to the study chatbot. Type Astronomy, Biology, Chemistry, Physics, or Mathematics to learn more about them.",
    "hey": "Hi there! Welcome to the study chatbot. Type Astronomy, Biology, Chemistry, Physics, or Mathematics to learn more about them.",

    # Subjects
    "Astronomy": "Astronomy is the study of celestial objects, space, and the universe as a whole. It includes the observation and analysis of planets, stars, galaxies, and other astronomical phenomena.",
    "Biology": "Biology is the study of life and living organisms. It includes the study of their structure, function, growth, evolution, distribution, and taxonomy.",
    "Chemistry": "Chemistry is the study of matter, its properties, how and why substances combine or separate to form other substances, and how substances interact with energy.",
    "Physics": "Physics is the study of matter, energy, and the fundamental forces of nature. It includes the study of motion, forces, energy, heat, light, sound, electricity, magnetism, and the structure of atoms.",
    "Mathematics": "Mathematics is the study of numbers, quantities, and shapes. It includes arithmetic, algebra, geometry, calculus, statistics, and other branches of mathematics.",

    # Farewells
    "goodbye": "Goodbye! Have a great day!",
    "bye": "Goodbye! Have a great day!",
    "exit": "Goodbye! Have a great day!",
    "quit": "Goodbye! Have a great day!"
}

fallback_response = "I'm sorry, I don't understand that yet. Please type Astronomy, Biology, Chemistry, Physics, or Mathematics to learn more about them."

class ChatMessage(BaseModel):
    message: str

@app.get("/api/health")
def health_check():
    return {"status": "ok"}

@app.post("/api/chat")
def chat_endpoint(chat_message: ChatMessage):
    user_message = chat_message.message.lower()
    response = fallback_response
    
    for keyword, reply in predefined_responses.items():
        if keyword in user_message:
            response = reply
            break
    return {"response": response, "error": None}
