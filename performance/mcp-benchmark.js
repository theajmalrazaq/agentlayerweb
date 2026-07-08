import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Antigravity Proxy Anthropic Messages endpoint
const PROXY_API = "http://localhost:8080/v1/messages";

const humanUrl = "https://theajmalrazaq.github.io/agentlayerweb/example/human";
const agentUrl =
	"https://theajmalrazaq.github.io/agentlayerweb/example/agentlayerweb";

async function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

// Estimate tokens (1 token ≈ 4 characters)
function estimateTokens(text) {
	return Math.ceil(text.length / 4);
}

// Pricing constants (Gemini 1.5 Flash comparable: $0.075/M input, $0.30/M output)
const COST_PER_INPUT_TOKEN = 0.075 / 1000000;
const COST_PER_OUTPUT_TOKEN = 0.3 / 1000000;

// Fetch helper for calling the Antigravity Proxy with Anthropic tool use definitions
async function callProxyWithTools(model, system, messages, tools) {
	const payload = {
		model,
		max_tokens: 1024,
		messages,
	};
	if (system) {
		payload.system = system;
	}
	if (tools && tools.length > 0) {
		payload.tools = tools;
	}

	const response = await fetch(PROXY_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		const err = await response.text();
		throw new Error(`Proxy request failed: ${response.status} - ${err}`);
	}

	const data = await response.json();
	return {
		message: data,
		promptTokens:
			data.usage?.input_tokens || estimateTokens(JSON.stringify(messages)),
		completionTokens:
			data.usage?.output_tokens || estimateTokens(JSON.stringify(data.content)),
	};
}

// Helper to clean HTML to prevent prompt bloat
function cleanHtmlForLLM(html) {
	return html
		.replace(/<svg[\s\S]*?<\/svg>/gi, "[SVG Metric Chart]")
		.replace(/class="[^"]*"/gi, "")
		.replace(/style="[^"]*"/gi, "")
		.replace(/\s+/g, " ")
		.trim();
}

// ============================================================================
// SCENARIO 1: RAW PLAYWRIGHT TOOLS (HUMAN PAGE)
// ============================================================================
async function runScenario1Human(modelName, browser) {
	console.log(
		`\n🎬 SCENARIO 1: PLAYWRIGHT RAW TOOLS (Human Page - No Annotations) | Model: ${modelName}`,
	);

	const page = await browser.newPage();
	await page.goto(humanUrl);
	await page.waitForLoadState("domcontentloaded");

	// Define raw Playwright tools in Anthropic format (Strict properties matching)
	const tools = [
		{
			name: "get_page_html",
			description:
				"Get the cleaned HTML body of the page to analyze form selectors and IDs.",
			input_schema: {
				type: "object",
				properties: {
					reason: {
						type: "string",
						description: "Why we need to retrieve the HTML.",
					},
				},
				required: ["reason"],
			},
		},
		{
			name: "fill_selector",
			description: "Type a value into an input field matching a CSS selector.",
			input_schema: {
				type: "object",
				properties: {
					selector: {
						type: "string",
						description:
							"The CSS selector of the input element (e.g. #client-name).",
					},
					value: { type: "string", description: "The text to type." },
				},
				required: ["selector", "value"],
			},
		},
		{
			name: "click_selector",
			description: "Click a button, link, or checkbox matching a CSS selector.",
			input_schema: {
				type: "object",
				properties: {
					selector: {
						type: "string",
						description: "The CSS selector of the element.",
					},
				},
				required: ["selector"],
			},
		},
		{
			name: "select_dropdown_option",
			description: "Select an option from a dropdown matching a CSS selector.",
			input_schema: {
				type: "object",
				properties: {
					selector: {
						type: "string",
						description: "The CSS selector of the select dropdown.",
					},
					value: {
						type: "string",
						description: "The value of the option to select (e.g. enterprise).",
					},
				},
				required: ["selector", "value"],
			},
		},
		{
			name: "check_checkbox",
			description:
				"Ensure a checkbox matching a CSS selector is checked (true) or unchecked (false).",
			input_schema: {
				type: "object",
				properties: {
					selector: {
						type: "string",
						description: "The CSS selector of the checkbox input.",
					},
					checked: {
						type: "boolean",
						description: "True to check, false to uncheck.",
					},
				},
				required: ["selector", "checked"],
			},
		},
		{
			name: "wait_for_ms",
			description: "Wait for a specified number of milliseconds.",
			input_schema: {
				type: "object",
				properties: {
					ms: { type: "number", description: "Milliseconds to wait." },
				},
				required: ["ms"],
			},
		},
	];

	const systemPrompt =
		"You are an AI web automation assistant. Your goal is to add a new client entity. First check the HTML source to find the form selectors. Fill the Company Legal Name with 'error', fill the Billing Email with 'test@example.com', select 'Enterprise Tier' (value 'enterprise') as the Billing Tier, check the 'Enable Auto-Charge billing sweeps' checkbox, and click the 'Create client profile' button. Then check if there is an error on the page. If there is an error, clear the Company Legal Name, change it to 'Acme Corp', submit the form again. Once the confirmation modal appears, click the Confirm button in the modal. Wait for the loading to finish and verify success. Call 'get_page_html' first to read the selectors.";

	const messages = [
		{
			role: "user",
			content: "Start the task and fill out the new client form.",
		},
	];

	let steps = 0;
	let inputTokens = 0;
	let outputTokens = 0;
	const startTime = Date.now();
	const traces = [];

	while (steps < 15) {
		steps++;
		const stepStart = Date.now();

		let result;
		try {
			result = await callProxyWithTools(
				modelName,
				systemPrompt,
				messages,
				tools,
			);
		} catch (err) {
			console.error(`   ❌ Proxy call failed: ${err.message}`);
			break;
		}

		const responseMessage = result.message;
		messages.push({
			role: "assistant",
			content: responseMessage.content,
		});
		inputTokens += result.promptTokens;
		outputTokens += result.completionTokens;

		const toolUseBlock = responseMessage.content.find(
			(c) => c.type === "tool_use",
		);
		if (toolUseBlock) {
			const name = toolUseBlock.name;
			const args = toolUseBlock.input;
			console.log(`[Human Step ${steps}] LLM called tool: ${name}`);

			let toolResult = "";
			try {
				if (name === "get_page_html") {
					const html = await page.content();
					const body = html.substring(
						html.indexOf("<body>"),
						html.indexOf("</body>") + 7,
					);
					toolResult = cleanHtmlForLLM(body);
				} else if (name === "fill_selector") {
					await page.fill(args.selector, args.value);
					toolResult = `Successfully filled ${args.selector} with '${args.value}'`;
				} else if (name === "click_selector") {
					// Add smart fallback for text selector queries
					if (
						args.selector.includes(':contains("Confirm")') ||
						args.selector.includes('text="Confirm"')
					) {
						await page.click('button:has-text("Confirm")');
					} else {
						await page.click(args.selector);
					}
					toolResult = `Successfully clicked ${args.selector}`;
				} else if (name === "select_dropdown_option") {
					await page.selectOption(args.selector, args.value);
					toolResult = `Successfully selected option ${args.value} in ${args.selector}`;
				} else if (name === "check_checkbox") {
					await page.setChecked(args.selector, args.checked);
					toolResult = `Successfully set checkbox ${args.selector} to ${args.checked}`;
				} else if (name === "wait_for_ms") {
					await sleep(args.ms);
					toolResult = `Waited for ${args.ms}ms`;
				}
			} catch (err) {
				toolResult = `Error executing tool ${name}: ${err.message}`;
			}

			messages.push({
				role: "user",
				content: [
					{
						type: "tool_result",
						tool_use_id: toolUseBlock.id,
						content: toolResult,
					},
				],
			});

			traces.push({
				step: steps,
				tool: name,
				arguments: args,
				result: toolResult.substring(0, 150),
				durationMs: Date.now() - stepStart,
			});
		} else {
			const textResponse =
				responseMessage.content.find((c) => c.type === "text")?.text || "";
			if (
				textResponse.toLowerCase().includes("success") ||
				textResponse.toLowerCase().includes("complete")
			) {
				break;
			}
			break;
		}

		// Success check
		const successText = await page.evaluate(() => {
			const el = document.querySelector("#toast-notify-status");
			return el ? el.textContent : null;
		});
		if (successText?.includes("created successfully!")) {
			break;
		}
	}

	const duration = (Date.now() - startTime) / 1000;
	await page.close();

	return {
		duration,
		steps,
		inputTokens,
		outputTokens,
		traces,
	};
}

// ============================================================================
// SCENARIO 2: SEMANTIC MCP TOOLS (AGENTLAYERWEB PAGE)
// ============================================================================
async function runScenario2Agent(modelName, browser) {
	console.log(
		`\n🎬 SCENARIO 2: AGENTLAYERWEB SEMANTIC MCP (Agent Page) | Model: ${modelName}`,
	);

	const page = await browser.newPage();
	await page.goto(agentUrl);
	await page.waitForLoadState("domcontentloaded");

	// Define AgentLayerWeb dynamic semantic tools in Anthropic format (with strict input schemas)
	const tools = [
		{
			name: "get_page_state",
			description:
				"Retrieve the current semantic status of the page, including form errors, success messages, loaders, and active modals.",
			input_schema: {
				type: "object",
				properties: {
					reason: { type: "string", description: "Why check page state." },
				},
				required: ["reason"],
			},
		},
		{
			name: "create_client_profile",
			description:
				"Submit the client creation profile form using semantic parameters mapped to the AgentLayerWeb fields.",
			input_schema: {
				type: "object",
				properties: {
					companyName: {
						type: "string",
						description: "The Company Legal Name.",
					},
					billingEmail: {
						type: "string",
						description: "The Billing Email address.",
					},
					billingTier: {
						type: "string",
						enum: ["enterprise", "pro"],
						description: "The subscription tier.",
					},
					enableAutoCharge: {
						type: "boolean",
						description: "Enable auto-charge sweeps.",
					},
				},
				required: [
					"companyName",
					"billingEmail",
					"billingTier",
					"enableAutoCharge",
				],
			},
		},
		{
			name: "confirm_modal_action",
			description: "Click confirm inside the active confirm setup dialog.",
			input_schema: {
				type: "object",
				properties: {
					reason: { type: "string", description: "Reason for confirming." },
				},
				required: ["reason"],
			},
		},
		{
			name: "wait_for_loader",
			description:
				"Wait for the active provisioning loader spinner to complete.",
			input_schema: {
				type: "object",
				properties: {
					reason: { type: "string", description: "Reason for waiting." },
				},
				required: ["reason"],
			},
		},
	];

	const systemPrompt =
		"You are an AI web automation assistant using high-level semantic tools. Your goal is to add a new client entity. First check the page state using 'get_page_state'. If there is a form, use 'create_client_profile' to submit: Company Legal Name = 'error', Billing Email = 'test@example.com', Billing Tier = 'enterprise', Enable Auto-Charge = true. Check the page state again. If there is a validation error, change the Company Legal Name to 'Acme Corp' and submit again. Confirm the modal action, wait for the loader, and verify success.";

	const messages = [
		{
			role: "user",
			content: "Start the task and check the page state first.",
		},
	];

	let steps = 0;
	let inputTokens = 0;
	let outputTokens = 0;
	const startTime = Date.now();
	const traces = [];

	while (steps < 15) {
		steps++;
		const stepStart = Date.now();

		let result;
		try {
			result = await callProxyWithTools(
				modelName,
				systemPrompt,
				messages,
				tools,
			);
		} catch (err) {
			console.error(`   ❌ Proxy call failed: ${err.message}`);
			break;
		}

		const responseMessage = result.message;
		messages.push({
			role: "assistant",
			content: responseMessage.content,
		});
		inputTokens += result.promptTokens;
		outputTokens += result.completionTokens;

		const toolUseBlock = responseMessage.content.find(
			(c) => c.type === "tool_use",
		);
		if (toolUseBlock) {
			const name = toolUseBlock.name;
			const args = toolUseBlock.input;
			console.log(`[Agent Step ${steps}] LLM called tool: ${name}`);

			let toolResult = "";
			try {
				if (name === "get_page_state") {
					const state = await page.evaluate(() => {
						const errEl = document.querySelector("[data-agent-error]");
						const successEl = document.querySelector("[data-agent-success]");
						const loaderEl = document.querySelector("[data-agent-loading]");
						const dialogEl = document.querySelector("[data-agent-dialog]");
						const stepEl = document.querySelector("[data-agent-step-current]");

						return {
							activeError: errEl
								? errEl.getAttribute("data-agent-error") || errEl.textContent
								: null,
							activeSuccess: successEl
								? successEl.getAttribute("data-agent-success") ||
									successEl.textContent
								: null,
							activeLoader: loaderEl
								? loaderEl.getAttribute("data-agent-loading") ||
									loaderEl.textContent
								: null,
							activeDialog: dialogEl
								? dialogEl.getAttribute("data-agent-purpose")
								: null,
							currentStep: stepEl
								? stepEl.getAttribute("data-agent-step-current")
								: null,
						};
					});
					toolResult = JSON.stringify(state);
				} else if (name === "create_client_profile") {
					await page.fill(
						"[data-agent-field='company_name']",
						args.companyName,
					);
					await page.fill(
						"[data-agent-field='billing_email']",
						args.billingEmail,
					);
					await page.selectOption(
						"[data-agent-field='billing_tier']",
						args.billingTier,
					);
					await page.setChecked(
						"[data-agent-toggle='auto_charge']",
						args.enableAutoCharge,
					);
					await page.click("[data-agent-id='submit_client']");
					toolResult = "Form inputs set and submitted via semantic endpoints.";
				} else if (name === "confirm_modal_action") {
					await page.click("[data-agent-confirmation='confirm_submit']");
					toolResult = "Confirmed client setup inside the modal dialog.";
				} else if (name === "wait_for_loader") {
					await page.waitForSelector("[data-agent-loading]", {
						state: "detached",
						timeout: 6000,
					});
					toolResult = "Loader complete, provisioning finalized.";
				}
			} catch (err) {
				toolResult = `Error executing tool ${name}: ${err.message}`;
			}

			messages.push({
				role: "user",
				content: [
					{
						type: "tool_result",
						tool_use_id: toolUseBlock.id,
						content: toolResult,
					},
				],
			});

			traces.push({
				step: steps,
				tool: name,
				arguments: args,
				result: toolResult,
				durationMs: Date.now() - stepStart,
			});
		} else {
			const textResponse =
				responseMessage.content.find((c) => c.type === "text")?.text || "";
			if (
				textResponse.toLowerCase().includes("success") ||
				textResponse.toLowerCase().includes("complete")
			) {
				break;
			}
			break;
		}

		// Success check
		const successText = await page.evaluate(() => {
			const el = document.querySelector("[data-agent-success]");
			return el ? el.textContent : null;
		});
		if (successText?.includes("created successfully!")) {
			break;
		}
	}

	const duration = (Date.now() - startTime) / 1000;
	await page.close();

	return {
		duration,
		steps,
		inputTokens,
		outputTokens,
		traces,
	};
}

async function main() {
	console.log("=============================================================");
	console.log("       AGENTLAYERWEB VS HUMAN DOM PLAYWRIGHT MCP BENCHMARK");
	console.log("=============================================================");

	// Query proxy to verify endpoints
	try {
		const modelsRes = await fetch("http://localhost:8080/v1/models");
		const data = await modelsRes.json();
		const list = data.data.map((m) => m.id);
		console.log("Detected Proxy Models:", list);
	} catch (_err) {
		console.error(
			"❌ Failed to connect to Antigravity Proxy at http://localhost:8080/v1/models",
		);
		process.exit(1);
	}

	// Models to benchmark
	const targetModels = [
		"gemini-3.5-flash-extra-low",
		"gemini-3.5-flash-low",
		"gemini-3-flash-agent",
		"gemini-3.1-pro-low",
	];

	// Launch Playwright Chromium
	const browser = await chromium.launch({ headless: true });
	const results = {};
	const allTraces = {
		timestamp: new Date().toISOString(),
	};

	for (const modelName of targetModels) {
		console.log(`\n⏳ Running benchmark for model: ${modelName}...`);
		try {
			const humanRes = await runScenario1Human(modelName, browser);
			const agentRes = await runScenario2Agent(modelName, browser);

			const humanCost =
				humanRes.inputTokens * COST_PER_INPUT_TOKEN +
				humanRes.outputTokens * COST_PER_OUTPUT_TOKEN;
			const agentCost =
				agentRes.inputTokens * COST_PER_INPUT_TOKEN +
				agentRes.outputTokens * COST_PER_OUTPUT_TOKEN;

			const speedup = (humanRes.duration / agentRes.duration).toFixed(2);
			const tokenSavings = (
				((humanRes.inputTokens - agentRes.inputTokens) / humanRes.inputTokens) *
				100
			).toFixed(1);
			const costSavings = (((humanCost - agentCost) / humanCost) * 100).toFixed(
				1,
			);

			results[modelName] = {
				human: {
					duration: humanRes.duration.toFixed(2),
					steps: humanRes.steps,
					tokens: humanRes.inputTokens,
					cost: humanCost.toFixed(6),
				},
				agent: {
					duration: agentRes.duration.toFixed(2),
					steps: agentRes.steps,
					tokens: agentRes.inputTokens,
					cost: agentCost.toFixed(6),
				},
				comparison: {
					speedup: `${speedup}x`,
					tokenSavings: `${tokenSavings}%`,
					costSavings: `${costSavings}%`,
				},
			};

			allTraces[`scenario_${modelName}`] = {
				human: humanRes.traces,
				agent: agentRes.traces,
			};
		} catch (err) {
			console.error(`❌ Failed to benchmark model ${modelName}:`, err.message);
		}
	}

	await browser.close();

	console.log(
		"\n=========================================================================",
	);
	console.log("                      CONSOLIDATED COMPARATIVE RESULTS");
	console.log(
		"=========================================================================",
	);
	console.log(
		String.prototype.padEnd.call("Model", 30) +
			" | " +
			String.prototype.padEnd.call("Human Duration / Steps", 25) +
			" | " +
			String.prototype.padEnd.call("Agent Duration / Steps", 25) +
			" | " +
			"Speedup",
	);
	console.log("-".repeat(95));
	for (const m of Object.keys(results)) {
		const hStr = `${results[m].human.duration}s / ${results[m].human.steps} steps`;
		const aStr = `${results[m].agent.duration}s / ${results[m].agent.steps} steps`;
		console.log(
			String.prototype.padEnd.call(m, 30) +
				" | " +
				String.prototype.padEnd.call(hStr, 25) +
				" | " +
				String.prototype.padEnd.call(aStr, 25) +
				" | " +
				results[m].comparison.speedup,
		);
	}
	console.log(
		"=========================================================================",
	);

	// Save consolidated results
	const resultsPath = path.join(__dirname, "../docs/browser-use-results.json");
	fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2), "utf8");
	console.log(`Saved consolidated results to: ${resultsPath}`);

	const tracesPath = path.join(
		__dirname,
		"../docs/browser-use-raw-traces.json",
	);
	fs.writeFileSync(tracesPath, JSON.stringify(allTraces, null, 2), "utf8");
	console.log(`Saved traces to: ${tracesPath}`);
}

main().catch((err) => {
	console.error("Global Error running benchmark:", err.message);
});
