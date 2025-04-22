import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-[#2c364a] to-[#1a2035] text-white">
      <div className="absolute inset-0 opacity-30 mix-blend-soft-light">
        <Image
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Hero background"
          fill
          className="object-cover object-center"
          priority
          onError={(e) => {
            console.error("Failed to load hero background image");
            e.target.src = "/images/hero-fallback.jpg";
          }}
        />
      </div>
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold mb-6 tracking-tight"
          >
            Elevate Your Lifestyle with Premium Products
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto"
          >
            Discover curated products that combine style, quality, and
            innovation for modern living.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/products"
              className="btn bg-white text-black hover:bg-primary-700 px-8 py-3 rounded-md font-medium transition-colors"
            >
              Shop Now
            </Link>
            <Link
              href="/"
              className="btn bg-white text-black hover:bg-white/20 px-8 py-3 rounded-md font-medium transition-colors"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
