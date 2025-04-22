"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Heart } from "lucide-react";
import { getProductImageUrl } from "@/app/utils/getProducts";
import { useState, useEffect } from "react";

const ProductCard = ({ product }) => {
  const discountedPrice =
    product.discount > 0
      ? product.price - product.price * (product.discount / 100)
      : null;

  const [isMounted, setIsMounted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const imageUrl = getProductImageUrl(product.image) || "/images/fallback.jpg";

  if (!isMounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <div className="card overflow-hidden">
        <Link
          href={`/products/${product.id}`}
          className="block relative aspect-square overflow-hidden bg-gray-100"
          style={{ minHeight: "200px" }}
          aria-label={`View ${product.title}`}
        >
          {product.is_feature === 1 && (
            <span className="absolute top-2 left-2 z-10 bg-accent-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              Featured
            </span>
          )}
          {product.discount > 0 && (
            <span className="absolute top-2 right-2 z-10 bg-primary-600 text-white text-xs font-medium px-2 py-1 rounded-full">
              {product.discount}% OFF
            </span>
          )}
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <p className="text-gray-500 text-sm">Image unavailable</p>
            </div>
          )}
          <Image
            src={imageError ? "/images/fallback.jpg" : imageUrl}
            alt={product.title}
            fill
            className={`object-cover object-center transition-transform duration-300 group-hover:scale-105 `}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            onError={() => {
              setImageError(true);
              setIsLoading(false);
            }}
            onLoadingComplete={() => setIsLoading(false)}
            priority={product.is_feature === 1}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-10" />
        </Link>
        <div className="p-4">
          <div className="mb-2">
            <p className="text-sm text-gray-500 capitalize">
              {product.category}
            </p>
            <Link href={`/products/${product.id}`} className="block">
              <h3 className="font-medium text-secondary-900 hover:text-primary-600 transition-colors line-clamp-1">
                {product.title}
              </h3>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {discountedPrice ? (
                <>
                  <span className="font-medium text-primary-600">
                    ${discountedPrice.toFixed(2)}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="font-medium text-secondary-900">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                aria-label="Add to wishlist"
                className="p-1.5 rounded-full text-gray-400 hover:text-accent-500 hover:bg-gray-100 transition-colors"
              >
                <Heart className="w-4 h-4" />
              </button>
              <button
                aria-label="Add to cart"
                className="p-1.5 rounded-full text-gray-400 hover:text-primary-600 hover:bg-gray-100 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
