"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import TypewriterEffect from "./TypewriterEffect";
import { useLanguage } from "./LanguageProvider";

const AnimatedBackground = dynamic(() => import("./ThreeCanvas"), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-background" />,
});

const techStack = [
    "TypeScript",
    "Flutter",
    "Python",
    "React.js",
    "Next.js",
    "Go",
    "C#",
    "Dart",
    "Figma",
];

export default function HeroSection() {
    const { t } = useLanguage();

    return (
        <section
            id="hero"
            className="relative flex min-h-screen items-center justify-center overflow-hidden"
        >
            <AnimatedBackground />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background z-[1]" />

            <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <p className="mb-4 font-mono text-sm tracking-widest text-accent-cyan uppercase">
                        {t.hero.subtitle}
                    </p>
                </motion.div>

                <motion.h1
                    className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                >
                    {t.hero.heading1}
                    <br />
                    <span className="gradient-text">{t.hero.heading2}</span>
                </motion.h1>

                <motion.p
                    className="mx-auto mb-8 max-w-2xl text-lg text-muted md:text-xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                    {t.hero.description}
                </motion.p>

                <motion.div
                    className="mb-10 flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <div className="glass rounded-lg px-6 py-3 font-mono text-sm">
                        <TypewriterEffect strings={techStack} />
                    </div>
                </motion.div>

                <motion.div
                    className="flex flex-col items-center justify-center gap-4 sm:flex-row"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
                >
                    <a
                        href="#projects"
                        className="group relative overflow-hidden rounded-full bg-accent-cyan px-8 py-3 text-sm font-semibold text-background transition-all hover:shadow-lg hover:shadow-accent-cyan/25"
                    >
                        <span className="relative z-10">{t.hero.viewWork}</span>
                        <div className="absolute inset-0 bg-accent-purple opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                    <a
                        href="#contact"
                        className="rounded-full border border-border px-8 py-3 text-sm font-medium text-foreground transition-all hover:border-accent-cyan/50 hover:bg-accent-cyan/5"
                    >
                        {t.hero.getInTouch}
                    </a>
                </motion.div>
            </div>

            <motion.div
                className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <motion.div
                    className="flex flex-col items-center gap-2"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="text-xs font-mono text-muted">{t.hero.scroll}</span>
                    <svg
                        className="h-4 w-4 text-muted"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </motion.div>
            </motion.div>
        </section>
    );
}
