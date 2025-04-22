import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductGrid from "./ProductGrid";
export default function ProductList({ featuredProducts, isLoading, error }) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl md:text-3xl font-display font-medium">
            Featured Products
          </h2>
          <Link
            href="/products"
            className="text-primary-600 hover:text-primary-700 transition-colors flex items-center text-sm font-medium"
          >
            View All
            <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>

        {error ? (
          <div className="bg-red-50 text-red-600 rounded-lg p-4 mb-6">
            {error}
          </div>
        ) : (
          <ProductGrid products={featuredProducts} isLoading={isLoading} />
        )}
      </div>
    </section>
  );
}
