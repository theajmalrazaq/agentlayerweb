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
