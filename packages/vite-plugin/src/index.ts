export interface AgentLayerWebPluginOptions {
	/**
	 * Auto-detect and annotate buttons by their text/aria labels.
	 * @default true
	 */
	annotateButtons?: boolean;

	/**
	 * Auto-detect and annotate forms by their id/name attributes.
	 * @default true
	 */
	annotateForms?: boolean;

	/**
	 * Auto-detect and annotate input fields.
	 * @default true
	 */
	annotateFields?: boolean;

	/**
	 * Auto-detect navigation elements.
	 * @default true
	 */
	annotateNavigation?: boolean;

	/**
	 * Only annotate files matching this glob pattern.
	 * @default ['**\/*.tsx', '**\/*.jsx', '**\/*.html']
	 */
	include?: string[];

	/**
	 * Files to exclude from annotation.
	 * @default ['node_modules/**']
	 */
	exclude?: string[];

	/**
	 * Print a summary of annotations added at build time.
	 * @default true
	 */
	verbose?: boolean;
}

const BUTTON_INTENT_MAP: Record<string, string> = {
	submit: "submit",
	save: "save",
	delete: "delete",
	remove: "delete",
	cancel: "cancel",
	close: "close",
	open: "open",
	edit: "edit",
	update: "update",
	create: "create",
	add: "add",
	search: "search",
	filter: "filter",
	login: "login",
	logout: "logout",
	signup: "signup",
	"sign up": "signup",
	"sign in": "login",
	"log in": "login",
	download: "download",
	upload: "upload",
	confirm: "confirm",
	continue: "continue",
	next: "navigate_next",
	previous: "navigate_previous",
	back: "navigate_back",
	checkout: "checkout",
	pay: "pay",
	buy: "purchase",
	purchase: "purchase",
};

const FIELD_TYPE_MAP: Record<string, string> = {
	email: "email",
	password: "password",
	tel: "phone",
	phone: "phone",
	number: "number",
	date: "date",
	time: "time",
	url: "url",
	search: "search",
	file: "file",
	checkbox: "boolean",
	radio: "enum",
	select: "enum",
	textarea: "text",
	text: "text",
};

type AgentLayerWebVitePlugin = {
	name: string;
	enforce?: "pre" | "post";
	transform?: (code: string, id: string) => { code: string; map: null } | null;
	buildEnd?: () => void;
};

/**
 * Infers intent from button text/aria-label
 */
function inferButtonIntent(text: string): string | null {
	const normalized = text.toLowerCase().trim();
	for (const [key, intent] of Object.entries(BUTTON_INTENT_MAP)) {
		if (normalized.includes(key)) return intent;
	}
	return null;
}

/**
 * Transforms HTML string: injects AgentLayerWeb data attributes where missing
 */
function transformHTML(
	code: string,
	_id: string,
	opts: Required<AgentLayerWebPluginOptions>,
): { code: string; annotated: number } {
	let annotated = 0;

	if (opts.annotateForms) {
		// Annotate <form> tags that don't already have data-agent-role
		code = code.replace(
			/<form(?![^>]*data-agent-role)([^>]*)(name|id)="([^"]+)"([^>]*)>/gi,
			(_match, before, attr, name, after) => {
				annotated++;
				return `<form${before}${attr}="${name}"${after} data-agent-role="form" data-agent-id="${name}" data-agent-purpose="${name.replace(/-|_/g, " ")}">`;
			},
		);
	}

	if (opts.annotateButtons) {
		// Annotate <button> tags without data-agent-role
		code = code.replace(
			/<button(?![^>]*data-agent-role)([^>]*)>([\s\S]*?)<\/button>/gi,
			(match, attrs, content) => {
				const text = content.replace(/<[^>]+>/g, "").trim();
				const intent = inferButtonIntent(text);
				if (!intent) return match;
				const safeId = text
					.toLowerCase()
					.replace(/\s+/g, "_")
					.replace(/[^a-z0-9_]/g, "")
					.slice(0, 32);
				annotated++;
				return `<button${attrs} data-agent-role="action" data-agent-id="${safeId}" data-agent-intent="${intent}">${content}</button>`;
			},
		);
	}

	if (opts.annotateFields) {
		// Annotate <input> tags without data-agent-role
		code = code.replace(
			/<input(?![^>]*data-agent-role)([^>]*)(type|name)="([^"]+)"([^>]*)\/?>/gi,
			(_match, before, attr, val, after) => {
				const agentType = FIELD_TYPE_MAP[val.toLowerCase()] || "text";
				const fieldName = attr === "name" ? val : val;
				annotated++;
				return `<input${before}${attr}="${val}"${after} data-agent-role="field" data-agent-id="${fieldName}" data-agent-type="${agentType}">`;
			},
		);
	}

	if (opts.annotateNavigation) {
		// Annotate <nav> tags without data-agent-role
		code = code.replace(
			/<nav(?![^>]*data-agent-role)([^>]*)>/gi,
			(_match, attrs) => {
				annotated++;
				return `<nav${attrs} data-agent-role="navigation">`;
			},
		);
	}

	return { code, annotated };
}

/**
 * AgentLayerWeb Vite Plugin
 *
 * Automatically injects AgentLayerWeb semantic annotations into your HTML/JSX
 * at build time. Works with Vite and Next.js.
 *
 * @example
 * // vite.config.ts
 * import { agentLayerWeb } from '@agentlayerweb/vite-plugin';
 * export default { plugins: [agentLayerWeb()] };
 *
 * @example
 * // next.config.ts
 * const { agentLayerWebWebpackPlugin } = require('@agentlayerweb/vite-plugin');
 * module.exports = { webpack: (config) => { config.plugins.push(agentLayerWebWebpackPlugin()); return config; } };
 */
export function agentLayerWeb(
	options: AgentLayerWebPluginOptions = {},
): AgentLayerWebVitePlugin {
	const opts: Required<AgentLayerWebPluginOptions> = {
		annotateButtons: true,
		annotateForms: true,
		annotateFields: true,
		annotateNavigation: true,
		include: ["**/*.tsx", "**/*.jsx", "**/*.html"],
		exclude: ["node_modules/**"],
		verbose: true,
		...options,
	};

	let totalAnnotated = 0;

	return {
		name: "agentlayerweb",
		enforce: "pre",

		transform(code: string, id: string) {
			// Skip excluded files
			if (opts.exclude.some((p) => id.includes(p.replace("/**", ""))))
				return null;

			// Only process matching file types
			const isMatch = opts.include.some((p) => {
				const ext = p.replace("**/*", "");
				return id.endsWith(ext);
			});
			if (!isMatch) return null;

			// Skip already fully-annotated files
			if ((code.match(/data-agent-role/g) || []).length > 5) return null;

			const { code: transformed, annotated } = transformHTML(code, id, opts);
			if (annotated > 0) {
				totalAnnotated += annotated;
				return { code: transformed, map: null };
			}

			return null;
		},

		buildEnd() {
			if (opts.verbose && totalAnnotated > 0) {
				console.log(
					`\n✓ AgentLayerWeb: auto-annotated ${totalAnnotated} elements across your app.\n`,
				);
			}
		},
	};
}

export default agentLayerWeb;
