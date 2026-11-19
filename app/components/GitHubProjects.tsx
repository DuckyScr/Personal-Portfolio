"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { useLanguage } from "./LanguageProvider";

interface Repository {
    id: number;
    name: string;
    full_name: string;
    description: string | null;
    stargazers_count: number;
    html_url: string;
    language: string | null;
    fork: boolean;
    size: number;
    pushed_at: string;
    updated_at: string;
    owner: {
        login: string;
        type: string;
    };
    topics: string[];
}

const GITHUB_USERNAME = "DuckyScr";
const FEATURED_COUNT = 6;

// ─── Static priority ruleset ────────────────────────────────────────
// Each rule has a pattern (matched case-insensitively against repo name,
// full_name, description, and topics) and a priority score.
// Higher score = shown first.  Repos not matching any rule get score 0
// and fall back to secondary sorting (stars → size → recency).
interface PriorityRule {
    patterns: string[];       // substrings to match (case-insensitive)
    score: number;
    matchField?: "name" | "any";  // default "any"
}

const PRIORITY_RULES: PriorityRule[] = [
    // ── Tier 1 (100): Flagship / FADAMIS projects ──
    { patterns: ["fadamis"], score: 100 },
    // ── Tier 2 (90): Major personal projects ──
    { patterns: ["fade"], matchField: "name", score: 90 },
    // ── Tier 3 (80): CTF / Security projects ──
    { patterns: ["ctf", "capture-the-flag"], score: 80 },
    // ── Tier 4 (70): Drones / embedded / flight controller ──
    {
        patterns: ["drone", "flight", "fc", "dshot", "crsf", "betaflight", "quadcopter"],
        score: 70
    },
    // ── Tier 5 (60): Full-stack / web apps ──
    {
        patterns: ["web", "portal", "dashboard", "app"],
        matchField: "name", score: 60
    },
    // ── Tier 6 (50): Game / creative projects ──
    { patterns: ["game", "engine", "unity", "godot"], score: 50 },
    // ── Tier 7 (40): Tools / CLI / libraries ──
    {
        patterns: ["cli", "tool", "lib", "sdk", "api", "pkg", "package"],
        score: 40
    },
    // ── Tier 8 (30): Org / collab repos (catch-all boosted) ──
    // (handled dynamically below, not by pattern)
];

function getRepoPriority(repo: Repository): number {
    const name = repo.name.toLowerCase();
    const fullName = repo.full_name.toLowerCase();
    const desc = (repo.description || "").toLowerCase();
    const topics = repo.topics.map((t) => t.toLowerCase());

    let best = 0;
    for (const rule of PRIORITY_RULES) {
        const field = rule.matchField ?? "any";
        const matched = rule.patterns.some((p) => {
            if (field === "name") return name.includes(p);
            return (
                name.includes(p) ||
                fullName.includes(p) ||
                desc.includes(p) ||
                topics.some((t) => t.includes(p))
            );
        });
        if (matched && rule.score > best) best = rule.score;
    }

    // Give org/collab repos a baseline boost if they didn't match anything
    if (best === 0 && repo.owner.login !== GITHUB_USERNAME) best = 30;

    return best;
}

const languageColors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Rust: "#dea584",
    C: "#555555",
    "C++": "#f34b7d",
    "C#": "#178600",
    Java: "#b07219",
    Go: "#00ADD8",
    Dart: "#00B4AB",
    Shell: "#89e051",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Swift: "#F05138",
    Kotlin: "#A97BFF",
    Ruby: "#701516",
    Svelte: "#ff3e00",
    Lua: "#000080",
};

function formatSize(sizeKB: number): string {
    if (sizeKB >= 1024) {
        return `${(sizeKB / 1024).toFixed(1)} MB`;
    }
    return `${sizeKB} KB`;
}

function getRepoBadge(
    repo: Repository,
    username: string
): "owned" | "org" | "collab" {
    if (repo.owner.login === username) return "owned";
    if (repo.owner.type === "Organization") return "org";
    return "collab";
}

export default function GitHubProjects() {
    const { t } = useLanguage();
    const [repos, setRepos] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAll, setShowAll] = useState(false);

    const fetchRepos = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(
                `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=all&per_page=100&sort=updated`
            );
            if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
            const data: Repository[] = await res.json();

            // Filter out profile READMEs and sort by static priority ruleset,
            // with stars → size → recency as tiebreakers
            const filtered = data
                .filter((r) => r.name !== GITHUB_USERNAME)
                .sort((a, b) => {
                    // Primary: static priority score (higher first)
                    const priorityDiff = getRepoPriority(b) - getRepoPriority(a);
                    if (priorityDiff !== 0) return priorityDiff;
                    // Secondary: stars descending
                    const starDiff = b.stargazers_count - a.stargazers_count;
                    if (starDiff !== 0) return starDiff;
                    // Tertiary: size descending
                    const sizeDiff = b.size - a.size;
                    if (sizeDiff !== 0) return sizeDiff;
                    // Quaternary: most recently pushed first
                    return (
                        new Date(b.pushed_at).getTime() -
                        new Date(a.pushed_at).getTime()
                    );
                });

            setRepos(filtered);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to fetch repos"
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRepos();
    }, [fetchRepos]);

    const featured = repos.slice(0, FEATURED_COUNT);
    const remaining = repos.slice(FEATURED_COUNT);

    const RepoCard = ({
        repo,
        index,
        mini = false,
    }: {
        repo: Repository;
        index: number;
        mini?: boolean;
    }) => {
        const badge = getRepoBadge(repo, GITHUB_USERNAME);

        return (
            <motion.a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`glass group flex flex-col rounded-xl ${mini ? "p-4" : "p-6"
                    } transition-all duration-300 hover:bg-surface-hover/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-accent-cyan/5`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
            >
                <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        <svg
                            className="h-5 w-5 shrink-0 text-muted"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                            />
                        </svg>
                        <h3 className="font-semibold text-foreground group-hover:text-accent-cyan transition-colors truncate">
                            {repo.full_name.includes("/")
                                ? repo.full_name
                                : repo.name}
                        </h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                        {badge !== "owned" && (
                            <span
                                className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${badge === "org"
                                    ? "bg-accent-purple/15 text-accent-purple"
                                    : "bg-amber-500/15 text-amber-400"
                                    }`}
                            >
                                {badge === "org"
                                    ? t.projects.orgBadge
                                    : t.projects.collabBadge}
                            </span>
                        )}
                        {repo.fork && (
                            <svg
                                className="h-3.5 w-3.5 text-muted"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <title>Fork</title>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 7V3m10 4V3M7 7H5a2 2 0 00-2 2v0a2 2 0 002 2h2m10-4h2a2 2 0 012 2v0a2 2 0 01-2 2h-2m-10 0v4a2 2 0 002 2h6a2 2 0 002-2v-4"
                                />
                            </svg>
                        )}
                        <svg
                            className="h-4 w-4 text-muted opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                        </svg>
                    </div>
                </div>

                <p
                    className={`mb-4 flex-grow text-sm text-muted leading-relaxed ${mini ? "line-clamp-2" : ""
                        }`}
                >
                    {repo.description || t.projects.noDescription}
                </p>

                <div className="flex items-center gap-4 text-xs text-muted flex-wrap">
                    {repo.language && (
                        <span className="flex items-center gap-1.5">
                            <span
                                className="inline-block h-3 w-3 rounded-full"
                                style={{
                                    backgroundColor:
                                        languageColors[repo.language] || "#888",
                                }}
                            />
                            {repo.language}
                        </span>
                    )}
                    <span className="flex items-center gap-1">
                        <svg
                            className="h-3.5 w-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                        </svg>
                        {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1 text-muted/60">
                        <svg
                            className="h-3.5 w-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                        </svg>
                        {formatSize(repo.size)}
                    </span>
                </div>
            </motion.a>
        );
    };

    return (
        <SectionWrapper id="projects" className="bg-surface/30">
            <div className="mx-auto max-w-6xl">
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <p className="mb-2 font-mono text-sm text-accent-cyan tracking-widest uppercase">
                        {t.projects.label}
                    </p>
                    <h2 className="mb-4 text-3xl font-bold md:text-4xl">
                        {t.projects.title}
                    </h2>
                    <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-1.5">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                        </span>
                        <span className="text-xs font-medium text-green-400 tracking-wide">
                            {t.projects.liveBadge}
                        </span>
                    </div>
                </motion.div>

                {loading && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="glass animate-pulse rounded-xl p-6 h-48"
                            >
                                <div className="mb-3 h-5 w-2/3 rounded bg-border" />
                                <div className="mb-2 h-3 w-full rounded bg-border" />
                                <div className="mb-4 h-3 w-4/5 rounded bg-border" />
                                <div className="mt-auto flex gap-4">
                                    <div className="h-3 w-16 rounded bg-border" />
                                    <div className="h-3 w-12 rounded bg-border" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {error && !loading && (
                    <div className="mx-auto max-w-md text-center">
                        <div className="glass rounded-xl p-8">
                            <p className="mb-2 text-red-400 font-mono text-sm">
                                {t.projects.errorTitle}
                            </p>
                            <p className="mb-4 text-sm text-muted">{error}</p>
                            <button
                                onClick={fetchRepos}
                                className="rounded-full bg-accent-cyan/10 px-6 py-2 text-sm font-medium text-accent-cyan transition-all hover:bg-accent-cyan/20"
                            >
                                {t.projects.retry}
                            </button>
                        </div>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {/* Featured repos — top grid */}
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {featured.map((repo, index) => (
                                <RepoCard
                                    key={repo.id}
                                    repo={repo}
                                    index={index}
                                />
                            ))}
                        </div>

                        {/* Expandable "more" section */}
                        {remaining.length > 0 && (
                            <div className="mt-8">
                                <button
                                    onClick={() => setShowAll((prev) => !prev)}
                                    className="mx-auto flex items-center gap-2 rounded-full border border-border/50 bg-surface/50 px-5 py-2.5 text-sm font-medium text-muted transition-all hover:text-foreground hover:border-accent-cyan/30 hover:bg-accent-cyan/5"
                                >
                                    <svg
                                        className={`h-4 w-4 transition-transform duration-300 ${showAll ? "rotate-180" : ""
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                    {showAll
                                        ? t.projects.showLess
                                        : `${t.projects.showMore} (${remaining.length})`}
                                </button>

                                <AnimatePresence>
                                    {showAll && (
                                        <motion.div
                                            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: "auto",
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            {remaining.map((repo, index) => (
                                                <RepoCard
                                                    key={repo.id}
                                                    repo={repo}
                                                    index={index}
                                                    mini
                                                />
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </>
                )}

                {!loading && !error && (
                    <motion.div
                        className="mt-12 text-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                    >
                        <a
                            href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent-cyan"
                        >
                            {t.projects.viewAll}
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </a>
                    </motion.div>
                )}
            </div>
        </SectionWrapper>
    );
}
