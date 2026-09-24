import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { site, waLink } from "@/data/site";
import { getArticleBySlug, getArticles } from "@/lib/repo";
import { articleTitle } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/actualidad/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const a = await getArticleBySlug(slug);
  if (!a) return { title: "Actualidad" };
  const description =
    a.lede.length > 155 ? `${a.lede.slice(0, 152)}…` : a.lede;
  return {
    title: articleTitle(a.title),
    description,
    alternates: {
      canonical: `/actualidad/${a.slug}`,
      languages: {
        es: `/actualidad/${a.slug}`,
        en: `/en/actualidad/${a.slug}`,
      },
    },
    openGraph: {
      title: a.title,
      description,
      type: "article",
      images: [{ url: a.image }],
    },
  };
}

export default async function ArticlePage(
  props: PageProps<"/actualidad/[slug]">,
) {
  const { slug } = await props.params;
  const a = await getArticleBySlug(slug);
  if (!a) notFound();

  const others = (await getArticles())
    .filter((x) => x.slug !== a.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.title,
    description: a.lede,
    image: `${site.url}${a.image}`,
    url: `${site.url}/actualidad/${a.slug}`,
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <Header solid />
      <main id="top" className="page">
        <article>
          <section className="art-head">
            <div className="wrap">
              <Link className="l-back" href="/actualidad">
                ← Actualidad
              </Link>
              <div className="a-tag">{a.category}</div>
              <h1 className="art-title">{a.title}</h1>
              <p className="art-lede">{a.lede}</p>
            </div>
          </section>
          <div className="wrap">
            <div className="art-cover">
              <Image
                src={a.image}
                alt=""
                fill
                priority
                sizes="(max-width:1000px) 100vw, 900px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="art-body">
              {a.blocks.map((b, i) =>
                b.type === "h" ? (
                  <h2 key={i}>{b.text}</h2>
                ) : b.type === "li" ? (
                  <p className="art-li" key={i}>
                    ✓ {b.text}
                  </p>
                ) : (
                  <p key={i}>{b.text}</p>
                ),
              )}
            </div>
            <div className="art-cta">
              <p>
                ¿Quieres comprar, vender o invertir en República Dominicana?
              </p>
              <a
                className="btn solid"
                href={waLink(
                  "Hola Onker Home, leí un artículo en su página y quisiera hablar con un asesor.",
                )}
                target="_blank"
                rel="noopener"
              >
                Hablar con un asesor
              </a>
            </div>
          </div>
        </article>

        <section className="band tight" style={{ background: "var(--alt)" }}>
          <div className="wrap">
            <span className="eyebrow">Sigue leyendo</span>
            <div className="art-grid" style={{ marginTop: 26 }}>
              {others.map((o) => (
                <Link
                  className="a-card"
                  href={`/actualidad/${o.slug}`}
                  key={o.slug}
                >
                  <div className="a-ph">
                    <Image
                      src={o.image}
                      alt=""
                      fill
                      sizes="(max-width:640px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="a-tag">{o.category}</div>
                  <div className="a-title">{o.title}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
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
