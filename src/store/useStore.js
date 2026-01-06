import { create } from 'zustand';

export const useStore = create((set) => ({
    products: [
        {
            id: '1',
            name: 'خاتم ذهب عيار 21',
            price: 1250,
            image: 'https://images.unsplash.com/photo-1605100804763-ebea2401a863?q=80&w=2070&auto=format&fit=crop',
            category: 'خواتم',
            quantity: 15,
        },
        {
            id: '2',
            name: 'قلادة ألماس فاخرة',
            price: 4500,
            image: 'https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=2070&auto=format&fit=crop',
            category: 'قلائد',
            quantity: 3, // Low stock
        },
        {
            id: '3',
            name: 'سوار فضة إيطالي',
            price: 350,
            image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070&auto=format&fit=crop',
            category: 'أساور',
            quantity: 0, // Out of stock
        },
        {
            id: '4',
            name: 'أقراط لؤلؤ',
            price: 890,
            image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2070&auto=format&fit=crop',
            category: 'أقراط',
            quantity: 8,
        }
    ],
    cart: [],
    addToCart: (product, qty = 1) => set((state) => {
        // Basic cart logic
        const existing = state.cart.find(item => item.id === product.id);
        if (existing) {
            return {
                cart: state.cart.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + qty }
                        : item
                )
            };
        }
        return { cart: [...state.cart, { ...product, quantity: qty }] };
    }),
    addProduct: (product) => set((state) => ({
        products: [...state.products, { ...product, id: Math.random().toString(36).substr(2, 9) }]
    })),
    updateProduct: (id, updates) => set((state) => ({
        products: state.products.map(p => p.id === id ? { ...p, ...updates } : p)
    })),
    deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
    })),
    isCartOpen: false,
    toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
    removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(item => item.id !== id)
    })),
}));
