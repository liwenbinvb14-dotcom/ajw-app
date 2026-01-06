import React from 'react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

export function StockBadge({ quantity }) {
    const { t } = useTranslation();
    let status = 'inStock';
    if (quantity === 0) status = 'outOfStock';
    else if (quantity < 5) status = 'lowStock';

    const styles = {
        inStock: 'bg-green-100 text-green-700 border-green-200',
        lowStock: 'bg-amber-100 text-amber-700 border-amber-200 animate-pulse',
        outOfStock: 'bg-red-100 text-red-700 border-red-200',
    };

    const label = t(`products.stock.${status}`) + (status !== 'outOfStock' ? ` (${quantity})` : '');

    return (
        <span className={cn(
            "px-2.5 py-0.5 rounded-full text-xs font-medium border",
            styles[status]
        )}>
            {label}
        </span>
    );
}
