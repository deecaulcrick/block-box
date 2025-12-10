'use client'
import React, { useState, useEffect } from 'react';
import { Palette, Copy, Check } from 'lucide-react';
import { Anton } from 'next/font/google'
import NotionClone from '@/components/NotionPage';

const anton = Anton({
    weight: '400',
    subsets: ['latin'],
})


const FlipClockWidget = () => {
    const [time, setTime] = useState(new Date());
    const [showCustomizer, setShowCustomizer] = useState(true);
    const [copied, setCopied] = useState(false);
    const [theme, setTheme] = useState({
        name: 'lollipop',
        background: '#FF69B4',
        cardBg: '#FFB6D9',
        cardBorder: '#000000',
        textColor: '#000000'
    });

    const themes = [
        { name: 'sunburn', background: '#E63946', cardBg: '#FFB3BA', cardBorder: '#000000', textColor: '#000000' },
        { name: 'olive fade', background: '#A4AC86', cardBg: '#D4D99F', cardBorder: '#000000', textColor: '#000000' },
        { name: 'butter', background: '#F4D35E', cardBg: '#FFF4B8', cardBorder: '#000000', textColor: '#000000' },
        { name: 'graphite', background: '#1A1A1A', cardBg: '#4A4A4A', cardBorder: '#2A2A2A', textColor: '#FFFFFF' },
        { name: 'klein', background: '#002FA7', cardBg: '#E8EDF5', cardBorder: '#000000', textColor: '#000000' },
        { name: 'lollipop', background: '#FF69B4', cardBg: '#FFB6D9', cardBorder: '#000000', textColor: '#000000' },
        { name: 'mint', background: '#98D8C8', cardBg: '#C8F2E5', cardBorder: '#000000', textColor: '#000000' },
        { name: 'lavender', background: '#9D84B7', cardBg: '#D4C5E8', cardBorder: '#000000', textColor: '#000000' },
        { name: 'peach', background: '#FFCBA4', cardBg: '#FFE5D0', cardBorder: '#000000', textColor: '#000000' },
        { name: 'ocean', background: '#0077BE', cardBg: '#B3E0FF', cardBorder: '#000000', textColor: '#000000' }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatNumber = (num: any) => num.toString().padStart(2, '0');

    const hours = formatNumber(time.getHours() % 12 || 12);
    const minutes = formatNumber(time.getMinutes());
    const period = time.getHours() >= 12 ? 'PM' : 'AM';

    const generateEmbedCode = () => {
        const params = new URLSearchParams({
            bg: theme.background.replace('#', ''),
            card: theme.cardBg.replace('#', ''),
            border: theme.cardBorder.replace('#', ''),
            text: theme.textColor.replace('#', '')
        });
        return `https://your-widget-domain.vercel.app/flip-clock?${params.toString()}`;
    };

    const copyEmbedCode = () => {
        navigator.clipboard.writeText(generateEmbedCode());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const FlipCard = ({ value, label }: any) => (
        <div className="relative font-anton">
            <div
                className="rounded-2xl p-8 shadow-lg"
                style={{
                    backgroundColor: theme.cardBg,
                    border: `3px solid ${theme.cardBorder}`
                }}
            >
                <div
                    className="text-6xl font-bold text-center leading-none"
                    style={{ color: theme.textColor }}
                >
                    {value}
                </div>
                {label && (
                    <div
                        className="text-xs  text-right mt-1 absolute right-3 bottom-3"
                        style={{ color: theme.textColor }}
                    >
                        {label}
                    </div>
                )}
            </div>
            <div
                className="absolute inset-x-0 top-1/2 h-0.5 opacity-30"
                style={{ backgroundColor: theme.cardBorder }}
            />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#004900] p-8" >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Flip Clock Widget</h1>
                    <p className="text-gray-600">Customize your aesthetic clock for Notion</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <NotionClone />
                    {/* Clock Preview */}
                    <div className="order-2 md:order-1">
                        <div className="sticky top-8">
                            <div
                                className="rounded-3xl p-8 shadow-2xl transition-all duration-300"
                                style={{ backgroundColor: theme.background }}
                            >
                                <div className="flex items-center justify-center gap-4 mb-4">
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

                                <div className="flex items-center justify-center gap-4">
                                    <FlipCard value={hours[0]} />
                                    <FlipCard value={hours[1]} />
                                    <div
                                        className="text-6xl font-bold mx-2"
                                        style={{ color: theme.textColor }}
                                    >
                                        :
                                    </div>
                                    <FlipCard value={minutes[0]} />
                                    <FlipCard value={minutes[1]} label={period} />
                                </div>
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
                                <Palette className="w-6 h-6 text-purple-600" />
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
                                            <div className="text-sm font-semibold capitalize mb-2"
                                                style={{ color: t.textColor }}>
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

export default FlipClockWidget;