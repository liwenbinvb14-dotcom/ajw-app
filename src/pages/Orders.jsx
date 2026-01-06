import React from 'react';
import { useStore } from '../store/useStore';
import { Search, Filter, Eye } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Orders() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === 'ar';

    // Mock orders since we don't have order history in store yet
    const orders = [
        { id: '#ORD-001', customer: 'مجوهرات الأمل', date: '2025-01-05', total: 4500, status: 'pending', items: 5 },
        { id: '#ORD-002', customer: 'أناقة الخليج', date: '2025-01-04', total: 12500, status: 'completed', items: 12 },
        { id: '#ORD-003', customer: 'متجر الجوهرة', date: '2025-01-04', total: 3200, status: 'processing', items: 3 },
    ];

    const statusStyles = {
        pending: 'bg-amber-100 text-amber-700',
        completed: 'bg-green-100 text-green-700',
        processing: 'bg-blue-100 text-blue-700',
        cancelled: 'bg-red-100 text-red-700'
    };

    return (
        <div className="p-6 space-y-6">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-serif">{t('orders.title')}</h1>
                </div>
            </header>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400`} size={20} />
                        <input
                            type="text"
                            placeholder={t('products.searchPlaceholder')}
                            className={`w-full ${isRtl ? 'pl-4 pr-10' : 'pl-10 pr-4'} py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary-500 outline-none`}
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <Filter size={20} />
                        <span className="hidden md:inline">Filter</span>
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className={`bg-gray-50 ${isRtl ? 'text-right' : 'text-left'}`}>
                            <tr>
                                <th className="px-6 py-4 text-sm font-medium text-gray-500">{t('orders.orderId')}</th>
                                <th className="px-6 py-4 text-sm font-medium text-gray-500">{t('orders.customer')}</th>
                                <th className="px-6 py-4 text-sm font-medium text-gray-500">{t('orders.date')}</th>
                                <th className="px-6 py-4 text-sm font-medium text-gray-500">{t('orders.items')}</th>
                                <th className="px-6 py-4 text-sm font-medium text-gray-500">{t('orders.total')}</th>
                                <th className="px-6 py-4 text-sm font-medium text-gray-500">{t('orders.status')}</th>
                                <th className="px-6 py-4 text-sm font-medium text-gray-500">{t('orders.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                                    <td className="px-6 py-4 text-gray-700">{order.customer}</td>
                                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                                    <td className="px-6 py-4 text-gray-500">{order.items}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">{order.total.toLocaleString()} {t('common.currency')}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[order.status]}`}>
                                            {t(`orders.statuses.${order.status}`)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="p-2 text-gray-400 hover:text-primary-600 transition-colors">
                                            <Eye size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
