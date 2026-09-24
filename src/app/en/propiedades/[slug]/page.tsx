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
import { getDict, pricePart, statusLabel } from "@/lib/i18n";
import { getListingBySlug, getListings } from "@/lib/repo";
import { listingTitle } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getListings()).map((l) => ({ slug: l.slug }));
}

export async function generateMetadata(
  props: PageProps<"/en/propiedades/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const l = await getListingBySlug(slug, "en");
  if (!l) return { title: "Property" };
  return {
    title: listingTitle(l.name),
    description: `${l.name} — ${l.specs} — ${l.location}. ${statusLabel(l.status, "en")} by Onker Home.`,
    alternates: {
      canonical: `/en/propiedades/${l.slug}`,
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

export default async function ListingPageEn(
  props: PageProps<"/en/propiedades/[slug]">,
) {
  const { slug } = await props.params;
  const l = await getListingBySlug(slug, "en");
  if (!l) notFound();
  const t = getDict("en");

  const cover = listingCover(l);
  const photos = listingPhotos(l).filter((p) => p !== cover);
  const price = `${l.pricePrefix ? `${pricePart(l.pricePrefix, "en")} ` : ""}${l.price}${
    l.priceSuffix ? ` ${pricePart(l.priceSuffix, "en")}` : ""
  }`;
  const wa = waLink(
    `Hello Onker Home, I'm interested in "${l.name}" (${l.location}). Could you send me more details?`,
  );

  const numericPrice = Number(l.price.replace(/[^0-9.]/g, ""));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: l.name,
    url: `${site.url}/en/propiedades/${l.slug}`,
    image: `${site.url}${cover}`,
    description: `${l.name} — ${l.specs} — ${l.location}. ${statusLabel(l.status, "en")} by Onker Home.`,
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
      <Header solid lang="en" altHref={`/propiedades/${l.slug}`} />
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
              <Link className="l-back" href="/en/propiedades">
                {t.backToAll}
              </Link>
              <span className="p-st l-st">{statusLabel(l.status, "en")}</span>{" "}
              <NewBadge listedAt={l.listedAt} lang="en" />
              <h1 className="l-title">{l.name}</h1>
              <p className="l-loc">{l.location}</p>
              <Body text={l.body} />
            </article>
            <aside className="l-aside">
              <div className="l-card">
                <div className="l-price">{price}</div>
                <div className="l-specs">{l.specs}</div>
                <a className="btn solid full" href={wa} target="_blank" rel="noopener">
                  {t.waCta}
                </a>
                <a className="btn full" href={`tel:${site.phoneTel}`}>
                  {t.callCta} · {site.phoneDisplay}
                </a>
                <p className="l-note">{t.detailNote}</p>
              </div>
            </aside>
          </div>
        </section>
        {photos.length > 0 && (
          <section className="band tight">
            <div className="wrap">
              <span className="eyebrow">{t.galeria}</span>
              <GalleryGrid photos={photos} name={l.name} />
            </div>
          </section>
        )}
      </main>
      <Footer lang="en" />
      <WhatsAppFloat />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
