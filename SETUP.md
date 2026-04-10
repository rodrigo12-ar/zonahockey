# Zona Hockey Store - Guía de Instalación y Ejecución

## ✅ Estructura Lista

El proyecto base está completamente generado con todos los componentes, páginas y APIs necesarias para una tienda de hockey funcional.

## 📦 Instalación

### Opción 1: Instalar desde cero (recomendado si no se instaló aún)

```bash
npm install
```

Esto instalará todas las dependencias listadas en `package.json`:
- Next.js 14.2.5 con App Router
- React 18.3.1
- TypeScript 5.5.4
- Tailwind CSS 3.4.4
- Utilidades de PostCSS

## 🚀 Ejecutar en desarrollo

```bash
npm run dev
```

Luego abre en tu navegador: [http://localhost:3000](http://localhost:3000)

## 🏗️ Compilar para producción

```bash
npm run build
npm start
```

## 📋 Rutas Implementadas

### Tienda Pública
- `/` - Home con hero, productos destacados y catálogo por categorías
- `/products/[slug]` - Detalle de producto con relacionados
- `/cart` - Carrito (simulado, listo para persistencia)
- `/checkout` - Checkout con selección de pago (Mercado Pago o transferencia simulados)

### Panel de Administración
- `/admin` - Dashboard con resumen de productos, fotos y pedidos
- `/admin/products` - Listado de productos
- `/admin/products/new` - Crear nuevo producto
- `/admin/products/[slug]` - Editar producto
- `/admin/photos` - Listado de fotografías
- `/admin/photos/new` - Crear nueva fotografía
- `/admin/photos/[slug]` - Editar fotografía
- `/admin/orders` - Listado de pedidos
- `/admin/orders/[id]` - Ver detalle de pedido

### APIs REST
- `GET/POST /api/admin/products` - CRUD de productos
- `GET/PATCH/DELETE /api/admin/products/[slug]` - Operaciones individuales
- `GET/POST /api/admin/photos` - CRUD de fotografías
- `GET/PATCH/DELETE /api/admin/photos/[slug]` - Operaciones individuales
- `GET /api/admin/orders` - Listar pedidos
- `GET/PATCH /api/admin/orders/[id]` - Ver y cambiar estado

## 🗂️ Estructura de carpetas

```
zona-hockey/
├── app/                              # App Router de Next.js
│   ├── layout.tsx                    # Layout raíz con metadata
│   ├── globals.css                   # Estilos globales + Tailwind
│   ├── page.tsx                      # Home
│   ├── cart/page.tsx                 # Carrito
│   ├── checkout/page.tsx             # Checkout
│   ├── products/[slug]/page.tsx      # Detalle de producto
│   ├── admin/                        # Sección admin
│   │   ├── page.tsx                  # Dashboard
│   │   ├── products/                 # Gestión de productos
│   │   ├── photos/                   # Gestión de fotos
│   │   └── orders/                   # Gestión de pedidos
│   └── api/admin/                    # Rutas API
│       ├── products/
│       ├── photos/
│       └── orders/
├── components/                       # Componentes reutilizables
│   ├── site-header.tsx               # Header
│   ├── site-footer.tsx               # Footer
│   ├── product-card.tsx              # Tarjeta de producto
│   ├── product-grid.tsx              # Grilla de productos
│   ├── cart-view.tsx                 # Vista del carrito
│   ├── cart-summary.tsx              # Resumen de carrito
│   ├── checkout-form.tsx             # Formulario de checkout
│   └── admin/                        # Componentes admin
│       ├── admin-sidebar.tsx         # Sidebar de admin
│       ├── product-form.tsx          # Formulario de producto
│       └── photo-form.tsx            # Formulario de fotografía
├── lib/                              # Lógica de negocio
│   ├── utils.ts                      # Utilidades (formatCurrency, slugify)
│   └── shop.ts                       # CRUD y lógica de tienda
├── data/                             # Datos mock
│   └── mock-data.ts                  # Productos, fotos, pedidos de ejemplo
├── types/                            # Tipos TypeScript
│   └── index.ts                      # Tipos de Product, PhotoProduct, Order, etc.
├── package.json                      # Dependencias
├── tsconfig.json                     # Configuración TypeScript
├── tailwind.config.ts                # Configuración Tailwind
├── next.config.mjs                   # Configuración Next.js
├── postcss.config.js                 # Configuración PostCSS
└── README.md                         # Este archivo
```

## 🎨 Diseño Visual

- **Fondo**: Oscuro elegante (#050816 con gradiente radial de accent)
- **Acento**: Verde lima (#c7f14f) para botones y CTAs
- **Texto**: Blanco claro para contraste máximo
- **Rounded**: Bordes amplios (3rem) para diseño moderno
- **Responsive**: Mobile-first con breakpoints en Tailwind

## 📊 Datos de Ejemplo

El proyecto incluye datos mock de:
- **4 productos físicos**: Palos, patines, bolsos, accesorios
- **2 referencias de fotografías**: Individual y pack
- **1 pedido simulado**: Para ver estructura de órdenes

Todos en `data/mock-data.ts` listos para reemplazar con datos reales o API.

## 🔄 Flujo de Funcionamiento

### Tienda Pública
1. Usuario entra a home y ve hero + productos destacados
2. Navega por categorías (Palos, Patines, Bolsos, Accesorios, Fotografías)
3. Hace clic en "Ver detalle" o producto para ver más información
4. Agrega al carrito (estructura preparada)
5. Finaliza compra con formulario y selecciona método de pago

### Panel Admin
1. Accede a `/admin/products` para CRUD de productos
2. Crea nuevo producto con formulario completo
3. Edita o elimina existentes desde la tabla
4. Mismo flujo para fotografías
5. Ve listado de pedidos y puede cambiar estado

## 🔧 Próximos Pasos Recomendados

### Corto plazo
- [ ] Integrar persistencia de carrito (localStorage o session)
- [ ] Conectar con Supabase/PostgreSQL para datos reales
- [ ] Implementar autenticación de admin (NextAuth.js)
- [ ] Crear endpoint de contacto/notificación

### Mediano plazo
- [ ] Integrar Mercado Pago SDK
- [ ] Agregar manejo de imágenes con Cloudinary/Vercel Image optimization
- [ ] Implementar búsqueda y filtros
- [ ] Crear sistema de facturas

### Largo plazo
- [ ] Envíos locales (integración con transportistas)
- [ ] Estadísticas detalladas en admin
- [ ] Sistema de reviews/reseñas
- [ ] Email marketing automático

## 📱 Testing

### Rutas públicas
- HOME: http://localhost:3000/
- CARRITO: http://localhost:3000/cart
- CHECKOUT: http://localhost:3000/checkout
- PRODUCTO EJEMPLO: http://localhost:3000/products/palo-titan-x22

### Rutas Admin
- DASHBOARD: http://localhost:3000/admin
- PRODUCTOS: http://localhost:3000/admin/products
- FOTOS: http://localhost:3000/admin/photos
- PEDIDOS: http://localhost:3000/admin/orders

## 💡 Tips

- Los imports con `@` funcionan gracias a los path aliases en `tsconfig.json`
- Los datos mock están en memoria; actualizan solo durante la sesión actual
- Los formularios del admin tienen validación básica y muestran feedback
- Todo está preparado para entornos **Windows, Mac y Linux**
- Compatible para deployment en **Vercel** sin cambios

## 🚢 Deploy en Vercel

```bash
vercel
```

O conecta tu repositorio Git a Vercel directamente desde el dashboard.

---

**¡Proyecto listo para desarrollar y escalar!** 🎉 
