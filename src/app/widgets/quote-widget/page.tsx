'use client'

import { useSearchParams } from 'next/navigation';
import { RefreshCw } from 'lucide-react';
import { useState } from 'react';
import quotes from '@/data/weeklyQuotes';
import themes from '@/themes/pastel';


export default function WidgetEmbed() {
    const params = useSearchParams();

    const themeNumber = `${params.get('themeNumber') || '1'}`;

    const [theme, setTheme] = useState(
        themes.find(t => t.id === Number(themeNumber)) || themes[0]
    );
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(() => {
        return Math.floor(Math.random() * quotes.length);
    });
    const currentQuote = quotes[currentQuoteIndex];

    const [quote] = useState(() => {
        const index = Math.floor(Math.random() * quotes.length);
        return quotes[index];
    });


    const generateNewQuote = () => {
        setIsRefreshing(true);
        setTimeout(() => {
            let newIndex;
            do {
                newIndex = Math.floor(Math.random() * quotes.length);
            } while (newIndex === currentQuoteIndex && quotes.length > 1);
            setCurrentQuoteIndex(newIndex);
            setIsRefreshing(false);
        }, 300);
    };
    return (
        <div style={{
            backgroundColor: theme.background,
            width: '100%',
            height: '100%',
            padding: '20px',
            boxSizing: 'border-box'
        }}>
            <div
                style={{
                    backgroundColor: theme.cardBg,
                    border: `3px solid ${theme.cardBorder}`,
                    borderRadius: '16px',
                    padding: '20px',
                    color: theme.textColor,
                    fontFamily: 'sans-serif'
                }}
            >
                <div className='flex items-center gap-4 mb-8'>
                    <div className="bg-white bg-opacity-30 backdrop-blur-sm rounded-full px-6 py-4 w-fit">
                        <select
                            value={theme.name}
                            onChange={(e) => {
                                const selected = themes.find(t => t.name === e.target.value);
                                if (selected) setTheme(selected);
                            }}
                            className="bg-transparent font-medium outline-none cursor-pointer text-black"
                            style={{ color: theme.background }}
                        >
                            {themes.map(t => (
                                <option key={t.name} value={t.name}>{t.name}</option>
                            ))}
                        </select>
                    </div>
                    <button
                        onClick={generateNewQuote}
                        disabled={isRefreshing}
                        className="w-fit px-6 py-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-xl font-semibold transition-all hover:shadow-xl flex items-center justify-center gap-2"
                        style={{ color: theme.background }}
                    >
                        <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />

                    </button>
                </div>
                <p
                    className="text-4xl font-dm-serif tracking-tighter text-center mb-6"
                    style={{ color: theme.background }}
                >
                    {currentQuote.text}"
                </p>
            </div>
        </div>

    );
}
