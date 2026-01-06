import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { cn } from '../lib/utils';

export function LanguageSwitcher({ className }) {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lng;
    };

    // Set initial direction based on loaded language
    useEffect(() => {
        document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <Globe size={16} className="text-gray-400" />
            <div className="flex gap-1">
                <button
                    onClick={() => changeLanguage('ar')}
                    className={cn("px-2 py-1 text-xs rounded transition-colors", i18n.language === 'ar' ? "bg-primary-100 text-primary-700 font-bold" : "text-gray-500 hover:bg-gray-100")}
                >
                    عربي
                </button>
                <button
                    onClick={() => changeLanguage('en')}
                    className={cn("px-2 py-1 text-xs rounded transition-colors", i18n.language === 'en' ? "bg-primary-100 text-primary-700 font-bold" : "text-gray-500 hover:bg-gray-100")}
                >
                    EN
                </button>
                <button
                    onClick={() => changeLanguage('fr')}
                    className={cn("px-2 py-1 text-xs rounded transition-colors", i18n.language === 'fr' ? "bg-primary-100 text-primary-700 font-bold" : "text-gray-500 hover:bg-gray-100")}
                >
                    FR
                </button>
            </div>
        </div>
    );
}
