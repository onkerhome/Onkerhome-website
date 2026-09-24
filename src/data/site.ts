/** Central business facts — single source of truth for the UI. */
export const site = {
  name: "Onker Home",
  legal: "ONKERHOME E.I.R.L.",
  /** Production origin — confirm with the client (old Wix site was onkerhomes.com). */
  url: "https://onkerhomes.com",
  /** Google Search Console verification token — paste when the client registers. */
  googleSiteVerification: "",
  tagline: "Donde el lujo se vive.",
  phoneDisplay: "849 342 6066",
  phoneIntl: "+1 849 342 6066",
  phoneTel: "+18493426066",
  whatsapp: "18493426066",
  email: "Info@onkerhomes.com",
  /** Second contact line (Jadielis Alcántara). */
  phone2Display: "829 203 8957",
  phone2Intl: "+1 829 203 8957",
  phone2Tel: "+18292038957",
  address: {
    line1: "Av. Simón Bolívar esq. Máximo Gómez",
    line2: "Plaza Royal, Suite 02, Santo Domingo",
    mapUrl:
      "https://maps.google.com/?q=Plaza+Royal+Av+Simon+Bolivar+esq+Maximo+Gomez+Santo+Domingo",
  },
  hours: "Lun–Vie 9:00–18:00 · Sáb 9:00–13:00",
  social: {
    instagram: "https://www.instagram.com/onker_home/",
    // Canonical page URL (the /share/ link returns HTTP 400 to crawlers).
    facebook: "https://www.facebook.com/Onkerhome/",
    google: "https://share.google/tELwf7VW4VWDTUSMu",
  },
  stats: [
    { n: "3,000+", l: "Clientes atendidos" },
    { n: "95%", l: "Índice de satisfacción" },
    { n: "22", l: "Países representados" },
    { n: "2017", l: "Constituida desde" },
  ],
} as const;

/** Builds a wa.me link with a prefilled message. */
export function waLink(message: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
