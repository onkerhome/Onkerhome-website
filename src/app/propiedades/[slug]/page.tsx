import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GalleryGrid from "@/components/GalleryGrid";
import NewBadge from "@/components/NewBadge";
import TrackViewContent from "@/components/TrackViewContent";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { site, waLink } from "@/data/site";
import { listingCover, listingPhotos } from "@/data/listings";
import { getListingBySlug, getListings } from "@/lib/repo";
import { listingTitle } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getListings()).map((l) => ({ slug: l.slug }));
}

export async function generateMetadata(
  props: PageProps<"/propiedades/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const l = await getListingBySlug(slug);
  if (!l) return { title: "Propiedad" };
  return {
    title: listingTitle(l.name),
    description: `${l.name} — ${l.specs} — ${l.location}. ${l.status} por Onker Home.`,
    alternates: {
      canonical: `/propiedades/${l.slug}`,
      languages: {
        es: `/propiedades/${l.slug}`,
        en: `/en/propiedades/${l.slug}`,
      },
    },
    openGraph: {
      title: `${l.name} · ${l.location}`,
      images: [{ url: listingCover(l) }],
    },
  };
}

/** Renders the listing body: "## " heading · "- " bullet · paragraphs. */
function Body({ text }: { text: string }) {
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  let key = 0;
  const flush = () => {
    if (list.length) {
      blocks.push(
        <ul key={key++}>
          {list.map((li, i) => (
            <li key={i}>{li}</li>
          ))}
        </ul>,
      );
      list = [];
    }
  };
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("## ")) {
      flush();
      blocks.push(<h3 key={key++}>{line.slice(3)}</h3>);
    } else if (line.startsWith("- ")) {
      list.push(line.slice(2));
    } else {
      flush();
      blocks.push(<p key={key++}>{line}</p>);
    }
  }
  flush();
  return <div className="l-body">{blocks}</div>;
}

export default async function ListingPage(
  props: PageProps<"/propiedades/[slug]">,
) {
  const { slug } = await props.params;
  const l = await getListingBySlug(slug);
  if (!l) notFound();

  const cover = listingCover(l);
  const photos = listingPhotos(l).filter((p) => p !== cover);
  const price = `${l.pricePrefix ? `${l.pricePrefix} ` : ""}${l.price}${
    l.priceSuffix ? ` ${l.priceSuffix}` : ""
  }`;
  const wa = waLink(
    `Hola Onker Home, me interesa la propiedad "${l.name}" (${l.location}). ¿Podemos coordinar más detalles?`,
  );

  const numericPrice = Number(l.price.replace(/[^0-9.]/g, ""));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: l.name,
    url: `${site.url}/propiedades/${l.slug}`,
    image: `${site.url}${cover}`,
    description: `${l.name} — ${l.specs} — ${l.location}. ${l.status} por Onker Home.`,
    ...(Number.isFinite(numericPrice) && numericPrice > 0
      ? {
          offers: {
            "@type": "Offer",
            price: numericPrice,
            priceCurrency: "USD",
          },
        }
      : {}),
  };

  return (
    <>
      <Header solid />
      <TrackViewContent slug={l.slug} name={l.name} />
      <main id="top" className="page">
        <section className="l-hero">
          <Image
            src={cover}
            alt={`${l.name}, ${l.location}`}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </section>
        <section className="band tight">
          <div className="wrap l-layout">
            <article>
              <Link className="l-back" href="/propiedades">
                ← Todas las propiedades
              </Link>
              <span className="p-st l-st">{l.status}</span>{" "}
              <NewBadge listedAt={l.listedAt} />
              <h1 className="l-title">{l.name}</h1>
              <p className="l-loc">{l.location}</p>
              <Body text={l.body} />
            </article>
            <aside className="l-aside">
              <div className="l-card">
                <div className="l-price">{price}</div>
                <div className="l-specs">{l.specs}</div>
                <a className="btn solid full" href={wa} target="_blank" rel="noopener">
                  Consultar por WhatsApp
                </a>
                <a className="btn full" href={`tel:${site.phoneTel}`}>
                  Llamar · {site.phoneDisplay}
                </a>
                <p className="l-note">
                  Un asesor de Onker Home te responderá a la brevedad. Sin costo
                  ni compromiso.
                </p>
              </div>
            </aside>
          </div>
        </section>
        {photos.length > 0 && (
          <section className="band tight">
            <div className="wrap">
              <span className="eyebrow">Galería</span>
              <GalleryGrid photos={photos} name={l.name} />
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppFloat />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
