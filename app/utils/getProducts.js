import axios from 'axios';

const API_URL = 'https://fakestoreapi.com/products';
const STORAGE_URL = 'https://admin.refabry.com/storage';

export const getProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return {
            success: true,
            data: response.data.map((item) => ({
                id: item.id,
                title: item.title,
                description: item.description,
                price: item.price,
                image: item.image,
                category: item.category,
                is_feature: Math.random() > 0.5 ? 1 : 0,
                rating: item.rating?.rate || 4.5,
                stock: item.rating?.count || 100,
                discount: Math.random() > 0.7 ? Math.floor(Math.random() * 30) + 10 : 0, // Simulate discounts
            })),
        };
    } catch (error) {
        console.error('Error fetching products:', error);
        return { success: false, data: [] };
    }
};

export const getProductImageUrl = (imagePath) => {
    if (!imagePath) return '/placeholder-product.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    return `${STORAGE_URL}/product/${imagePath}`;
};