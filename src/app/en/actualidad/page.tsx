import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Reveal from "@/components/Reveal";
import { getDict } from "@/lib/i18n";
import { getArticles } from "@/lib/repo";

export const metadata: Metadata = {
  title: "News",
  description:
    "Real estate and financial news and analysis from the Dominican Republic: market, investment, taxes, guides and trends, by Onker Home.",
  alternates: {
    canonical: "/en/actualidad",
    languages: { es: "/actualidad", en: "/en/actualidad" },
  },
};

export default async function NewsPageEn() {
  const articles = await getArticles("en");
  const t = getDict("en");
  return (
    <>
      <Header solid lang="en" altHref="/actualidad" />
      <main id="top" className="page">
        <section className="page-head">
          <div className="wrap" style={{ textAlign: "center" }}>
            <span className="eyebrow">{t.artEyebrow}</span>
            <h1 style={{ marginTop: 16 }}>{t.artPageTitle}</h1>
            <p className="sub" style={{ margin: "16px auto 0" }}>
              {t.artPageSub}
            </p>
          </div>
        </section>

        <section className="band tight">
          <div className="wrap">
            <div className="art-grid">
              {articles.map((a) => (
                <Link
                  className="a-card reveal in"
                  href={`/en/actualidad/${a.slug}`}
                  key={a.slug}
                >
                  <div className="a-ph">
                    <Image
                      src={a.image}
                      alt=""
                      fill
                      sizes="(max-width:640px) 100vw, (max-width:1000px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="a-tag">{a.category}</div>
                  <div className="a-title">{a.title}</div>
                  <p className="a-ex">{a.lede}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer lang="en" />
      <WhatsAppFloat />
      <Reveal />
    </>
  );
}
