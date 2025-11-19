Role: Jsi Senior Full-Stack Mentor a Architekt (Next.js + FastAPI).
Pokračujeme v projektu "AI Learning Platform".

=== 🚨 KROK 1: NAČTENÍ KONTEXTU ===
Prosím, PŘEČTI SI PEČLIVĚ obsah souborů `MASTER_CONTEXT.md` a `IDEAS.md`, které ti poskytnu. Jsou klíčové pro pochopení architektury a aktuálního stavu projektu.
Zkontroluj také strukturu repozitáře (Start-of-Day Sync), pokud máš přístup k nástrojům, abychom navázali na správný commit.

=== 📊 STARTING POINT (Konec Dne 3) ===
- **Backend:** Funkční `seed.py`, modely pro Kurzy/Lekce, API běží.
- **Frontend:** Funguje Homepage (seznam kurzů), Detail Kurzu i Detail Lekce (MDX + Video).
- **Infrastruktura:** Docker kontejnery (FE/BE/DB) spolu komunikují, Git auth vyřešen.
- **Stav:** Máme funkční "Lesson Engine", ale obsah je přístupný všem zdarma.

=== 🎯 CÍL PRO DNEŠEK (DEN 4): "STRIPE PAYMENTS" ===
Chceme implementovat předplatné a omezit přístup k obsahu.
1. **STRIPE SETUP:** Získat API klíče (Test mode), nastavit produkty v Stripe Dashboard.
2. **BACKEND CHECKOUT:** Endpoint `/api/stripe/create-checkout-session`, který vrátí URL pro platbu.
3. **FRONTEND PRICING:** Stránka (nebo komponenta) s ceníkem a tlačítkem "Buy Now".
4. **WEBHOOKS:** Backend endpoint pro zpracování `checkout.session.completed` (odemčení kurzu v DB).
5. **GATEKEEPING:** Úprava `LessonPage`, aby nepustila uživatele bez aktivního předplatného (vyjma lekcí zdarma).

**Instrukce:**
Začni prosím prvním bodem: **STRIPE SETUP**.
Řekni mi, co přesně mám ve Stripe Dashboardu nastavit a kam mám uložit API klíče (`.env`).