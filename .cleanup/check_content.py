import requests
import sys

try:
    # ID 4 je obvykle "Your First Prompt" v Beginner kurzu, ale pro jistotu najdeme lekci podle nazvu
    print("🔍 Fetching lessons...")
    response = requests.get("http://localhost:8000/lessons/")
    lessons = response.json()
    
    target_lesson = next((l for l in lessons if "Your First Prompt" in l['title']), None)
    
    if not target_lesson:
        print("❌ Lesson 'Your First Prompt' not found!")
        sys.exit(1)

    print(f"✅ Found lesson: {target_lesson['title']} (ID: {target_lesson['id']})")
    
    # Fetch full content
    # Note: The list endpoint might not return full content depending on schema, 
    # let's fetch detail.
    detail = requests.get(f"http://localhost:8000/lessons/{target_lesson['id']}")
    content = detail.json().get('content', '')
    
    print("\n--- CONTENT CHECK ---")
    if "<LabComplete" in content:
        print("✅ SUCCESS: Found <LabComplete> tag in content.")
        count = content.count("<LabComplete")
        print(f"📊 Count: {count} occurrences.")
        
        # Print snippet
        start = content.find("<LabComplete")
        print(f"📝 Snippet: ...{content[start:start+50]}...")
    else:
        print("❌ FAILURE: <LabComplete> tag NOT found in content.")
        print("   The database still has the old version.")

except Exception as e:
    print(f"❌ Error: {e}")
