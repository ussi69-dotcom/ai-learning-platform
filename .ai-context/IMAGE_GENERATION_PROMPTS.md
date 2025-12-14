# Course Image Generation Prompts

## Current Status
| Course ID | Slug | Light | Dark | Status |
|-----------|------|-------|------|--------|
| 3 | ai-basics-beginner | X-Wing | - | ✅ Has `ai-basics-course-cover_light.jpg` |
| 4 | practical-prompt-engineering | Falcon | Slave I | ✅ Has both variants |
| 2 | advanced-ai-techniques | **NEEDED** | **NEEDED** | ❌ Using SVG fallback |
| 1 | ai-engineering-deep-dive | **NEEDED** | **NEEDED** | ❌ Using SVG fallback |

## Style Reference
All images should match existing course covers:
- **Material:** Glassy/crystalline transparent with internal glow
- **Background:** Pure white (#FFFFFF) or transparent for seamless website blend
- **Lighting:** Soft ambient with neon edge highlights
- **Render style:** 3D, high detail, clean edges
- **Size:** Square or 4:3, minimum 1024x1024px

---

## Course 2: Advanced AI Techniques (NEEDED)

### Light Mode (advanced-ai-techniques_light.png)
```
Glassy transparent Nebulon-B Frigate spaceship from Star Wars, crystalline material with cyan and blue neon internal glow, clean white background, 3D render, high detail, soft ambient lighting, the ship appears to be made of glass or ice with light refracting through it, medical frigate variant, elegant elongated design, no text, product photography style
```

### Dark Mode (advanced-ai-techniques_dark.png)
```
Glassy transparent Imperial Lambda-class Shuttle from Star Wars, crystalline material with purple and magenta neon internal glow, clean white background, 3D render, high detail, the ship appears to be made of dark crystal with purple light refracting through it, wings folded down in landing position, menacing elegant design, no text, product photography style
```

---

## Course 1: AI Engineering Deep Dive (NEEDED)

### Light Mode (ai-engineering-deep-dive_light.png)
```
Glassy transparent Mon Calamari Star Cruiser from Star Wars, crystalline material with cyan and teal neon internal glow, clean white background, 3D render, high detail, organic curved hull design, the ship appears to be made of translucent ice-like material with blue light emanating from within, massive capital ship, no text, product photography style, similar angle to Millennium Falcon reference
```

### Dark Mode (ai-engineering-deep-dive_dark.png)
```
Glassy transparent Imperial Star Destroyer from Star Wars, crystalline material with red and purple neon internal glow, clean white background, 3D render, high detail, the iconic triangular shape appears to be made of dark crystal with crimson light refracting through it, imposing capital ship, bridge tower visible, no text, product photography style
```

---

## Ship Progression Logic (by difficulty)
| Difficulty | Course | Light Side Ship | Dark Side Ship |
|------------|--------|-----------------|----------------|
| Beginner | AI Basics (ID 3) | X-Wing | - |
| Intermediate | Prompt Eng (ID 4) | Millennium Falcon | Slave I |
| Advanced | Advanced AI (ID 2) | Nebulon-B Frigate | Lambda Shuttle |
| Expert | Deep Dive (ID 1) | Mon Calamari Cruiser | Star Destroyer |

## Generation Tips
1. Use DALL-E 3 or Midjourney v6 for best results
2. Add `--no background` in Midjourney for transparency
3. If background isn't pure white, use remove.bg or Photoshop
4. Resize to match existing images (~1400x1400px)
5. Save as PNG with transparency or JPG with white background

## File Naming Convention
- `[course-slug]_light.png` - Light mode version
- `[course-slug]_dark.png` - Dark mode version

**Place files in:** `frontend/public/images/`

## After Adding Images
The CourseIcon component will automatically detect and use them based on slug match.
No code changes needed - just add the files with correct names.
