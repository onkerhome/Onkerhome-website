import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { site, waLink } from "@/data/site";
import { getDict } from "@/lib/i18n";
import { getArticleBySlug, getArticles } from "@/lib/repo";
import { articleTitle } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getArticles("en")).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(
  props: PageProps<"/en/actualidad/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const a = await getArticleBySlug(slug, "en");
  if (!a) return { title: "News" };
  const description = a.lede.length > 155 ? `${a.lede.slice(0, 152)}…` : a.lede;
  return {
    title: articleTitle(a.title),
    description,
    alternates: {
      canonical: `/en/actualidad/${a.slug}`,
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

export default async function ArticlePageEn(
  props: PageProps<"/en/actualidad/[slug]">,
) {
  const { slug } = await props.params;
  const a = await getArticleBySlug(slug, "en");
  if (!a) notFound();
  const t = getDict("en");

  const others = (await getArticles("en"))
    .filter((x) => x.slug !== a.slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: a.title,
    description: a.lede,
    image: `${site.url}${a.image}`,
    url: `${site.url}/en/actualidad/${a.slug}`,
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <>
      <Header solid lang="en" altHref={`/actualidad/${a.slug}`} />
      <main id="top" className="page">
        <article>
          <section className="art-head">
            <div className="wrap">
              <Link className="l-back" href="/en/actualidad">
                {t.artBack}
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
              <p>{t.artCtaQ}</p>
              <a
                className="btn solid"
                href={waLink(
                  "Hello Onker Home, I read an article on your website and I'd like to speak with an advisor.",
                )}
                target="_blank"
                rel="noopener"
              >
                {t.artCtaBtn}
              </a>
            </div>
          </div>
        </article>

        {others.length > 0 && (
          <section className="band tight" style={{ background: "var(--alt)" }}>
            <div className="wrap">
              <span className="eyebrow">{t.artKeepReading}</span>
              <div className="art-grid" style={{ marginTop: 26 }}>
                {others.map((o) => (
                  <Link
                    className="a-card"
                    href={`/en/actualidad/${o.slug}`}
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
