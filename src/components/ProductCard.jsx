import React from 'react';
import { Edit, ShoppingCart } from 'lucide-react';
import { StockBadge } from './StockBadge';
import { cn } from '../lib/utils';
import { useStore } from '../store/useStore';
import { useTranslation } from 'react-i18next';

export function ProductCard({ product }) {
    const { t } = useTranslation();
    const addToCart = useStore((state) => state.addToCart);

    return (
        <div className="bg-white rounded-2xl border border-transparent shadow-sm hover:shadow-lg transition-all overflow-hidden group flex flex-col h-full hover:-translate-y-1 duration-300">
            <div className="relative aspect-[1/1] bg-gray-100 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 flex flex-col gap-1 items-end">
                    <StockBadge quantity={product.quantity} />
                    {product.quantity > 0 && <span className="bg-accent text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">HOT</span>}
                </div>
            </div>

            <div className="p-3 flex flex-col flex-1 gap-1">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 leading-tight h-10">{product.name}</h3>

                <div className="flex items-center gap-2 mt-auto">
                    <div className="flex items-baseline gap-0.5 text-primary-500">
                        <span className="text-xs font-bold">{t('common.currency')}</span>
                        <span className="text-xl font-extrabold">{product.price}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 mt-1">100+ {t('orders.status')}</span>
                </div>

                <div className="border-t border-gray-50 pt-2 mt-1 flex gap-2">
                    <button
                        onClick={() => addToCart(product)}
                        disabled={product.quantity === 0}
                        className={cn(
                            "flex-1 h-8 rounded-full text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1",
                            product.quantity === 0
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                                : "bg-gradient-to-r from-taobao-yellow to-primary-500 text-white hover:brightness-110 active:scale-95"
                        )}
                    >
                        <ShoppingCart size={14} fill="currentColor" />
                        {t('products.addToCart')}
                    </button>
                    {/* Optional secondary button could go here */}
                </div>
            </div>
        </div>
    );
}
