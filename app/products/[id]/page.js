"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Heart, Share2, Star } from 'lucide-react';
import { getProducts, getProductImageUrl } from '@/app/utils/getProducts';
import ProductGrid from '@/app/components/home/ProductGrid';
import Link from 'next/link';
import Image from 'next/image';
import OrderFormModal from '@/app/components/OrderFormModal';
import DetailsSkeleton from '@/app/components/DetailsSkeleton';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [imageError, setImageError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                const response = await getProducts();
                if (response.success) {
                    const productId = Number(id);
                    const foundProduct = response.data.find(p => p.id === productId);
                    if (foundProduct) {
                        setProduct(foundProduct);
                        const related = response.data
                            .filter(p => p.category === foundProduct.category && p.id !== productId)
                            .slice(0, 4);
                        setRelatedProducts(related);
                    } else {
                        setError('Product not found');
                    }
                } else {
                    setError('Failed to fetch product data');
                }
            } catch (err) {
                setError('Error fetching product. Please try again later.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        }
    };

    const incrementQuantity = () => setQuantity(prev => prev + 1);
    const decrementQuantity = () => {
        if (quantity > 1) setQuantity(prev => prev - 1);
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    if (isLoading) {
        return (
            <DetailsSkeleton />
        );
    }

    if (error || !product) {
        return (
            <div className="container mx-auto px-4 py-8 mt-5">
                <div className="bg-[#fef2f2] text-[#dc2626] rounded-lg p-6 mb-6">
                    {error || 'Product not found'}
                </div>
                <Link href="/" className="inline-flex items-center text-[#1d4ed8] hover:text-[#1e40af] font-medium">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Products
                </Link>
            </div>
        );
    }

    const discountedPrice = product.discount > 0
        ? product.price - (product.price * (product.discount / 100))
        : null;

    return (
        <div className="bg-[#f3f4f6] min-h-screen pb-16 mt-7">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link href="/products" className="inline-flex items-center text-[#1d4ed8] hover:text-[#1e40af] font-medium">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Products
                    </Link>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="aspect-square bg-white rounded-lg overflow-hidden relative">
                            {imageError ? (
                                <div className="absolute inset-0 flex items-center justify-center bg-[#e5e7eb]">
                                    <p className="text-[#6b7280] text-sm">Image unavailable</p>
                                </div>
                            ) : (
                                <Image
                                    src={imageError ? "/images/fallback.jpg" : getProductImageUrl(product.image)}
                                    alt={product.title}
                                    fill
                                    className="object-contain p-6"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    onError={() => setImageError(true)}
                                    priority
                                />
                            )}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col"
                    >
                        <div className="mb-6">
                            <h1 className="text-3xl font-display font-medium text-[#111827] mb-2">{product.title}</h1>
                            <div className="flex items-center text-sm text-[#6b7280] mb-4">
                                <div className="flex items-center mr-4">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-4 h-4 ${star <= 4 ? 'text-[#facc15] fill-[#facc15]' : 'text-[#d1d5db]'}`}
                                            />
                                        ))}
                                    </div>
                                    <span className="ml-2">4.0 (24 reviews)</span>
                                </div>
                                <span className="capitalize px-2 py-1 bg-[#e5e7eb] rounded text-xs font-medium text-[#111827]">
                                    {product.category}
                                </span>
                            </div>
                            <div className="mb-6">
                                {discountedPrice ? (
                                    <div className="flex items-center">
                                        <span className="text-2xl font-medium text-[#111827] mr-2">
                                            ${discountedPrice.toFixed(2)}
                                        </span>
                                        <span className="text-lg text-[#6b7280] line-through">
                                            ${product.price.toFixed(2)}
                                        </span>
                                        <span className="ml-2 bg-[#f3f4f6] text-[#dc2626] px-2 py-0.5 rounded text-xs font-medium">
                                            {product.discount}% OFF
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-2xl font-medium text-[#111827]">
                                        ${product.price.toFixed(2)}
                                    </span>
                                )}
                            </div>
                            <div className="prose prose-gray mb-6 text-[#6b7280]">
                                <p>{product.description}</p>
                            </div>
                            <div className="flex items-center mb-6">
                                <span className="text-sm font-medium text-[#111827] mr-3">Quantity:</span>
                                <div className="flex items-center">
                                    <button
                                        onClick={decrementQuantity}
                                        className="w-8 h-8 flex items-center justify-center border border-[#d1d5db] rounded-l-md bg-[#f3f4f6] hover:bg-[#e5e7eb]"
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={handleQuantityChange}
                                        className="w-12 h-8 border-y border-[#d1d5db] text-center focus:outline-none text-[#111827]"
                                    />
                                    <button
                                        onClick={incrementQuantity}
                                        className="w-8 h-8 flex items-center justify-center border border-[#d1d5db] rounded-r-md bg-[#f3f4f6] hover:bg-[#e5e7eb]"
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="ml-4 text-sm text-[#6b7280]">
                                    {product.stock} available
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-4 mb-8">
                            <button
                                onClick={openModal}
                                className="flex-1 py-3 bg-[#1d4ed8] text-white rounded-lg font-medium text-base shadow-md hover:bg-[#1e40af] transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#1d4ed8]/50"
                            >
                                <ShoppingBag className="w-4 h-4 mr-2 inline-block" />
                                Order Now
                            </button>
                            <button className="py-3 px-4 bg-[#f3f4f6] text-[#111827] rounded-lg hover:bg-[#e5e7eb] transition-all">
                                <Heart className="w-4 h-4" />
                            </button>
                            <button className="py-3 px-4 bg-[#f3f4f6] text-[#111827] rounded-lg hover:bg-[#e5e7eb] transition-all">
                                <Share2 className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="border-t border-[#d1d5db] pt-6">
                            <div className="flex flex-col space-y-3 text-sm">
                                <div className="flex">
                                    <span className="text-[#6b7280] w-32">SKU:</span>
                                    <span className="text-[#111827]">PRD-{product.id.toString().padStart(5, '0')}</span>
                                </div>
                                <div className="flex">
                                    <span className="text-[#6b7280] w-32">Category:</span>
                                    <span className="text-[#111827] capitalize">{product.category}</span>
                                </div>
                                <div className="flex">
                                    <span className="text-[#6b7280] w-32">Status:</span>
                                    <span className="text-[#111827] capitalize">{product.status || 'In Stock'}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-display font-medium text-[#111827] mb-8">Related Products</h2>
                        <ProductGrid products={relatedProducts} isLoading={false} />
                    </div>
                )}
            </div>
            <OrderFormModal
                isOpen={isModalOpen}
                onClose={closeModal}
                product={product}
                quantity={quantity}
            />
        </div>
    );
};

export default ProductDetailPage;