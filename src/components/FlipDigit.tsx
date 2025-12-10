'use client'
import { useEffect, useRef, useState } from "react";

const FlipDigit = ({ value, theme }: { value: string; theme: any }) => {
    const [previousValue, setPreviousValue] = useState(value);
    const [flipping, setFlipping] = useState(false);

    // detect digit change
    useEffect(() => {
        if (value !== previousValue) {
            setFlipping(true);
            const timeout = setTimeout(() => {
                setPreviousValue(value);
                setFlipping(false);
            }, 600);
            return () => clearTimeout(timeout);
        }
    }, [value, previousValue]);

    return (
        <div className="relative w-16 h-24 perspective font-anton">
            {/* Static top */}
            <div
                className="absolute top-0 left-0 w-full h-1/2 rounded-t-xl flex items-center justify-center text-5xl font-bold"
                style={{
                    backgroundColor: theme.cardBg,
                    color: theme.textColor,
                    border: `3px solid ${theme.cardBorder}`,
                    borderBottom: "none",
                    overflow: "hidden",
                }}
            >
                {previousValue}
            </div>

            {/* Static bottom */}
            <div
                className="absolute bottom-0 left-0 w-full h-1/2 rounded-b-xl flex items-center justify-center text-5xl font-bold"
                style={{
                    backgroundColor: theme.cardBg,
                    color: theme.textColor,
                    border: `3px solid ${theme.cardBorder}`,
                    borderTop: "none",
                    overflow: "hidden",
                }}
            >
                {value}
            </div>

            {/* Flip top animation */}
            {flipping && (
                <div
                    className="absolute top-0 left-0 w-full h-1/2 rounded-t-xl flex items-center justify-center text-5xl font-bold animate-flip-top"
                    style={{
                        backgroundColor: theme.cardBg,
                        color: theme.textColor,
                        border: `3px solid ${theme.cardBorder}`,
                        borderBottom: "none",
                        overflow: "hidden",
                    }}
                >
                    {previousValue}
                </div>
            )}

            {/* Flip bottom animation */}
            {flipping && (
                <div
                    className="absolute bottom-0 left-0 w-full h-1/2 rounded-b-xl flex items-center justify-center text-5xl font-bold animate-flip-bottom"
                    style={{
                        backgroundColor: theme.cardBg,
                        color: theme.textColor,
                        border: `3px solid ${theme.cardBorder}`,
                        borderTop: "none",
                        overflow: "hidden",
                    }}
                >
                    {value}
                </div>
            )}
        </div>
    );
};

export default FlipDigit;
