'use client'
import { useState } from 'react';
import { RefreshCw, Copy, Check, Quote } from 'lucide-react';
import quotes from '@/data/weeklyQuotes';
import themes from '@/themes/pastel';

const QuoteWidget = () => {
    const [copied, setCopied] = useState(false);
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const [theme, setTheme] = useState({
        id: 5,
        name: 'lollipop',
        background: '#FF69B4',
        cardBg: '#FFB6D9',
        cardBorder: '#000000',
        textColor: '#000000'
    });

    const generateEmbedCode = () => {
        const params = new URLSearchParams({
            themeNumber: theme.id.toString() || '1',
        });
        return `https://block-box.vercel.app/widgets/quote-widget?${params.toString()}`;
    };

    const copyEmbedCode = () => {
        navigator.clipboard.writeText(generateEmbedCode());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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

    const currentQuote = quotes[currentQuoteIndex];

    return (
        <div className="min-h-screen bg-[#dccbff] p-8"
            style={{ backgroundImage: "url('images/grid-bg.svg')" }}>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Quote Generator Widget</h1>
                    <p className="text-gray-600">Customize your inspirational quote widget for Notion</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Quote Preview */}
                    <div className="order-2 md:order-1">
                        <div className="sticky top-8">
                            <div
                                className="rounded-3xl p-8 shadow-2xl transition-all duration-300"
                                style={{ backgroundColor: theme.background }}
                            >
                                <div className="flex items-center justify-center gap-4 mb-6">
                                    <div className="bg-white bg-opacity-30 backdrop-blur-sm rounded-full px-4 py-2">
                                        <select
                                            value={theme.name}
                                            onChange={(e) => {
                                                const selected = themes.find(t => t.name === e.target.value);
                                                if (selected) setTheme(selected);
                                            }}
                                            className="bg-transparent font-medium outline-none cursor-pointer"
                                            style={{ color: theme.textColor === '#FFFFFF' ? '#FFFFFF' : '#000000' }}
                                        >
                                            {themes.map(t => (
                                                <option key={t.name} value={t.name}>{t.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* Quote Card */}
                                <div
                                    className={`rounded-2xl p-8 shadow-lg transition-opacity duration-300 ${isRefreshing ? 'opacity-60' : 'opacity-100'}`}
                                    style={{
                                        backgroundColor: theme.cardBg,
                                        border: `3px solid ${theme.cardBorder}`,
                                        minHeight: '280px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center'
                                    }}
                                >

                                    <p
                                        className="text-4xl font-dm-serif tracking-tighter text-center mb-6"
                                        style={{ color: theme.background }}
                                    >
                                        {currentQuote.text}
                                    </p>

                                </div>

                                {/* Refresh Button */}
                                <button
                                    onClick={generateNewQuote}
                                    disabled={isRefreshing}
                                    className="w-full mt-6 px-6 py-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                    style={{ color: theme.background }}
                                >
                                    <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                                    Generate New Quote
                                </button>
                            </div>

                            {/* Embed Code */}
                            <div className="mt-6 bg-white rounded-2xl p-6 shadow-lg">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-semibold text-gray-800">Embed in Notion</h3>
                                    <button
                                        onClick={copyEmbedCode}
                                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium"
                                    >
                                        {copied ? (
                                            <>
                                                <Check className="w-4 h-4 text-green-600" />
                                                <span className="text-green-600">Copied!</span>
                                            </>
                                        ) : (
                                            <>
                                                <Copy className="w-4 h-4" />
                                                <span>Copy URL</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 font-mono break-all">
                                    {generateEmbedCode()}
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    In Notion: Type <code className="bg-gray-100 px-1 rounded">/embed</code> → Paste this URL
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Customization Panel */}
                    <div className="order-1 md:order-2">
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Quote className="w-6 h-6 text-purple-600" />
                                <h2 className="text-2xl font-bold text-gray-800">Customize</h2>
                            </div>

                            {/* Theme Presets */}
                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Theme Presets
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {themes.map((t) => (
                                        <button
                                            key={t.name}
                                            onClick={() => setTheme(t)}
                                            className={`relative rounded-xl p-4 transition-all ${theme.name === t.name
                                                ? 'ring-4 ring-purple-500 ring-offset-2'
                                                : 'hover:scale-105'
                                                }`}
                                            style={{ backgroundColor: t.background }}
                                        >
                                            <div className="text-sm font-semibold capitalize mb-2" style={{ color: t.textColor }}>
                                                {t.name}
                                            </div>
                                            <div className="flex gap-1">
                                                <div
                                                    className="w-8 h-8 rounded-lg border-2"
                                                    style={{
                                                        backgroundColor: t.cardBg,
                                                        borderColor: t.cardBorder
                                                    }}
                                                />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Colors */}
                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-gray-700">
                                    Custom Colors
                                </label>

                                <div>
                                    <label className="block text-xs text-gray-600 mb-2">Background</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            value={theme.background}
                                            onChange={(e) => setTheme({ ...theme, background: e.target.value, name: 'custom' })}
                                            className="w-full h-12 rounded-lg cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={theme.background}
                                            onChange={(e) => setTheme({ ...theme, background: e.target.value, name: 'custom' })}
                                            className="w-28 px-3 border-2 border-gray-200 rounded-lg text-sm font-mono"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-600 mb-2">Card Background</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            value={theme.cardBg}
                                            onChange={(e) => setTheme({ ...theme, cardBg: e.target.value, name: 'custom' })}
                                            className="w-full h-12 rounded-lg cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={theme.cardBg}
                                            onChange={(e) => setTheme({ ...theme, cardBg: e.target.value, name: 'custom' })}
                                            className="w-28 px-3 border-2 border-gray-200 rounded-lg text-sm font-mono"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-600 mb-2">Card Border</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            value={theme.cardBorder}
                                            onChange={(e) => setTheme({ ...theme, cardBorder: e.target.value, name: 'custom' })}
                                            className="w-full h-12 rounded-lg cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={theme.cardBorder}
                                            onChange={(e) => setTheme({ ...theme, cardBorder: e.target.value, name: 'custom' })}
                                            className="w-28 px-3 border-2 border-gray-200 rounded-lg text-sm font-mono"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-600 mb-2">Text Color</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            value={theme.textColor}
                                            onChange={(e) => setTheme({ ...theme, textColor: e.target.value, name: 'custom' })}
                                            className="w-full h-12 rounded-lg cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={theme.textColor}
                                            onChange={(e) => setTheme({ ...theme, textColor: e.target.value, name: 'custom' })}
                                            className="w-28 px-3 border-2 border-gray-200 rounded-lg text-sm font-mono"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Tips */}
                            <div className="mt-6 bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                                <h3 className="font-semibold text-purple-900 mb-2 text-sm">💡 Pro Tips</h3>
                                <ul className="text-xs text-purple-800 space-y-1">
                                    <li>• Choose high contrast for better readability</li>
                                    <li>• Match colors to your Notion aesthetic</li>
                                    <li>• Click refresh for daily inspiration</li>
                                    <li>• Save the embed URL for easy reuse</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuoteWidget;