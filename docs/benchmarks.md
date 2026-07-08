# Performance Benchmarks

To evaluate the efficiency of the **Agent Experience (AX)** standard, we benchmarked autonomous AI agents running a multi-step user creation and billing workflow.

---

## The Benchmark Task

The AI agent is given a complex workflow containing form validation, modal approvals, and background loading states:
> "Add a new client entity. Fill the Company Legal Name with 'error', fill the Billing Email with 'test@example.com', select 'Enterprise Tier' as the Billing Tier, click the 'Enable Auto-Charge billing sweeps' checkbox, and click the 'Create client profile' button. Wait for the validation error message to appear, then change the Company Legal Name to 'Acme Corp' and click 'Create client profile' again. Once the confirmation modal appears, click 'Confirm'. Wait until the loading state finishes, and verify that the success notice is shown."

---

## Playwright MCP Benchmark (Tool Calling vs. Raw DOM)

This test compares the performance of agents navigating the visually optimized layout using standard Playwright CSS selectors (**Human Page**) against the same page optimized with AgentLayerWeb AX semantic components (**Agent Page**) that expose DOM elements directly to the agent as WebMCP tools.

| Model Name | Scenario | Duration | Steps | Total Tokens | API Cost | Savings / Speedup |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **gemini-3.5-flash-xl** | Human Page <br> Agent Page | 42.15s <br> **24.15s** | 15 steps <br> **11 steps** | 79,708 <br> **14,867** | $0.006142 <br> **$0.001216** | **1.75x speedup** <br> **81.3% token savings** <br> **80.2% cost reduction** |
| **gemini-3.5-flash-l** | Human Page <br> Agent Page | **24.15s** <br> 54.27s | **11 steps** <br> 12 steps | 54,544 <br> **22,854** | $0.004180 <br> **$0.001828** | **58.1% token savings** <br> **56.3% cost reduction** |
| **gemini-3-flash-agent** | Human Page <br> Agent Page | 38.91s <br> **19.86s** | 15 steps <br> **10 steps** | 63,935 <br> **15,210** | $0.004964 <br> **$0.001238** | **1.96x speedup** <br> **76.2% token savings** <br> **75.1% cost reduction** |
| **gemini-3.1-pro-l** | Human Page <br> Agent Page | 65.07s <br> **20.63s** | 15 steps <br> **6 steps** | 82,310 <br> **7,154** | $0.006327 <br> **$0.000597** | **3.15x speedup** <br> **91.3% token savings** <br> **90.6% cost reduction** |

---

## Key Takeaways

1. **Dramatic Token Savings:** By shifting from raw DOM traversal to high-level semantic tools, models like `gemini-3.1-pro-l` achieve over **91.3% token savings**. This drastically reduces prompt context saturation and prevents agent confusion.
2. **Reduced API Costs:** API costs drop by up to **90.6%** because the agent does not need to repeatedly query large HTML sources or screenshots for navigation logic.
3. **Execution Speedups:** The pro model demonstrates a **3.15x speedup**, completing the multi-step form and validation flow in just **6 steps** (compared to 15 steps on the visually optimized human page).
