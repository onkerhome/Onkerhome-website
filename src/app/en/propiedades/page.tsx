import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import ListingsIndex from "@/components/ListingsIndex";
import { catalogCopy, catalogFilter, catalogPath } from "@/lib/catalog-seo";
import { getListings } from "@/lib/repo";

export async function generateMetadata(
  props: PageProps<"/en/propiedades">,
): Promise<Metadata> {
  const f = catalogFilter((await props.searchParams).f);
  const c = catalogCopy("en", f);
  return {
    title: c.title,
    description: c.description,
    alternates: {
      canonical: catalogPath("en", f),
      languages: { es: catalogPath("es", f), en: catalogPath("en", f) },
    },
  };
}

export default async function PropertiesPageEn(
  props: PageProps<"/en/propiedades">,
) {
  const f = catalogFilter((await props.searchParams).f);
  const c = catalogCopy("en", f);
  const listings = await getListings("en");
  return (
    <>
      <Header solid lang="en" altHref={catalogPath("es", f)} />
      <main id="top" className="page">
        <section className="page-head">
          <div className="wrap">
            <span className="eyebrow">{c.eyebrow}</span>
            <h1 style={{ marginTop: 16 }}>{c.h1}</h1>
            <p className="sub" style={{ marginTop: 16 }}>
              {c.sub}
            </p>
            <p className="sub" style={{ marginTop: 20, maxWidth: 760 }}>
              {c.intro}
            </p>
          </div>
        </section>
        <section className="band tight">
          <Suspense fallback={null}>
            <ListingsIndex listings={listings} lang="en" />
          </Suspense>
        </section>
      </main>
      <Footer lang="en" />
      <WhatsAppFloat />
    </>
  );
}
