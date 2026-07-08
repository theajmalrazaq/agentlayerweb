/* biome-ignore-all lint/security/noDangerouslySetInnerHtml: trusted local markdown HTML */
import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
	return [
		{ slug: "introduction" },
		{ slug: "installation" },
		{ slug: "primitives" },
		{ slug: "webmcp" },
		{ slug: "validation" },
		{ slug: "benchmarks" },
	];
}

export default async function DocSlugPage({ params }: PageProps) {
	const { slug } = await params;

	// Resolve path to markdown docs in root docs/ folder
	const docsDir = path.join(process.cwd(), "../docs");
	const filePath = path.join(docsDir, `${slug}.md`);

	if (!fs.existsSync(filePath)) {
		notFound();
	}

	const rawContent = fs.readFileSync(filePath, "utf8");

	// Simple regex to parse ## subheadings for right sidebar Table of Contents
	const subheadingRegex = /^##\s+(.+)$/gm;
	const headings: { text: string; id: string }[] = [];
	for (const match of rawContent.matchAll(subheadingRegex)) {
		const text = match[1].trim();
		// Create clean ID for anchor linking
		const id = text
			.toLowerCase()
			.replace(/[^\w\s-]/g, "")
			.replace(/\s+/g, "-");
		headings.push({ text, id });
	}

	// Parse Markdown to HTML with custom heading IDs using Renderer instance
	const renderer = new marked.Renderer();
	renderer.heading = ({ text, depth }) => {
		const id = text
			.toLowerCase()
			.replace(/[^\w\s-]/g, "")
			.replace(/\s+/g, "-");
		return `<h${depth} id="${id}">${text}</h${depth}>\n`;
	};

	const htmlContent = await marked.parse(rawContent, { renderer });

	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 gap-32">
			{/* Markdown Content */}
			<div className="lg:col-span-3 min-w-0">
				<div className="mb-24">
					<Link
						href="/"
						className="inline-flex items-center text-body-medium text-heat-100 hover:text-heat-100/80 transition-colors no-underline font-semibold gap-6"
					>
						← Back to Home
					</Link>
				</div>

				<article
					className="markdown-content  text-body-large text-accent-black/80 leading-relaxed selection:bg-heat-100 selection:text-accent-white"
					dangerouslySetInnerHTML={{ __html: htmlContent }}
				/>

				{/* Navigation footer inside content */}
				<div className="mt-48 pt-24 border-t border-border-muted flex justify-end text-body-medium">
					<a
						href="https://github.com/theajmalrazaq/agentlayerweb/issues"
						target="_blank"
						rel="noopener noreferrer"
						className="text-accent-black/55 hover:text-accent-black no-underline"
					>
						Suggest edits on GitHub
					</a>
				</div>
			</div>

			{/* On this page / Table of Contents (Right Sidebar) */}
			{headings.length > 0 && (
				<aside className="hidden lg:block lg:col-span-1 border-l border-border-muted pl-24 space-y-16">
					<div className="sticky top-120">
						<h4 className="text-[11px] uppercase tracking-wider font-bold text-accent-black/40 mb-12">
							On this page
						</h4>
						<ul className="space-y-8 list-none p-0 m-0 text-body-small">
							{headings.map((h) => (
								<li key={h.id}>
									<a
										href={`#${h.id}`}
										className="block text-accent-black/60 hover:text-heat-100 no-underline transition-colors py-2"
									>
										{h.text}
									</a>
								</li>
							))}
						</ul>
					</div>
				</aside>
			)}
		</div>
	);
}
