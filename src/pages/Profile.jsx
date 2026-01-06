import React from 'react';
import { User, Shield, ShieldCheck, LogOut, Settings } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

export default function Profile() {
    const { t } = useTranslation();
    const user = useStore((state) => state.user);
    const setRole = useStore((state) => state.setRole);

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-8 pb-24 md:pb-6">
            <header>
                <h1 className="text-3xl font-bold text-gray-900 font-serif">{t('nav.settings')}</h1>
            </header>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 flex flex-col items-center text-center space-y-4 bg-gradient-to-b from-primary-50/50 to-white">
                    <div className="w-24 h-24 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 border-4 border-white shadow-lg">
                        <User size={48} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                        <p className="text-gray-500">Premium Wholesale Partner</p>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className={cn(
                                "p-3 rounded-lg",
                                user.role === 'admin' ? "bg-accent text-white" : "bg-gray-200 text-gray-500"
                            )}>
                                {user.role === 'admin' ? <ShieldCheck size={24} /> : <Shield size={24} />}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Admin Mode (CMS)</h3>
                                <p className="text-sm text-gray-500">Enable editing of prices and products</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setRole(user.role === 'admin' ? 'user' : 'admin')}
                            className={cn(
                                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                                user.role === 'admin' ? "bg-accent" : "bg-gray-300"
                            )}
                        >
                            <span
                                className={cn(
                                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                                    user.role === 'admin' ? "translate-x-6" : "translate-x-1"
                                )}
                            />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                            <Settings className="text-gray-400" />
                            <div className="text-left">
                                <h4 className="font-bold text-gray-900">Account Settings</h4>
                                <p className="text-xs text-gray-500">Manage your password and security</p>
                            </div>
                        </button>
                        <button className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors text-red-500">
                            <LogOut />
                            <div className="text-left">
                                <h4 className="font-bold">Log Out</h4>
                                <p className="text-xs text-red-400">Exit your session</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
