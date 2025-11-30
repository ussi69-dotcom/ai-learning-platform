import requests
import uuid
import time

# Configuration
BASE_URL = "http://localhost:8000"
EMAIL = f"test_xp_{uuid.uuid4()}@example.com"
PASSWORD = "Password123!"

def print_step(msg):
    print(f"\n[STEP] {msg}")

def run_verification():
    session = requests.Session()

    # 1. Register
    print_step(f"Registering user {EMAIL}...")
    res = session.post(f"{BASE_URL}/auth/register", json={
        "email": EMAIL,
        "password": PASSWORD,
        "difficulty": "PIECE_OF_CAKE",
        "avatar": "default"
    })
    if res.status_code != 200:
        print(f"Registration failed: {res.text}")
        return
    print("Registration successful.")

    # Manual Verification via Docker
    import subprocess
    print_step("Manually verifying user via Docker...")
    subprocess.run([
        "docker", "exec", "ai-db", "psql", "-U", "postgres", "-d", "ai_platform_db", 
        "-c", f"UPDATE users SET is_verified = true WHERE email = '{EMAIL}';"
    ], check=True)
    print("User verified.")

    # 2. Login
    print_step("Logging in...")
    res = session.post(f"{BASE_URL}/auth/token", data={
        "username": EMAIL,
        "password": PASSWORD
    })
    if res.status_code != 200:
        print(f"Login failed: {res.text}")
        return
    token = res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}
    print("Login successful.")

    # 3. Get Initial XP
    print_step("Checking initial XP...")
    res = session.get(f"{BASE_URL}/users/me", headers=headers)
    user_data = res.json()
    initial_xp = user_data["xp"]
    print(f"Initial XP: {initial_xp}")

    # 4. Complete Lesson 1
    # First, ensure lesson 1 exists (or any lesson)
    res = session.get(f"{BASE_URL}/lessons/", headers=headers)
    lessons = res.json()
    if not lessons:
        print("No lessons found!")
        return
    lesson_id = lessons[0]["id"]
    print(f"Targeting Lesson ID: {lesson_id}")

    print_step(f"Completing Lesson {lesson_id}...")
    res = session.post(f"{BASE_URL}/lessons/{lesson_id}/complete", headers=headers)
    if res.status_code != 200:
        print(f"Completion failed: {res.text}")
        return
    
    completion_data = res.json()
    print(f"Completion Response: {completion_data}")
    
    # 5. Verify XP via API (users/me)
    print_step("Verifying XP via /users/me...")
    res = session.get(f"{BASE_URL}/users/me", headers=headers)
    updated_user_data = res.json()
    new_xp = updated_user_data["xp"]
    print(f"New XP: {new_xp}")

    if new_xp == initial_xp + 50:
        print("\n✅ SUCCESS: XP updated correctly in backend.")
    else:
        print(f"\n❌ FAILURE: XP did not update. Expected {initial_xp + 50}, got {new_xp}")

    # 6. Check Quiz Localization
    print_step("Checking Quiz Localization (lang=cs)...")
    res = session.get(f"{BASE_URL}/lessons/{lesson_id}/quizzes?lang=cs", headers=headers)
    if res.status_code == 200:
        quizzes = res.json()
        if quizzes and "otázka" in str(quizzes).lower() or "co je" in str(quizzes).lower(): # Simple check for Czech words
             print(f"✅ SUCCESS: Quizzes returned in Czech. Sample: {str(quizzes)[:100]}...")
        else:
             print(f"⚠️ WARNING: Quizzes might not be in Czech. Sample: {str(quizzes)[:100]}...")
    else:
        print(f"❌ FAILURE: Failed to fetch quizzes. Status: {res.status_code}")

if __name__ == "__main__":
    try:
        run_verification()
    except Exception as e:
        print(f"An error occurred: {e}")
