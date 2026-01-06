import React from 'react';
import { Search, Mail, Phone, MoreHorizontal } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Customers() {
    const { t } = useTranslation();
    const customers = [
        { id: 1, name: 'مجوهرات الأمل', contact: 'أحمد محمد', email: 'ahmed@example.com', phone: '+966 50 000 0000', orders: 15, totalSpent: 150000 },
        { id: 2, name: 'أناقة الخليج', contact: 'سارة العتيبي', email: 'sara@example.com', phone: '+966 55 555 5555', orders: 8, totalSpent: 85000 },
        { id: 3, name: 'لمسات ذهبية', contact: 'خالد العنزي', email: 'khaled@example.com', phone: '+966 54 444 4444', orders: 22, totalSpent: 220000 },
    ];

    return (
        <div className="p-6 space-y-6">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 font-serif">{t('customers.title')}</h1>
                </div>
                <button className="bg-primary-600 text-white px-4 py-2.5 rounded-lg hover:bg-primary-700 transition-colors shadow-sm">
                    {t('customers.contact')} {/* Reusing contact key or adding new one? Using contact for now */}
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customers.map((customer) => (
                    <div key={customer.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center text-primary-700 font-bold text-xl">
                                {customer.name.charAt(0)}
                            </div>
                            <button className="text-gray-400 hover:text-gray-600">
                                <MoreHorizontal size={20} />
                            </button>
                        </div>

                        <h3 className="font-bold text-gray-900 text-lg mb-1">{customer.name}</h3>
                        <p className="text-gray-500 text-sm mb-4">{customer.contact}</p>

                        <div className="space-y-3 border-t border-gray-50 pt-4">
                            <div className="flex items-center gap-3 text-gray-600 text-sm">
                                <Mail size={16} />
                                <span>{customer.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 text-sm">
                                <Phone size={16} />
                                <span dir="ltr">{customer.phone}</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center text-sm">
                            <div>
                                <span className="block text-gray-500">{t('customers.totalOrders')}</span>
                                <span className="font-semibold text-gray-900">{customer.orders}</span>
                            </div>
                            <div className="text-left">
                                <span className="block text-gray-500">{t('customers.totalSpent')}</span>
                                <span className="font-bold text-accent">{customer.totalSpent.toLocaleString()} {t('common.currency')}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
