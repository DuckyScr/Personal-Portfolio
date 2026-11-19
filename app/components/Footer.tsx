"use client";

import { useLanguage } from "./LanguageProvider";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="border-t border-border px-6 py-8">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted sm:flex-row">
                <p>
                    &copy; {new Date().getFullYear()} Adam Ragač. {t.footer.rights}
                </p>
                <p className="font-mono text-xs">
                    {t.footer.builtWith}{" "}
                    <span className="text-accent-cyan">Next.js</span>
                    {" + "}
                    <span className="text-accent-purple">Three.js</span>
                    {" + "}
                    <span className="text-accent-cyan">Tailwind</span>
                </p>
            </div>
        </footer>
    );
}
