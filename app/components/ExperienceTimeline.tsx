"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "./LanguageProvider";

export default function ExperienceTimeline() {
    const { t } = useLanguage();

    return (
        <SectionWrapper id="experience">
            <div className="mx-auto max-w-4xl">
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="mb-2 font-mono text-sm text-accent-cyan tracking-widest uppercase">
                        {t.experience.label}
                    </p>
                    <h2 className="text-3xl font-bold md:text-4xl">
                        {t.experience.title}
                    </h2>
                </motion.div>

                <div className="relative">
                    <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-accent-cyan/50 via-accent-purple/50 to-transparent md:left-1/2 md:-translate-x-1/2" />

                    {t.experience.entries.map((entry, index) => (
                        <motion.div
                            key={index}
                            className={`relative mb-12 flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className="absolute left-0 top-0 md:left-1/2 md:-translate-x-1/2 z-10">
                                <div className="h-3 w-3 rounded-full bg-accent-cyan shadow-lg shadow-accent-cyan/30" />
                            </div>

                            <div
                                className={`ml-8 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                                    }`}
                            >
                                <div className="glass group rounded-xl p-6 transition-all duration-300 hover:bg-surface-hover/60 hover:glow-cyan cursor-default">
                                    <span className="mb-2 inline-block font-mono text-xs text-accent-purple">
                                        {entry.year}
                                    </span>
                                    <h3 className="mb-1 text-lg font-semibold text-foreground">
                                        {entry.title}
                                    </h3>
                                    <p className="mb-3 text-sm text-accent-cyan">
                                        {entry.company}
                                    </p>
                                    <p className="mb-4 text-sm text-muted leading-relaxed opacity-80 transition-opacity group-hover:opacity-100">
                                        {entry.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {entry.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded-full bg-accent-cyan/10 px-3 py-1 text-xs font-medium text-accent-cyan"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
