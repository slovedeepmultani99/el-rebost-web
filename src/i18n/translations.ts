export type Locale = "es" | "ca" | "en"
export const LOCALES: Locale[] = ["es", "ca", "en"]
export const LOCALE_LABELS: Record<Locale, string> = { es: "ES", ca: "CA", en: "EN" }

export interface Translations {
  nav: {
    carta: string; menu: string; reservas: string; resenas: string; reservar: string
    casa: string; grupos: string; contacto: string; llamar: string
  }
  topbar: { open: string }
  hero: { cta1: string; cta2: string }
  carta: {
    eyebrow: string; title: string; desc: string
    star: string; veg: string; sg: string
    hidden: string; hiddenDesc: string; call: string; email: string; whatsapp: string
  }
  menu: {
    eyebrow: string; title: string; today: string; tomorrow: string
    primeros: string; segundos: string; supplement: string
    includes: string; pan: string; bebida: string; postre: string; cafe: string
    notAvailable: string; price: string; dessert: string; choosePrimero: string; chooseSegundo: string
  }
  reservas: {
    eyebrow: string; title: string; desc: string
    comidas: string; comidasSub: string
    cenas: string; cenasSub: string
    grupos: string; gruposSub: string
    parking: string; parkingSub: string
    form: {
      name: string; phone: string; date: string; guests: string
      service: string; time: string; notes: string; notesPlaceholder: string
      lunch: string; dinner: string; submit: string
      success: string; successSub: string; successWa: string; newBooking: string
      groupError: string; dinnerWarning: string; sending: string
      whatsapp: string
    }
  }
  extras: {
    eyebrow: string; title: string; desc: string
    call: string; email: string; whatsapp: string
    takeaway: string; takeawayDesc: string; takeawayEyebrow: string
  }
  socials: { title: string; subtitle: string; follow: string }
  footer: { rights: string; legal: string; privacy: string; allergens: string }
  contacto: { eyebrow: string; title: string; schedule: string; address: string; phone: string; map: string; follow: string; today: string }
  common: { loading: string; noSlots: string; close: string }
}

const t: Record<Locale, Translations> = {
  es: {
    nav: {
      carta: "Carta", menu: "Menú del día", reservas: "Reservas",
      resenas: "Reseñas", reservar: "Reservar mesa",
      casa: "La casa", grupos: "Grupos", contacto: "Contacto", llamar: "Llamar",
    },
    topbar: { open: "Abierto ahora" },
    hero: { cta1: "Reservar mesa", cta2: "Ver menú del día" },
    carta: {
      eyebrow: "A la carta · todo el día", title: "Nuestra carta",
      desc: "De la tapa tradicional al chuletón madurado. Producto, brasa y arroces caseros.",
      star: "Estrella de la casa", veg: "Vegano", sg: "Sin gluten",
      hidden: "¿Quieres conocer nuestra carta?",
      hiddenDesc: "Llámanos o escríbenos y te la explicamos con mucho gusto.",
      call: "Llamar", email: "Email", whatsapp: "WhatsApp",
    },
    menu: {
      eyebrow: "Se actualiza cada día", title: "El menú del día", today: "Menú de hoy · actualizado", tomorrow: "Menú de mañana · avance",
      primeros: "Primeros", segundos: "Segundos", supplement: "Suplemento",
      includes: "Incluye", pan: "Pan", bebida: "Bebida", postre: "Postre", cafe: "Café",
      notAvailable: "No hay menú disponible para este día", price: "Precio",
      dessert: "Postre", choosePrimero: "Para empezar — elige uno", chooseSegundo: "Principal — elige uno",
    },
    reservas: {
      eyebrow: "Reservas online", title: "Reserva tu mesa en 30 segundos",
      desc: "Confirmación inmediata. Recomendamos reservar: somos un sitio muy concurrido, sobre todo los fines de semana.",
      comidas: "Comidas todos los días", comidasSub: "De 13:00 a 16:00 h",
      cenas: "Cenas miércoles a sábado", cenasSub: "De 19:30 a 23:00 h",
      grupos: "¿Grupos de +40?", gruposSub: "Llámanos",
      parking: "Fácil aparcamiento", parkingSub: "Junto al CC Montigalà · parking a 80 m",
      form: {
        name: "Nombre y apellido", phone: "Teléfono", date: "Fecha",
        guests: "Comensales", service: "Servicio", time: "Hora",
        notes: "Peticiones (opcional)", notesPlaceholder: "Trona, terraza, celebración, alergias…",
        lunch: "Comida", dinner: "Cena", submit: "Confirmar reserva",
        success: "¡Reserva recibida! ✓", successSub: "Te confirmamos por teléfono en breve. ¡Hasta pronto!",
        successWa: "Confirmar por WhatsApp", newBooking: "Hacer otra reserva",
        groupError: "Para grupos de más de 40 personas, llámenos al",
        dinnerWarning: "Las cenas están disponibles de miércoles a sábado.",
        sending: "Enviando...", whatsapp: "¿Prefieres hacerlo por WhatsApp? Escríbenos",
      },
    },
    extras: {
      eyebrow: "Grupos · empresas · celebraciones", title: "Tu evento, como en casa",
      desc: "Bautizos, comidas de empresa, cumpleaños y comuniones. Salón para hasta 45 comensales y menús cerrados a tu medida.",
      call: "Llamar", email: "Email", whatsapp: "WhatsApp",
      takeawayEyebrow: "Para llevar", takeaway: "Take away",
      takeawayDesc: "¿Te apetece nuestra cocina en casa? Pide tu arroz, tu brasa o tus tapas para recoger.",
    },
    socials: { title: "Síguenos en redes", subtitle: "Comparte la experiencia y no te pierdas ninguna novedad", follow: "Seguir" },
    footer: { rights: "Todos los derechos reservados", legal: "Aviso legal", privacy: "Privacidad", allergens: "Alérgenos" },
    contacto: {
      eyebrow: "Encuéntranos", title: "Te esperamos en Montigalà",
      schedule: "Horario", address: "Dirección", phone: "Reservas", map: "Ver en Google Maps",
      follow: "Síguenos", today: "hoy",
    },
    common: { loading: "Cargando…", noSlots: "Sin horarios disponibles", close: "Cerrar" },
  },

  ca: {
    nav: {
      carta: "Carta", menu: "Menú del dia", reservas: "Reserves",
      resenas: "Ressenyes", reservar: "Reservar taula",
      casa: "La casa", grupos: "Grups", contacto: "Contacte", llamar: "Trucar",
    },
    topbar: { open: "Obert ara" },
    hero: { cta1: "Reservar taula", cta2: "Veure el menú del dia" },
    carta: {
      eyebrow: "A la carta · tot el dia", title: "La nostra carta",
      desc: "De la tapa tradicional al chuletón madurat. Producte, brasa i arrossos casolans.",
      star: "Estrella de la casa", veg: "Vegà", sg: "Sense gluten",
      hidden: "Voleu conèixer la nostra carta?",
      hiddenDesc: "Truqueu-nos o escriviu-nos i us l'expliquem amb molt de gust.",
      call: "Trucar", email: "Correu", whatsapp: "WhatsApp",
    },
    menu: {
      eyebrow: "S'actualitza cada dia", title: "El menú del dia", today: "Menú d'avui · actualitzat", tomorrow: "Menú de demà · avançament",
      primeros: "Primers", segundos: "Segons", supplement: "Suplement",
      includes: "Inclou", pan: "Pa", bebida: "Beguda", postre: "Postres", cafe: "Cafè",
      notAvailable: "No hi ha menú disponible per a aquest dia", price: "Preu",
      dessert: "Postres", choosePrimero: "Per començar — en trieu un", chooseSegundo: "Principal — en trieu un",
    },
    reservas: {
      eyebrow: "Reserves en línia", title: "Reserva la teva taula en 30 segons",
      desc: "Confirmació immediata. Us recomanem reservar: som un lloc molt concorregut, sobretot els caps de setmana.",
      comidas: "Àpats tots els dies", comidasSub: "De 13:00 a 16:00 h",
      cenas: "Sopars dimecres a dissabte", cenasSub: "De 19:30 a 23:00 h",
      grupos: "Grups de +40?", gruposSub: "Truqueu-nos",
      parking: "Aparcament fàcil", parkingSub: "Al costat del CC Montigalà · pàrquing a 80 m",
      form: {
        name: "Nom i cognoms", phone: "Telèfon", date: "Data",
        guests: "Comensals", service: "Servei", time: "Hora",
        notes: "Peticions (opcional)", notesPlaceholder: "Tona, terrassa, celebració, al·lèrgies…",
        lunch: "Dinar", dinner: "Sopar", submit: "Confirmar reserva",
        success: "Reserva rebuda! ✓", successSub: "Us confirarem per telèfon aviat. Fins aviat!",
        successWa: "Confirmar per WhatsApp", newBooking: "Fer una altra reserva",
        groupError: "Per a grups de més de 40 persones, truqueu al",
        dinnerWarning: "Els sopars estan disponibles de dimecres a dissabte.",
        sending: "Enviant...", whatsapp: "Preferiu fer-ho per WhatsApp? Escriviu-nos",
      },
    },
    extras: {
      eyebrow: "Grups · empreses · celebracions", title: "El teu esdeveniment, com a casa",
      desc: "Batejos, dinars d'empresa, aniversaris i comunions. Saló per a fins a 45 comensals i menús tancats a mida.",
      call: "Trucar", email: "Correu", whatsapp: "WhatsApp",
      takeawayEyebrow: "Per emportar", takeaway: "Take away",
      takeawayDesc: "Us ve de gust la nostra cuina a casa? Demaneu el vostre arròs, la brasa o les tapes per recollir.",
    },
    socials: { title: "Seguiu-nos a les xarxes", subtitle: "Compartiu l'experiència i no us perdeu cap novetat", follow: "Seguir" },
    footer: { rights: "Tots els drets reservats", legal: "Avís legal", privacy: "Privacitat", allergens: "Al·lèrgens" },
    contacto: {
      eyebrow: "Com trobar-nos", title: "Us esperem a Montigalà",
      schedule: "Horari", address: "Adreça", phone: "Reserves", map: "Veure a Google Maps",
      follow: "Seguiu-nos", today: "avui",
    },
    common: { loading: "Carregant…", noSlots: "Sense horaris disponibles", close: "Tancar" },
  },

  en: {
    nav: {
      carta: "Menu", menu: "Daily Menu", reservas: "Reservations",
      resenas: "Reviews", reservar: "Book a Table",
      casa: "About", grupos: "Groups", contacto: "Contact", llamar: "Call",
    },
    topbar: { open: "Open now" },
    hero: { cta1: "Book a Table", cta2: "See Today's Menu" },
    carta: {
      eyebrow: "À la carte · all day", title: "Our Menu",
      desc: "From traditional tapas to dry-aged ribeye. Quality produce, woodfire grill and homemade rice dishes.",
      star: "House favourite", veg: "Vegan", sg: "Gluten-free",
      hidden: "Want to know our menu?",
      hiddenDesc: "Call or message us and we'll be happy to tell you all about it.",
      call: "Call us", email: "Email", whatsapp: "WhatsApp",
    },
    menu: {
      eyebrow: "Updated daily", title: "Daily Menu", today: "Today's menu · updated", tomorrow: "Tomorrow's menu · preview",
      primeros: "Starters", segundos: "Mains", supplement: "Supplement",
      includes: "Includes", pan: "Bread", bebida: "Drink", postre: "Dessert", cafe: "Coffee",
      notAvailable: "No menu available for today", price: "Price",
      dessert: "Dessert", choosePrimero: "To start — choose one", chooseSegundo: "Main — choose one",
    },
    reservas: {
      eyebrow: "Online reservations", title: "Book Your Table in 30 Seconds",
      desc: "Instant confirmation. We recommend booking — we get very busy, especially at weekends.",
      comidas: "Lunch every day", comidasSub: "1:00 pm – 4:00 pm",
      cenas: "Dinner Wed – Sat", cenasSub: "7:30 pm – 11:00 pm",
      grupos: "Groups of 40+?", gruposSub: "Call us",
      parking: "Easy parking", parkingSub: "Next to CC Montigalà · car park 80 m away",
      form: {
        name: "Full name", phone: "Phone number", date: "Date",
        guests: "Guests", service: "Service", time: "Time",
        notes: "Special requests (optional)", notesPlaceholder: "High chair, terrace, celebration, allergies…",
        lunch: "Lunch", dinner: "Dinner", submit: "Confirm booking",
        success: "Booking received! ✓", successSub: "We'll confirm by phone shortly. See you soon!",
        successWa: "Confirm via WhatsApp", newBooking: "Make another booking",
        groupError: "For groups of more than 40 people, please call",
        dinnerWarning: "Dinner service is available Wednesday to Saturday.",
        sending: "Sending...", whatsapp: "Prefer WhatsApp? Message us",
      },
    },
    extras: {
      eyebrow: "Groups · companies · celebrations", title: "Planning a special event?",
      desc: "Business lunches, family celebrations and private events. Dining room for up to 45 guests and custom set menus.",
      call: "Call us", email: "Email", whatsapp: "WhatsApp",
      takeawayEyebrow: "Takeaway", takeaway: "Take away",
      takeawayDesc: "Fancy our food at home? Order your rice, grill or tapas to collect.",
    },
    socials: { title: "Follow us", subtitle: "Share the experience and stay up to date with our news", follow: "Follow" },
    footer: { rights: "All rights reserved", legal: "Legal notice", privacy: "Privacy policy", allergens: "Allergens" },
    contacto: {
      eyebrow: "Getting here", title: "Visit Us in Montigalà",
      schedule: "Opening hours", address: "Address", phone: "Reservations", map: "View on Google Maps",
      follow: "Follow us", today: "today",
    },
    common: { loading: "Loading…", noSlots: "No time slots available", close: "Close" },
  },
}

export default t
