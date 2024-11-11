import pytest
from fastapi.testclient import TestClient
from main import app  # Ensure this path matches where the app is defined

client = TestClient(app)

# Test predefined responses for greetings, subjects, and farewells
@pytest.mark.parametrize("input_message,expected_response", [
    ("hello", "Hi there! Welcome to the study chatbot. Type Astronomy, Biology, Chemistry, Physics, or Mathematics to learn more about them."),
    ("biology", "Biology is the study of life and living organisms. It includes the study of their structure, function, growth, evolution, distribution, and taxonomy."),
    ("goodbye", "Goodbye! Have a great day!"),
])

def test_predefined_responses(input_message, expected_response):
    response = client.post("/api/chat", json={"message": input_message})
    assert response.status_code == 200
    assert response.json()["response"] == expected_response
    assert response.json()["error"] is None

# Test fallback response for unknown messages
def test_fallback_response():
    response = client.post("/api/chat", json={"message": "unknown message"})
    assert response.status_code == 200
    assert response.json()["response"] == "I'm sorry, I don't understand that yet. Please type Astronomy, Biology, Chemistry, Physics, or Mathematics to learn more about them."
    assert response.json()["error"] is None

# Test case sensitivity
def test_case_insensitivity():
    response = client.post("/api/chat", json={"message": "HELLO"})
    assert response.status_code == 200
    assert response.json()["response"] == "Hi there! Welcome to the study chatbot. Type Astronomy, Biology, Chemistry, Physics, or Mathematics to learn more about them."
    assert response.json()["error"] is None

# Test health check endpoint
def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}
