/* biome-ignore-all lint: generated demo example */
"use client";

import {
	AgentAction,
	AgentField,
	AgentForm,
	AgentPage,
	AgentSection,
} from "@agentlayerweb/react";
import Link from "next/link";
import React, { useState } from "react";

export default function Home() {
	const [activeTab, setActiveTab] = useState<"react" | "html" | "vue">("react");
	const [codeLang, setCodeLang] = useState<"python" | "node" | "curl" | "cli">(
		"python",
	);
	const [copySuccess, setCopySuccess] = useState(false);
	const [installSuccess, setInstallSuccess] = useState(false);
	const [activeUseCase, setActiveUseCase] = useState<
		"chats" | "tools" | "onboarding"
	>("chats");

	const copyCommand = () => {
		navigator.clipboard.writeText("pnpm add @agentlayerweb/core");
		setInstallSuccess(true);
		setTimeout(() => setInstallSuccess(false), 2000);
	};

	const copyCodeSnippet = (code: string) => {
		navigator.clipboard.writeText(code);
		setCopySuccess(true);
		setTimeout(() => setCopySuccess(false), 2000);
	};

	const codeSnippets = {
		react: `import { AgentAction, AgentForm, AgentField } from '@agentlayerweb/react';

// Wrap your UI code cleanly in React:
<AgentForm purpose="Book Intro Strategy Call" submitAction="book_intro">
  <AgentField name="email" type="email" label="Work Email" required>
    <input type="email" placeholder="you@company.com" className="..." />
  </AgentField>
  
  <AgentAction id="submit-booking" intent="submit" priority="primary">
    <button type="submit" className="...">Schedule Call</button>
  </AgentAction>
</AgentForm>`,
		html: `<!-- Standard HTML with Declarative WebMCP + AgentLayerWeb out of the box -->
<form 
  id="demo-form" 
  toolname="book-demo" 
  tooldescription="Submit a demo request with email"
  data-agent-role="form" 
  data-agent-form="Book Demo"
>
  <input 
    type="email" 
    name="email" 
    data-agent-role="field" 
    data-agent-field="email" 
    required 
  />
  <button 
    id="submit-btn" 
    toolname="submit-demo" 
    data-agent-role="action" 
    data-agent-id="submit-demo"
  >
    Submit
  </button>
</form>`,
		vue: `<!-- Vue custom directive bindings -->
<form v-agent="agent.form({ purpose: 'Book Demo', submitAction: 'book_demo' })">
  <input 
    type="email" 
    v-agent="agent.field({ name: 'email', type: 'email', required: true })" 
  />
  <button 
    v-agent="agent.action({ id: 'submit_demo', intent: 'submit' })"
  >
    Submit
  </button>
</form>`,
	};

	const snippetLangCodes = {
		python: `import { AgentAction, AgentForm, AgentField } from '@agentlayerweb/react';

<AgentForm purpose="Book briefing" submitAction="submit_briefing">
  <AgentField name="email" type="email" required>
    <input type="email" />
  </AgentField>
</AgentForm>`,
		node: `<!-- Vue custom directive bindings -->
<form v-agent="agent.form({ purpose: 'Book Demo', submitAction: 'book_demo' })">
  <input 
    type="email" 
    v-agent="agent.field({ name: 'email', type: 'email', required: true })" 
  />
</form>`,
		curl: `<!-- Standard HTML WebMCP form discovery -->
<form toolname="book-demo" tooldescription="Submit demo request">
  <input name="email" required />
</form>`,
		cli: `pnpm add @agentlayerweb/react @agentlayerweb/core
pnpm run build`,
	};

	return (
		<AgentPage id="landing_page" title="AgentLayerWeb Home Page">
			<div className="bg-background-base min-h-screen text-accent-black selection:bg-heat-100 selection:text-accent-white animate-fade-in pb-96">
				{/* Navbar */}
				<header
					className="fixed top-36 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-300 z-50 border border-border-muted px-24 py-16"
					style={{
						background: "rgba(255, 255, 255, 0.85)",
						backdropFilter: "blur(12px)",
					}}
				>
					<div className="max-w-300 mx-auto flex items-center justify-between">
						<div className="flex items-center gap-12">
							{/* Brand Logo Symbol */}
							<svg
								viewBox="0 0 61 67"
								fill="none"
								className="animate-pulse"
								style={{ width: "26px", height: "28px" }}
							>
								<path
									d="M20 22H12V55H55V67H0V10H20V22ZM32 37H43V49H20V22H32V37ZM43.5 0C43.9203 8.94373 51.1001 16.0862 60.0459 16.46L61 16.5L60.0459 16.54C51.1001 16.9138 43.9203 24.0563 43.5 33C43.0797 24.0563 35.8999 16.9138 26.9541 16.54L26 16.5L26.9541 16.46C35.8999 16.0862 43.0797 8.94373 43.5 0Z"
									fill="url(#logo_gradient)"
								/>
								<defs>
									<linearGradient
										id="logo_gradient"
										x1="43.5"
										y1="0"
										x2="43.5"
										y2="33"
										gradientUnits="userSpaceOnUse"
									>
										<stop stopColor="#0036FE" />
										<stop offset="1" stopOpacity="0.81" />
									</linearGradient>
								</defs>
							</svg>
							<span className="font-sans text-title-h5 font-bold tracking-tight text-accent-black">
								Agent<span className="text-heat-100">Layer</span>
							</span>
						</div>

						<nav className="desktop-nav items-center gap-24">
							<a
								href="#features"
								className="text-body-medium text-accent-black/70 hover:text-accent-black transition-colors duration-4"
							>
								Products
							</a>
							<a
								href="#why-agentlayerweb"
								className="text-body-medium text-accent-black/70 hover:text-accent-black transition-colors duration-4"
							>
								Resources
							</a>
							<a
								href="#comparison"
								className="text-body-medium text-accent-black/70 hover:text-accent-black transition-colors duration-4"
							>
								Pricing
							</a>
							<Link
								href="/docs"
								className="text-body-medium text-accent-black/70 hover:text-accent-black transition-colors duration-4 font-semibold"
							>
								Docs
							</Link>
							<a
								href="#sandbox"
								className="text-body-medium text-accent-black/70 hover:text-accent-black transition-colors duration-4"
							>
								Playground
							</a>
						</nav>

						<div className="flex items-center gap-12">
							<a
								href="https://github.com/theajmalrazaq/agentlayerweb"
								target="_blank"
								rel="noopener noreferrer"
								className="desktop-cta text-body-small border border-border-muted px-12 h-36 items-center justify-center rounded-6 hover:bg-background-lighter transition-colors duration-4 gap-8 text-accent-black decoration-none"
							>
								{/* GitHub Icon */}
								<svg
									style={{ width: "16px", height: "16px" }}
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
									/>
								</svg>
								GitHub
							</a>
							<AgentAction
								id="nav_get_started"
								intent="install"
								priority="primary"
							>
								<button
									onClick={copyCommand}
									className="bg-heat-100 hover:bg-heat-100/90 text-accent-white text-body-small font-semibold px-16 h-36 flex items-center justify-center rounded-6 transition-colors duration-4 gap-8 border-0 cursor-pointer"
								>
									{installSuccess ? "Copied!" : "pnpm add @agentlayerweb/core"}
								</button>
							</AgentAction>
						</div>
					</div>
				</header>

				{/* Hero Section */}
				<section className="relative pt-45 pb-20 px-24 overflow-hidden text-center">
					<div className="max-w-200 mx-auto relative z-10 animate-fade-up">
						{/* Tag / Badge */}
						<div className="inline-flex items-center gap-8 bg-heat-10 border border-heat-100/20 px-12 py-4 rounded-6 text-heat-100 text-body-small font-semibold mb-24">
							<span
								className="bg-heat-100"
								style={{ width: "6px", height: "6px", borderRadius: "0px" }}
							/>
							100% Free & Open Source
						</div>

						<h1 className="text-title-h1 tracking-tight font-extrabold mb-24 leading-none text-accent-black">
							Expose your UI to <br />
							<span className="bg-linear-to-r from-heat-100 via-accent-honey to-heat-100 bg-clip-text text-transparent">
								AI browser agents
							</span>
						</h1>

						<p className="text-body-x-large text-accent-black/70 max-w-160 mx-auto mb-32 font-sans">
							A headless metadata wrapper for your web application. Declare
							forms, actions, and fields so AI agents can operate your app with
							100% precision.
						</p>

						{/* Search/Form Mockup */}
						<div className="max-w-150 mx-auto bg-background-base border border-border-loud rounded-6 p-8 flex items-center gap-8 mb-24">
							<input
								type="text"
								placeholder="http://localhost:3000"
								value="http://localhost:3000"
								disabled
								className="grow bg-transparent border-0 outline-none text-body-medium text-accent-black/70 px-12"
							/>
							<div className="flex items-center gap-4">
								<button className="bg-background-lighter hover:bg-background-lighter/80 text-accent-black/70 font-semibold px-12 h-32 rounded-6 border-0 text-body-small cursor-pointer">
									Annotate
								</button>
								<button className="bg-background-lighter hover:bg-background-lighter/80 text-accent-black/70 font-semibold px-12 h-32 rounded-6 border-0 text-body-small cursor-pointer">
									Validate
								</button>
							</div>
							<button className="bg-heat-100 text-accent-white rounded-6 h-32 w-32 flex items-center justify-center border-0 cursor-pointer hover:bg-heat-100/90 transition-colors">
								<svg
									style={{ width: "16px", height: "16px" }}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2.5"
										d="M14 5l7 7m0 0l-7 7m7-7H3"
									/>
								</svg>
							</button>
						</div>

						<div className="text-body-small text-accent-black/40 mb-48 flex justify-center items-center gap-8">
							<span>
								Trusted by developers building agent-first software of all sizes
							</span>
						</div>

						{/* Code preview block */}
						<div className="bg-background-lighter border border-border-loud rounded-6 p-16 max-w-180 mx-auto text-left">
							<div className="flex items-center justify-between border-b border-border-muted pb-12 mb-16">
								<div className="flex items-center gap-8">
									<span
										className="bg-accent-crimson"
										style={{
											width: "10px",
											height: "10px",
											borderRadius: "0px",
										}}
									/>
									<span
										className="bg-accent-honey"
										style={{
											width: "10px",
											height: "10px",
											borderRadius: "0px",
										}}
									/>
									<span
										className="bg-accent-forest"
										style={{
											width: "10px",
											height: "10px",
											borderRadius: "0px",
										}}
									/>
								</div>
								<span className="text-body-small text-accent-black/40 font-mono">
									demo_preview.js
								</span>
							</div>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-16 font-mono text-xs text-accent-black/80">
								<div>
									<p className="text-accent-forest font-bold mb-8">
										// Annotated UI Element
									</p>
									<pre className="bg-background-base p-12 rounded-6 border border-border-muted overflow-x-auto whitespace-pre">
										{`<button
  id="checkout"
  toolname="checkout-item"
  tooldescription="Submit order"
  data-agent-role="action"
>
  Place Order
</button>`}
									</pre>
								</div>
								<div>
									<p className="text-accent-bluetron font-bold mb-8">
										// Browser Tool Manifest
									</p>
									<pre className="bg-background-base p-12 rounded-6 border border-border-muted overflow-x-auto whitespace-pre">
										{`{
  "name": "checkout-item",
  "description": "Submit order",
  "parameters": {
    "type": "object",
    "properties": {}
  }
}`}
									</pre>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Start Annotating Section */}
				<section
					id="features"
					className="py-20 bg-background-lighter px-24 border-t border-b border-border-muted"
				>
					<div className="max-w-300 mx-auto">
						<div className="text-center mb-16">
							<div className="inline-block bg-heat-10 border border-heat-100/30 px-12 py-4 rounded-6 text-heat-100 text-body-small font-semibold mb-16">
								Developer First
							</div>
							<h2 className="text-title-h2 font-extrabold mb-16 text-accent-black">
								Start annotating today
							</h2>
							<p className="text-body-large text-accent-black/60 max-w-150 mx-auto font-sans">
								The infrastructure layer that helps AI find, read, and act on
								web elements.
							</p>
						</div>

						{/* 3 cards grid */}
						<div className="grid grid-cols-1 md:grid-cols-3 gap-24 mb-16">
							<div className="bg-background-base border border-border-muted p-32 rounded-6 hover:border-heat-100/30 transition-all duration-4 flex flex-col justify-between">
								<div>
									<h3 className="text-title-h5 font-bold mb-12 text-accent-black">
										Annotate Forms & Actions
									</h3>
									<p className="text-body-medium text-accent-black/60 mb-24 font-sans">
										Wrap components or attach data-agent-* attributes. Specify
										fields, descriptions, and verification rules.
									</p>
								</div>
								<Link
									href="/docs"
									className="text-body-small font-bold text-heat-100 hover:underline decoration-none"
								>
									Learn more →
								</Link>
							</div>

							<div className="bg-background-base border border-border-muted p-32 rounded-6 hover:border-heat-100/30 transition-all duration-4 flex flex-col justify-between">
								<div>
									<h3 className="text-title-h5 font-bold mb-12 text-accent-black">
										Verify Schema Soundness
									</h3>
									<p className="text-body-medium text-accent-black/60 mb-24 font-sans">
										Instantly validate your page's semantic schema during
										testing suites or inside your browser console.
									</p>
								</div>
								<Link
									href="/docs"
									className="text-body-small font-bold text-heat-100 hover:underline decoration-none"
								>
									Learn more →
								</Link>
							</div>

							<div className="bg-background-base border border-border-muted p-32 rounded-6 hover:border-heat-100/30 transition-all duration-4 flex flex-col justify-between">
								<div>
									<div className="flex items-center gap-8 mb-12">
										<h3 className="text-title-h5 font-bold text-accent-black m-0">
											Native WebMCP
										</h3>
										<span className="bg-accent-amethyst/10 text-accent-amethyst text-[10px] font-bold uppercase px-8 py-2 rounded-4">
											New
										</span>
									</div>
									<p className="text-body-medium text-accent-black/60 mb-24 font-sans">
										Complies with browser-level Model Context Protocols,
										registering page elements directly as LLM tools.
									</p>
								</div>
								<Link
									href="/docs"
									className="text-body-small font-bold text-heat-100 hover:underline decoration-none"
								>
									Learn more →
								</Link>
							</div>
						</div>

						{/* Code switcher widget */}
						<div className="bg-background-base border border-border-muted rounded-6 overflow-hidden grid grid-cols-1 md:grid-cols-2">
							<div className="border-r border-border-muted p-24">
								<div className="flex items-center justify-between border-b border-border-muted pb-12 mb-16">
									<div className="flex gap-12">
										{(["python", "node", "curl", "cli"] as const).map(
											(lang) => (
												<button
													key={lang}
													onClick={() => setCodeLang(lang)}
													className={`text-body-small font-bold bg-transparent border-0 cursor-pointer ${codeLang === lang ? "text-heat-100" : "text-accent-black/50"}`}
												>
													{lang === "python"
														? "React"
														: lang === "node"
															? "Vue"
															: lang === "curl"
																? "HTML"
																: "CLI"}
												</button>
											),
										)}
									</div>
									<button
										onClick={() => copyCodeSnippet(snippetLangCodes[codeLang])}
										className="bg-background-lighter hover:bg-background-lighter/80 text-accent-black/70 text-body-small font-bold px-12 py-4 rounded-6 border-0 cursor-pointer"
									>
										{copySuccess ? "Copied!" : "Copy code"}
									</button>
								</div>
								<pre className="text-xs font-mono text-accent-black/90 whitespace-pre overflow-x-auto">
									{snippetLangCodes[codeLang]}
								</pre>
							</div>

							<div className="p-32 flex flex-col justify-center bg-[#fafafa]">
								<h4 className="text-title-h4 font-bold text-accent-black mb-12">
									# AgentLayerWeb
								</h4>
								<p className="text-body-medium text-accent-black/70 mb-24 font-sans leading-relaxed">
									AgentLayerWeb maps web page elements directly to AI browser
									agent tools.
								</p>
								<ul className="space-y-12 text-body-medium text-accent-black/60 font-sans">
									<li className="flex items-center gap-8">
										<span className="text-heat-100 font-bold">•</span>
										<span>
											<strong>Annotate:</strong> Expose forms and fields to LLMs
										</span>
									</li>
									<li className="flex items-center gap-8">
										<span className="text-heat-100 font-bold">•</span>
										<span>
											<strong>Validate:</strong> Test WebMCP tool declarations
										</span>
									</li>
									<li className="flex items-center gap-8">
										<span className="text-heat-100 font-bold">•</span>
										<span>
											<strong>Interact:</strong> Let browser agents click and
											submit forms safely
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				{/* Connect AI agents */}
				<section id="why-agentlayerweb" className="py-20 px-24">
					<div className="max-w-300 mx-auto">
						<div className="text-center mb-16">
							<div className="inline-block bg-heat-10 border border-heat-100/30 px-12 py-4 rounded-6 text-heat-100 text-body-small font-semibold mb-16">
								Agent Ready
							</div>
							<h2 className="text-title-h2 font-extrabold mb-16 text-accent-black">
								Easily connect with your <br />
								<span className="text-heat-100">AI agents</span>
							</h2>
							<p className="text-body-large text-accent-black/60 max-w-150 mx-auto font-sans">
								Connect AgentLayerWeb annotations to any browser client in
								minutes.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-32">
							<div className="bg-background-lighter border border-border-muted p-32 rounded-6 flex flex-col justify-between">
								<div>
									<p className="text-body-large font-bold text-accent-black mb-12 font-sans">
										<strong>One dependency.</strong> Annotate your application
										using our headless SDK.
									</p>
									<div className="bg-background-base p-16 rounded-6 border border-border-muted font-mono text-xs text-accent-black/85 mb-24 overflow-x-auto flex items-center justify-between">
										<code>
											pnpm add @agentlayerweb/react @agentlayerweb/core
										</code>
										<span className="bg-background-lighter text-[10px] text-accent-black/40 px-8 py-2 rounded-4">
											NPM
										</span>
									</div>
								</div>
								<Link
									href="/docs"
									className="text-body-small font-bold text-heat-100 hover:underline decoration-none"
								>
									View the docs →
								</Link>
							</div>

							<div className="bg-background-lighter border border-border-muted p-32 rounded-6 flex flex-col justify-between">
								<div>
									<p className="text-body-large font-bold text-accent-black mb-12 font-sans">
										<strong>Local Schema testing.</strong> Test your page's
										WebMCP schema via our validator CLI.
									</p>
									<div className="bg-background-base p-16 rounded-6 border border-border-muted font-mono text-xs text-accent-black/85 mb-24 overflow-x-auto flex items-center justify-between">
										<code>
											npx @agentlayerweb/cli validate http://localhost:3000
										</code>
										<span className="bg-background-lighter text-[10px] text-accent-black/40 px-8 py-2 rounded-4">
											CLI
										</span>
									</div>
								</div>
								<Link
									href="/docs"
									className="text-body-small font-bold text-heat-100 hover:underline decoration-none"
								>
									View the validation guide →
								</Link>
							</div>
						</div>
					</div>
				</section>

				{/* Benchmarks section */}
				<section
					id="comparison"
					className="py-20 bg-background-lighter px-24 border-t border-b border-border-muted"
				>
					<div className="max-w-300 mx-auto">
						<div className="text-center mb-16">
							<div className="inline-block bg-heat-10 border border-heat-100/30 px-12 py-4 rounded-6 text-heat-100 text-body-small font-semibold mb-16">
								Built for Performance
							</div>
							<h2 className="text-title-h2 font-extrabold mb-16 text-accent-black">
								Fast, reliable, and token-efficient. <br />
								And it's <span className="text-heat-100">open source</span>
							</h2>
							<p className="text-body-large text-accent-black/60 max-w-150 mx-auto font-sans">
								Web interaction infrastructure built from the ground up.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-32 mb-48">
							<div className="bg-background-base border border-border-muted p-32 rounded-6">
								<span className="text-body-small text-accent-black/40 uppercase font-bold block mb-12">
									100% Action Accuracy
								</span>
								<h3 className="text-title-h4 font-bold text-accent-black mb-12">
									Guaranteed interaction.
								</h3>
								<p className="text-body-medium text-accent-black/60 mb-24 font-sans">
									AI agents successfully identify and execute page actions
									without coordinate-guessing or layout shifts.
								</p>
								<div className="space-y-16">
									<div>
										<div className="flex justify-between text-body-small font-bold mb-4">
											<span>AgentLayerWeb (Semantic)</span>
											<span className="text-heat-100">98%</span>
										</div>
										<div className="w-full bg-background-lighter h-8 overflow-hidden rounded-4">
											<div
												className="bg-heat-100 h-full rounded-4"
												style={{ width: "98%" }}
											/>
										</div>
									</div>
									<div>
										<div className="flex justify-between text-body-small font-bold mb-4">
											<span>Computer Use (Vision)</span>
											<span>45%</span>
										</div>
										<div className="w-full bg-background-lighter h-8 overflow-hidden rounded-4">
											<div
												className="bg-accent-black/35 h-full rounded-4"
												style={{ width: "45%" }}
											/>
										</div>
									</div>
									<div>
										<div className="flex justify-between text-body-small font-bold mb-4">
											<span>Raw DOM (Scraping)</span>
											<span>30%</span>
										</div>
										<div className="w-full bg-background-lighter h-8 overflow-hidden rounded-4">
											<div
												className="bg-accent-black/20 h-full rounded-4"
												style={{ width: "30%" }}
											/>
										</div>
									</div>
								</div>
							</div>

							<div className="bg-background-base border border-border-muted p-32 rounded-6 flex flex-col justify-between">
								<div>
									<span className="text-body-small text-accent-black/40 uppercase font-bold block mb-12">
										Instant Tool Discovery
									</span>
									<h3 className="text-title-h4 font-bold text-accent-black mb-12">
										Blazingly fast.
									</h3>
									<p className="text-body-medium text-accent-black/60 mb-24 font-sans">
										Schema registry parses page manifests in milliseconds. Built
										for fast agentic validation loops.
									</p>
								</div>
								<div className="overflow-x-auto border border-border-muted rounded-6 bg-background-lighter font-sans text-xs">
									<table className="w-full text-left border-collapse">
										<thead>
											<tr className="border-b border-border-muted bg-background-base">
												<th className="p-8 font-bold">Form Name</th>
												<th className="p-8 font-bold">DOM Parse</th>
												<th className="p-8 font-bold">Manifest Query</th>
											</tr>
										</thead>
										<tbody className="divide-y divide-border-muted text-accent-black/70">
											<tr>
												<td className="p-8">Login Form</td>
												<td className="p-8">520 ms</td>
												<td className="p-8">2 ms</td>
											</tr>
											<tr>
												<td className="p-8">Checkout Form</td>
												<td className="p-8">640 ms</td>
												<td className="p-8">3 ms</td>
											</tr>
											<tr>
												<td className="p-8">Strategy Booking</td>
												<td className="p-8">480 ms</td>
												<td className="p-8">2 ms</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-32">
							<div className="bg-background-base border border-border-muted p-32 rounded-6 flex flex-col justify-between">
								<div>
									<span className="text-body-small text-accent-black/40 uppercase font-bold block mb-12">
										Token-efficient
									</span>
									<h3 className="text-title-h4 font-bold text-accent-black mb-12">
										Only the metadata that matters.
									</h3>
									<p className="text-body-medium text-accent-black/60 mb-24 font-sans">
										No raw HTML page source or image arrays. Just clean tool
										schemas, reducing token consumption by 93%.
									</p>
								</div>
								<div className="bg-background-lighter p-16 rounded-6 border border-border-muted font-sans text-xs flex justify-between items-center">
									<div>
										<span className="text-accent-black/55 block">
											Before (Raw HTML/Screenshot)
										</span>
										<span className="text-title-h5 font-bold text-accent-crimson block">
											38,391 tokens
										</span>
									</div>
									<div className="text-title-h3 text-accent-black/30 font-light">
										→
									</div>
									<div className="text-right">
										<span className="text-accent-black/55 block">
											After (AgentLayerWeb)
										</span>
										<span className="text-title-h5 font-bold text-accent-forest block">
											2,500 tokens
										</span>
									</div>
								</div>
							</div>

							<div className="bg-background-base border border-border-muted p-32 rounded-6 flex flex-col justify-between">
								<div>
									<span className="text-body-small text-accent-black/40 uppercase font-bold block mb-12">
										Open Source
									</span>
									<h3 className="text-title-h4 font-bold text-accent-black mb-12">
										Open standard for AI web interaction.
									</h3>
									<p className="text-body-medium text-accent-black/60 mb-24 font-sans">
										Developed transparently and collaboratively. Join our
										community building the future of agentic web browsing.
									</p>
								</div>
								<div className="bg-background-lighter p-16 rounded-6 border border-border-muted font-sans text-xs flex items-center justify-between">
									<div className="flex items-center gap-12">
										<svg
											fill="currentColor"
											viewBox="0 0 24 24"
											style={{ width: "24px", height: "24px" }}
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
											/>
										</svg>
										<div>
											<span className="font-bold block text-body-medium">
												theajmalrazaq/agentlayerweb
											</span>
											<span className="text-accent-black/55 block">
												Star our repository on GitHub
											</span>
										</div>
									</div>
									<span className="bg-heat-10 border border-heat-100/30 text-heat-100 font-bold px-12 py-6 rounded-6">
										★ 143.8K
									</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* Hard stuff section */}
				<section className="py-20 px-24">
					<div className="max-w-300 mx-auto">
						<div className="text-center mb-16">
							<div className="inline-block bg-heat-10 border border-heat-100/30 px-12 py-4 rounded-6 text-heat-100 text-body-small font-semibold mb-16">
								Zero configuration
							</div>
							<h2 className="text-title-h2 font-extrabold mb-16 text-accent-black font-pixel-grid">
								We handle the{" "}
								<span className="text-gradient font-pixel-grid">
									hard stuff
								</span>
							</h2>
							<p className="text-body-large text-accent-black/60 max-w-150 mx-auto font-sans">
								Javascript rendering, smart wait, schema parsing, validation
								mapping, and more.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-24 mb-48">
							<div className="bg-background-lighter border border-border-muted p-24 rounded-6">
								<span className="text-xs text-heat-100 font-bold uppercase block mb-8">
									✔ Docs to schema
								</span>
								<h4 className="text-title-h5 font-bold text-accent-black mb-8">
									Tool Synthesis.
								</h4>
								<p className="text-body-medium text-accent-black/60 font-sans">
									Automatically build JSON Schema declarations from your
									annotated forms.
								</p>
							</div>

							<div className="bg-background-lighter border border-border-muted p-24 rounded-6">
								<span className="text-xs text-accent-amethyst font-bold uppercase block mb-8">
									✔ Knows the intent
								</span>
								<h4 className="text-title-h5 font-bold text-accent-black mb-8">
									Intent Parsing.
								</h4>
								<p className="text-body-medium text-accent-black/60 font-sans">
									Map buttons, links, and inputs to semantic tools with standard
									execution weights.
								</p>
							</div>

							<div className="bg-background-lighter border border-border-muted p-24 rounded-6">
								<span className="text-xs text-accent-bluetron font-bold uppercase block mb-8">
									✔ Synchronized UI
								</span>
								<h4 className="text-title-h5 font-bold text-accent-black mb-8">
									State Synchronization.
								</h4>
								<p className="text-body-medium text-accent-black/60 font-sans">
									Intelligently notify browser agents of dynamic loading,
									completion, or form validation states.
								</p>
							</div>
						</div>

						{/* Diagram */}
						<div className="bg-background-lighter border border-border-muted p-32 rounded-6 text-center max-w-180 mx-auto mb-48">
							<div className="flex items-center justify-between gap-16 font-sans text-xs">
								<div className="bg-background-base p-16 rounded-6 border border-border-muted w-1/3">
									<span className="font-bold block mb-4 text-accent-black">
										USER
									</span>
									<span className="text-accent-black/50 block">
										Search Query
									</span>
								</div>
								<div className="w-24 text-title-h4 text-accent-black/35 animate-pulse">
									➔
								</div>
								<div className="bg-heat-10 border border-heat-100/30 p-16 rounded-6 w-1/3">
									<span className="font-bold block mb-4 text-heat-100">
										AGENTLAYERWEB
									</span>
									<span className="text-heat-100/70 block">Annotate & Map</span>
								</div>
								<div className="w-24 text-title-h4 text-accent-black/35 animate-pulse">
									➔
								</div>
								<div className="bg-background-base p-16 rounded-6 border border-border-muted w-1/3">
									<span className="font-bold block mb-4 text-accent-black">
										INDEX & WEB
									</span>
									<span className="text-accent-black/50 block">
										AI Browser Tool
									</span>
								</div>
							</div>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-2 gap-24 font-sans text-body-medium">
							<div className="bg-background-base border border-border-muted p-24 rounded-6">
								<span className="text-xs text-heat-100 font-bold block mb-8 uppercase">
									Advanced web coverage
								</span>
								<h4 className="text-title-h5 font-bold mb-8 text-accent-black">
									Enhanced schema validation.
								</h4>
								<p className="text-accent-black/60 font-sans">
									Validate input parameters before submission to avoid form
									validations errors.
								</p>
							</div>
							<div className="bg-background-base border border-border-muted p-24 rounded-6">
								<span className="text-xs text-accent-amethyst font-bold block mb-8 uppercase">
									Interact with pages
								</span>
								<h4 className="text-title-h5 font-bold mb-8 text-accent-black">
									Dynamic elements support.
								</h4>
								<p className="text-accent-black/60 font-sans">
									Handle asynchronous forms, modals, and multi-step dialog flows
									natively.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Dashboard preview */}
				<section className="py-80 bg-background-lighter px-24 border-t border-b border-border-muted">
					<div className="max-w-300 mx-auto">
						<div className="text-center mb-64">
							<div className="inline-block bg-heat-10 border border-heat-100/30 px-12 py-4 rounded-6 text-heat-100 text-body-small font-semibold mb-16">
								Use cases
							</div>
							<h2 className="text-title-h2 font-extrabold mb-16 text-accent-black">
								Transform web interfaces into <br />
								<span className="text-heat-100">AI-native</span> solutions
							</h2>
							<p className="text-body-large text-accent-black/60 max-w-150 mx-auto font-sans">
								See how you can give your AI better access to web forms with
								AgentLayerWeb.
							</p>
						</div>

						<div className="bg-background-base border border-border-loud rounded-6 overflow-hidden max-w-240 mx-auto grid grid-cols-1 md:grid-cols-3">
							<div className="border-r border-border-muted p-24 bg-[#fbfbfb] font-sans">
								<p className="text-body-small font-bold uppercase text-accent-black/45 mb-16">
									Agent Integration
								</p>
								<ul className="space-y-12 list-none p-0 m-0">
									<li
										onClick={() => setActiveUseCase("chats")}
										className={`p-12 rounded-6 border cursor-pointer flex items-center gap-8 ${activeUseCase === "chats" ? "bg-background-base border-border-muted font-bold text-accent-black" : "border-transparent text-accent-black/60 hover:bg-background-lighter"}`}
									>
										<span
											className={`rounded-none ${activeUseCase === "chats" ? "bg-heat-100" : "bg-accent-black/30"}`}
											style={{ width: "8px", height: "8px" }}
										/>
										<span className="text-body-small">Smarter AI Forms</span>
									</li>
									<li
										onClick={() => setActiveUseCase("tools")}
										className={`p-12 rounded-6 border cursor-pointer flex items-center gap-8 ${activeUseCase === "tools" ? "bg-background-base border-border-muted font-bold text-accent-black" : "border-transparent text-accent-black/60 hover:bg-background-lighter"}`}
									>
										<span
											className={`rounded-none ${activeUseCase === "tools" ? "bg-heat-100" : "bg-accent-black/30"}`}
											style={{ width: "8px", height: "8px" }}
										/>
										<span className="text-body-small">
											Autonomous Workflows
										</span>
									</li>
									<li
										onClick={() => setActiveUseCase("onboarding")}
										className={`p-12 rounded-6 border cursor-pointer flex items-center gap-8 ${activeUseCase === "onboarding" ? "bg-background-base border-border-muted font-bold text-accent-black" : "border-transparent text-accent-black/60 hover:bg-background-lighter"}`}
									>
										<span
											className={`rounded-none ${activeUseCase === "onboarding" ? "bg-heat-100" : "bg-accent-black/30"}`}
											style={{ width: "8px", height: "8px" }}
										/>
										<span className="text-body-small">CRM Syncing</span>
									</li>
								</ul>
							</div>

							<div className="col-span-2 p-32 font-sans">
								<h4 className="text-title-h5 font-bold mb-16 text-accent-black">
									Agent Integration in progress...
								</h4>
								<div className="grid grid-cols-2 gap-16 text-body-small text-accent-black/60 mb-24">
									<div className="border-b border-border-muted pb-8 flex justify-between">
										<span>Fields discovered</span>
										<strong className="text-accent-black">2 registered</strong>
									</div>
									<div className="border-b border-border-muted pb-8 flex justify-between">
										<span>Actions mapped</span>
										<strong className="text-accent-black">1 verified</strong>
									</div>
									<div className="border-b border-border-muted pb-8 flex justify-between">
										<span>Validation check</span>
										<strong className="text-accent-black">Passed</strong>
									</div>
									<div className="border-b border-border-muted pb-8 flex justify-between">
										<span>MCP connection</span>
										<strong className="text-accent-black">Connected</strong>
									</div>
								</div>
								<p className="text-body-medium text-accent-black/50 leading-relaxed font-sans mb-16">
									Exposing scheduling forms directly to browser agents using
									AgentLayerWeb's custom annotation standard.
								</p>
								<Link
									href="/docs"
									className="text-body-small font-bold text-heat-100 hover:underline decoration-none"
								>
									Visit docs →
								</Link>
							</div>
						</div>
					</div>
				</section>

				{/* Testimonials */}
				<section className="py-80 px-24">
					<div className="max-w-300 mx-auto">
						<div className="text-center mb-64">
							<div className="inline-block bg-heat-10 border border-heat-100/30 px-12 py-4 rounded-6 text-heat-100 text-body-small font-semibold mb-16">
								Community
							</div>
							<h2 className="text-title-h2 font-extrabold mb-16 text-accent-black">
								People love <br />
								building with{" "}
								<span className="text-heat-100">AgentLayerWeb</span>
							</h2>
							<p className="text-body-large text-accent-black/60 max-w-150 mx-auto font-sans">
								Discover why developers choose AgentLayerWeb every day.
							</p>
						</div>

						<div className="grid grid-cols-1 md:grid-cols-3 gap-24 font-sans text-body-medium">
							<div className="bg-background-lighter border border-border-muted p-24 rounded-6 flex flex-col justify-between">
								<p className="italic text-accent-black/80 font-sans leading-relaxed mb-24">
									"Annotating our dashboard took 10 minutes and now AI web
									agents can execute checkouts with 100% accuracy. Absolute game
									changer."
								</p>
								<div>
									<strong className="block text-accent-black">
										Morgan Linton
									</strong>
									<span className="text-xs text-accent-black/45">
										@morganlinton
									</span>
								</div>
							</div>

							<div className="bg-background-lighter border border-border-muted p-24 rounded-6 flex flex-col justify-between">
								<p className="italic text-accent-black/80 font-sans leading-relaxed mb-24">
									"WebMCP + AgentLayerWeb is the missing bridge between LLMs and
									UI. No more coordinate-guessing or brittle selector scripts."
								</p>
								<div>
									<strong className="block text-accent-black">
										Chris DeReese
									</strong>
									<span className="text-xs text-accent-black/45">
										@chrisdereese
									</span>
								</div>
							</div>

							<div className="bg-background-lighter border border-border-muted p-24 rounded-6 flex flex-col justify-between">
								<p className="italic text-accent-black/80 font-sans leading-relaxed mb-24">
									"Our agentic workflows went from 40% success rate (visual
									computer use) to 98% using AgentLayerWeb. Incredible."
								</p>
								<div>
									<strong className="block text-accent-black">
										Alex Reibman
									</strong>
									<span className="text-xs text-accent-black/45">
										@AlexReibman
									</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* FAQs */}
				<section className="py-20 bg-background-lighter px-24 border-t border-b border-border-muted font-sans">
					<div className="max-w-180 mx-auto">
						<div className="text-center mb-16">
							<div className="inline-block bg-heat-10 border border-heat-100/30 px-12 py-4 rounded-6 text-heat-100 text-body-small font-semibold mb-16">
								FAQ
							</div>
							<h2 className="text-title-h2 font-extrabold mb-16 text-accent-black">
								Frequently asked{" "}
								<span className="text-heat-100">questions</span>
							</h2>
							<p className="text-body-large text-accent-black/60 max-w-150 mx-auto font-sans">
								Everything you need to know about AgentLayerWeb.
							</p>
						</div>

						<div className="space-y-16">
							<div className="bg-background-base border border-border-muted rounded-6 p-16">
								<strong className="block text-body-large text-accent-black mb-8">
									What is AgentLayerWeb?
								</strong>
								<p className="text-body-medium text-accent-black/60 font-sans m-0">
									AgentLayerWeb is a semantic annotation standard that exposes
									web interfaces to AI agents as structured tools.
								</p>
							</div>

							<div className="bg-background-base border border-border-muted rounded-6 p-16">
								<strong className="block text-body-large text-accent-black mb-8">
									How does it compare to visual scraping?
								</strong>
								<p className="text-body-medium text-accent-black/60 font-sans m-0">
									Instead of guessing element coordinates or parsing messy raw
									HTML, AgentLayerWeb provides clean tool schemas (WebMCP) that
									the browser serves directly to the agent.
								</p>
							</div>

							<div className="bg-background-base border border-border-muted rounded-6 p-16">
								<strong className="block text-body-large text-accent-black mb-8">
									Do I need to rewrite my application?
								</strong>
								<p className="text-body-medium text-accent-black/60 font-sans m-0">
									No. You simply add simple data attributes or wrap components
									in React/Vue. It has zero runtime performance impact on human
									users.
								</p>
							</div>
						</div>
					</div>
				</section>

				{/* Live Playground Demo / Booking Form */}
				<section className="py-20 bg-background-base px-24">
					<div className="max-w-150 mx-auto bg-background-base border border-border-loud p-32 rounded-6 relative">
						<div
							className="absolute bg-heat-100 text-accent-white text-[10px] font-mono px-8 py-4 rounded-6 uppercase font-semibold"
							style={{ top: "-16px", right: "-16px" }}
						>
							Agent-Ready form
						</div>

						<h3 className="text-title-h4 font-bold mb-16 text-center text-accent-black">
							Interactive Strategy Session
						</h3>
						<p className="text-body-medium text-accent-black/60 mb-24 text-center">
							Want a custom AEO analysis for your web platform? Schedule a free
							briefing.
						</p>

						<AgentForm
							purpose="Book Free Strategy Briefing"
							submitAction="briefing_submission"
						>
							<div className="space-y-16">
								<AgentField name="name" type="text" label="Name" required>
									<div className="space-y-4">
										<label className="text-body-small font-semibold block text-accent-black/70">
											Display Name
										</label>
										<input
											type="text"
											placeholder="Alice Smith"
											required
											className="w-full bg-background-lighter border border-border-muted text-accent-black rounded-6 p-12 text-body-input focus:outline-none focus:border-heat-100 h-40"
										/>
									</div>
								</AgentField>

								<AgentField
									name="email"
									type="email"
									label="Work Email"
									required
								>
									<div className="space-y-4">
										<label className="text-body-small font-semibold block text-accent-black/70">
											Work Email
										</label>
										<input
											type="email"
											placeholder="alice@company.com"
											required
											className="w-full bg-background-lighter border border-border-muted text-accent-black rounded-6 p-12 text-body-input focus:outline-none focus:border-heat-100 h-40"
										/>
									</div>
								</AgentField>

								<AgentAction
									id="book_briefing_cta"
									intent="submit"
									priority="primary"
								>
									<button
										type="submit"
										className="w-full bg-heat-100 hover:bg-heat-100/90 text-accent-white font-bold h-40 flex items-center justify-center rounded-6 transition-all duration-4 mt-8 border-0 cursor-pointer"
									>
										Submit Booking
									</button>
								</AgentAction>
							</div>
						</AgentForm>
					</div>
				</section>

				{/* Footer */}
				<footer className="bg-background-base pt-96 pb-48 px-24 relative overflow-hidden border-t border-border-muted">
					{/* Giant low-opacity Watermark Text (positioned where the footer starts) */}
					<div className="absolute top-0 left-0 right-0 text-center pointer-events-none select-none z-0 overflow-hidden leading-none -translate-y-1/2">
						<span className="font-pixel-grid text-[12vw] tracking-tighter text-accent-black/5 inline-block whitespace-nowrap uppercase">
							Agent Layer
						</span>
					</div>

					<div className="max-w-300 mx-auto relative z-10">
						{/* Main Footer Links Grid */}
						<div className="grid grid-cols-1 md:grid-cols-4 gap-48 mb-64 text-left font-sans">
							<div className="md:col-span-2">
								<div className="flex items-center gap-12 mb-16">
									<svg
										viewBox="0 0 61 67"
										fill="none"
										style={{ width: "24px", height: "26px" }}
									>
										<path
											d="M20 22H12V55H55V67H0V10H20V22ZM32 37H43V49H20V22H32V37ZM43.5 0C43.9203 8.94373 51.1001 16.0862 60.0459 16.46L61 16.5L60.0459 16.54C51.1001 16.9138 43.9203 24.0563 43.5 33C43.0797 24.0563 35.8999 16.9138 26.9541 16.54L26 16.5L26.9541 16.46C35.8999 16.0862 43.0797 8.94373 43.5 0Z"
											fill="#0036FE"
										/>
									</svg>
									<span className="text-body-large font-bold tracking-tight text-accent-black">
										AgentLayerWeb
									</span>
								</div>
								<p className="text-body-medium text-accent-black/50 max-w-7xl">
									The interaction standard for AI-native applications. Declare
									clean schemas and connect web interfaces directly to LLM
									agents.
								</p>
							</div>
							<div>
								<h5 className="text-body-small font-bold uppercase tracking-wider text-accent-black/40 mb-16">
									Community
								</h5>
								<ul className="space-y-12 list-none p-0 m-0 text-body-medium text-accent-black/60">
									<li>
										<a
											href="https://github.com/theajmalrazaq/agentlayerweb"
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-heat-100 transition-colors"
										>
											GitHub Repository
										</a>
									</li>
									<li>
										<a
											href="https://skills.sh/"
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-heat-100 transition-colors"
										>
											Skill Registry
										</a>
									</li>
								</ul>
							</div>
							<div>
								<h5 className="text-body-small font-bold uppercase tracking-wider text-accent-black/40 mb-16">
									Specification
								</h5>
								<ul className="space-y-12 list-none p-0 m-0 text-body-medium text-accent-black/60">
									<li>
										<a
											href="https://webmachinelearning.github.io/webmcp/"
											target="_blank"
											rel="noopener noreferrer"
											className="hover:text-heat-100 transition-colors"
										>
											W3C WebMCP Spec
										</a>
									</li>
									<li>
										<Link
											href="/docs"
											className="hover:text-heat-100 transition-colors"
										>
											Documentation
										</Link>
									</li>
								</ul>
							</div>
						</div>

						{/* Bottom Copyright / Info */}
						<div className="border-t border-border-muted pt-24 flex flex-col md:flex-row items-center justify-between gap-16 font-sans text-body-small text-accent-black/40">
							<span>
								© 2026 AgentLayerWeb Project. Released under the MIT License.
							</span>
							<span>Self-hostable & Open-source</span>
						</div>
					</div>
				</footer>
			</div>
		</AgentPage>
	);
}
