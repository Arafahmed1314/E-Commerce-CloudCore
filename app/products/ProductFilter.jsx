import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";

const ProductFilters = ({ products = [], onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    category: "",
    price: null,
  });

  // Ensure products is an array and categories are derived correctly
  const categories = Array.from(
    new Set(products?.map((product) => product.category) || [])
  );

  // Calculate price range if products exist
  const prices = products.length
    ? products.map((product) => product.price)
    : [];
  const minPrice = prices.length ? Math.min(...prices) : 0;
  const maxPrice = prices.length ? Math.max(...prices) : 0;

  const priceRanges = [
    { label: "All Prices", value: "" },
    {
      label: `$${minPrice.toFixed(2)} - $${(
        minPrice +
        (maxPrice - minPrice) / 3
      ).toFixed(2)}`,
      value: `${minPrice}-${minPrice + (maxPrice - minPrice) / 3}`,
    },
    {
      label: `$${(minPrice + (maxPrice - minPrice) / 3).toFixed(2)} - $${(
        minPrice +
        (2 * (maxPrice - minPrice)) / 3
      ).toFixed(2)}`,
      value: `${minPrice + (maxPrice - minPrice) / 3}-${
        minPrice + (2 * (maxPrice - minPrice)) / 3
      }`,
    },
    {
      label: `$${(minPrice + (2 * (maxPrice - minPrice)) / 3).toFixed(
        2
      )} - $${maxPrice.toFixed(2)}`,
      value: `${minPrice + (2 * (maxPrice - minPrice)) / 3}-${maxPrice}`,
    },
  ];

  const handleCategoryChange = (category) => {
    const newFilters = { ...activeFilters, category };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (priceRange) => {
    let price = null;

    if (priceRange) {
      const [min, max] = priceRange.split("-").map(Number);
      price = [min, max];
    }

    const newFilters = { ...activeFilters, price };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const newFilters = { category: "", price: null };
    setActiveFilters(newFilters);
    onFilterChange(newFilters);
  };

  const hasActiveFilters = activeFilters.category || activeFilters.price;

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-secondary flex items-center"
          >
            <span>Filters</span>
            <ChevronDown
              className={`ml-2 w-4 h-4 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="ml-3 text-sm text-primary-600 hover:text-primary-700 flex items-center"
            >
              <X className="w-3 h-3 mr-1" />
              Clear all
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {activeFilters.category && (
            <div className="inline-flex items-center bg-primary-50 text-primary-700 rounded-full px-3 py-1 text-sm">
              <span>Category: {activeFilters.category}</span>
              <button
                onClick={() => handleCategoryChange("")}
                className="ml-1 text-primary-500 hover:text-primary-700"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {activeFilters.price && (
            <div className="inline-flex items-center bg-primary-50 text-primary-700 rounded-full px-3 py-1 text-sm">
              <span>
                Price: ${activeFilters.price[0].toFixed(2)} - $$
                {activeFilters.price[1].toFixed(2)}
              </span>
              <button
                onClick={() => handlePriceChange("")}
                className="ml-1 text-primary-500 hover:text-primary-700"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-white rounded-lg shadow-sm">
              <div>
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="category-all"
                      name="category"
                      checked={activeFilters.category === ""}
                      onChange={() => handleCategoryChange("")}
                      className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                    />
                    <label
                      htmlFor="category-all"
                      className="ml-2 text-sm text-gray-700"
                    >
                      All Categories
                    </label>
                  </div>

                  {categories.length > 0 &&
                    categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <input
                          type="radio"
                          id={`category-${category}`}
                          name="category"
                          checked={activeFilters.category === category}
                          onChange={() => handleCategoryChange(category)}
                          className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="ml-2 text-sm text-gray-700 capitalize"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <div key={range.value} className="flex items-center">
                      <input
                        type="radio"
                        id={`price-${range.value || "all"}`}
                        name="price"
                        checked={
                          range.value === ""
                            ? activeFilters.price === null
                            : activeFilters.price !== null &&
                              activeFilters.price[0] ===
                                Number(range.value.split("-")[0]) &&
                              activeFilters.price[1] ===
                                Number(range.value.split("-")[1])
                        }
                        onChange={() => handlePriceChange(range.value)}
                        className="h-4 w-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <label
                        htmlFor={`price-${range.value || "all"}`}
                        className="ml-2 text-sm text-gray-700"
                      >
                        {range.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductFilters;
