"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";

interface DocLink {
	title: string;
	slug: string;
}

const docsNav: { category: string; links: DocLink[] }[] = [
	{
		category: "Getting Started",
		links: [
			{ title: "Introduction", slug: "introduction" },
			{ title: "Installation", slug: "installation" },
		],
	},
	{
		category: "Reference",
		links: [
			{ title: "Primitives Reference", slug: "primitives" },
			{ title: "WebMCP Alignment", slug: "webmcp" },
		],
	},
	{
		category: "Guides",
		links: [
			{ title: "Local DOM Validation", slug: "validation" },
			{ title: "Performance Benchmarks", slug: "benchmarks" },
		],
	},
];

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	return (
		<div className="bg-background-base min-h-screen text-accent-black flex flex-col ">
			{/* Docs Header */}
			<header
				className="fixed top-0 left-0 right-0 z-50 border-b border-border-muted px-24 py-16"
				style={{
					background: "rgba(255, 255, 255, 0.85)",
					backdropFilter: "blur(12px)",
				}}
			>
				<div className="max-w-1400 mx-auto flex items-center justify-between">
					<div className="flex items-center gap-12">
						<Link
							href="/"
							className="flex items-center gap-12 text-accent-black no-underline"
						>
							{/* Logo Symbol */}
							<svg
								viewBox="0 0 61 67"
								fill="none"
								style={{ width: "24px", height: "26px" }}
							>
								<title>AgentLayerWeb logo</title>
								<path
									d="M20 22H12V55H55V67H0V10H20V22ZM32 37H43V49H20V22H32V37ZM43.5 0C43.9203 8.94373 51.1001 16.0862 60.0459 16.46L61 16.5L60.0459 16.54C51.1001 16.9138 43.9203 24.0563 43.5 33C43.0797 24.0563 35.8999 16.9138 26.9541 16.54L26 16.5L26.9541 16.46C35.8999 16.0862 43.0797 8.94373 43.5 0Z"
									fill="url(#docs_logo_gradient)"
								/>
								<defs>
									<linearGradient
										id="docs_logo_gradient"
										x1="43.5"
										y1="0"
										x2="43.5"
										y2="33"
										gradientUnits="userSpaceOnUse"
									>
										<stop stopColor="#0036FE" />
										<stop offset="1" stopOpacity={0.81} />
									</linearGradient>
								</defs>
							</svg>
							<span className=" text-body-large font-bold tracking-tight">
								Agent<span className="text-heat-100">LayerWeb</span>
							</span>
						</Link>
						<span className="bg-background-lighter text-accent-black/50 text-[10px] font-mono px-8 py-2 rounded-4 uppercase font-semibold">
							Docs v0.1
						</span>
					</div>

					<nav className="flex items-center gap-24">
						<Link
							href="/"
							className="text-body-small text-accent-black/70 hover:text-accent-black transition-colors no-underline font-medium"
						>
							Home
						</Link>
						<a
							href="https://github.com/theajmalrazaq/agentlayerweb"
							target="_blank"
							rel="noopener noreferrer"
							className="text-body-small text-accent-black/70 hover:text-accent-black transition-colors no-underline font-medium"
						>
							GitHub
						</a>
					</nav>
				</div>
			</header>

			<div className="flex-1 max-w-1400 w-full mx-auto grid grid-cols-1 md:grid-cols-[280px_1fr] pt-18">
				{/* Left Sidebar navigation */}
				<aside className="border-r border-border-muted sticky top-18 self-start h-[calc(100vh-72px)] overflow-y-auto p-24 hidden md:block z-10 bg-background-base">
					<nav className="space-y-24">
						{docsNav.map((group) => (
							<div key={group.category} className="space-y-8">
								<h4 className="text-[11px] uppercase tracking-wider font-bold text-accent-black/40">
									{group.category}
								</h4>
								<ul className="space-y-4 list-none p-0 m-0">
									{group.links.map((link) => (
										<li key={link.slug}>
											{(() => {
												const isActive =
													pathname === `/docs/${link.slug}` ||
													(pathname === "/docs" &&
														link.slug === "introduction");
												return (
													<Link
														href={`/docs/${link.slug}`}
														className={`block text-body-medium py-6 no-underline transition-colors ${
															isActive
																? "text-heat-100 font-bold pl-4 border-l-2 border-heat-100"
																: "text-accent-black/70 hover:text-heat-100 pl-0"
														}`}
													>
														{link.title}
													</Link>
												);
											})()}
										</li>
									))}
								</ul>
							</div>
						))}
					</nav>
				</aside>

				{/* Content wrapper */}
				<main className="flex-1 min-w-0">
					<div className="p-32 md:p-48 max-w-960 mx-auto">{children}</div>
				</main>
			</div>
		</div>
	);
}
