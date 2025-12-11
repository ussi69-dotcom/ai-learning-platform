# ⚡ Next.js: React Framework pro Produkci

> **Proč používáme Next.js?**  
> Protože React sám o sobě neřeší routing, SEO, ani server-side rendering - Next.js tohle všechno dělá za nás!

---

## Co je Next.js?

**Next.js** je **full-stack React framework** od Vercel. Bere React (knihovnu pro UI komponenty) a přidává vše potřebné pro reálnou webovou aplikaci: routing, server-side rendering, API routes, a optimalizace.

---

## 🎯 Vysvětlení pro laika

### React vs Next.js

| Čistý React | Next.js |
|-------------|---------|
| "Tady máš cihly" | "Tady máš hotový dům" |
| Musíš si sám nastavit routing | Routing podle složek |
| SEO problematické (SPA) | Server-side rendering |
| Bundling, optimalizace... ručně | Všechno automaticky |

### Analogie: Škoda vs Škoda s klimou, navigací, tempomatem

React je základní motor. Next.js je kompletní auto se vším vybavením.

---

## 🏗️ Jak to funguje v našem projektu

### Struktura App Router (Next.js 13+)

```
frontend/
├── app/
│   ├── [locale]/           # Dynamický routing pro jazyk (cs/en)
│   │   ├── page.tsx        # Hlavní stránka (/)
│   │   ├── about/
│   │   │   └── page.tsx    # About stránka (/about)
│   │   ├── courses/
│   │   │   └── [slug]/     # Dynamický kurz (/courses/prompt-engineering)
│   │   │       └── page.tsx
│   │   └── profile/
│   │       └── page.tsx    # Profil uživatele
│   ├── layout.tsx          # Root layout (wrapper)
│   └── globals.css         # Globální styly
├── components/             # Znovupoužitelné komponenty
│   ├── ui/                 # Shadcn/ui komponenty
│   └── ...
└── lib/                    # Utility funkce
```

### Routing = Složky

URL cesta přesně odpovídá struktuře složek:

| Složka | URL |
|--------|-----|
| `app/[locale]/page.tsx` | `/cs` nebo `/en` |
| `app/[locale]/about/page.tsx` | `/cs/about` |
| `app/[locale]/courses/[slug]/page.tsx` | `/cs/courses/prompt-engineering` |

### [locale] - Dynamický segment

`[locale]` zachytí část URL a předá ji jako parametr:
```tsx
export default function Page({ params }: { params: { locale: string } }) {
  // params.locale = "cs" nebo "en"
}
```

---

## ⚡ Klíčové koncepty

### 1. Server Components vs Client Components

```tsx
// Server Component (default) - běží na serveru
export default function Page() {
  // Může přímo přistupovat k databázi
  // Neodesílá JavaScript klientovi
  return <h1>Server rendered</h1>
}

// Client Component - běží v prohlížeči
"use client"  // ← MUSÍ být na prvním řádku!
export default function Counter() {
  const [count, setCount] = useState(0)  // useState = client only
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

**Pravidlo:** Pokud potřebuješ `useState`, `useEffect`, event handlery → přidej `"use client"`.

### 2. Layout

```tsx
// app/[locale]/layout.tsx
export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <Navbar />
        {children}  {/* ← sem se vkládá obsah stránky */}
        <Footer />
      </body>
    </html>
  )
}
```

Layout se **nerekonstruuje** při navigaci - jen `children` se mění.

### 3. Metadata (SEO)

```tsx
// app/[locale]/about/page.tsx
export const metadata = {
  title: "O nás | AI Learning Platform",
  description: "Naučte se AI s nejlepším edutainment přístupem."
}
```

---

## 🔧 Základní příkazy

### Development
```bash
cd frontend
npm run dev     # Spustí dev server na localhost:3000
```

### Build & Start
```bash
npm run build   # Vytvoří produkční build
npm run start   # Spustí produkční server
```

### Linting & Type Check
```bash
npm run lint    # ESLint kontrola
npm run verify  # TypeScript + ESLint + Build (náš custom script)
```

---

## 📋 Dev Workflow

### 1. Vytvoření nové stránky

```bash
# Vytvoř složku
mkdir -p frontend/app/[locale]/nova-stranka

# Vytvoř page.tsx
touch frontend/app/[locale]/nova-stranka/page.tsx
```

```tsx
// frontend/app/[locale]/nova-stranka/page.tsx
export default function NovaStranka() {
  return <h1>Nová stránka</h1>
}
```

Hotovo! URL: `/cs/nova-stranka` funguje automaticky.

### 2. Přidání komponenty

```tsx
// components/MojeKomponenta.tsx
"use client"  // pokud potřebuje interaktivitu

export default function MojeKomponenta() {
  return <div>...</div>
}
```

### 3. API volání

```tsx
"use client"

async function fetchData() {
  const res = await fetch('http://localhost:8000/api/lessons')
  return res.json()
}
```

---

## 🌍 Internacionalizace (i18n)

Používáme **next-intl** pro vícejazyčnost:

```tsx
import { useTranslations } from 'next-intl'

export default function AboutPage() {
  const t = useTranslations('About')
  
  return (
    <h1>{t('hero_title')}</h1>
    // Vrátí "Začni svou AI cestu" (cs) nebo "Start Your AI Journey" (en)
  )
}
```

Překlady jsou v:
- `frontend/messages/cs.json`
- `frontend/messages/en.json`

---

## 💡 Proč Next.js 14+ (App Router)?

### Výhody oproti Pages Router (starší verze)
| Pages Router | App Router ✅ |
|--------------|--------------|
| Všechno client-side | Server Components default |
| Větší bundle | Menší JS poslaný klientovi |
| `getServerSideProps` boilerplate | Přímé `async` komponenty |
| Nested layouts složité | Layouts jednoduše |

### Výhody oproti čistému React
- 🚀 Automatic code splitting
- 🖥️ Server-side rendering (SEO)
- 🔄 Hot reload
- 📦 Optimalizace obrázků
- 🛣️ File-based routing

---

## ⚠️ Časté chyby

### 1. Zapomenuté "use client"
```tsx
// ❌ Error: useState is not defined
export default function Page() {
  const [x, setX] = useState(0)
}

// ✅ Správně
"use client"
export default function Page() {
  const [x, setX] = useState(0)
}
```

### 2. Import server-only v client componentě
```tsx
"use client"
// ❌ Nefunguje - fs je server-only
import fs from 'fs'

// ✅ Data načítat přes API nebo Server Component
```

---

## 📚 Další zdroje

- [Next.js dokumentace](https://nextjs.org/docs)
- [App Router docs](https://nextjs.org/docs/app)
- [next-intl](https://next-intl-docs.vercel.app/)

---

*Vytvořeno: 2025-12-10*  
*Souvisí s: [ARCHITECTURE.md](file:///home/zimmel/ai-learning-platform/.ai-context/core/ARCHITECTURE.md)*
