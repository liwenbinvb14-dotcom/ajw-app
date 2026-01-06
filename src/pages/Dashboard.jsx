import { Package, ShoppingBag, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { useStore } from '../store/useStore';

export default function Dashboard() {
    const { t } = useTranslation();
    const products = useStore((state) => state.products);
    const orders = useStore((state) => state.orders);
    const customers = useStore((state) => state.customers);

    const stats = [
        { label: t('dashboard.totalProducts'), value: products.length.toString(), icon: Package, color: 'bg-blue-50 text-blue-600' },
        { label: t('dashboard.newOrders'), value: orders.filter(o => o.status === 'pending').length.toString(), icon: ShoppingBag, color: 'bg-green-50 text-green-600' },
        { label: t('dashboard.totalCustomers'), value: customers.length.toString(), icon: Users, color: 'bg-purple-50 text-purple-600' },
    ];

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
                <LanguageSwitcher className="md:hidden" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium mb-1">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                        </div>
                        <div className={`p-3 rounded-lg ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
