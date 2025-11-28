import urllib.request
import urllib.parse
import json
import sys
import time

BASE_URL = "http://localhost:8000"
LOGIN_URL = f"{BASE_URL}/auth/token"
SANDBOX_URL = f"{BASE_URL}/sandbox/execute"

def login():
    data = urllib.parse.urlencode({
        "username": "admin@ai-platform.com",
        "password": "admin123"
    }).encode()
    req = urllib.request.Request(LOGIN_URL, data=data, method="POST")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")
    
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read())["access_token"]
    except Exception as e:
        print(f"Login failed. Is backend running? {e}")
        sys.exit(1)

def run_code(token, code):
    data = json.dumps({"code": code, "language": "python"}).encode()
    req = urllib.request.Request(SANDBOX_URL, data=data, method="POST")
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("Content-Type", "application/json")
    
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read())
    except urllib.error.HTTPError as e:
        print(f"HTTP Error: {e.code} {e.read().decode()}")
        return None
    except Exception as e:
        print(f"Error: {e}")
        return None

print("--- SANDBOX TEST SCRIPT ---")
print("1. Logging in...")
token = login()
print("   Success.")

print("\n2. Testing Normal Execution ('print(1+1)')...")
start = time.time()
res = run_code(token, "print(1+1)")
print(f"   Time: {time.time() - start:.2f}s")
print(f"   Result: {res}")

print("\n3. Testing Timeout/Infinite Loop ('while True: pass')...")
start = time.time()
res = run_code(token, "while True: pass")
print(f"   Time: {time.time() - start:.2f}s")
print(f"   Result: {res}")
