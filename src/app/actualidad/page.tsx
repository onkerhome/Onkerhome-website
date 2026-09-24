import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Reveal from "@/components/Reveal";
import { getArticles } from "@/lib/repo";

export const metadata: Metadata = {
  title: "Actualidad",
  description:
    "Noticias y análisis del sector inmobiliario y financiero de República Dominicana: mercado, inversión, impuestos, guías y tendencias, por Onker Home.",
  alternates: {
    canonical: "/actualidad",
    languages: { es: "/actualidad", en: "/en/actualidad" },
  },
};

export default async function ActualidadPage() {
  const articles = await getArticles();
  return (
    <>
      <Header solid />
      <main id="top" className="page">
        <section className="page-head">
          <div className="wrap" style={{ textAlign: "center" }}>
            <span className="eyebrow">Actualidad</span>
            <h1 style={{ marginTop: 16 }}>
              Información inmobiliaria y financiera de República Dominicana
            </h1>
            <p className="sub" style={{ margin: "16px auto 0" }}>
              Análisis, guías y noticias para comprar, vender e invertir con
              mejor información.
            </p>
          </div>
        </section>

        <section className="band tight">
          <div className="wrap">
            <div className="art-grid">
              {articles.map((a) => (
                <Link
                  className="a-card reveal in"
                  href={`/actualidad/${a.slug}`}
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
      <Footer />
      <WhatsAppFloat />
      <Reveal />
    </>
  );
}
