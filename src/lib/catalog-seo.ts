import type { Lang } from "./i18n";

/** Catalog filter keys accepted in the URL (?f=...). */
export type CatalogFilter = "all" | "venta" | "alquiler" | "obra";

export function catalogFilter(raw: string | string[] | undefined): CatalogFilter {
  const v = Array.isArray(raw) ? raw[0] : raw;
  return v === "venta" || v === "alquiler" || v === "obra" ? v : "all";
}

/** Path for a filter in a language, used for canonical + hreflang + sitemap. */
export function catalogPath(lang: Lang, f: CatalogFilter): string {
  const base = lang === "en" ? "/en/propiedades" : "/propiedades";
  return f === "all" ? base : `${base}?f=${f}`;
}

export interface CatalogCopy {
  /** <title> page part (root template appends " · Onker Home"). */
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  sub: string;
  /** Server-rendered intro paragraph: gives the page real, indexable text. */
  intro: string;
}

const ES: Record<CatalogFilter, CatalogCopy> = {
  all: {
    title: "Propiedades en República Dominicana",
    description:
      "Residencias de excepción en venta y alquiler en Santo Domingo, Cap Cana, Casa de Campo, Las Terrenas y las mejores zonas de República Dominicana.",
    eyebrow: "Propiedades",
    h1: "Residencias de excepción",
    sub: "Compra, alquila e invierte en las mejores zonas de Santo Domingo y el Caribe dominicano.",
    intro:
      "Onker Home reúne apartamentos, villas, terrenos y proyectos de obra nueva en Santo Domingo, Punta Cana, Cap Cana, Casa de Campo, Las Terrenas y Cabarete. Cada propiedad del catálogo la selecciona nuestro equipo con precios claros y fotografías reales, para que puedas comparar con tranquilidad. Filtra por venta, alquiler u obra nueva, busca por zona y escríbenos por WhatsApp para coordinar una visita o recibir opciones similares que todavía no hemos publicado.",
  },
  venta: {
    title: "Propiedades en venta en República Dominicana",
    description:
      "Apartamentos, villas y terrenos en venta en Santo Domingo, Punta Cana, Cap Cana, Casa de Campo y las mejores zonas de República Dominicana, por Onker Home.",
    eyebrow: "Comprar",
    h1: "Propiedades en venta",
    sub: "Apartamentos, villas y terrenos seleccionados en las zonas con mayor demanda del país.",
    intro:
      "Comprar en República Dominicana es una decisión de estilo de vida y también de inversión. En esta selección encontrarás apartamentos en Piantini, La Esperilla y Naco, villas frente al mar en Cabarete y Las Terrenas, residencias en Cap Cana y Casa de Campo, y terrenos con potencial de desarrollo. Te acompañamos en todo el proceso, desde la primera visita hasta la firma, con asesoría sobre financiamiento, impuestos y documentación para que compres con seguridad.",
  },
  alquiler: {
    title: "Propiedades en alquiler en Santo Domingo",
    description:
      "Apartamentos amueblados y residencias en alquiler en Santo Domingo, Piantini, La Esperilla, Juan Dolio y Cabarete. Alquileres seleccionados por Onker Home.",
    eyebrow: "Alquilar",
    h1: "Propiedades en alquiler",
    sub: "Apartamentos amueblados y residencias listas para entrar a vivir.",
    intro:
      "Nuestra oferta de alquiler se concentra en apartamentos amueblados y residencias en las zonas mejor conectadas de Santo Domingo, como Piantini, La Esperilla y Naco, además de opciones frente al mar en Juan Dolio y Cabarete. Publicamos el precio mensual, las condiciones y fotografías actuales de cada unidad. Si buscas un alquiler ejecutivo, temporal o de larga estancia, escríbenos por WhatsApp y te enviamos las opciones disponibles que se ajusten a tu presupuesto y fecha de entrada.",
  },
  obra: {
    title: "Proyectos de obra nueva en República Dominicana",
    description:
      "Proyectos residenciales en construcción y preventa en Santo Domingo, Punta Cana y Bávaro. Planes de pago, entrega y rentabilidad, por Onker Home.",
    eyebrow: "Proyectos",
    h1: "Proyectos en construcción",
    sub: "Preventas y obra nueva con planes de pago flexibles y entrega programada.",
    intro:
      "Los proyectos de obra nueva permiten comprar en preventa con planes de pago durante la construcción y precios inferiores a los de entrega. Aquí reunimos desarrollos residenciales en Santo Domingo, Punta Cana, Bávaro y otras zonas con crecimiento sostenido, con información sobre etapas, fechas de entrega, amenidades y condiciones de pago. Te ayudamos a comparar proyectos, revisar la documentación del promotor y estimar la rentabilidad, ya sea para vivir, para alquilar o como inversión a mediano plazo.",
  },
};

const EN: Record<CatalogFilter, CatalogCopy> = {
  all: {
    title: "Properties in the Dominican Republic",
    description:
      "Exceptional residences for sale and rent in Santo Domingo, Cap Cana, Casa de Campo, Las Terrenas, Cabarete and the best areas of the Dominican Republic.",
    eyebrow: "Properties",
    h1: "Exceptional residences",
    sub: "Buy, rent and invest in the best areas of Santo Domingo and the Dominican Caribbean.",
    intro:
      "Onker Home brings together apartments, villas, land and new developments in Santo Domingo, Punta Cana, Cap Cana, Casa de Campo, Las Terrenas and Cabarete. Every property in the catalog is selected by our team, with clear pricing and real photographs so you can compare with confidence. Filter by sale, rent or new development, search by area, and write to us on WhatsApp to arrange a viewing or receive similar options we have not published yet.",
  },
  venta: {
    title: "Properties for Sale in the Dominican Republic",
    description:
      "Apartments, villas and land for sale in Santo Domingo, Punta Cana, Cap Cana, Casa de Campo and the best areas of the Dominican Republic, by Onker Home.",
    eyebrow: "Buy",
    h1: "Properties for sale",
    sub: "Selected apartments, villas and land in the country's most sought-after areas.",
    intro:
      "Buying in the Dominican Republic is a lifestyle decision and an investment. This selection includes apartments in Piantini, La Esperilla and Naco, beachfront villas in Cabarete and Las Terrenas, residences in Cap Cana and Casa de Campo, and land with development potential. We guide you through the whole process, from the first viewing to signing, with advice on financing, taxes and documentation so that you buy safely as a foreign or local buyer.",
  },
  alquiler: {
    title: "Apartments for Rent in Santo Domingo",
    description:
      "Furnished apartments and residences for rent in Santo Domingo, Piantini, La Esperilla, Juan Dolio and Cabarete. Rentals selected by Onker Home.",
    eyebrow: "Rent",
    h1: "Properties for rent",
    sub: "Furnished apartments and residences ready to move in.",
    intro:
      "Our rental offer focuses on furnished apartments and residences in the best-connected areas of Santo Domingo, such as Piantini, La Esperilla and Naco, plus seafront options in Juan Dolio and Cabarete. Each unit is published with its monthly price, conditions and current photographs. Whether you need an executive, temporary or long-term rental, write to us on WhatsApp and we will send you the available options that match your budget and move-in date.",
  },
  obra: {
    title: "New Developments in the Dominican Republic",
    description:
      "Residential projects under construction and in pre-sale in Santo Domingo, Punta Cana and Bávaro. Payment plans, delivery dates and returns, by Onker Home.",
    eyebrow: "New developments",
    h1: "New developments",
    sub: "Pre-sales and new construction with flexible payment plans and scheduled delivery.",
    intro:
      "New developments let you buy in pre-sale with payment plans during construction and prices below delivery value. Here we gather residential projects in Santo Domingo, Punta Cana, Bávaro and other areas with steady growth, with details on stages, delivery dates, amenities and payment terms. We help you compare projects, review the developer's documentation and estimate returns, whether you plan to live there, rent it out or hold it as a medium-term investment.",
  },
};

export function catalogCopy(lang: Lang, f: CatalogFilter): CatalogCopy {
  return (lang === "en" ? EN : ES)[f];
}
