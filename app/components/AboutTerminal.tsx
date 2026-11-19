"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "./LanguageProvider";

export default function AboutTerminal() {
    const { t } = useLanguage();

    return (
        <SectionWrapper id="about">
            <div className="mx-auto max-w-4xl">
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="mb-2 font-mono text-sm text-accent-cyan tracking-widest uppercase">
                        {t.about.label}
                    </p>
                    <h2 className="text-3xl font-bold md:text-4xl">{t.about.title}</h2>
                </motion.div>

                {/* Bio terminal */}
                <motion.div
                    className="glass-strong rounded-2xl overflow-hidden mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                        <span className="h-3 w-3 rounded-full bg-red-500/80" />
                        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                        <span className="h-3 w-3 rounded-full bg-green-500/80" />
                        <span className="ml-3 font-mono text-xs text-muted">
                            ~/about — zsh
                        </span>
                    </div>
                    <div className="p-6 font-mono text-sm space-y-4">
                        <div>
                            <p className="text-muted mb-3">
                                <span className="text-accent-cyan">adam@portfolio</span>
                                <span className="text-muted">:</span>
                                <span className="text-accent-purple">~</span>
                                <span className="text-muted">$ </span>
                                <span className="text-foreground">cat ./bio.md</span>
                            </p>
                            {t.about.bio.map((paragraph, i) => (
                                <p key={i} className="text-muted leading-relaxed mb-2 pl-2 border-l-2 border-accent-cyan/20">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Info grid */}
                <div className="grid gap-6 md:grid-cols-3">
                    {/* Education */}
                    <motion.div
                        className="glass-strong rounded-2xl overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                            <span className="ml-2 font-mono text-xs text-muted">
                                education
                            </span>
                        </div>
                        <div className="p-5 font-mono text-xs space-y-4">
                            <p className="text-muted">
                                <span className="text-accent-cyan">$</span> ls ./
                                {t.about.education.label.toLowerCase()}
                            </p>
                            {t.about.education.entries.map((entry, i) => (
                                <div key={i} className="pl-2 border-l-2 border-accent-purple/30">
                                    <p className="text-foreground font-semibold text-sm">
                                        {entry.school}
                                    </p>
                                    <p className="text-accent-cyan text-xs mt-0.5">{entry.field}</p>
                                    <p className="text-muted text-xs mt-0.5">{entry.period}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Languages */}
                    <motion.div
                        className="glass-strong rounded-2xl overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                            <span className="ml-2 font-mono text-xs text-muted">
                                languages
                            </span>
                        </div>
                        <div className="p-5 font-mono text-xs space-y-3">
                            <p className="text-muted">
                                <span className="text-accent-cyan">$</span> locale -a
                            </p>
                            {t.about.languages.entries.map((entry, i) => (
                                <div key={i} className="flex items-center justify-between pl-2">
                                    <span className="text-foreground">{entry.lang}</span>
                                    <span className="text-accent-purple text-xs rounded-full bg-accent-purple/10 px-2 py-0.5">
                                        {entry.level}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Hobbies */}
                    <motion.div
                        className="glass-strong rounded-2xl overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                            <span className="ml-2 font-mono text-xs text-muted">
                                interests
                            </span>
                        </div>
                        <div className="p-5 font-mono text-xs space-y-3">
                            <p className="text-muted">
                                <span className="text-accent-cyan">$</span> ls ~/hobbies
                            </p>
                            {t.about.hobbies.items.map((hobby, i) => (
                                <div key={i} className="flex items-center gap-2 pl-2">
                                    <span className="text-accent-cyan">→</span>
                                    <span className="text-foreground">{hobby}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </SectionWrapper>
    );
}
