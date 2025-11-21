# 🎨 AI Learning Platform - Content & Design Guidelines

    ## 1. Visual Philosophy: "Liquid Glass" 💧
    Our UI mimics a premium, futuristic interface. Content floats on glass panels.
    * **Glass Effect:** Use `bg-background/60` (or `white/5` in dark mode) + `backdrop-blur-xl` + `border-white/10`.
    * **No Solid Cards:** Avoid fully opaque backgrounds that hide the app wallpaper.
    * **Typography:** Crisp, high-contrast text. Headings should be prominent.

    ## 2. Asset Policy: "Educational or Nothing" 🚫
    * **FORBIDDEN:**
        * Generic stock photos (3D robots, glowing brains, matrix rain).
        * "Decorative" images that add no information.
    * **ALLOWED:**
        * **Diagrams:** Mermaid.js flowcharts or clean SVGs (simple shapes).
        * **Screenshots:** Real UI screenshots if explaining a tool.
    * **Rule of Thumb:** If you can't generate a perfect diagram, use **NO IMAGE**. Text and typography are beautiful enough.

    ## 3. Interactive Elements 🧩
    * **Code Blocks:** Must be Dark Glass (`bg-slate-950/80`) with a functional **Copy Button**.
    * **Callouts:** Glass panels with colored accent borders (Blue=Info, Amber=Warning). Never use solid alert colors.
    * **Quiz:** The entire quiz container must be a Glass Panel.

    ## 4. Mobile Navigation (Sticky Footer) 📱
    * **Requirement:** On mobile (< md), navigation buttons MUST be in a fixed bottom bar (`fixed bottom-0`).
    * **Layout:**
        * [Left]: Previous Slide (Ghost Icon)
        * [Center]: Progress Indicator (Text or Bar)
        * [Right]: Next Slide (Primary Icon)
    * **Logic:** "Next Lesson" button only appears on the very last slide.