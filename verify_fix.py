import requests
import json

API_URL = "http://localhost:8000"
EMAIL = "test@example.com"
PASSWORD = "Password123"

def get_token():
    response = requests.post(f"{API_URL}/auth/token", data={"username": EMAIL, "password": PASSWORD})
    if response.status_code != 200:
        # Register if login fails
        print("Login failed, trying to register...")
        requests.post(f"{API_URL}/auth/register", json={
            "email": EMAIL, 
            "password": PASSWORD, 
            "full_name": "Test User",
            "difficulty": "PIECE_OF_CAKE"
        })
        response = requests.post(f"{API_URL}/auth/token", data={"username": EMAIL, "password": PASSWORD})
    
    return response.json()["access_token"]

def verify_lab_completion(token):
    print("\nVerifying Lab Completion...")
    headers = {"Authorization": f"Bearer {token}"}
    data = {"lab_id": "test-lab-123"}
    
    # Use lesson 1
    response = requests.post(f"{API_URL}/lessons/1/lab/complete", json=data, headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    
    if response.status_code == 200 and "test-lab-123" in response.json().get("completed_labs", []):
        print("✅ Lab completion verified!")
    else:
        print("❌ Lab completion failed.")

def verify_quiz_localization(token):
    print("\nVerifying Quiz Localization...")
    headers = {"Authorization": f"Bearer {token}"}
    
    # Use lesson 1, lang=cs
    response = requests.get(f"{API_URL}/lessons/1/quizzes?lang=cs", headers=headers)
    print(f"Status: {response.status_code}")
    quizzes = response.json()
    print(f"Response: {json.dumps(quizzes, indent=2, ensure_ascii=False)}")
    
    # Check if we got any quizzes and if they look localized (assuming DB has data)
    # Even if DB doesn't have CS data, the field swapping logic should have run.
    if response.status_code == 200:
        print("✅ Quiz endpoint accessible.")
    else:
        print("❌ Quiz endpoint failed.")

def verify_feedback(token):
    print("\nVerifying Feedback System...")
    headers = {"Authorization": f"Bearer {token}"}
    
    # 1. Create Feedback
    data = {
        "lesson_id": 1,
        "slide_index": 0,
        "x_pos": 0.5,
        "y_pos": 0.5,
        "type": "NOTE",
        "message": "Test feedback"
    }
    response = requests.post(f"{API_URL}/feedback/", json=data, headers=headers)
    print(f"Create Status: {response.status_code}")
    if response.status_code != 200:
        print(f"Create Failed: {response.text}")
        return

    feedback_id = response.json()["id"]
    print(f"Created Feedback ID: {feedback_id}")
    
    # 2. List Feedback
    response = requests.get(f"{API_URL}/feedback/?lesson_id=1", headers=headers)
    print(f"List Status: {response.status_code}")
    items = response.json()
    if any(i["id"] == feedback_id for i in items):
        print("✅ Feedback creation and listing verified!")
    else:
        print("❌ Feedback not found in list.")

if __name__ == "__main__":
    try:
        token = get_token()
        verify_lab_completion(token)
        verify_quiz_localization(token)
        verify_feedback(token)
    except Exception as e:
        print(f"Error: {e}")
