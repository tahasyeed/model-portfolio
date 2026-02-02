import React from "react";
import { motion } from "framer-motion";
import aboutImg from "../assets/094e494e-dcaf-40f1-81e4-0854b1fde836.jpeg";

export default function About() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <p className="text-sm font-extrabold tracking-widest text-neutral-500 uppercase">
            About Me
          </p>

          <h2 className="mt-3 text-4xl sm:text-5xl font-black tracking-tight text-neutral-900">
            Victoria❤️
          </h2>

          <p className="mt-5 text-base sm:text-lg leading-8 text-neutral-700">
            Hi, I’m{" "}
            <span className="font-extrabold text-neutral-900">Victoria</span> — a
            confident BBW model known for bold presence, elegance, and authentic
            beauty. My portfolio reflects passion, creativity, and self-expression
            through professional shoots that highlight style, curves, and energy.
          </p>

          <p className="mt-4 text-base sm:text-lg leading-8 text-neutral-700">
            I collaborate with photographers, brands, and creatives for editorial,
            fashion, lifestyle, and promotional content. Every shoot is crafted with
            a clean aesthetic and a powerful vibe.
          </p>

          {/* HIGHLIGHTS */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-black/10 bg-purple-300 p-4 shadow-sm">
              <p className="font-extrabold text-neutral-900">✨ Style</p>
              <p className="mt-1 text-sm text-neutral-600 font-bold">
                Glam • Elegant • Modern
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-yellow-300 p-4 shadow-sm">
              <p className="font-extrabold text-neutral-900">📸 Work</p>
              <p className="mt-1 text-sm text-neutral-600 font-bold">
                Editorial • Portfolio • Brand shoots
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-red-300 p-4 shadow-sm">
              <p className="font-extrabold text-neutral-900">🤝 Collabs</p>
              <p className="mt-1 text-sm text-neutral-600 font-bold">
                Photographers • Creators • Agencies
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-blue-300 p-4 shadow-sm">
              <p className="font-extrabold text-neutral-900">🌍 Location</p>
              <p className="mt-1 text-sm text-neutral-600 font-bold">
                Available for remote & travel shoots
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="/gallery"
              className="px-5 py-3 rounded-2xl bg-neutral-900 text-white font-extrabold hover:opacity-90 transition"
            >
              View Gallery
            </a>
            <a
              href="/admin"
              className="px-5 py-3 rounded-2xl bg-white text-neutral-900 font-extrabold border border-black/10 hover:border-black/20 transition"
            >
              Admin Login
            </a>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative"
        >
          <div className="rounded-3xl overflow-hidden border border-black/10 shadow-lg">
            <img
              src={aboutImg}
              alt="Model"
              className="w-full h-[520px] object-cover"
            />
          </div>

          <div className="absolute -bottom-6 left-6 right-6 rounded-2xl bg-pink-300 backdrop-blur px-5 py-4 border border-black/10 shadow-md">
            <p className="font-extrabold text-neutral-900">Portfolio</p>
            <p className="text-sm text-neutral-600 mt-1 font-bold">
              High-quality shoots • premium aesthetics • consistent branding
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
