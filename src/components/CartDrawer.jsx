import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

export function CartDrawer({ isOpen, onClose }) {
    const { t } = useTranslation();
    const cart = useStore((state) => state.cart);
    const removeFromCart = useStore((state) => state.removeFromCart);

    // Calculate total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />

            <div className="relative w-full max-w-md bg-white shadow-2xl animate-in slide-in-from-left duration-300 ltr:border-l rtl:border-r">
                <div className="flex flex-col h-full">
                    <header className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <div className="flex items-center gap-2">
                            <ShoppingBag className="text-primary-600" />
                            <h2 className="text-lg font-bold text-gray-900 font-serif">{t('cart.title')}</h2>
                            <span className="bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded-full font-medium">
                                {cart.length} {t('cart.items')}
                            </span>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
                            <X size={20} />
                        </button>
                    </header>

                    <div className="flex-1 overflow-y-auto p-5 space-y-4">
                        {cart.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4 text-gray-400">
                                <ShoppingBag size={48} className="opacity-20" />
                                <p>{t('cart.empty')}</p>
                                <button onClick={onClose} className="text-primary-600 font-medium hover:underline">
                                    {t('products.title')}
                                </button>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className="flex gap-4 p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                                    <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-medium text-gray-900 line-clamp-1">{item.name}</h4>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                                        <div className="flex justify-between items-center">
                                            <p className="font-bold text-accent">{item.price * item.quantity} {t('common.currency')}</p>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <span>{t('cart.total')}: {item.quantity}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {cart.length > 0 && (
                        <div className="p-5 border-t border-gray-100 bg-gray-50/50 space-y-4">
                            <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                                <span>{t('cart.total')}</span>
                                <span>{total.toLocaleString()} {t('common.currency')}</span>
                            </div>
                            <button
                                onClick={() => {
                                    useStore.getState().placeOrder();
                                    alert(t('orders.statuses.processing') + '...');
                                }}
                                className="w-full bg-primary-600 text-white py-3.5 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-600/20 active:scale-[0.98]"
                            >
                                {t('cart.checkout')}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
