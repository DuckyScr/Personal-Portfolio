"use client";

import { useLanguage } from "./LanguageProvider";
import { motion } from "framer-motion";

export default function LanguageToggle() {
    const { locale, toggleLocale } = useLanguage();

    return (
        <motion.button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted transition-all hover:border-accent-cyan/50 hover:text-accent-cyan"
            whileTap={{ scale: 0.95 }}
            title={locale === "en" ? "Přepnout do češtiny" : "Switch to English"}
        >
            <span className={locale === "en" ? "text-accent-cyan" : ""}>EN</span>
            <span className="text-border">/</span>
            <span className={locale === "cs" ? "text-accent-cyan" : ""}>CZ</span>
        </motion.button>
    );
}
