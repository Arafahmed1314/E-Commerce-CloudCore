"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-sm" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-2xl font-display font-bold tracking-tight text-secondary-900"
            >
              Refabry
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-secondary-900 hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-secondary-900 hover:text-primary-600 transition-colors"
            >
              Products
            </Link>

            <Link
              href="/"
              className="text-secondary-900 hover:text-primary-600 transition-colors"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              aria-label="Search"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Search className="w-5 h-5 text-secondary-900" />
            </button>
            <button
              aria-label="Cart"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-secondary-900" />
            </button>
            <button
              aria-label="Menu"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-secondary-900" />
              ) : (
                <Menu className="w-5 h-5 text-secondary-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="py-2 text-secondary-900 hover:text-primary-600 transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="py-2 text-secondary-900 hover:text-primary-600 transition-colors"
                >
                  Products
                </Link>
                <Link
                  href="/categories"
                  className="py-2 text-secondary-900 hover:text-primary-600 transition-colors"
                >
                  Categories
                </Link>
                <Link
                  href="/about"
                  className="py-2 text-secondary-900 hover:text-primary-600 transition-colors"
                >
                  About
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
