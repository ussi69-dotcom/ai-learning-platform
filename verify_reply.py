import requests
import sys

API_URL = "http://localhost:8000"
ADMIN_EMAIL = "admin@ai-platform.com"
ADMIN_PASS = "admin123"

def verify():
    # 1. Login
    print("Logging in...")
    resp = requests.post(f"{API_URL}/auth/token", data={"username": ADMIN_EMAIL, "password": ADMIN_PASS})
    if resp.status_code != 200:
        print(f"Login failed: {resp.text}")
        sys.exit(1)
    token = resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    print("Login successful.")

    # 2. Get Feedback
    print("Fetching feedback...")
    resp = requests.get(f"{API_URL}/feedback", headers=headers)
    if resp.status_code != 200:
        print(f"Get feedback failed: {resp.text}")
        sys.exit(1)
    items = resp.json()
    if not items:
        print("No feedback items found. Creating one...")
        # Create dummy feedback
        data = {
            "lesson_id": None,
            "slide_index": None,
            "x_pos": 0.5,
            "y_pos": 0.5,
            "type": "NOTE",
            "message": "Test feedback for reply verification"
        }
        resp = requests.post(f"{API_URL}/feedback", json=data, headers=headers)
        if resp.status_code != 201:
             print(f"Create feedback failed: {resp.text}")
             sys.exit(1)
        parent_id = resp.json()["id"]
    else:
        parent_id = items[0]["id"]
    
    print(f"Using parent feedback ID: {parent_id}")

    # 3. Reply
    print("Sending reply...")
    reply_data = {
        "lesson_id": None,
        "slide_index": None,
        "x_pos": 0.5,
        "y_pos": 0.5,
        "type": "NOTE",
        "message": "This is a verification reply",
        "parent_id": parent_id
    }
    # Note: The endpoint is /feedback/{id}/reply
    # And it expects the body to contain lesson_id etc.
    resp = requests.post(f"{API_URL}/feedback/{parent_id}/reply", json=reply_data, headers=headers)
    
    if resp.status_code == 201:
        print("Reply successful!")
        print(resp.json())
    else:
        print(f"Reply failed with status {resp.status_code}")
        print(resp.text)
        sys.exit(1)

if __name__ == "__main__":
    verify()
