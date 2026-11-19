export type Locale = "en" | "cs";

export interface Translations {
    nav: {
        home: string;
        about: string;
        experience: string;
        skills: string;
        projects: string;
        contact: string;
        getInTouch: string;
    };
    hero: {
        subtitle: string;
        heading1: string;
        heading2: string;
        description: string;
        viewWork: string;
        getInTouch: string;
        scroll: string;
    };
    about: {
        label: string;
        title: string;
        bio: string[];
        education: {
            label: string;
            entries: { school: string; field: string; period: string }[];
        };
        languages: {
            label: string;
            entries: { lang: string; level: string }[];
        };
        hobbies: {
            label: string;
            items: string[];
        };
    };
    experience: {
        label: string;
        title: string;
        entries: {
            year: string;
            title: string;
            company: string;
            description: string;
            tech: string[];
        }[];
    };
    skills: {
        label: string;
        title: string;
        hint: string;
        commands: Record<string, string[]>;
        promptUser: string;
        promptHost: string;
        categories: {
            label: string;
            items: { name: string; level: string }[];
        }[];
    };
    projects: {
        label: string;
        title: string;
        liveBadge: string;
        viewAll: string;
        noDescription: string;
        errorTitle: string;
        retry: string;
        showMore: string;
        showLess: string;
        repoSize: string;
        orgBadge: string;
        collabBadge: string;
    };
    contact: {
        label: string;
        title: string;
        description: string;
        terminalTitle: string;
        command: string;
    };
    footer: {
        rights: string;
        builtWith: string;
    };
}

const en: Translations = {
    nav: {
        home: "Home",
        about: "About",
        experience: "Experience",
        skills: "Skills",
        projects: "Projects",
        contact: "Contact",
        getInTouch: "Get in Touch",
    },
    hero: {
        subtitle: "Developer & Cybersecurity Student",
        heading1: "Hi, I'm Adam Ragač",
        heading2: "I build things for the digital world",
        description:
            "Programmer, instructor, and FPV drone enthusiast from Prague. Building web apps, mobile solutions, and AI models — while studying cybersecurity.",
        viewWork: "View My Work",
        getInTouch: "Get in Touch",
        scroll: "scroll",
    },
    about: {
        label: "Who Am I",
        title: "About Me",
        bio: [
            "I'm a developer and cybersecurity student based in Prague, Czech Republic. I'm passionate about building software that solves real problems — from web applications to mobile apps and AI models.",
            "When I'm not coding, you'll find me building FPV drones, producing electronic music, or climbing. I also teach cybersecurity and music to kids at summer camps.",
        ],
        education: {
            label: "Education",
            entries: [
                {
                    school: "Smíchovská SPŠG — Radlická",
                    field: "Information Technology (Cybersecurity)",
                    period: "Sep 2022 — Present",
                },
                {
                    school: "Základní škola Kunratice",
                    field: "Elementary School",
                    period: "Sep 2013 — Jun 2022",
                },
            ],
        },
        languages: {
            label: "Languages",
            entries: [
                { lang: "Czech", level: "Native" },
                { lang: "Slovak", level: "Native" },
                { lang: "English", level: "Upper-Intermediate" },
            ],
        },
        hobbies: {
            label: "Interests",
            items: [
                "FPV Drones & Sim Racing",
                "Guitar, Drums & Music Production",
                "Climbing & Running",
                "Mobile App Development",
            ],
        },
    },
    experience: {
        label: "Career Path",
        title: "Experience",
        entries: [
            {
                year: "Jun 2025 — Jan 2026",
                title: "Programmer",
                company: "DroneTech s.r.o.",
                description:
                    "Developed web applications and AI models. Worked on cutting-edge drone technology solutions combining software and hardware engineering.",
                tech: ["Web Dev", "AI / ML", "Python", "TypeScript"],
            },
            {
                year: "Feb 2024 — Jul 2024",
                title: "Programmer",
                company: "Česká IT Akademie",
                description:
                    "Built a mobile application for Zoo Praha using Flutter. Full development cycle from design to deployment on both iOS and Android platforms.",
                tech: ["Flutter", "Dart", "Mobile Dev", "Firebase"],
            },
            {
                year: "Oct 2022 — Aug 2025",
                title: "Lecturer & Instructor",
                company: "Smíchovská SPŠG Radlická",
                description:
                    "Taught cybersecurity fundamentals and prepared realistic hands-on lab environments for student workshops and weekend camps.",
                tech: ["Cybersecurity", "Networking", "Linux", "Lab Setup"],
            },
            {
                year: "Jul 2023 — Present",
                title: "Lecturer & Instructor",
                company: "Dům dětí a mládeže Praha 10",
                description:
                    "Teaching music groups and leading youth activities at summer camps. Developing soft skills in leadership, communication, and group management.",
                tech: ["Teaching", "Music", "Leadership", "Camp Mgmt"],
            },
        ],
    },
    skills: {
        label: "Tech Stack",
        title: "Skills",
        hint: "Try typing a command below...",
        promptUser: "adam",
        promptHost: "portfolio",
        commands: {
            "ls languages": [
                "(X)HTML, CSS    — expert",
                "JavaScript      — experienced",
                "TypeScript      — experienced",
                "Dart            — advanced",
                "Python          — experienced",
                "C / C++         — beginner",
                "C#              — experienced",
                "Java            — beginner",
                "Go              — experienced",
                "SQL             — beginner",
            ],
            "ls databases": [
                "MySQL / MariaDB — advanced",
                "PostgreSQL      — experienced",
                "SQLite          — experienced",
            ],
            "ls os": [
                "macOS           — expert",
                "Linux / BSD     — experienced",
                "Windows 10/11   — advanced",
                "Android         — advanced",
                "iOS             — advanced",
            ],
            "ls design": [
                "Figma           — advanced",
                "Adobe Photoshop — advanced",
                "Illustrator     — experienced",
                "Canva           — advanced",
                "Fusion 360      — advanced",
            ],
            help: [
                "Available commands:",
                "  ls languages  — Programming languages",
                "  ls databases  — Database systems",
                "  ls os         — Operating systems",
                "  ls design     — Design & creative tools",
                "  whoami        — About me",
                "  clear         — Clear terminal",
                "  help          — Show this help",
            ],
            whoami: [
                "Adam Ragač",
                "Developer & Cybersecurity Student",
                "Prague, Czech Republic",
                "",
                "Strengths: Flexibility, Eagerness to learn,",
                "Adaptability, Independence, Reliability,",
                "Performance under pressure, Creative thinking",
            ],
        },
        categories: [
            {
                label: "Programming Languages",
                items: [
                    { name: "HTML/CSS", level: "expert" },
                    { name: "JavaScript", level: "experienced" },
                    { name: "TypeScript", level: "experienced" },
                    { name: "Dart", level: "advanced" },
                    { name: "Python", level: "experienced" },
                    { name: "Go", level: "experienced" },
                    { name: "C#", level: "experienced" },
                    { name: "C/C++", level: "beginner" },
                ],
            },
            {
                label: "Databases",
                items: [
                    { name: "MySQL/MariaDB", level: "advanced" },
                    { name: "PostgreSQL", level: "experienced" },
                    { name: "SQLite", level: "experienced" },
                ],
            },
            {
                label: "Design Tools",
                items: [
                    { name: "Figma", level: "advanced" },
                    { name: "Photoshop", level: "advanced" },
                    { name: "Fusion 360", level: "advanced" },
                ],
            },
        ],
    },
    projects: {
        label: "Open Source",
        title: "Live Projects",
        liveBadge: "LIVE — Fetched from GitHub API",
        viewAll: "View all on GitHub",
        noDescription: "No description provided.",
        errorTitle: "Error fetching repositories",
        retry: "Retry",
        showMore: "Show more projects",
        showLess: "Show less",
        repoSize: "KB",
        orgBadge: "org",
        collabBadge: "collab",
    },
    contact: {
        label: "Connect",
        title: "Command Center",
        description:
            "Pick your preferred channel — I'm always open to new conversations.",
        terminalTitle: "~/contact — zsh",
        command: "ls ./socials",
    },
    footer: {
        rights: "All rights reserved.",
        builtWith: "Built with",
    },
};

const cs: Translations = {
    nav: {
        home: "Domů",
        about: "O mně",
        experience: "Zkušenosti",
        skills: "Dovednosti",
        projects: "Projekty",
        contact: "Kontakt",
        getInTouch: "Kontaktujte mě",
    },
    hero: {
        subtitle: "Vývojář & Student kybernetické bezpečnosti",
        heading1: "Ahoj, jsem Adam Ragač",
        heading2: "Tvořím věci pro digitální svět",
        description:
            "Programátor, instruktor a nadšenec do FPV dronů z Prahy. Vytvářím webové a mobilní aplikace a AI modely — a zároveň studuji kybernetickou bezpečnost.",
        viewWork: "Moje práce",
        getInTouch: "Kontaktujte mě",
        scroll: "scroll",
    },
    about: {
        label: "Kdo jsem",
        title: "O mně",
        bio: [
            "Jsem vývojář a student kybernetické bezpečnosti z Prahy. Baví mě vytvářet software, který řeší reálné problémy — od webových aplikací přes mobilní řešení až po AI modely.",
            "Když zrovna neprogramuji, stavím FPV drony, produkuji elektronickou hudbu nebo lezu po skalách. Také učím děti kybernetickou bezpečnost a hudbu na letních táborech.",
        ],
        education: {
            label: "Vzdělání",
            entries: [
                {
                    school: "Smíchovská SPŠG — Radlická",
                    field: "Informační technologie (Kybernetická bezpečnost)",
                    period: "Září 2022 — dosud",
                },
                {
                    school: "Základní škola Kunratice",
                    field: "Základní vzdělání",
                    period: "Září 2013 — červen 2022",
                },
            ],
        },
        languages: {
            label: "Jazyky",
            entries: [
                { lang: "Čeština", level: "Rodilý mluvčí" },
                { lang: "Slovenština", level: "Rodilý mluvčí" },
                { lang: "Angličtina", level: "Středně pokročilá" },
            ],
        },
        hobbies: {
            label: "Zájmy",
            items: [
                "FPV drony a sim racing",
                "Kytara, bicí a produkce hudby",
                "Lezení a běhání",
                "Vývoj mobilních aplikací",
            ],
        },
    },
    experience: {
        label: "Kariéra",
        title: "Zkušenosti",
        entries: [
            {
                year: "Čer 2025 — Led 2026",
                title: "Programátor",
                company: "DroneTech s.r.o.",
                description:
                    "Vývoj webových aplikací a modelů umělé inteligence. Práce na špičkových řešeních dronové technologie spojující software a hardware.",
                tech: ["Web Dev", "AI / ML", "Python", "TypeScript"],
            },
            {
                year: "Úno 2024 — Čec 2024",
                title: "Programátor",
                company: "Česká IT Akademie",
                description:
                    "Tvorba mobilní aplikace pro Zoo Praha ve Flutteru. Celý vývojový cyklus od návrhu po nasazení na iOS i Android.",
                tech: ["Flutter", "Dart", "Mobile Dev", "Firebase"],
            },
            {
                year: "Říj 2022 — Srp 2025",
                title: "Lektor & Instruktor",
                company: "Smíchovská SPŠG Radlická",
                description:
                    "Výuka kybernetické bezpečnosti a příprava realistických praktických prostředí pro workshopy a víkendové kempy.",
                tech: ["Kybernetika", "Sítě", "Linux", "Laboratoře"],
            },
            {
                year: "Čec 2023 — dosud",
                title: "Lektor & Instruktor",
                company: "Dům dětí a mládeže Praha 10",
                description:
                    "Vedení hudebních kroužků a práce s mládeží na letních táborech. Rozvoj dovedností ve vedení skupiny a komunikaci.",
                tech: ["Výuka", "Hudba", "Vedení", "Tábory"],
            },
        ],
    },
    skills: {
        label: "Technologie",
        title: "Dovednosti",
        hint: "Zkuste napsat příkaz níže...",
        promptUser: "adam",
        promptHost: "portfolio",
        commands: {
            "ls languages": [
                "(X)HTML, CSS    — expert",
                "JavaScript      — zkušený",
                "TypeScript      — zkušený",
                "Dart            — pokročilý",
                "Python          — zkušený",
                "C / C++         — nováček",
                "C#              — zkušený",
                "Java            — začátečník",
                "Go              — zkušený",
                "SQL             — začátečník",
            ],
            "ls databases": [
                "MySQL / MariaDB — pokročilý",
                "PostgreSQL      — zkušený",
                "SQLite          — zkušený",
            ],
            "ls os": [
                "macOS           — expert",
                "Linux / BSD     — zkušený",
                "Windows 10/11   — pokročilý",
                "Android         — pokročilý",
                "iOS             — pokročilý",
            ],
            "ls design": [
                "Figma           — pokročilý",
                "Adobe Photoshop — pokročilý",
                "Illustrator     — zkušený",
                "Canva           — pokročilý",
                "Fusion 360      — pokročilý",
            ],
            help: [
                "Dostupné příkazy:",
                "  ls languages  — Programovací jazyky",
                "  ls databases  — Databázové systémy",
                "  ls os         — Operační systémy",
                "  ls design     — Návrh a kreativní nástroje",
                "  whoami        — O mně",
                "  clear         — Vymazat terminál",
                "  help          — Zobrazit nápovědu",
            ],
            whoami: [
                "Adam Ragač",
                "Vývojář & Student kybernetické bezpečnosti",
                "Praha, Česká republika",
                "",
                "Silné stránky: Flexibilita, Ochota učit se,",
                "Přizpůsobivost, Samostatnost, Spolehlivost,",
                "Zvládání stresu, Tvůrčí myšlení",
            ],
        },
        categories: [
            {
                label: "Programovací jazyky",
                items: [
                    { name: "HTML/CSS", level: "expert" },
                    { name: "JavaScript", level: "zkušený" },
                    { name: "TypeScript", level: "zkušený" },
                    { name: "Dart", level: "pokročilý" },
                    { name: "Python", level: "zkušený" },
                    { name: "Go", level: "zkušený" },
                    { name: "C#", level: "zkušený" },
                    { name: "C/C++", level: "nováček" },
                ],
            },
            {
                label: "Databáze",
                items: [
                    { name: "MySQL/MariaDB", level: "pokročilý" },
                    { name: "PostgreSQL", level: "zkušený" },
                    { name: "SQLite", level: "zkušený" },
                ],
            },
            {
                label: "Návrhové nástroje",
                items: [
                    { name: "Figma", level: "pokročilý" },
                    { name: "Photoshop", level: "pokročilý" },
                    { name: "Fusion 360", level: "pokročilý" },
                ],
            },
        ],
    },
    projects: {
        label: "Open Source",
        title: "Živé projekty",
        liveBadge: "LIVE — Načteno z GitHub API",
        viewAll: "Zobrazit vše na GitHubu",
        noDescription: "Bez popisu.",
        errorTitle: "Chyba při načítání repozitářů",
        retry: "Zkusit znovu",
        showMore: "Zobrazit další projekty",
        showLess: "Zobrazit méně",
        repoSize: "KB",
        orgBadge: "org",
        collabBadge: "spolupráce",
    },
    contact: {
        label: "Spojení",
        title: "Velín",
        description:
            "Vyberte si preferovaný kanál — jsem vždy otevřený novým konverzacím.",
        terminalTitle: "~/kontakt — zsh",
        command: "ls ./sociální-sítě",
    },
    footer: {
        rights: "Všechna práva vyhrazena.",
        builtWith: "Postaveno s",
    },
};

export const translations: Record<Locale, Translations> = { en, cs };
