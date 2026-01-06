import React from 'react';
import { Edit, ShoppingCart } from 'lucide-react';
import { StockBadge } from './StockBadge';
import { cn } from '../lib/utils';
import { useStore } from '../store/useStore';
import { useTranslation } from 'react-i18next';

export function ProductCard({ product, onEdit }) {
    const { t } = useTranslation();
    const addToCart = useStore((state) => state.addToCart);
    const user = useStore((state) => state.user);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden group flex flex-col h-full hover:-translate-y-2 duration-500">
            <div className="relative aspect-[1/1] bg-gray-50 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 right-3 flex flex-col gap-2 items-end">
                    <StockBadge quantity={product.quantity} />
                    {product.quantity > 5 && <span className="bg-accent/90 backdrop-blur-sm text-white text-[10px] px-2.5 py-1 rounded-full font-bold shadow-lg">HOT</span>}
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
            </div>

            <div className="p-4 flex flex-col flex-1 gap-2">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-tight h-10 group-hover:text-primary-600 transition-colors">{product.name}</h3>

                <div className="flex items-center gap-2 mt-auto">
                    <div className="flex items-baseline gap-0.5 text-primary-600">
                        <span className="text-[10px] font-bold opacity-70">{t('common.currency')}</span>
                        <span className="text-2xl font-black">{product.price.toLocaleString()}</span>
                    </div>
                </div>

                <div className="border-t border-gray-50 pt-3 mt-1 flex gap-2">
                    <button
                        onClick={() => addToCart(product)}
                        disabled={product.quantity === 0}
                        className={cn(
                            "flex-1 h-10 rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2",
                            product.quantity === 0
                                ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none"
                                : "bg-gradient-to-r from-primary-600 to-primary-400 text-white hover:shadow-primary-500/40 active:scale-95"
                        )}
                    >
                        <ShoppingCart size={16} fill="white" className="opacity-80" />
                        {t('products.addToCart')}
                    </button>
                    {user.role === 'admin' && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit();
                            }}
                            className="w-10 h-10 rounded-xl bg-gray-50 text-gray-500 flex items-center justify-center hover:bg-primary-50 hover:text-primary-600 transition-all active:scale-95 border border-gray-100"
                        >
                            <Edit size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
