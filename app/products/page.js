"use client";
import { useState, useEffect } from 'react';

import { Search } from 'lucide-react';
import { getProducts } from '@/app/utils/getProducts';

import ProductGrid from '../components/home/ProductGrid';

const ProductListingPage = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                const response = await getProducts();

                if (response.success) {
                    setProducts(response.data);
                    setFilteredProducts(response.data);
                } else {
                    setError('Failed to fetch products');
                }
            } catch (err) {
                setError('Error fetching products. Please try again later.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(e.target.value);
        const result = products.filter(product =>
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
        setFilteredProducts(result);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Optional, to prevent page reload on submit
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-display font-medium mb-6">
                    All Products
                </h1>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <form onSubmit={handleSubmit} className="w-full md:w-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full md:w-80 px-4 py-2 pr-10 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-0 h-full px-3 text-gray-500 hover:text-primary-600"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                </div>

                {error ? (
                    <div className="bg-red-50 text-red-600 rounded-lg p-4 mb-6">
                        {error}
                    </div>
                ) : (
                    <>
                        <div className="mb-4 text-sm text-gray-600">
                            Showing {filteredProducts?.length} products
                        </div>

                        <ProductGrid products={filteredProducts} isLoading={isLoading} />
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductListingPage;
