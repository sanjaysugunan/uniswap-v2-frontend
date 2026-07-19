// TODO: swap these placeholders for your actual URLs
const LINKS = {
    frontendRepo: "https://github.com/sanjaysugunan/uniswapv2-frontend",
    backendRepo: "https://github.com/sanjaysugunan/uniswapv2-clone",
    linkedin: "https://linkedin.com/in/sanjaysugunan",
    x: "https://x.com/sanjaysugunan",
};

export default function Footer() {
    return (
        <footer className="pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
            <div className="pointer-events-auto flex items-center gap-4 rounded-full border border-white/10 bg-[#17181D]/55 px-5 py-2.5 text-lg text-zinc-400 backdrop-blur-xl">
                <span className="hidden sm:inline">
                    Author:{" "}
                    <span className="font-semibold text-zinc-200">
                        Sanjay Sugunan
                    </span>
                </span>

                <span className="hidden h-4 w-px bg-white/10 sm:block" />

                <div className="flex items-center gap-3">
                    <FooterLink href={LINKS.frontendRepo} label="Frontend repo">
                        <GithubIcon size={16} />
                        <span className="hidden md:inline">Frontend</span>
                    </FooterLink>
                    <span className="h-4 w-px bg-white/10" />
                    <FooterLink href={LINKS.backendRepo} label="Smart contract repo">
                        <GithubIcon size={16} />
                        <span className="hidden md:inline">Contracts</span>
                    </FooterLink>

                    <span className="h-4 w-px bg-white/10" />

                    <FooterLink href={LINKS.linkedin} label="LinkedIn">
                        <LinkedinIcon size={16} />
                    </FooterLink>
                    <FooterLink href={LINKS.x} label="X">
                        <XIcon size={16} />
                    </FooterLink>
                </div>
            </div>
        </footer>
    );
}

function FooterLink({
    href,
    label,
    children,
}: {
    href: string;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="flex items-center gap-1.5 text-zinc-400 transition hover:text-white"
        >
            {children}
        </a>
    );
}

function GithubIcon({ size = 16 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
    );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}

function XIcon({ size = 16 }: { size?: number }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
        >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}