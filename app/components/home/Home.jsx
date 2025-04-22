"use client";
import { useState, useEffect } from "react";
import { getProducts } from "../../utils/getProducts";
import Hero from "./Hero";
import ProductList from "./ProductList";
import Newsletter from "./Newsletter";
const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await getProducts();

        if (response.success) {
          const featured = response.data
            .filter((product) => product.is_feature === 1)
            .slice(0, 4);
          setFeaturedProducts(featured);
        } else {
          setError("Failed to fetch products");
        }
      } catch (err) {
        setError("Error fetching products. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Hero />
      <ProductList
        featuredProducts={featuredProducts}
        isLoading={isLoading}
        error={error}
      />
      <Newsletter />
    </div>
  );
};

export default HomePage;
