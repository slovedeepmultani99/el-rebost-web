// prisma/seed.ts
// Datos iniciales — El Rebost de Montigalà
// Ejecutar: npx prisma db seed

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding El Rebost de Montigalà...')

  // ── Admin user ──────────────────────────────
  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@rebostmontigala.com'
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'rebost2024!'
  if (!process.env.ADMIN_PASSWORD) {
    console.warn('⚠️  ADMIN_PASSWORD no definida — usando contraseña por defecto. ¡CÁMBIALA ANTES DE PRODUCCIÓN!')
  }
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: await bcrypt.hash(adminPassword, 12),
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
        plate1Url: '/fotos/chuleton.jpg',
        plate1Badge: 'De la brasa',
        plate1Name: 'Chuletón madurado',
        plate2Url: '/fotos/mariscada2.jpg',
        plate2Badge: 'Casero',
        plate2Name: 'Arroz con bogavante',
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
        ig: 'https://www.instagram.com/elrebostdemontigala.es/',
        fb: 'https://www.facebook.com/profile.php?id=61590794408041',
        tiktok: '',
        tripadvisor: 'https://www.tripadvisor.es/Restaurant_Review-g665816-d2708401-Reviews-El_Rebost_de_Montigala-Badalona_Catalonia.html',
        addr: 'Carrer Manuel Moreno Mauricio, 35-37, 08917 Badalona, Barcelona',
        email: '',
        showResenas: true,
      },
    },
    {
      key: 'horarios',
      value: [
        { dias: 'Lunes – Martes', horas: '11:30 – 17:00', nota: 'Solo comidas' },
        { dias: 'Miércoles – Jueves', horas: '11:30 – 17:00 · 19:30 – 23:00', nota: 'Comida y cena' },
        { dias: 'Viernes', horas: '11:30 – 17:00 · 19:30 – 24:00', nota: 'Comida y cena' },
        { dias: 'Sábado', horas: '11:30 – 17:30 · 19:30 – 24:00', nota: 'Comida y cena' },
        { dias: 'Domingo', horas: '11:30 – 17:00', nota: 'Solo comidas' },
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
  // Limpiar carta existente antes de recrear
  await prisma.cartaDish.deleteMany()
  await prisma.cartaSection.deleteMany()

  const cartaSections = [
    {
      title: 'Tapas', sortOrder: 1,
      dishes: [
        { name: 'Empanada de carne y huevo duro (u.)', description: 'Picante opcional', price: 4.95, sortOrder: 1 },
        { name: 'Patatas bravas caseras', price: 6.45, sortOrder: 2, isVeg: true },
        { name: 'Morcilla de Burgos', price: 6.95, sortOrder: 3 },
        { name: 'Oreja a la gallega', price: 7.95, sortOrder: 4 },
        { name: 'Fingers de pollo', price: 8.95, sortOrder: 5 },
        { name: 'Croquetas de jamón caseras (6u.)', price: 9.90, sortOrder: 6, isStar: true },
        { name: 'Croquetas de pollo caseras (6u.)', price: 9.90, sortOrder: 7 },
        { name: 'Torreznos de Soria', price: 9.95, sortOrder: 8 },
        { name: 'Boquerones en vinagre caseros', price: 9.95, sortOrder: 9 },
        { name: 'Buñuelos de bacalao', price: 9.95, sortOrder: 10 },
        { name: 'Callos con cap i pota', price: 10.45, sortOrder: 11 },
      ],
    },
    {
      title: 'Del Mar', sortOrder: 2,
      dishes: [
        { name: 'Tiras de choco a la andaluza', price: 7.95, sortOrder: 1 },
        { name: 'Mejillones al vapor o a la marinera', price: 8.90, sortOrder: 2 },
        { name: 'Lomos de boquerones a la gaditana', price: 9.90, sortOrder: 3 },
        { name: 'Chipirones a la andaluza', price: 9.95, sortOrder: 4 },
        { name: 'Tortilla de bacalao estilo sidrería', price: 10.95, sortOrder: 5 },
        { name: 'Calamarcitos a la andaluza', price: 11.90, sortOrder: 6 },
        { name: 'Gambas al ajillo', price: 14.90, sortOrder: 7, isStar: true },
      ],
    },
    {
      title: 'Entrantes', sortOrder: 3,
      dishes: [
        { name: 'Solomillo ibérico con queso brie', price: 7.95, sortOrder: 1 },
        { name: 'Solomillo ibérico con cebolla caramelizada y roquefort', price: 8.45, sortOrder: 2 },
        { name: 'Cuña de queso manchego curado', price: 9.90, sortOrder: 3, isVeg: true },
        { name: 'Carpaccio de tomate con boquerones en vinagre', price: 9.95, sortOrder: 4 },
        { name: 'Anchoas del Cantábrico (6u.)', price: 11.90, sortOrder: 5, isStar: true },
        { name: 'Carpaccio de salmón y bacalao', description: 'Con vinagreta de verduras', price: 15.95, sortOrder: 6 },
        { name: 'Carpaccio de ternera con láminas de parmesano', price: 16.95, sortOrder: 7 },
        { name: 'Plato de paleta ibérica cortada a cuchillo', price: 19.95, sortOrder: 8, isStar: true },
      ],
    },
    {
      title: 'Ensaladas', sortOrder: 4,
      dishes: [
        { name: 'De la huerta con atún y huevo duro', price: 9.90, sortOrder: 1 },
        { name: 'De rulo de cabra con frutos secos y virutas de ibérico', price: 11.90, sortOrder: 2 },
        { name: 'Timbal de escalivada con anchoas', price: 11.90, sortOrder: 3 },
      ],
    },
    {
      title: 'Sopas y Pastas', note: 'Salsas a elegir: pesto, carbonara, ceps, funghi o napolitana', sortOrder: 5,
      dishes: [
        { name: 'Tallarines de pasta fresca', price: 8.90, sortOrder: 1, isVeg: true },
        { name: 'Canelones de la casa', price: 9.90, sortOrder: 2 },
        { name: 'Raviolis frescos de cuatro quesos', price: 9.90, sortOrder: 3, isVeg: true },
        { name: 'Sopa de pescado y marisco', price: 12.90, sortOrder: 4 },
      ],
    },
    {
      title: 'Pan', sortOrder: 6,
      dishes: [
        { name: 'Ración de pan con tomate o sin tomate', price: 2.60, sortOrder: 1, isVeg: true },
      ],
    },
    {
      title: 'Con 2 Huevos Rotos', sortOrder: 7,
      dishes: [
        { name: 'Con torreznos', price: 11.90, sortOrder: 1 },
        { name: 'Con jamón y foie rallado', price: 12.90, sortOrder: 2 },
        { name: 'Al nido sobre patata paja, reducción de Oporto y foie rallado', price: 12.90, sortOrder: 3 },
        { name: 'Con gambas al ajillo', price: 14.90, sortOrder: 4 },
      ],
    },
    {
      title: 'Torradas', sortOrder: 8,
      dishes: [
        { name: 'Sobrasada con miel', price: 8.90, sortOrder: 1 },
        { name: 'Lomo con queso y pimiento verde', price: 9.90, sortOrder: 2 },
        { name: 'Solomillo de ibérico, cebolla confitada y cheddar', price: 10.90, sortOrder: 3 },
        { name: 'Escalivada con atún', price: 11.90, sortOrder: 4 },
        { name: 'Escalivada con anchoas', price: 11.90, sortOrder: 5 },
      ],
    },
    {
      title: 'Arroces y Fideuà', subtitle: 'Mínimo 2 personas', sortOrder: 9,
      dishes: [
        { name: 'Fideuà de marisco y sepia', price: 15.90, sortOrder: 1 },
        { name: 'Paella marinera', price: 17.90, sortOrder: 2 },
        { name: 'Arroz negro con sepia, langostino y almejas', price: 17.90, sortOrder: 3 },
        { name: 'Caldereta de bogavante', price: 23.90, sortOrder: 4, isStar: true },
        { name: 'Arroz caldoso con bogavante', description: 'Mariscada', price: 23.90, sortOrder: 5, isStar: true },
      ],
    },
    {
      title: 'Bacalao', sortOrder: 10,
      dishes: [
        { name: 'Con romesco y alioli', price: 16.90, sortOrder: 1 },
        { name: 'A la llauna', price: 16.90, sortOrder: 2 },
        { name: 'Con muselina de miel y setas frescas', price: 16.90, sortOrder: 3 },
        { name: 'Con salsa vizcaína', price: 16.90, sortOrder: 4 },
      ],
    },
    {
      title: 'Carnes', note: 'A la brasa · guarnición a elegir: patatas fritas y pimientos de Padrón, arroz o ensalada', sortOrder: 11,
      dishes: [
        { name: 'Milanesa de pollo clásica', price: 8.90, sortOrder: 1 },
        { name: 'Butifarra de cerdo con judías blancas', price: 9.95, sortOrder: 2 },
        { name: 'Milanesa napolitana de pollo', price: 10.45, sortOrder: 3 },
        { name: 'Milanesa de ternera clásica', price: 12.45, sortOrder: 4 },
        { name: 'Pie de cerdo deshuesado a la brasa con relleno de setas frescas', price: 12.90, sortOrder: 5 },
        { name: 'Solomillo de orza con huevos cabreados', price: 12.90, sortOrder: 6 },
        { name: 'Milanesa napolitana de ternera', price: 13.90, sortOrder: 7 },
        { name: 'Hamburguesa de ternera completa con fritas', price: 13.90, sortOrder: 8 },
        { name: 'Churrasco de Angus a la brasa', price: 14.90, sortOrder: 9 },
        { name: 'Vacío de ternera a la brasa', price: 14.90, sortOrder: 10 },
        { name: 'Entrecot de ternera a la brasa', price: 16.90, sortOrder: 11, isStar: true },
      ],
    },
    {
      title: 'Salsas', subtitle: '3,00€ por unidad', isSalsas: true, sortOrder: 12,
      dishes: [
        { name: 'Roquefort', price: 3.00, sortOrder: 1 },
        { name: 'Pimienta verde', price: 3.00, sortOrder: 2 },
        { name: 'Ceps', price: 3.00, sortOrder: 3 },
        { name: 'Alioli', price: 3.00, sortOrder: 4, isVeg: true },
      ],
    },
    {
      title: 'Sugerencias del Chef · Entrantes', sortOrder: 13,
      dishes: [
        { name: 'Canelón de pasta brick de rabo de toro', description: 'Con setas y reducción de Oporto', price: 11.95, sortOrder: 1, isStar: true },
        { name: 'Caracoles a la llauna', price: 11.95, sortOrder: 2 },
        { name: 'Coquinas salteadas con ajos y perejil', price: 12.95, sortOrder: 3 },
        { name: 'Navajas a la plancha', price: 12.95, sortOrder: 4 },
        { name: 'Pulpo á Feira', price: 19.95, sortOrder: 5, isStar: true },
        { name: 'Almejas a la marinera o a la plancha', price: 21.95, sortOrder: 6, isStar: true },
      ],
    },
    {
      title: 'Sugerencias del Chef · Carnes', sortOrder: 14,
      dishes: [
        { name: 'Rabo de toro guisado al vino tinto', description: 'Con pochas de Navarra', price: 17.95, sortOrder: 1, isStar: true },
        { name: 'Solomillo de ternera con foie y setas', description: 'Con reducción de Oporto', price: 27.95, sortOrder: 2, isStar: true },
        { name: 'Chuletón de ternera (al peso)', description: '36€/kg', sortOrder: 3, isStar: true },
      ],
    },
    {
      title: 'Sugerencias del Chef · Pescados y Mariscos', sortOrder: 15,
      dishes: [
        { name: 'Cogote de merluza a la brasa', description: 'Con sofrito de ajo, chistorra y verduras al vapor', price: 12.95, sortOrder: 1 },
        { name: 'Pica-Pica Marinero', price: 16.95, sortOrder: 2, isStar: true },
        { name: 'Cola de rape a la brasa', description: 'Con sofrito de ajo, chistorra y verduras al vapor', price: 17.95, sortOrder: 3 },
        { name: 'Mariscada para dos personas', description: 'Acompañada de vino turbio', price: 69.95, sortOrder: 4, isStar: true },
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
  console.log('✓ Carta creada (15 secciones con precios)')

  // ── Menús del día (7 días) ─────────────────
  const menus = [
    {
      // Domingo — menú fin de semana (actualizado 20-21 jun 2026)
      dayOfWeek: 0, price: '30,95 €',
      postre: 'Postre incluido · Bebida y café no incluidos',
      inclBread: true, inclDrink: false, inclCoffee: false, inclDessert: true,
      primeros: [
        { name: 'Tartar de salmón con aguacate', description: 'Vinagreta de mostaza, miel y soja' },
        { name: 'Canelones de pasta fresca rellenos de pollo', description: 'Gratinados con bechamel y queso' },
        { name: 'Timbal de escalivada con rulo de cabra tibio' },
        { name: 'Salmorejo con jamón y huevo duro' },
        { name: 'Sartén de huevos rotos con patata confitada y jamón ibérico' },
      ],
      segundos: [
        { name: 'Caldero de arroz caldoso con centollo, chirlas y sepia' },
        { name: 'Arroz de montaña con judías verdes, pollo y costilla de cerdo' },
        { name: 'Atún a la plancha con tomate fresco' },
        { name: 'Solomillo de orza con huevo roto y patata paja' },
        { name: 'Entrecot de ternera a la brasa con patatas fritas y pimientos de Padrón' },
        { name: 'Caldero de arroz caldoso con bogavante, chirlas y sepia', isSupplement: true, suppPrice: '+5,95€' },
      ],
    },
    {
      // Lunes
      dayOfWeek: 1, price: '16 €',
      postre: 'Postre casero del día, fruta o café',
      inclBread: true, inclDrink: true, inclCoffee: false, inclDessert: false,
      primeros: [
        { name: 'Escudella casera', description: 'Sopa tradicional con pilota' },
        { name: 'Ensalada de la huerta', description: 'Tomate, atún y olivada' },
        { name: 'Canelones de la abuela', description: 'Gratinados con bechamel' },
        { name: 'Croquetas de jamón (4 u.)', description: 'Caseras' },
      ],
      segundos: [
        { name: 'Pollo de corral a la brasa', description: 'Con patatas panadera' },
        { name: 'Merluza a la plancha', description: 'Verduras de temporada' },
        { name: 'Albóndigas con sepia', description: 'Mar y montaña' },
        { name: 'Butifarra con mongetes y setas', description: 'A la brasa' },
      ],
    },
    {
      // Martes
      dayOfWeek: 2, price: '16 €',
      postre: 'Postre casero del día, fruta o café',
      inclBread: true, inclDrink: true, inclCoffee: false, inclDessert: false,
      primeros: [
        { name: 'Crema de calabaza', description: 'Con aceite tostado' },
        { name: 'Macarrones a la boloñesa', description: 'Gratinados al horno' },
        { name: 'Ensalada de garbanzos', description: 'Bacalao y pimientos' },
        { name: 'Fideos a la cazuela' },
      ],
      segundos: [
        { name: 'Entrecot a la brasa', description: 'Pimientos de padrón' },
        { name: 'Bacalao a la llauna', description: 'Tomate y ajo' },
        { name: 'Fricandó de ternera', description: 'Setas de temporada' },
        { name: 'Escalope de pollo', description: 'Con guarnición' },
      ],
    },
    {
      // Miércoles
      dayOfWeek: 3, price: '16 €',
      postre: 'Postre casero del día, fruta o café',
      inclBread: true, inclDrink: true, inclCoffee: false, inclDessert: false,
      primeros: [
        { name: 'Lentejas estofadas', description: 'Chorizo y verduras' },
        { name: 'Arroz a la cubana', description: 'Huevo y plátano' },
        { name: 'Esqueixada de bacalao', description: 'Pimiento, tomate y olivas' },
        { name: 'Sopa de pescado casera del día' },
      ],
      segundos: [
        { name: 'Costillas de cerdo lacadas', description: 'Miel y romero' },
        { name: 'Calamares a la romana', description: 'Con alioli' },
        { name: 'Pechuga rellena', description: 'Jamón y queso' },
        { name: 'Lomo de cerdo a la brasa' },
      ],
    },
    {
      // Jueves
      dayOfWeek: 4, price: '16 €',
      postre: 'Postre casero del día, fruta o café',
      inclBread: true, inclDrink: true, inclCoffee: false, inclDessert: false,
      primeros: [
        { name: 'Fideuà del día', description: 'Sepia y gambas' },
        { name: 'Espinacas a la catalana', description: 'Piñones y pasas' },
        { name: 'Ensalada de la casa', description: 'Atún y aceitunas' },
        { name: 'Sopa de verduras casera' },
      ],
      segundos: [
        { name: 'Butifarra del país con setas', description: 'A la brasa' },
        { name: 'Lomo de salmón', description: 'Sobre verduritas' },
        { name: 'Conejo al ajillo', description: 'Con patatas' },
        { name: 'Escalope de ternera' },
      ],
    },
    {
      // Viernes
      dayOfWeek: 5, price: '16 €',
      postre: 'Postre casero del día, fruta o café',
      inclBread: true, inclDrink: true, inclCoffee: false, inclDessert: false,
      primeros: [
        { name: 'Croquetas del día (4 u.)', description: 'Caseras' },
        { name: 'Ensalada mezclum', description: 'Con vinagreta' },
        { name: 'Sopa de pescadores del día' },
        { name: 'Arroz blanco con verduras' },
      ],
      segundos: [
        { name: 'Solomillo a la brasa', description: 'Reducción de Pedro Ximénez' },
        { name: 'Dorada a la sal', description: 'Con verduritas' },
        { name: 'Rabo de toro estofado' },
        { name: 'Hamburguesa de ternera', description: 'Con patatas' },
      ],
    },
    {
      // Sábado — menú fin de semana (actualizado 20-21 jun 2026)
      dayOfWeek: 6, price: '30,95 €',
      postre: 'Postre incluido · Bebida y café no incluidos',
      inclBread: true, inclDrink: false, inclCoffee: false, inclDessert: true,
      primeros: [
        { name: 'Tartar de salmón con aguacate', description: 'Vinagreta de mostaza, miel y soja' },
        { name: 'Canelones de pasta fresca rellenos de pollo', description: 'Gratinados con bechamel y queso' },
        { name: 'Timbal de escalivada con rulo de cabra tibio' },
        { name: 'Salmorejo con jamón y huevo duro' },
        { name: 'Sartén de huevos rotos con patata confitada y jamón ibérico' },
      ],
      segundos: [
        { name: 'Caldero de arroz caldoso con centollo, chirlas y sepia' },
        { name: 'Arroz de montaña con judías verdes, pollo y costilla de cerdo' },
        { name: 'Atún a la plancha con tomate fresco' },
        { name: 'Solomillo de orza con huevo roto y patata paja' },
        { name: 'Entrecot de ternera a la brasa con patatas fritas y pimientos de Padrón' },
        { name: 'Caldero de arroz caldoso con bogavante, chirlas y sepia', isSupplement: true, suppPrice: '+5,95€' },
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
    await prisma.dailyDish.deleteMany({ where: { menuId: menu.id } })
    for (const [i, d] of primeros.entries()) {
      await prisma.dailyDish.create({ data: { ...d, menuId: menu.id, course: 'primero', sortOrder: i } })
    }
    for (const [i, d] of segundos.entries()) {
      await prisma.dailyDish.create({ data: { ...d, menuId: menu.id, course: 'segundo', sortOrder: i } })
    }
  }
  console.log('✓ Menús del día (7 días) creados')

  // ── Galería ────────────────────────────────
  await prisma.galleryImage.deleteMany()
  const galeriaImages = [
    { imageUrl: '/fotos/el-rebost-de-montigala.jpg', title: 'El Rebost de Montigalà', sortOrder: 1 },
    { imageUrl: '/fotos/chuleton.jpg', title: 'Chuletón madurado a la brasa', sortOrder: 2 },
    { imageUrl: '/fotos/mariscada2.jpg', title: 'Mariscada de la casa', sortOrder: 3 },
    { imageUrl: '/fotos/Canelon_Rabo_toro.jpg', title: 'Canelón de rabo de toro', sortOrder: 4 },
    { imageUrl: '/fotos/tapas.jpg', title: 'Tapas de la casa', sortOrder: 5 },
    { imageUrl: '/fotos/huevos-con-torreznos.jpg', title: 'Huevos con torreznos', sortOrder: 6 },
    { imageUrl: '/fotos/entrada.jpg', title: 'Entrada del restaurante', sortOrder: 7 },
    { imageUrl: '/fotos/postre_casero.jpg', title: 'Postre casero del día', sortOrder: 8 },
    { imageUrl: '/fotos/nuestros-platos-del-dia.jpg', title: 'Platos del día', sortOrder: 9 },
    { imageUrl: '/fotos/mariscada.jpg', title: 'Mariscada', sortOrder: 10 },
    { imageUrl: '/fotos/imagen1.jpeg', title: 'El Rebost', sortOrder: 11 },
    { imageUrl: '/fotos/imagen2.jpeg', title: 'El Rebost', sortOrder: 12 },
    { imageUrl: '/fotos/imagen3.jpeg', title: 'El Rebost', sortOrder: 13 },
  ]
  for (const img of galeriaImages) {
    await prisma.galleryImage.create({ data: { ...img, active: true } })
  }
  console.log(`✓ Galería creada (${galeriaImages.length} imágenes)`)

  console.log('')
  console.log('✅ Seed completado correctamente')
  console.log('')
  console.log('  Admin login: admin@rebostmontigala.com')
  console.log('  Password:    rebost2024! (¡cámbiala en producción!)')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(async () => { await prisma.$disconnect() })
