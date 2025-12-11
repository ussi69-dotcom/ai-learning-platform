# 🎨 Tailwind CSS: Utility-First CSS Framework

> **Proč používáme Tailwind?**  
> Protože psát `.my-button { padding: 1rem; background: blue; }` pro každý element je pomalé a nekonzistentní!

---

## Co je Tailwind CSS?

**Tailwind CSS** je **utility-first CSS framework** - místo psaní vlastních CSS tříd použiješ předpřipravené "stavební bloky" přímo v HTML. Je to jako LEGO pro stylování.

---

## 🎯 Vysvětlení pro laika

### Tradiční CSS vs Tailwind

| Tradiční CSS | Tailwind |
|--------------|----------|
| Napiš CSS třídu v souboru | Použij třídy přímo v HTML |
| `.button { padding: 1rem; }` | `class="p-4"` |
| Vymýšlíš názvy tříd | Názvy jsou standardizované |
| Soubory CSS rostou | Jen použité utility se kompilují |

### Analogie: Malíř vs LEGO

**Tradiční CSS** = malíř s paletou. Pro každou barvu míchá odstíny od nuly.

**Tailwind** = LEGO kostky. Standardní kusy, které skládáš podle potřeby. Chceš modrou 8-kostku? Vezmi ji z krabice.

---

## 🏗️ Jak to funguje v našem projektu

### Příklad komponenty

```tsx
// Tradiční přístup
<button className="submit-button">Odeslat</button>

// styles.css
.submit-button {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.375rem;
}

// Tailwind přístup ✅
<button className="px-4 py-2 bg-blue-500 text-white rounded-md">
  Odeslat
</button>
```

### Reálný příklad z projektu

```tsx
// components/ui/Button.tsx
<button
  className="
    inline-flex items-center justify-center
    rounded-md text-sm font-medium
    bg-primary text-primary-foreground
    hover:bg-primary/90
    h-10 px-4 py-2
    transition-colors
  "
>
  {children}
</button>
```

---

## ⚡ Základní utility třídy

### Spacing (Padding & Margin)
```
p-4    = padding: 1rem (16px)
m-2    = margin: 0.5rem (8px)
px-4   = padding-left + right
py-2   = padding-top + bottom
mt-4   = margin-top
ml-auto = margin-left: auto (pro zarovnání vpravo)
```

### Barvy
```
bg-blue-500     = background modrá
text-white      = barva textu bílá
bg-primary      = náš definovaný primary color
text-muted-foreground = tlumená barva textu
```

### Velikost & Layout
```
w-full      = width: 100%
h-10        = height: 2.5rem
max-w-md    = max-width: medium
flex        = display: flex
grid        = display: grid
gap-4       = gap: 1rem
```

### Typografie
```
text-sm     = font-size small
text-xl     = font-size extra large
font-bold   = font-weight: bold
leading-relaxed = line-height: 1.625
```

### Responsive Design
```
md:flex     = flex jen na medium+ screenech
lg:text-xl  = větší text na large+ screenech
```

---

## 📋 Pracovní vzory

### 1. Flexbox layout
```tsx
<div className="flex items-center justify-between gap-4">
  <span>Logo</span>
  <nav>Menu</nav>
</div>
```

### 2. Karta s hover efektem
```tsx
<div className="
  p-6 rounded-lg border border-border
  bg-card hover:shadow-lg
  transition-shadow duration-300
">
  Obsah karty
</div>
```

### 3. Gradient text
```tsx
<h1 className="
  bg-gradient-to-r from-purple-500 to-pink-500
  bg-clip-text text-transparent
">
  Gradientní nadpis
</h1>
```

### 4. Responzivní grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card />
  <Card />
  <Card />
</div>
```

---

## 🎯 Tailwind v našem projektu

### Konfigurace: `tailwind.config.ts`

```typescript
export default {
  darkMode: "class",  // Dark mode pomocí třídy
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(var(--primary))",
        muted: "hsl(var(--muted))",
        // ... shadcn/ui colors
      }
    }
  }
}
```

### CSS proměnné: `globals.css`

```css
:root {
  --primary: 267 100% 50%;  /* Purple */
  --background: 0 0% 100%;
}

.dark {
  --primary: 0 72% 51%;     /* Red for dark mode */
  --background: 0 0% 5%;
}
```

---

## 🔧 Shadcn/ui integrace

**Shadcn/ui** jsou předpřipravené komponenty postavené na Tailwindu:

```tsx
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

<Button variant="outline" size="lg">
  Klikni
</Button>

<Card>
  <CardHeader>Nadpis</CardHeader>
  <CardContent>Obsah</CardContent>
</Card>
```

Výhoda: Konzistentní design, přístupnost, dark mode - vše out of the box.

---

## 💡 Proč Tailwind?

### Výhody
| Benefit | Vysvětlení |
|---------|------------|
| **Rychlost** | Nemusíš přepínat mezi soubory |
| **Konzistence** | Spacing scale (4px, 8px, 16px...) je standardní |
| **Malý bundle** | PurgeCSS odstraní nepoužité třídy |
| **Dark mode** | `dark:bg-black` - triviální |
| **Responsive** | `md:flex lg:grid` - jednoduché breakpointy |

### Nevýhody (a jak je řešíme)
| Problém | Řešení |
|---------|--------|
| Dlouhé class stringy | Extrahovat do komponent |
| "Ošklivé" HTML | IDE pluginy pro formátování |
| Learning curve | Po týdnu to sedne |

---

## ⚠️ Časté chyby

### 1. Zapomenuté responzivní třídy
```tsx
// ❌ Text je na mobilu moc velký
<h1 className="text-5xl">Nadpis</h1>

// ✅ Responzivní velikost
<h1 className="text-2xl md:text-4xl lg:text-5xl">Nadpis</h1>
```

### 2. Chybějící dark mode varianta
```tsx
// ❌ Špatně čitelné v dark mode
<p className="text-gray-600">Text</p>

// ✅ Správně
<p className="text-gray-600 dark:text-gray-300">Text</p>

// ✅✅ Ještě lépe - použij shadcn tokeny
<p className="text-muted-foreground">Text</p>
```

---

## 📚 Další zdroje

- [Tailwind dokumentace](https://tailwindcss.com/docs)
- [Tailwind Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [Shadcn/ui komponenty](https://ui.shadcn.com/)

---

*Vytvořeno: 2025-12-10*  
*Souvisí s: [ARCHITECTURE.md](file:///home/zimmel/ai-learning-platform/.ai-context/core/ARCHITECTURE.md)*
