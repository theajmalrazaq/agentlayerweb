# Performance Benchmarks

To evaluate the efficiency of the **Agent Experience (AX)** standard, we benchmarked autonomous AI agents running a multi-step user creation and billing workflow.

---

## The Benchmark Task

The AI agent is given a complex workflow containing form validation, modal approvals, and background loading states:
> "Add a new client entity. Fill the Company Legal Name with 'error', fill the Billing Email with 'test@example.com', select 'Enterprise Tier' as the Billing Tier, click the 'Enable Auto-Charge billing sweeps' checkbox, and click the 'Create client profile' button. Wait for the validation error message to appear, then change the Company Legal Name to 'Acme Corp' and click 'Create client profile' again. Once the confirmation modal appears, click 'Confirm'. Wait until the loading state finishes, and verify that the success notice is shown."

---

## Playwright MCP Benchmark (Testing Environment & Methodology)

To compare the approaches fairly, both scenarios run using the **Model Context Protocol (MCP)** to connect the AI Agent to the browser environment:

1. **Scenario 1: Playwright MCP + Agent (Human Page)**
   * **Setup:** The agent connects to the official `@playwright/mcp` server.
   * **Execution:** The server launches a headed Chromium instance and exposes generic, low-level browser automation tools (`browser_click`, `browser_fill_form`, `browser_snapshot`). The agent inspects the raw Accessibility Tree to locate element coordinates and CSS selectors, executing the workflow step-by-step.
   * **Task Target:** Visually optimized page with no agentic annotations.

2. **Scenario 2: AgentLayerWeb + Agent (Agent Page)**
   * **Setup:** The agent connects to a custom semantic MCP server.
   * **Execution:** The server exposes high-level, page-specific semantic tools (`get_page_state`, `create_client_profile`, `confirm_modal_action`, `wait_for_loader`) directly generated from the AgentLayerWeb AX component properties. The agent operates purely on these high-level APIs without interacting with coordinates or selectors.
   * **Task Target:** Page optimized with AgentLayerWeb.

| Model Name | Scenario | Duration | Steps | Total Tokens | API Cost | Savings / Speedup |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **claude-haiku-4-5** | Human Page <br> Agent Page | 76.11s <br> **34.71s** | 12 steps <br> **8 steps** | 135,110 <br> **13,346** | $0.010633 <br> **$0.001309** | **2.19x speedup** <br> **90.1% token savings** <br> **87.7% cost reduction** |
| **gpt-4o-mini** | Human Page <br> Agent Page | 52.33s <br> **15.49s** | 11 steps <br> **6 steps** | 65,468 <br> **2,807** | $0.005087 <br> **$0.000260** | **3.38x speedup** <br> **95.7% token savings** <br> **94.9% cost reduction** |

---

## Key Takeaways

1. **Dramatic Token Savings:** By shifting from raw DOM traversal to high-level semantic tools, models like `gpt-4o-mini` achieve over **95.7% token savings**. This drastically reduces prompt context saturation and prevents agent confusion.
2. **Reduced API Costs:** API costs drop by up to **94.9%** because the agent does not need to repeatedly query large HTML sources or screenshots for navigation logic.
3. **Execution Speedups:** The model demonstrates a **3.38x speedup**, completing the multi-step form and validation flow in just **6 steps** (compared to 11 steps on the visually optimized human page).

---

## 2. Scraping & Data Extraction Benchmarks (Crawl4AI)

Web scraping is a core capability of AI agents. To test how AgentLayerWeb affects scraping efficiency, we benchmarked the extraction of the onboarding portal layout using **Crawl4AI** and the `tiktoken` library (average of 3 runs). The results are saved in [docs/crawl4ai-benchmark-results.json](./docs/crawl4ai-benchmark-results.json).

### Full Page Scraping Analysis
When scraping the full dashboard, traditional HTML is bloated with visual presentation classes (like Tailwind utilities) and visual structural wrappers. AgentLayerWeb pages allow scrapers to completely discard the styling layer while preserving semantic context:

| Metric | Human Page (Raw HTML) | AgentLayer Page (Cleaned & Stripped AX HTML)* | Savings / Speedup |
| :--- | :--- | :--- | :--- |
| **Crawl Duration** | 1.36s | 1.01s | ⚡ **1.35x speedup** |
| **Page Size (Tokens)** | 9,445 tokens | 2,620 tokens | 📉 **72.3% token savings** |
| **Estimated Input Cost** | $0.000708 | $0.000197 | 💰 **72.3% cost reduction** |

### Form Element Only Extraction
If the scraper targets only the primary interactive form (`#new-client-form`):

| Metric | Human Form (Raw HTML) | AgentLayer Form (Stripped Class/Style AX HTML)* | Savings / Speedup |
| :--- | :--- | :--- | :--- |
| **Form Size (Tokens)** | 659 tokens | 418 tokens | 📉 **36.6% token savings** |
| **Estimated Input Cost** | $0.000049 | $0.000031 | 💰 **36.6% cost reduction** |

*\*Note: Cleaned & Stripped AX HTML refers to removing all `class` and `style` attributes, scripts, SVGs, and visual wrappers. Because the AgentLayer page uses semantic `data-agent-*` metadata, the crawler can strip all presentation styling without degrading the agent's comprehension.*

---

## 3. Scraping with AgentLayerWeb: AX vs. UX

Scraping visually optimized human layouts (UX) presents major problems for AI models, which are solved by the Agent Experience (AX) layout model:

### A. Class-Free DOM Parsing
Traditional HTML requires styling classes to provide visual hierarchy hints to humans. However, style class strings (e.g. `className="w-full px-12 py-8 bg-background-base border border-border-loud..."`) bloat the page size and consume unnecessary context window tokens.
* **The AX Solution**: Because AgentLayerWeb annotates elements directly with semantic descriptions (e.g. `data-agent-field="billing_email"`), your crawler can completely strip the `class` and `style` attributes before passing the HTML to the LLM.
* **The Impact**: This yields a **72.3% reduction** in input tokens. Scrapers operate on a clean semantic tree, cutting API cost and latency drastically.

### B. Selector & Locator Stability
Visually optimized pages frequently change class names, element nesting, or IDs during framework upgrades or site redesigns.
* **The AX Solution**: Scrapers use stable selectors targeting developer-defined agent attributes (e.g. `css=[data-agent-field="company_name"]` or `css=[data-agent-role="form"]`).
* **The Impact**: Web scrapers remain immune to visual refreshes and design updates. Locators continue to work as long as the underlying page logic doesn't change.

### C. Exposing Form Schemas Directly
To scrape form specifications, agents must read label tags, associate them with inputs, and guess validator constraints.
* **The AX Solution**: AgentLayerWeb forms provide explicit validation metadata:
  ```html
  <input
    type="text"
    data-agent-field="company_name"
    data-agent-label="Company legal corporate name"
    data-agent-required="true"
    data-agent-type="text"
  />
  ```
* **The Impact**: Crawling frameworks can instantly convert these inputs into clean, JSON-schema tool parameters, enabling AI scrapers to interact with pages as if they were structured Web APIs.
