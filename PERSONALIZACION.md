# Guía de Personalización - Zona Hockey Store

## 🎨 Personalizar Colores y Tema

### Colores actuales (en `tailwind.config.ts`)

```typescript
colors: {
  background: "#050816",      // Fondo principal oscuro
  surface: "#0f172a",         // Superficies secundarias
  surface2: "#111827",        // Superficies terciarias
  accent: "#c7f14f",          // Verde lima (botones, CTAs)
  accentDark: "#94b80e",      // Variante más oscura del acento
  text: "#f8fafc",            // Texto principal blanco
  muted: "#94a3b8"            // Texto secundario gris
}
```

### Para cambiar a otro color acento:
1. Abre `tailwind.config.ts`
2. Reemplaza en `colors` el valor de `accent` (ej: amarillo: `#f4d03f`)
3. Opcional: actualiza `accentDark` con una variante más oscura
4. El sitio se recompila automáticamente

### Colores sugeridos por tipo de marca
- **Energético deportivo**: Rojo (#ff5252) o Naranja (#ff8c42)
- **Premium elegante**: Dorado (#ffd700) o Plata (#c0c0c0)
- **Tech moderno**: Cián (#00bcd4) o Púrpura (#9c27b0)
- **Natural sostenible**: Verde forestral (#2d5016) o Marrón (#8b5a3c)

---

## 📝 Cambiar Datos de la Tienda

### Nombre y branding
Archivo: `app/components/site-header.tsx`
```typescript
<Link href="/" className="text-xl font-semibold tracking-tight text-white">
  Zona Hockey  // ← Cambiar aquí
</Link>
```

### Metadata del sitio (SEO)
Archivo: `app/layout.tsx`
```typescript
export const metadata: Metadata = {
  title: "Zona Hockey Store",  // ← Cambiar
  description: "Tienda deportiva de hockey...",  // ← Cambiar
}
```

### Categorías disponibles
Archivo: `data/mock-data.ts`
```typescript
export const categories: Category[] = [
  {
    id: "cat-palos",
    slug: "palos",
    name: "Palos",  // ← Cambiar nombres
    description: "Descripción..."  // ← Cambiar descripción
  },
  // ...más categorías
]
```

### Productos iniciales
Archivo: `data/mock-data.ts` - Array `products`
```typescript
export const products: Product[] = [
  {
    id: "prod-001",
    name: "Palo Titan X22",  // ← Cambiar
    slug: "palo-titan-x22",  // ← Cambiar (URL-friendly)
    category: "palos",
    price: 23500,  // ← Cambiar precio
    // ... más campos
  }
]
```

### Mensajes y textos
Home: `app/page.tsx`
- Hero title: línea ~50
- Hero subtitle: línea ~52
- Secciones: línea ~60+

Admin: `app/admin/page.tsx`
- Textos del dashboard

---

## 🔗 Integración futura con APIs

### Cambiar de datos mock a API real

**Paso 1**: En `lib/shop.ts`, reemplaza estas funciones:

Antes (mock):
```typescript
export function getAllProducts() {
  return [...productStore, ...photoStore]
}
```

Después (API real):
```typescript
export async function getAllProducts() {
  const res = await fetch('https://tu-api.com/products')
  return res.json()
}
```

**Paso 2**: Actualiza páginas que usan estas funciones para que sean `async`:

```typescript
// app/page.tsx
export default async function HomePage() {
  const products = await getAllProducts()  // Ahora es async
  // ...
}
```

---

## 🗄️ Cambiar a Base de Datos (Supabase ejemplo)

### 1. Crear tabla en Supabase

```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  price INTEGER NOT NULL,
  shortDescription TEXT,
  longDescription TEXT,
  image TEXT,
  stock INTEGER,
  featured BOOLEAN DEFAULT false,
  createdAt TIMESTAMP DEFAULT now(),
  updatedAt TIMESTAMP DEFAULT now()
);
```

### 2. Instalar cliente de Supabase

```bash
npm install @supabase/supabase-js
```

### 3. Crear archivo `lib/supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

### 4. Variables de entorno (`.env.local`)

```
NEXT_PUBLIC_SUPABASE_URL=https://yourproject.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 🔐 Autenticación de Admin (NextAuth.js)

### 1. Instalar NextAuth.js

```bash
npm install next-auth
```

### 2. Crear `app/api/auth/[...nextauth]/route.ts`

```typescript
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // Validar credenciales contra B.D.
        if (credentials?.email === "admin@mitienda.com" && 
            credentials?.password === "micontraseña") {
          return { id: "1", name: "Admin", email: "admin@mitienda.com" }
        }
        return null
      },
    }),
  ],
})

export { handler as GET, handler as POST }
```

### 3. Proteger rutas admin

En `app/admin/layout.tsx`:

```typescript
import { getServerSession } from "next-auth"

export default async function AdminLayout({ children }) {
  const session = await getServerSession()
  if (!session) redirect("/api/auth/signin")
  return <>{children}</>
}
```

---

## 💳 Integración Mercado Pago

### 1. Instalar SDK oficial

```bash
npm install @mercadopago/sdk-js
```

### 2. Agregar API key en `.env.local`

```
NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY=APP_USR_...
MERCADO_PAGO_ACCESS_TOKEN=APP_USR_...
```

### 3. Crear preferencia de pago en checkout

Archivo: `app/api/checkout/mercado-pago/route.ts`

```typescript
import { MercadoPagoConfig, Preference } from "@mercadopago/sdk-js"

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
})

export async function POST(request: Request) {
  const { items, buyerEmail } = await request.json()

  const preference = new Preference(client)
  const result = await preference.create({
    body: {
      items: items.map((item) => ({
        title: item.name,
        quantity: item.quantity,
        unit_price: item.price,
      })),
      payer: { email: buyerEmail },
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
        failure: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/failure`,
        pending: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/pending`,
      },
      notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhooks/mercado-pago`,
    },
  })

  return Response.json({ preferenceId: result.id })
}
```

---

## 📧 Envío de Emails

### Con Resend (recomendado para Next.js)

```bash
npm install resend
```

Crear `app/api/emails/order-confirmation/route.ts`:

```typescript
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { email, orderId } = await request.json()

  await resend.emails.send({
    from: "noreply@zonahockey.com",
    to: email,
    subject: `Confirmación de orden #${orderId}`,
    html: `<h1>¡Gracias por tu compra!</h1>`,
  })

  return Response.json({ success: true })
}
```

---

## 🖼️ Gestión de Imágenes

### Usar Vercel Image Optimization

Ya está configurado en `next.config.mjs`:

```typescript
images: {
  remotePatterns: [
    { protocol: "https", hostname: "images.unsplash.com" }
  ]
}
```

Para agregar más fuentes:

```typescript
remotePatterns: [
  { protocol: "https", hostname: "*.cloudinary.com" },
  { protocol: "https", hostname: "*.supabase.co" },
]
```

Usar en componentes:

```typescript
import Image from "next/image"

<Image
  src={product.image}
  alt={product.name}
  width={400}
  height={300}
  priority  // Para hero
/>
```

---

## 🚀 Performance y SEO

### Dynamic Metadata por página

Ej. en `app/products/[slug]/page.tsx`:

```typescript
export async function generateMetadata({ params }: PageProps): Metadata {
  const product = getProductBySlug(params.slug)
  return {
    title: product?.name + " - Zona Hockey",
    description: product?.shortDescription,
    openGraph: {
      images: [product?.image],
    },
  }
}
```

### Generar Sitemap

Crear `app/sitemap.ts`:

```typescript
import { MetadataRoute } from 'next'
import { getAllProducts } from '@lib/shop'

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts()
  return [
    { url: 'https://zonahockey.com', priority: 1 },
    ...products.map((p) => ({
      url: `https://zonahockey.com/products/${p.slug}`,
      priority: 0.8,
    })),
  ]
}
```

---

## 📱 Testing en dispositivos

### Prueba local con acceso remoto

```bash
npm run dev  # Inicia servidor

# En otra terminal:
npx ngrok http 3000  # Te da URL pública para compartir
```

### Emular móvil en Firefox/Chrome
- F12 → Toggle Device Toolbar (Ctrl+Shift+M)
- Seleccionar dispositivo

---

## 🐛 Debugging

### Habilitar console logging

En cualquier componente del servidor:

```typescript
console.log("Datos:", data) // Verás en terminal de npm run dev
```

### React DevTools (cliente)

En `app/layout.tsx`:

```typescript
import { useEffect } from 'react'

if (typeof window !== 'undefined') {
  // Código solo en navegador
}
```

---

¡Con estos ajustes podrás personalizar tu tienda completamente! 💪
