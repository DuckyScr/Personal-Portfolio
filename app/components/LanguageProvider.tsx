"use client";

import {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
} from "react";
import { Locale, Translations, translations } from "../lib/i18n";

interface LanguageContextType {
    locale: Locale;
    t: Translations;
    toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
    locale: "en",
    t: translations.en,
    toggleLocale: () => { },
});

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocale] = useState<Locale>("en");

    const toggleLocale = useCallback(() => {
        setLocale((prev) => (prev === "en" ? "cs" : "en"));
    }, []);

    return (
        <LanguageContext.Provider
            value={{ locale, t: translations[locale], toggleLocale }}
        >
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    return useContext(LanguageContext);
}
