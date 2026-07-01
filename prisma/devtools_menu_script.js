// ─────────────────────────────────────────────────────────────────────────────
// Script per actualitzar el menú del dia des de la consola del navegador
// Obre el backoffice (/admin), F12 → Consola, enganxa i executa
//
// dayOfWeek: 0=Diumenge 1=Dilluns 2=Dimarts 3=Dimecres 4=Dijous 5=Divendres 6=Dissabte
// ─────────────────────────────────────────────────────────────────────────────

const DAY = 1 // ← canvia el dia

const MENU = {
  price:      "16 €",
  postre:     "Postre casolà del dia, fruita o cafè",
  inclBread:  true,
  inclDrink:  true,
  inclCoffee: false,
  inclDessert: false,
  active:     true,
  dishes: [
    // ── Primers ──────────────────────────────────────────────────────────────
    {
      course:        "primero",
      name:          "Crema de verdures",
      name_ca:       "Crema de verdures",
      description:   "Con picatostes",
      description_ca:"Amb picatostos",
      isSupplement:  false,
      suppPrice:     "",
    },
    {
      course:        "primero",
      name:          "Ensalada mixta",
      name_ca:       "Amanida mixta",
      description:   "",
      description_ca:"",
      isSupplement:  false,
      suppPrice:     "",
    },
    {
      course:        "primero",
      name:          "Macarrones a la bolonesa",
      name_ca:       "Macarrons a la bolonyesa",
      description:   "",
      description_ca:"",
      isSupplement:  false,
      suppPrice:     "",
    },
    // ── Segons ───────────────────────────────────────────────────────────────
    {
      course:        "segundo",
      name:          "Pollo a la plancha",
      name_ca:       "Pollastre a la planxa",
      description:   "Con guarnición",
      description_ca:"Amb guarnició",
      isSupplement:  false,
      suppPrice:     "",
    },
    {
      course:        "segundo",
      name:          "Merluza al horno",
      name_ca:       "Lluç al forn",
      description:   "Con patatas y alioli",
      description_ca:"Amb patates i allioli",
      isSupplement:  false,
      suppPrice:     "",
    },
    {
      course:        "segundo",
      name:          "Chuletón a la brasa",
      name_ca:       "Entrecot a la brasa",
      description:   "Con patatas fritas",
      description_ca:"Amb patates fregides",
      isSupplement:  true,
      suppPrice:     "+3 €",
    },
  ],
}

// ── Executa ──────────────────────────────────────────────────────────────────
fetch(`/api/menu/${DAY}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(MENU),
})
  .then(r => r.json())
  .then(d => { console.log("✅ Menú guardat:", d) })
  .catch(e => { console.error("❌ Error:", e) })
