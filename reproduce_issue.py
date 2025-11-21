import requests
import json

API_URL = "http://localhost:8000"

def test_register():
    email = "ussi2@seznam.cz"
    password = "password123"
    payload = {
        "email": email,
        "password": password,
        "difficulty": "LETS_ROCK",
        "is_active": True
    }
    
    print(f"Attempting to register {email}...")
    try:
        response = requests.post(f"{API_URL}/auth/register", json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_register()
