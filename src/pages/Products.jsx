import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';
import { useTranslation } from 'react-i18next';

export default function Products() {
    const { t, i18n } = useTranslation();
    const products = useStore((state) => state.products);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Direction-aware styles
    const isRtl = i18n.language === 'ar';

    return (
        <div className="p-6 space-y-6">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-serif">{t('products.title')}</h1>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-lg hover:bg-primary-700 transition-colors shadow-sm"
                >
                    <Plus size={20} />
                    <span>{t('products.addProduct')}</span>
                </button>
            </header>

            <div className="sticky top-0 bg-gray-50/95 backdrop-blur z-10 py-2 space-y-4">
                <div className="flex gap-2">
                    <div className="relative flex-1 group">
                        <input
                            type="text"
                            placeholder={t('products.searchPlaceholder')}
                            className={`w-full ${isRtl ? 'pl-4 pr-12' : 'pl-12 pr-4'} py-2.5 rounded-full border-2 border-primary-500/20 focus:border-primary-500 focus:ring-0 outline-none transition-all shadow-sm bg-white`}
                        />
                        <div className={`absolute ${isRtl ? 'right-1' : 'left-1'} top-1 bottom-1 w-10 bg-primary-500 rounded-full flex items-center justify-center text-white shadow-sm`}>
                            <Search size={18} />
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar mask-gradient">
                    {['All', 'Rings', 'Necklaces', 'Bracelets', 'Earrings'].map((cat, i) => (
                        <button key={cat} className={cn(
                            "px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-all border",
                            i === 0
                                ? "bg-primary-50 text-primary-600 border-primary-200 font-bold shadow-sm"
                                : "bg-white text-gray-600 border-gray-100 hover:border-primary-200"
                        )}>
                            {cat === 'All' ? t('products.all') : t(`products.categories.${cat.toLowerCase()}`)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 pb-20">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}
