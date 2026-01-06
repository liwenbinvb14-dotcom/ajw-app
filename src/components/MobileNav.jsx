import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, ShoppingBag, Settings } from 'lucide-react';
import { cn } from '../lib/utils';
import { useStore } from '../store/useStore';
import { useTranslation } from 'react-i18next';

export function MobileNav() {
    const { t } = useTranslation();
    const toggleCart = useStore((state) => state.toggleCart);
    const cart = useStore((state) => state.cart || []);

    const navItems = [
        { icon: LayoutDashboard, label: t('nav.dashboard'), to: '/' },
        { icon: Package, label: t('nav.products'), to: '/products' },
        { icon: null, label: t('nav.cart'), isCart: true },
        { icon: ShoppingCart, label: t('nav.orders'), to: '/orders' },
        // { icon: Users, label: t('nav.customers'), to: '/customers' },
        { icon: Settings, label: t('nav.settings'), to: '/profile' },
    ];

    if (!toggleCart) return null; // Safety check

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 px-2 py-1 flex justify-between items-center z-50 pb-safe shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
            {navItems.map((item, index) => {
                if (item.isCart) {
                    return (
                        <button
                            key="cart"
                            onClick={() => toggleCart && toggleCart()}
                            className="flex flex-col items-center gap-0.5 p-2 relative group"
                        >
                            <div className="relative bg-accent text-white p-3 rounded-full -mt-8 border-4 border-white shadow-lg shadow-accent/20">
                                <ShoppingBag size={20} className="fill-current" />
                                {cart.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-white text-accent border border-accent text-[10px] min-w-[16px] h-4 flex items-center justify-center rounded-full font-bold">
                                        {cart.length}
                                    </span>
                                )}
                            </div>
                            <span className="text-[10px] font-medium text-gray-500 group-hover:text-primary-500">{item.label}</span>
                        </button>
                    );
                }

                const Icon = item.icon;
                return (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => cn(
                            "flex flex-col items-center gap-1 p-2 flex-1 transition-colors relative",
                            isActive ? "text-primary-500" : "text-gray-400 hover:text-gray-600"
                        )}
                    >
                        {({ isActive }) => (
                            <>
                                <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} className={isActive ? "scale-110 transition-transform" : ""} />
                                <span className={cn("text-[10px] font-medium", isActive && "font-bold")}>{item.label}</span>
                            </>
                        )}
                    </NavLink>
                );
            })}
        </nav>
    );
}
