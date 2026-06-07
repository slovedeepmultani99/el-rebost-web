# CLAUDE.md — El Rebost de Montigalà · Proyecto completo

> Lee este documento entero antes de tocar cualquier archivo.
> Contiene todas las decisiones de arquitectura, stack, esquema de base de datos, rutas API y lógica de negocio.

---

## 1. Descripción del proyecto

**El Rebost de Montigalà** es un restaurante en Badalona (Brasería · Tapas · Arroces).
El proyecto consta de **dos aplicaciones** en un mismo monorepo Next.js:

| App | Ruta | Acceso |
|-----|------|--------|
| Web pública | `/` | Público, sin auth |
| Backoffice | `/admin` | Privado, solo empleados con cuenta |

La web pública **no tiene backend propio**: lee datos de la base de datos vía API Routes de Next.js.
El backoffice es una SPA interna que se conecta a las mismas API Routes, autenticadas con sesión.

---

## 2. Stack técnico (decisiones ya tomadas, no cambiar)

```
Framework:    Next.js 14 (App Router)
Lenguaje:     TypeScript
Base de datos: PostgreSQL via Supabase
ORM:          Prisma
Auth:         NextAuth.js v5 (Credentials provider para backoffice interno)
Storage:      Supabase Storage (imágenes: logo, galería, platos)
CSS:          Tailwind CSS + CSS variables para los tokens de marca
Fuentes:      Google Fonts — Fraunces (display) + Karla (body)
Deploy:       Vercel (app) + Supabase (db + storage)
Email:        Resend (confirmaciones de reserva)
```

---

## 3. Estructura de archivos

```
rebost/
├── CLAUDE.md                    ← este archivo
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── prisma/
│   ├── schema.prisma            ← esquema completo de BD
│   └── seed.ts                  ← datos iniciales (carta, menú, settings)
├── src/
│   ├── app/
│   │   ├── layout.tsx           ← fuentes, metadata global
│   │   ├── page.tsx             ← web pública (home)
│   │   ├── (public)/
│   │   │   ├── carta/page.tsx
│   │   │   └── reservar/page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx       ← auth guard, sidebar
│   │   │   ├── page.tsx         ← dashboard
│   │   │   ├── menu/page.tsx    ← editor menú del día
│   │   │   ├── carta/page.tsx   ← editor carta
│   │   │   ├── reservas/page.tsx
│   │   │   ├── contenido/page.tsx  ← CMS web
│   │   │   ├── galeria/page.tsx
│   │   │   └── ajustes/page.tsx
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── menu/
│   │       │   ├── route.ts         GET /api/menu (todos los días)
│   │       │   └── [day]/route.ts   GET/PUT /api/menu/[0-6]
│   │       ├── carta/
│   │       │   ├── route.ts         GET /api/carta
│   │       │   ├── sections/route.ts  POST (nueva sección)
│   │       │   └── dishes/
│   │       │       ├── route.ts      POST (nuevo plato)
│   │       │       └── [id]/route.ts PUT/DELETE
│   │       ├── reservas/
│   │       │   ├── route.ts         GET (admin) / POST (pública)
│   │       │   └── [id]/route.ts    PUT (cambiar estado)
│   │       ├── galeria/
│   │       │   ├── route.ts         GET/POST
│   │       │   └── [id]/route.ts    DELETE
│   │       ├── settings/
│   │       │   └── route.ts         GET/PUT (web content CMS)
│   │       └── upload/route.ts      POST (imágenes a Supabase Storage)
│   ├── components/
│   │   ├── public/              ← componentes de la web pública
│   │   │   ├── Nav.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── MenuDia.tsx
│   │   │   ├── Carta.tsx
│   │   │   ├── Reservas.tsx
│   │   │   ├── Resenas.tsx
│   │   │   └── Footer.tsx
│   │   ├── admin/              ← componentes del backoffice
│   │   │   ├── Sidebar.tsx
│   │   │   ├── TopBar.tsx
│   │   │   ├── DishCard.tsx
│   │   │   ├── DishEditRow.tsx
│   │   │   ├── SectionTabs.tsx
│   │   │   └── PrintModal.tsx
│   │   └── ui/                 ← componentes genéricos
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Toast.tsx
│   │       └── Toggle.tsx
│   ├── lib/
│   │   ├── prisma.ts           ← singleton Prisma client
│   │   ├── supabase.ts         ← Supabase client (storage)
│   │   ├── auth.ts             ← NextAuth config
│   │   └── utils.ts
│   └── types/
│       └── index.ts            ← tipos TypeScript compartidos
└── public/
    └── fonts/                  ← si se sirven localmente
```

---

## 4. Esquema de base de datos (Prisma)

Ver `prisma/schema.prisma`. Tablas principales:

### `Setting` — CMS web (clave-valor JSONB)
```
key    String  @id   // "hero", "casa", "features", "stats", "info", "marca"
value  Json          // objeto JSON con todo el contenido de esa sección
updatedAt DateTime
```

### `CartaSection` — Secciones de la carta
```
id        String   @id @default(cuid())
title     String
subtitle  String?
note      String?
salsas    Boolean  @default(false)
sortOrder Int
active    Boolean  @default(true)
dishes    CartaDish[]
```

### `CartaDish` — Platos de la carta
```
id          String  @id @default(cuid())
sectionId   String
name        String
description String?
price       Decimal?
available   Boolean @default(true)
isStar      Boolean @default(false)
isVeg       Boolean @default(false)
isSg        Boolean @default(false)
imageUrl    String?
sortOrder   Int
section     CartaSection @relation(...)
```

### `DailyMenu` — Menú del día por día de semana
```
id          String  @id @default(cuid())
dayOfWeek   Int     // 0=Dom, 1=Lun, ... 6=Sáb
price       String
postre      String
inclBread   Boolean @default(true)
inclDrink   Boolean @default(true)
inclCoffee  Boolean @default(false)
inclDessert Boolean @default(false)
active      Boolean @default(true)
updatedAt   DateTime
primeros    DailyDish[]  @relation("primeros")
segundos    DailyDish[]  @relation("segundos")
```

### `DailyDish` — Platos del menú del día
```
id           String  @id @default(cuid())
menuId       String
course       String  // "primero" | "segundo"
name         String
description  String?
sortOrder    Int
isSupplement Boolean @default(false)
suppPrice    String?
menu         DailyMenu @relation(...)
```

### `Reservation` — Reservas
```
id        String   @id @default(cuid())
date      DateTime
time      String   // "14:00"
service   String   // "comida" | "cena"
name      String
phone     String
guests    Int
notes     String?
status    String   @default("pending") // "pending" | "confirmed" | "cancelled"
createdAt DateTime @default(now())
```

### `GalleryImage` — Galería
```
id        String  @id @default(cuid())
imageUrl  String
title     String?
sortOrder Int
active    Boolean @default(true)
createdAt DateTime @default(now())
```

### `AdminUser` — Usuarios del backoffice
```
id        String  @id @default(cuid())
email     String  @unique
password  String  // bcrypt hash
name      String
role      String  @default("editor") // "admin" | "editor"
createdAt DateTime @default(now())
```

---

## 5. API Routes — Contratos

### Pública (sin auth)

```
GET  /api/menu              → todos los menús (0-6)
GET  /api/menu/[day]        → menú de un día concreto
GET  /api/carta             → carta completa con secciones y platos
POST /api/reservas          → crear reserva { date, time, service, name, phone, guests, notes }
GET  /api/settings          → todo el WEB content (hero, casa, stats, etc.)
```

### Admin (requiere sesión NextAuth)

```
PUT  /api/menu/[day]        → actualizar menú del día
POST /api/carta/sections    → nueva sección
PUT  /api/carta/sections/[id]
DELETE /api/carta/sections/[id]
POST /api/carta/dishes
PUT  /api/carta/dishes/[id]
DELETE /api/carta/dishes/[id]
GET  /api/reservas          → lista con filtros (fecha, estado)
PUT  /api/reservas/[id]     → cambiar estado
POST /api/galeria           → subir imagen (multipart)
DELETE /api/galeria/[id]
PUT  /api/settings          → actualizar contenido web (body: { key, value })
POST /api/upload            → upload a Supabase Storage → devuelve URL pública
```

---

## 6. Autenticación (backoffice)

- **NextAuth v5** con `CredentialsProvider`
- Las rutas `/admin/*` están protegidas con `middleware.ts`
- El seed crea un usuario admin por defecto
- Flujo: email + contraseña → sesión JWT → cookie httpOnly

```ts
// middleware.ts
export { auth as middleware } from "@/lib/auth"
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] }
```

---

## 7. Variables de entorno

```env
# .env.local
DATABASE_URL="postgresql://..."        # Supabase connection string
DIRECT_URL="postgresql://..."          # Para Prisma migrations (bypass pooler)

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."                  # openssl rand -base64 32

SUPABASE_URL="https://xxx.supabase.co"
SUPABASE_ANON_KEY="..."
SUPABASE_SERVICE_KEY="..."             # Solo en server-side

RESEND_API_KEY="..."                   # Emails confirmación reservas

# Producción (Vercel)
NODE_ENV="production"
NEXTAUTH_URL="https://tudominio.com"
```

---

## 8. Diseño de referencia

Los archivos de diseño ya están construidos como HTML/JS:

| Archivo | Descripción |
|---------|-------------|
| `el-rebost-de-montigala.html` | Web pública completa — mockup fiel |
| `rebost-backoffice.html` | Backoffice completo — mockup interactivo |

### Tokens de diseño (CSS Variables → Tailwind)

```
--wine:   #5C1A2B   → tw: wine-700
--wine-d: #3A0F1B   → tw: wine-900
--cream:  #F5EDE0   → tw: amber-50 (custom)
--ember:  #C8552B   → tw: ember-600
--gold:   #BC9255   → tw: gold-500
--ink:    #1E1210   → tw: stone-950
--muted:  #6A554F   → tw: stone-500
--line:   #E4D9C8   → tw: amber-200
```

Fuentes:
- `Fraunces` → `font-display` (headings, precios, nombres platos)
- `Karla` → `font-body` (UI, labels, descripciones)

---

## 9. Lógica de negocio importante

### Menú del día
- Hay exactamente 7 registros `DailyMenu` (uno por día de la semana, 0-6)
- La web pública llama `/api/menu/[hoy]` donde hoy = `new Date().getDay()`
- Las cenas solo están disponibles viernes (5) y sábado (6)
- Los suplementos son `DailyDish` con `isSupplement: true`

### Reservas
- El motor de reservas en la web pública valida:
  - Cenas solo disponibles viernes y sábado
  - Slots de comida: 13:00, 13:30, 14:00, 14:30, 15:00, 15:30
  - Slots de cena: 20:00, 20:30, 21:00, 21:30, 22:00, 22:30
  - Grupos > 12 → redirigir a llamada telefónica
- Al crear una reserva, enviar email de confirmación con Resend

### Carta de impresión
- El backoffice tiene un botón "Imprimir carta" que genera 2 páginas A4:
  - Página 1: cabecera grande + Tapas, Entrantes (izq) + Ensaladas, Huevos, Pan, Torradas (dcha)
  - Página 2: cabecera compacta + Pastas, Bacalao (izq) + Arroces, Carnes, Salsas (dcha)
  - Las columnas usan `justify-content: space-between` para llenar el espacio

### Imágenes
- Upload va a Supabase Storage bucket `restaurante`
- Estructura: `restaurante/galeria/`, `restaurante/platos/`, `restaurante/logo/`
- Devolver URL pública para guardar en BD

---

## 10. Pasos de desarrollo recomendados

```
Fase 1 — Fundaciones (1-2 días)
  [ ] Inicializar Next.js 14 + TypeScript + Tailwind
  [ ] Configurar Prisma + Supabase
  [ ] Correr migraciones (prisma migrate dev)
  [ ] Seed con datos iniciales (carta actual + menús demo)
  [ ] NextAuth con usuario admin inicial

Fase 2 — API (1 día)
  [ ] GET /api/carta
  [ ] GET/PUT /api/menu/[day]
  [ ] GET/PUT /api/settings
  [ ] POST /api/reservas
  [ ] GET/PUT/DELETE /api/carta/dishes y sections

Fase 3 — Web pública (2-3 días)
  [ ] Convertir el HTML mockup a componentes React
  [ ] Conectar Hero con settings
  [ ] Conectar menú del día con API
  [ ] Motor de reservas funcional (form → API → email)
  [ ] Carta pública desde API
  [ ] SEO: metadata, og:image, robots.txt, sitemap

Fase 4 — Backoffice (2-3 días)
  [ ] Auth (login page + middleware protección /admin)
  [ ] Convertir mockup backoffice a componentes React
  [ ] Editor menú del día (conectar con PUT /api/menu/[day])
  [ ] Editor carta (drag-reorder con @dnd-kit)
  [ ] Gestor de reservas (tabla filtrable)
  [ ] CMS contenido web (conectar PUT /api/settings)
  [ ] Galería con upload a Supabase Storage

Fase 5 — Print & Polish (1 día)
  [ ] Plantilla impresión carta (A4, 2 páginas, desde backoffice)
  [ ] Plantilla impresión menú del día (A4, 1 página, desde backoffice)
  [ ] Performance: ISR para carta y settings (revalidateTag)
  [ ] Error boundaries, loading states, toast notifications

Fase 6 — Deploy (1 día)
  [ ] Variables de entorno en Vercel
  [ ] Dominio personalizado
  [ ] Preview deployments para staging
```

---

## 11. Comandos de arranque

```bash
# Instalar dependencias
npm install

# Base de datos
npx prisma migrate dev --name init
npx prisma db seed

# Desarrollo
npm run dev

# Build producción
npm run build
npm start
```

---

## 12. Notas importantes

- **El backoffice NO es público**: el dominio/admin solo debe estar accesible desde la red interna o con VPN, o proteger con auth (ya está en el plan).
- **ISR**: la web pública usa Incremental Static Regeneration para carta y settings. El menú del día se regenera cada vez que se publica desde el backoffice (revalidateTag).
- **No usar `localStorage`** en ningún componente — el backoffice usa estado React + fetch a la API.
- **Prioridad móvil**: la web pública debe ser mobile-first; el backoffice puede ser desktop-first.
- Los colores del CSS del mockup están como variables `--wine`, `--ember`, etc. Mapearlos a Tailwind en `tailwind.config.ts` como colores personalizados.
