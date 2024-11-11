### What this project is about?
This project is a simple chatbot API built with FastAPI. The chatbot is designed to provide basic information about various subjects like Astronomy, Biology, Chemistry, Physics, and Mathematics, and can recognize common greetings and farewells. The chatbot includes a frontend hosted on Vercel and has CORS enabled to allow cross-origin requests from this specific domain.

I kept testing, simplicity and security in mind when developing.

Testing - Used Pytest to create unit tests.
Security - Didnt want to overdo security using authentication but used CORS to restrict allowed origins.

### How to run the project

1. Head over to https://fastapi.tiangolo.com/virtual-environments/#create-a-virtual-environment to create a virtual evironment where you will have your packages installed.
2. Activate the environment using `source .venv/bin/activate`
    - Ensure you're in the correct virtual environment (https://fastapi.tiangolo.com/virtual-environments/#check-the-virtual-environment-is-active)
3. Run `pip install -r requirements.txt` to install packages.
4. Run `fastapi dev main.py` to run the fastapi server.

### How to test the prject

Run `pytest test_main.py`
