import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';
import { CartDrawer } from './CartDrawer';
import { useStore } from '../store/useStore';

export function Layout() {
    const isCartOpen = useStore((state) => state.isCartOpen);
    const toggleCart = useStore((state) => state.toggleCart);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />

            <div className="flex-1 pb-20 md:pb-0">
                <Outlet />
            </div>

            <MobileNav />
            <CartDrawer isOpen={isCartOpen} onClose={toggleCart} />
        </div>
    );
}
