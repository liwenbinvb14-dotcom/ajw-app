import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings } from 'lucide-react';
import { cn } from '../lib/utils';

import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Sidebar() {
    const { t } = useTranslation();

    const navItems = [
        { icon: LayoutDashboard, label: t('nav.dashboard'), to: '/' },
        { icon: Package, label: t('nav.products'), to: '/products' },
        { icon: ShoppingCart, label: t('nav.orders'), to: '/orders' },
        { icon: Users, label: t('nav.customers'), to: '/customers' },
    ];

    return (
        <aside className="hidden md:flex flex-col w-64 bg-white ltr:border-r rtl:border-l h-screen sticky top-0 transition-all">
            <div className="p-6 flex items-center justify-center border-b border-gray-100">
                <img src="/logo.png" alt="AJW Logo" className="h-16 w-auto object-contain hover:scale-105 transition-transform" />
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                            "hover:bg-primary-50 hover:text-primary-700",
                            isActive
                                ? "bg-primary-50 text-accent font-medium shadow-sm"
                                : "text-gray-500"
                        )}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-100 space-y-4">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-500 hover:text-primary-700 transition-colors">
                    <Settings size={20} />
                    <span>{t('nav.settings')}</span>
                </button>
                <LanguageSwitcher className="justify-center" />
            </div>
        </aside>
    );
}
