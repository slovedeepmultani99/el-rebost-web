// prisma/seed.ts
// Datos iniciales — El Rebost de Montigalà
// Ejecutar: npx prisma db seed

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding El Rebost de Montigalà...')

  // ── Admin user ──────────────────────────────
  await prisma.adminUser.upsert({
    where: { email: 'admin@rebostmontigala.com' },
    update: {},
    create: {
      email: 'admin@rebostmontigala.com',
      password: await bcrypt.hash('rebost2024!', 12), // ← CAMBIAR en producción
      name: 'Administrador',
      role: 'admin',
    },
  })
  console.log('✓ Usuario admin creado')

  // ── Settings (CMS web) ─────────────────────
  const settingsData = [
    {
      key: 'hero',
      value: {
        h1a: 'Cuina casolana',
        h1b: 'a la brasa d\'alzina',
        lead: 'Tapas, arroces y carnes maduradas a la brasa en el corazón de Montigalà. Producto de mercado, raciones generosas y el trato cercano de una casa de comidas de toda la vida.',
        cta1: 'Reservar mesa →',
        cta2: 'Ver menú de hoy',
        badge: '★★★★☆ 4,1 · más de 4.000 reseñas en Google',
        meta1t: 'Menú del día',
        meta1s: 'desde 16€ · entrante, principal y postre',
        meta2t: 'Hasta 45 pax',
        meta2s: 'grupos, empresas y celebraciones',
      },
    },
    {
      key: 'casa',
      value: {
        eyebrow: 'La casa · desde el barrio de Montigalà',
        heading: 'Una brasería honesta, donde se come bien y en cantidad',
        p1: 'El Rebost de Montigalà nació para recuperar la cocina catalana y mediterránea de siempre: la del producto fresco de mercado, las brasas de encina y los arroces que se cuecen a fuego lento cada día.',
        p2: 'Detrás de cada plato hay una historia que el equipo disfruta contándote. Muros de piedra, luz cálida y un ambiente acogedor para una comida de diario, una sobremesa larga o una gran celebración.',
      },
    },
    {
      key: 'features',
      value: [
        { icon: '🔥', title: 'Brasa de encina', desc: 'Carnes maduradas y verduras al punto de humo' },
        { icon: '🥘', title: 'Arroces caseros', desc: 'Elaborados al momento, mínimo 2 personas' },
        { icon: '🌿', title: 'Producto de mercado', desc: 'Pescado fresco y verdura de temporada' },
        { icon: '🍷', title: 'Bodega propia', desc: 'Vinos seleccionados servidos a su temperatura' },
      ],
    },
    {
      key: 'stats',
      value: [
        { num: '4,1★', text: 'Valoración media en Google con más de 4.000 reseñas' },
        { num: '16€', text: 'Menú del día completo, de lunes a viernes' },
        { num: '45', text: 'Comensales en nuestro salón para grupos' },
        { num: '7/7', text: 'Abiertos todos los días al mediodía' },
      ],
    },
    {
      key: 'info',
      value: {
        tel: '934 65 30 00',
        ig: '@rebostdemontigala',
        fb: '',
        tiktok: '',
        addr: 'Carrer Manuel Moreno Mauricio, 35-37, 08917 Badalona, Barcelona',
        email: '',
      },
    },
    {
      key: 'horarios',
      value: [
        { dias: 'Lunes – Jueves', horas: '13:00 – 16:00', nota: 'Solo comidas' },
        { dias: 'Viernes', horas: '13:00 – 16:00 · 20:00 – 23:00', nota: 'Comida y cena' },
        { dias: 'Sábado', horas: '13:00 – 16:00 · 20:00 – 23:00', nota: 'Comida y cena' },
        { dias: 'Domingo', horas: '13:00 – 16:00', nota: 'Solo comidas' },
      ],
    },
    {
      key: 'marca',
      value: {
        nombre: 'El Rebost de Montigalà',
        tagline: 'Brasería · Tapas · Arroces · Badalona',
        colorWine: '#5C1A2B',
        colorEmber: '#C8552B',
      },
    },
  ]

  for (const s of settingsData) {
    await prisma.setting.upsert({ where: { key: s.key }, update: { value: s.value }, create: s })
  }
  console.log('✓ Settings CMS creados')

  // ── Carta ─────────────────────────────────
  const cartaSections = [
    {
      title: 'Tapas', sortOrder: 1,
      dishes: [
        { name: 'Patatas bravas', description: 'Alioli y salsa picante', sortOrder: 1, isVeg: true },
        { name: 'Pimientos de padrón', sortOrder: 2, isVeg: true },
        { name: 'Mejillones al vapor o marinera', sortOrder: 3 },
        { name: 'Buñuelos de bacalao', sortOrder: 4 },
        { name: 'Croquetas de jamón (6/u)', description: 'Caseras', sortOrder: 5, isStar: true },
        { name: 'Croquetas de pollo (4/u)', description: 'Caseras', sortOrder: 6 },
        { name: 'Oreja de ibérico a la gallega', sortOrder: 7 },
        { name: 'Chistorra de navarra', sortOrder: 8 },
        { name: 'Morcilla de burgos', sortOrder: 9 },
        { name: 'Solomillo de ibérico con queso brie', sortOrder: 10 },
        { name: 'Solomillo de ibérico, cebolla y queso roquefort', sortOrder: 11 },
        { name: 'Chocos a la andaluza', sortOrder: 12 },
        { name: 'Fingers de pollo', sortOrder: 13 },
        { name: 'Cuñas de queso manchego seco', sortOrder: 14, isVeg: true },
        { name: 'Calamar a la andaluza', sortOrder: 15 },
        { name: 'Anchoas cantábricas', sortOrder: 16 },
        { name: 'Torrezno De Ibérico (Ud.)', sortOrder: 17 },
        { name: 'Chipirones a la andaluza', sortOrder: 18 },
      ],
    },
    {
      title: 'Entrantes', sortOrder: 2,
      dishes: [
        { name: 'Gambas al ajillo', sortOrder: 1 },
        { name: 'Plato de jamón recebo', sortOrder: 2 },
        { name: 'Carpaccio de salmón y bacalao', description: 'Con vinagreta de verduras', sortOrder: 3 },
        { name: 'Carpaccio de buey', description: 'Con foie rallado o con parmesano', sortOrder: 4 },
        { name: 'Callos con cap i pota', sortOrder: 5 },
      ],
    },
    {
      title: 'Ensaladas', sortOrder: 3,
      dishes: [
        { name: 'Ensalada de la huerta con atún', sortOrder: 1 },
        { name: 'Ensalada mezclum con jamón ibérico', description: 'Queso de cabra, nueces y reducción de balsámico', sortOrder: 2 },
        { name: 'Ensalada de escalibada y ventresca', sortOrder: 3 },
      ],
    },
    {
      title: 'Huevos', sortOrder: 4,
      dishes: [
        { name: 'Huevos con jamón ibérico y patatas fritas', sortOrder: 1 },
        { name: 'Huevos con torreznos y patatas fritas', sortOrder: 2 },
        { name: 'Huevo con gamba al ajillo', sortOrder: 3 },
        { name: 'Huevos con chorizo, patatas fritas y pimientos de padrón', sortOrder: 4 },
      ],
    },
    {
      title: 'Pan', sortOrder: 5,
      dishes: [
        { name: 'Ración de pan de coca', description: 'Con o sin tomate', sortOrder: 1 },
      ],
    },
    {
      title: 'Torradas', sortOrder: 6,
      dishes: [
        { name: 'De atún con pimiento rojo escalivado', sortOrder: 1 },
        { name: 'De lomo con queso', sortOrder: 2 },
        { name: 'De lomo con pimiento verde y queso', sortOrder: 3 },
        { name: 'De jamón de recebo', sortOrder: 4 },
        { name: 'De bacón, queso cheddar y cebolla caramelizada', sortOrder: 5 },
        { name: 'De solomillo ibérico, cebolla caramelizada y queso cheddar', sortOrder: 6 },
        { name: 'De escalibada con anchoas', sortOrder: 7 },
      ],
    },
    {
      title: 'Pastas y Sopas', note: '*Salsas: pesto, carbonara, ceps, funghi, napolitana', sortOrder: 7,
      dishes: [
        { name: 'Sopa de pescadores', sortOrder: 1 },
        { name: 'Canelones de la casa gratinados', sortOrder: 2 },
        { name: 'Tallarines de pasta fresca', description: 'Con salsa al gusto*', sortOrder: 3 },
        { name: 'Raviolis de pasta fresca', description: 'Rellenos de cuatro quesos, salsa al gusto*', sortOrder: 4 },
      ],
    },
    {
      title: 'Bacalao', sortOrder: 8,
      dishes: [
        { name: 'Con romesco y alioli', sortOrder: 1 },
        { name: 'A la llauna', sortOrder: 2 },
        { name: 'Con muselina de miel y setas', sortOrder: 3 },
        { name: 'Con salsa vizcaína', sortOrder: 4 },
      ],
    },
    {
      title: 'Arroces y Fideuá', subtitle: 'Mínimo 2 personas', sortOrder: 9,
      dishes: [
        { name: 'Fideuá de marisco y sepia', sortOrder: 1 },
        { name: 'Paella de la casa', sortOrder: 2 },
        { name: 'Arroz negro con gambas, sepia y almejas', sortOrder: 3 },
        { name: 'Caldoreta de bogavante', sortOrder: 4, isStar: true },
      ],
    },
    {
      title: 'Carnes', sortOrder: 10,
      dishes: [
        { name: 'Lomo de cerdo', sortOrder: 1 },
        { name: 'Butifarra con patatas o alubias', sortOrder: 2 },
        { name: 'Milanesa de pollo', sortOrder: 3 },
        { name: 'Hamburguesa de ternera', sortOrder: 4 },
        { name: 'Solomillo ibérico de orza', description: 'Patata paja y huevos estrellados', sortOrder: 5 },
        { name: 'Milanesa de ternera', sortOrder: 6 },
        { name: 'Solomillo de ternera con foie y setas', description: 'Salsa Pedro Ximénez', sortOrder: 7, isStar: true },
      ],
    },
    {
      title: 'Salsas', subtitle: 'Precio por unidad', isSalsas: true, sortOrder: 11,
      dishes: [
        { name: 'Roquefort', sortOrder: 1 },
        { name: 'Pimienta', sortOrder: 2 },
        { name: 'Pedro Ximénez', sortOrder: 3 },
        { name: 'Ceps', sortOrder: 4 },
      ],
    },
  ]

  for (const sec of cartaSections) {
    const { dishes, ...sectionData } = sec
    const section = await prisma.cartaSection.create({ data: sectionData })
    for (const dish of dishes) {
      await prisma.cartaDish.create({ data: { ...dish, sectionId: section.id } })
    }
  }
  console.log('✓ Carta creada (11 secciones)')

  // ── Menús del día (7 días) ─────────────────
  const menus = [
    {
      dayOfWeek: 0, price: '25 €',
      postre: 'Crema catalana, flan de vainilla o pastel de frutas',
      inclDessert: true,
      primeros: [
        { name: 'Surtido de tapas', description: 'para compartir' },
        { name: 'Calçots a la brasa', description: 'con romesco (temporada)' },
        { name: 'Tabla de ibéricos', description: 'y queso curado' },
        { name: 'Sopa casera del día' },
        { name: 'Ensalada de temporada' },
      ],
      segundos: [
        { name: 'Paella mixta casera', description: 'mín. 2 pax' },
        { name: 'Cordero lechal a la brasa', description: 'con patatas' },
        { name: 'Bacalao confitado', description: 'muselina de ajo' },
        { name: 'Butifarra con setas' },
        { name: 'Solomillo de ternera', description: 'foie y ceps' },
      ],
    },
    {
      dayOfWeek: 1, price: '16 €',
      postre: 'Postre casero del día, fruta o café',
      primeros: [
        { name: 'Escudella casera', description: 'sopa tradicional con pilota' },
        { name: 'Ensalada de la huerta', description: 'tomate, atún y olivada' },
        { name: 'Canelones de la abuela', description: 'gratinados con bechamel' },
        { name: 'Croquetas de jamón (4 u.)', description: 'caseras' },
      ],
      segundos: [
        { name: 'Pollo de corral a la brasa', description: 'con patatas panadera' },
        { name: 'Merluza a la plancha', description: 'verduras de temporada' },
        { name: 'Albóndigas con sepia', description: 'mar y montaña' },
        { name: 'Butifarra con mongetes y setas', description: 'a la brasa' },
      ],
    },
    {
      dayOfWeek: 2, price: '16 €',
      postre: 'Postre casero del día, fruta o café',
      primeros: [
        { name: 'Crema de calabaza', description: 'con aceite tostado' },
        { name: 'Macarrones a la boloñesa', description: 'gratinados al horno' },
        { name: 'Ensalada de garbanzos', description: 'bacalao y pimientos' },
        { name: 'Fideos a la cazuela' },
      ],
      segundos: [
        { name: 'Entrecot a la brasa', description: 'pimientos de padrón' },
        { name: 'Bacalao a la llauna', description: 'tomate y ajo' },
        { name: 'Fricandó de ternera', description: 'setas de temporada' },
        { name: 'Escalope de pollo', description: 'con guarnición' },
      ],
    },
    {
      dayOfWeek: 3, price: '16 €',
      postre: 'Postre casero del día, fruta o café',
      primeros: [
        { name: 'Lentejas estofadas', description: 'chorizo y verduras' },
        { name: 'Arroz a la cubana', description: 'huevo y plátano' },
        { name: 'Esqueixada de bacalao', description: 'pimiento, tomate y olivas' },
        { name: 'Sopa de pescado', description: 'casera del día' },
      ],
      segundos: [
        { name: 'Costillas de cerdo lacadas', description: 'miel y romero' },
        { name: 'Calamares a la romana', description: 'con alioli' },
        { name: 'Pechuga rellena', description: 'jamón y queso' },
        { name: 'Lomo de cerdo a la brasa' },
      ],
    },
    {
      dayOfWeek: 4, price: '16 €',
      postre: 'Postre casero del día, fruta o café',
      primeros: [
        { name: 'Fideuá del día', description: 'sepia y gambas' },
        { name: 'Espinacas a la catalana', description: 'piñones y pasas' },
        { name: 'Ensalada de la casa', description: 'atún y aceitunas' },
        { name: 'Sopa de verduras', description: 'casera' },
      ],
      segundos: [
        { name: 'Butifarra del país con setas', description: 'a la brasa' },
        { name: 'Lomo de salmón', description: 'sobre verduritas' },
        { name: 'Conejo al ajillo', description: 'con patatas' },
        { name: 'Escalope de ternera' },
      ],
    },
    {
      dayOfWeek: 5, price: '16 €',
      postre: 'Postre casero del día, fruta o café',
      primeros: [
        { name: 'Croquetas del día (4 u.)', description: 'caseras' },
        { name: 'Ensalada mezclum', description: 'con vinagreta' },
        { name: 'Sopa de pescadores', description: 'del día' },
        { name: 'Arroz blanco con verduras' },
      ],
      segundos: [
        { name: 'Solomillo a la brasa', description: 'reducción de Pedro Ximénez' },
        { name: 'Dorada a la sal', description: 'con verduritas' },
        { name: 'Rabo de toro estofado' },
        { name: 'Hamburguesa de ternera', description: 'con patatas' },
      ],
    },
    {
      dayOfWeek: 6, price: '25 €',
      postre: 'Crema catalana, flan de vainilla o pastel de frutas',
      inclDessert: true,
      primeros: [
        { name: 'Surtido de tapas', description: 'para compartir' },
        { name: 'Mejillones al vapor', description: 'con limón' },
        { name: 'Pan con jamón ibérico', description: 'D.O.' },
        { name: 'Ensalada de temporada' },
        { name: 'Carpaccio de ternera', description: 'con parmesano' },
      ],
      segundos: [
        { name: 'Arroz con bogavante', description: 'caldoso (mín. 2)' },
        { name: 'Chuletón madurado a la brasa', description: 'con guarnición' },
        { name: 'Lubina a la espalda', description: 'refrito de ajos' },
        { name: 'Paella mixta', description: 'mín. 2 pax' },
        { name: 'Bacalao confitado', description: 'muselina de ajo' },
      ],
    },
  ]

  for (const m of menus) {
    const { primeros, segundos, ...menuData } = m
    const menu = await prisma.dailyMenu.upsert({
      where: { dayOfWeek: m.dayOfWeek },
      update: menuData,
      create: menuData,
    })
    // Delete existing dishes and recreate
    await prisma.dailyDish.deleteMany({ where: { menuId: menu.id } })
    for (const [i, d] of primeros.entries()) {
      await prisma.dailyDish.create({ data: { ...d, menuId: menu.id, course: 'primero', sortOrder: i } })
    }
    for (const [i, d] of segundos.entries()) {
      await prisma.dailyDish.create({ data: { ...d, menuId: menu.id, course: 'segundo', sortOrder: i } })
    }
  }
  console.log('✓ Menús del día (7 días) creados')

  console.log('')
  console.log('✅ Seed completado correctamente')
  console.log('')
  console.log('  Admin login: admin@rebostmontigala.com')
  console.log('  Password:    rebost2024! (¡cámbiala en producción!)')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
