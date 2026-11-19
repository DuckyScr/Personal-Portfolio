"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterEffectProps {
    strings: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseDuration?: number;
}

export default function TypewriterEffect({
    strings,
    typingSpeed = 80,
    deletingSpeed = 40,
    pauseDuration = 2000,
}: TypewriterEffectProps) {
    const [displayText, setDisplayText] = useState("");
    const stateRef = useRef({
        stringIndex: 0,
        charIndex: 0,
        isDeleting: false,
        isPaused: false,
    });
    const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

    useEffect(() => {
        function tick() {
            const s = stateRef.current;
            const currentString = strings[s.stringIndex];

            if (s.isPaused) {
                s.isPaused = false;
                s.isDeleting = true;
                timerRef.current = setTimeout(tick, deletingSpeed);
                return;
            }

            if (!s.isDeleting) {
                // Typing
                s.charIndex++;
                setDisplayText(currentString.substring(0, s.charIndex));

                if (s.charIndex >= currentString.length) {
                    s.isPaused = true;
                    timerRef.current = setTimeout(tick, pauseDuration);
                } else {
                    timerRef.current = setTimeout(tick, typingSpeed);
                }
            } else {
                // Deleting
                s.charIndex--;
                setDisplayText(currentString.substring(0, s.charIndex));

                if (s.charIndex <= 0) {
                    s.isDeleting = false;
                    s.stringIndex = (s.stringIndex + 1) % strings.length;
                    timerRef.current = setTimeout(tick, typingSpeed);
                } else {
                    timerRef.current = setTimeout(tick, deletingSpeed);
                }
            }
        }

        timerRef.current = setTimeout(tick, typingSpeed);

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [strings, typingSpeed, deletingSpeed, pauseDuration]);

    return (
        <span className="font-mono text-accent-cyan">
            <span className="text-muted">{">"} </span>
            <span>{displayText}</span>
            <span className="animate-blink text-accent-cyan ml-0.5">▌</span>
        </span>
    );
}
