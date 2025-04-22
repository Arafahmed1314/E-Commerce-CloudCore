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
  console.log("ProductCard image URL:", imageUrl);

  if (!isMounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-lg shadow-md overflow-hidden"
    >
      <Link
        href={`/products/${product.id}`}
        className="block relative aspect-square bg-[#f3f4f6]"
        style={{ minHeight: "200px" }}
        aria-label={`View ${product.title}`}
      >
        {product.is_feature === 1 && (
          <span className="absolute top-2 left-2 z-10 bg-[#1d4ed8] text-white text-xs font-medium px-2 py-1 rounded-full">
            Featured
          </span>
        )}
        {product.discount > 0 && (
          <span className="absolute top-2 right-2 z-10 bg-[#dc2626] text-white text-xs font-medium px-2 py-1 rounded-full">
            {product.discount}% OFF
          </span>
        )}
        {isLoading && (
          <div className="absolute inset-0 bg-[#e5e7eb] animate-pulse" />
        )}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#f3f4f6]">
            <p className="text-[#6b7280] text-sm">Image unavailable</p>
          </div>
        )}
        <Image
          src={imageError ? "/images/fallback.jpg" : imageUrl}
          alt={product.title}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          onError={() => {
            setImageError(true);
            setIsLoading(false);
          }}
          onLoad={() => setIsLoading(false)}
          priority={product.is_feature === 1}
        />
      </Link>
      <div className="p-4">
        <div className="mb-2">
          <p className="text-sm text-[#6b7280] capitalize">
            {product.category}
          </p>
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="font-medium text-[#111827] hover:text-[#1d4ed8] transition-colors line-clamp-1">
              {product.title}
            </h3>
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {discountedPrice ? (
              <>
                <span className="font-medium text-[#111827]">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-[#6b7280] line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-medium text-[#111827]">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              aria-label="Add to wishlist"
              className="p-1.5 rounded-full text-[#6b7280] hover:text-[#dc2626] hover:bg-[#f3f4f6] transition-colors"
            >
              <Heart className="w-4 h-4" />
            </button>
            <button
              aria-label="Add to cart"
              className="p-1.5 rounded-full text-[#6b7280] hover:text-[#1d4ed8] hover:bg-[#f3f4f6] transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
