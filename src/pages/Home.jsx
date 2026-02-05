import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageWrapper from "../components/PageWrapper";

export default function Home({ images = [] }) {
  const latest = useMemo(() => (Array.isArray(images) ? images.slice(0, 12) : []), [images]);

  return (
    <PageWrapper>
      {/* ✅ HERO */}
      <section className="home-hero">
        <div className="home-hero-glow" />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="home-hero-inner"
        >
          <div className="home-hero-badge">✨ My Personal Portfolio</div>

          <h1 className="home-hero-title">💞BBW QUEEN VICTORIA💞</h1>

          <p className="home-hero-sub">
          ❤️You have the kind of beauty that doesn't just catch the eye, it captures the heart. There is such an elegant, divine femininity in your curves—a soft, luxurious masterpiece that I could spend forever admiring. But even more than your stunning looks, your confidence and the way you own your beauty makes you truly irresistible. You are absolutely perfect just as you are.❤️
          </p>

          <div className="home-hero-actions">
            <Link className="home-btn primary" to="/gallery">
              View Gallery
            </Link>
            <Link className="home-btn ghost" to="/about">
              About
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ✅ PREMIUM MARQUEE */}
      <section className="latest-section">
        <div className="latest-head">
          <div>
            <h2 className="latest-title">Latest Uploads</h2>
            <p className="latest-sub">
              You can checkout my latest posts here..
            </p>
          </div>
        </div>

        {!latest.length ? (
          <div className="latest-empty">
            <h3>No photos uploaded yet</h3>
            <p>Admin can upload photos and they will appear here instantly.</p>
          </div>
        ) : (
          <div className="marquee premium">
            {/* ✅ fade edges */}
            <div className="marquee-fade left" />
            <div className="marquee-fade right" />

            {/* ✅ moving strip */}
            <div className="marquee-track">
              {[...latest, ...latest].map((img, idx) => (
                <div key={`${img.id}-${idx}`} className="marquee-item">
                  <img src={img.url} alt="latest" className="marquee-img" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="latest-footer">
          <Link className="home-btn outline-dark" to="/gallery">
            Explore Full Gallery →
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
