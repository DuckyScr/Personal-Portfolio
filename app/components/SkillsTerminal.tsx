"use client";

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "./LanguageProvider";

interface HistoryEntry {
    command: string;
    output: string[];
}

export default function SkillsTerminal() {
    const { t } = useLanguage();
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<HistoryEntry[]>([
        { command: "help", output: t.skills.commands.help },
    ]);
    const [commandHistory, setCommandHistory] = useState<string[]>(["help"]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Update initial help output when language changes
    useEffect(() => {
        setHistory([{ command: "help", output: t.skills.commands.help }]);
    }, [t]);

    const scrollToBottom = useCallback(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [history, scrollToBottom]);

    const executeCommand = useCallback(
        (cmd: string) => {
            const trimmed = cmd.trim().toLowerCase();

            if (trimmed === "clear") {
                setHistory([]);
                return;
            }

            if (trimmed === "") return;

            const output = t.skills.commands[trimmed];
            if (output) {
                setHistory((prev) => [...prev, { command: cmd, output }]);
            } else {
                setHistory((prev) => [
                    ...prev,
                    {
                        command: cmd,
                        output: [
                            `zsh: command not found: ${trimmed}`,
                            `Type "help" for available commands.`,
                        ],
                    },
                ]);
            }
            setCommandHistory((prev) => [...prev, cmd]);
            setHistoryIndex(-1);
        },
        [t.skills.commands]
    );

    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                executeCommand(input);
                setInput("");
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                const newIndex =
                    historyIndex === -1
                        ? commandHistory.length - 1
                        : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(commandHistory[newIndex] || "");
            } else if (e.key === "ArrowDown") {
                e.preventDefault();
                if (historyIndex === -1) return;
                const newIndex = historyIndex + 1;
                if (newIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setInput("");
                } else {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[newIndex] || "");
                }
            }
        },
        [input, executeCommand, historyIndex, commandHistory]
    );

    const focusInput = useCallback(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <SectionWrapper id="skills" className="bg-surface/30">
            <div className="mx-auto max-w-4xl">
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="mb-2 font-mono text-sm text-accent-cyan tracking-widest uppercase">
                        {t.skills.label}
                    </p>
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                        {t.skills.title}
                    </h2>
                    <p className="text-muted text-sm font-mono">{t.skills.hint}</p>
                </motion.div>

                {/* Interactive terminal */}
                <motion.div
                    className="glass-strong rounded-2xl overflow-hidden mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Terminal header */}
                    <div className="flex items-center gap-2 border-b border-border px-4 py-3">
                        <span className="h-3 w-3 rounded-full bg-red-500/80" />
                        <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                        <span className="h-3 w-3 rounded-full bg-green-500/80" />
                        <span className="ml-3 font-mono text-xs text-muted">
                            ~/skills — zsh — interactive
                        </span>
                    </div>

                    {/* Terminal body */}
                    <div
                        ref={terminalRef}
                        className="p-6 font-mono text-sm max-h-[400px] overflow-y-auto cursor-text"
                        onClick={focusInput}
                    >
                        {/* History */}
                        {history.map((entry, i) => (
                            <div key={i} className="mb-4">
                                <p className="text-muted">
                                    <span className="text-accent-cyan">
                                        {t.skills.promptUser}@{t.skills.promptHost}
                                    </span>
                                    <span className="text-muted">:</span>
                                    <span className="text-accent-purple">~</span>
                                    <span className="text-muted">$ </span>
                                    <span className="text-foreground">{entry.command}</span>
                                </p>
                                <div className="mt-1 pl-2 space-y-0.5">
                                    {entry.output.map((line, j) => (
                                        <p
                                            key={j}
                                            className={`${line.startsWith("zsh:")
                                                    ? "text-red-400"
                                                    : line.startsWith("  ")
                                                        ? "text-muted"
                                                        : "text-foreground/80"
                                                } whitespace-pre`}
                                        >
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Active prompt */}
                        <div className="flex items-center">
                            <span className="text-accent-cyan">
                                {t.skills.promptUser}@{t.skills.promptHost}
                            </span>
                            <span className="text-muted">:</span>
                            <span className="text-accent-purple">~</span>
                            <span className="text-muted">$ </span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="flex-1 bg-transparent text-foreground outline-none ml-1 caret-accent-cyan"
                                autoComplete="off"
                                spellCheck={false}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Visual skill cards (non-terminal) */}
                <div className="grid gap-6 md:grid-cols-3">
                    {t.skills.categories.map((category, catIdx) => (
                        <motion.div
                            key={catIdx}
                            className="glass rounded-xl p-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: catIdx * 0.1 }}
                        >
                            <h3 className="mb-4 text-sm font-semibold text-accent-cyan">
                                {category.label}
                            </h3>
                            <div className="space-y-3">
                                {category.items.map((skill, skillIdx) => (
                                    <div key={skillIdx}>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm text-foreground">
                                                {skill.name}
                                            </span>
                                            <span className="text-xs text-muted font-mono">
                                                {skill.level}
                                            </span>
                                        </div>
                                        <div className="h-1.5 rounded-full bg-border overflow-hidden">
                                            <motion.div
                                                className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-purple"
                                                initial={{ width: 0 }}
                                                whileInView={{
                                                    width:
                                                        skill.level === "expert" || skill.level === "expert"
                                                            ? "95%"
                                                            : skill.level === "experienced" ||
                                                                skill.level === "zkušený"
                                                                ? "70%"
                                                                : skill.level === "advanced" ||
                                                                    skill.level === "pokročilý"
                                                                    ? "80%"
                                                                    : skill.level === "beginner" ||
                                                                        skill.level === "začátečník" ||
                                                                        skill.level === "nováček"
                                                                        ? "30%"
                                                                        : "50%",
                                                }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: skillIdx * 0.1 }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    );
}
