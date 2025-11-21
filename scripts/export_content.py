import os

CONTENT_DIR = "content"
OUTPUT_FILE = "CURRENT_CONTENT.md"

def export_content():
    with open(OUTPUT_FILE, "w", encoding="utf-8") as outfile:
        outfile.write("# CURRENT CONTENT DUMP\n\n")
        
        for root, dirs, files in os.walk(CONTENT_DIR):
            # Seřadíme soubory a složky pro čitelnost
            dirs.sort()
            files.sort()
            
            for file in files:
                if file.endswith((".mdx", ".json")):
                    path = os.path.join(root, file)
                    rel_path = os.path.relpath(path, start=".")
                    
                    outfile.write(f"--- FILE: {rel_path} ---\n")
                    outfile.write("```\n")
                    
                    try:
                        with open(path, "r", encoding="utf-8") as infile:
                            outfile.write(infile.read())
                    except Exception as e:
                        outfile.write(f"Error reading file: {e}")
                        
                    outfile.write("\n```\n\n")
                    print(f"Exported: {rel_path}")

if __name__ == "__main__":
    if os.path.exists(CONTENT_DIR):
        export_content()
        print(f"✅ Content exported to {OUTPUT_FILE}")
    else:
        print(f"❌ Directory {CONTENT_DIR} not found!")
