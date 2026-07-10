# AgentLayerWeb (v0.1)

> **The Agent Experience (AX) Framework for Dual Human-Agent Web Applications**

AgentLayerWeb is a framework-agnostic, client-side TypeScript library that introduces an **Agent Experience (AX)** design system. It allows developers to build web applications that are natively optimized and usable by both humans and AI browser agents.

It does **not** replace HTML, React, or your UI library. Instead, it adds a lightweight, zero-overhead semantic AX layer on top of existing components.

```
Application
├── UI Layer          (Optimized UX for humans)
└── AgentLayerWeb     (Optimized AX for AI agents)
```

By annotating your markup, humans continue using your visual interface normally, while AI agents (like Claude, GPT-4, or other WebMCP browsers/agents) gain a structured, programmatic understanding of page intent, available actions, form requirements, and state feedback. This establishes the web as a dual-medium interface.

---

## 🚀 Installation

Install the core annotations package or any framework wrapper from the monorepo:

```bash
# Core framework-agnostic package
pnpm add @agentlayerweb/core

# React wrappers (clones elements and attaches attributes)
pnpm add @agentlayerweb/react

# Vue directive bindings
pnpm add @agentlayerweb/vue

# Svelte action bindings
pnpm add @agentlayerweb/svelte
```

---

## 🛠️ Framework Integration Examples

### React (`@agentlayerweb/react`)

React wrapper components accept configurations and clone their direct children, attaching the semantic metadata:

```tsx
import { AgentAction } from "@agentlayerweb/react";

<AgentAction id="checkout" intent="checkout" priority="primary">
  <button onClick={handleCheckout}>Continue</button>
</AgentAction>;
```

### Vue (`@agentlayerweb/vue`)

Bind attributes dynamically using the Vue custom directive `v-agent`:

```vue
<button v-agent="agent.action({ id: 'checkout', intent: 'checkout' })">
  Checkout
</button>
```

### Svelte (`@agentlayerweb/svelte`)

Attach attributes cleanly using Svelte action directives:

```html
<button use:agentAction={agent.action({ id: 'checkout' })}>
  Checkout
</button>
```

### Plain HTML & Vanilla JS

Directly annotate DOM elements programmatically:

```javascript
import { agent } from "@agentlayerweb/core";

const btn = document.querySelector("#checkout-btn");
agent.attach(btn, agent.action({ id: "checkout", intent: "checkout" }));
```

---

## 📖 Complete Primitives Reference (All 28 Elements)

Here is how to use every semantic primitive in the AgentLayerWeb API. In React, these are exported as components with prefix `Agent` (e.g. `<AgentApp>`). In Vue, Svelte, and Plain HTML, they are accessed under the `agent` namespace object.

### 1. Application (`agent.app`)

Declares the root application metadata.

- **React:** `<AgentApp name="Portal" version="1.0" environment="production" description="Dashboard">`
- **Core API:** `agent.app({ name: 'Portal', version: '1.0' })`

### 2. Page (`agent.page`)

Represents an active view or page route.

- **React:** `<AgentPage id="dashboard" title="Admin Dashboard" purpose="Manage billing">`
- **Core API:** `agent.page({ id: 'dashboard', title: 'Admin Dashboard' })`

### 3. Section (`agent.section`)

A logical grouping of visual components.

- **React:** `<AgentSection id="profile_settings" title="Profile Details">`
- **Core API:** `agent.section({ id: 'profile_settings', title: 'Profile Details' })`

### 4. Navigation (`agent.navigation`)

Marks standard navigation menus or navbars.

- **React:** `<AgentNavigation type="sidebar">`
- **Core API:** `agent.navigation({ type: 'sidebar' })`

### 5. Action (`agent.action`)

An interactive action the agent can trigger (buttons, links).

- **React:** `<AgentAction id="save" intent="save" priority="primary" confirmation destructive>`
- **Core API:** `agent.action({ id: 'save', intent: 'save', priority: 'primary' })`

### 6. Form (`agent.form`)

Identifies user inputs forms and their submission action targets.

- **React:** `<AgentForm purpose="Update Email" submitAction="save_email">`
- **Core API:** `agent.form({ purpose: 'Update Email', submitAction: 'save_email' })`

### 7. Field (`agent.field`)

Defines input field parameters, units, formats, and constraints.

- **React:** `<AgentField name="price" type="currency" label="Amount" required unit="AUD">`
- **Core API:** `agent.field({ name: 'price', type: 'currency', required: true })`

### 8. Entity (`agent.entity`)

Marks specific business data objects (e.g. users, products).

- **React:** `<AgentEntity type="Invoice" id="inv_2026_99">`
- **Core API:** `agent.entity({ type: 'Invoice', id: 'inv_99' })`

### 9. Collection (`agent.collection`)

Represents lists, grids, or collections of items.

- **React:** `<AgentCollection entity="Product" searchable filterable sortable>`
- **Core API:** `agent.collection({ entity: 'Product', searchable: true })`

### 10. Table (`agent.table`)

Specifies data tabular grids and active columns.

- **React:** `<AgentTable columns={['Name', 'Email']} sorting="Name" pagination="page-1">`
- **Core API:** `agent.table({ columns: ['Name', 'Email'], sorting: 'Name' })`

### 11. Search (`agent.search`)

Search bars and input filters.

- **React:** `<AgentSearch target="Invoices">`
- **Core API:** `agent.search({ target: 'Invoices' })`

### 12. Filter (`agent.filter`)

Active filter toggles or dropdowns.

- **React:** `<AgentFilter field="Status">`
- **Core API:** `agent.filter({ field: 'Status' })`

### 13. Sort (`agent.sort`)

Sort order trigger controls.

- **React:** `<AgentSort field="Price">`
- **Core API:** `agent.sort({ field: 'Price' })`

### 14. Workflow (`agent.workflow`)

Container for step-by-step user procedures.

- **React:** `<AgentWorkflow id="checkout_flow">`
- **Core API:** `agent.workflow({ id: 'checkout_flow' })`

### 15. Step (`agent.step`)

Represent a single step in a workflow.

- **React:** `<AgentStep id="billing_step" current={true} completed={false} next="shipping_step">`
- **Core API:** `agent.step({ id: 'billing_step', current: true })`

### 16. Dialog (`agent.dialog`)

Modals, dialog overlays, or warnings.

- **React:** `<AgentDialog purpose="Delete Property Warning">`
- **Core API:** `agent.dialog({ purpose: 'Delete Property Warning' })`

### 17. Confirmation (`agent.confirmation`)

Asks the user or agent for confirmation.

- **React:** `<AgentConfirmation action="publish_listing">`
- **Core API:** `agent.confirmation({ action: 'publish_listing' })`

### 18. Loading (`agent.loading`)

Indicates background server actions or rendering loading states.

- **React:** `<AgentLoading operation="Uploading documents...">`
- **Core API:** `agent.loading({ operation: 'Uploading documents...' })`

### 19. Success (`agent.success`)

Success message prompts or states.

- **React:** `<AgentSuccess message="Item created successfully.">`
- **Core API:** `agent.success({ message: 'Success' })`

### 20. Error (`agent.error`)

Detailed error warning codes for agent recovery.

- **React:** `<AgentError code="EXPIRED_TOKEN">`
- **Core API:** `agent.error({ code: 'EXPIRED_TOKEN' })`

### 21. Status (`agent.status`)

Lifecycle status indicators (e.g. active, draft).

- **React:** `<AgentStatus value="published">`
- **Core API:** `agent.status({ value: 'published' })`

### 22. Empty State (`agent.emptyState`)

Empty container warnings.

- **React:** `<AgentEmptyState reason="No documents uploaded yet.">`
- **Core API:** `agent.emptyState({ reason: 'No documents uploaded yet.' })`

### 23. Breadcrumb (`agent.breadcrumb`)

Nesting navigation hierarchies.

- **React:** `<AgentBreadcrumb path="Home > Listings > Edit">`
- **Core API:** `agent.breadcrumb({ path: 'Home > Listings > Edit' })`

### 24. Sidebar (`agent.sidebar`)

Sidebar panels.

- **React:** `<AgentSidebar name="Control Center">`
- **Core API:** `agent.sidebar({ name: 'Control Center' })`

### 25. Tabs (`agent.tabs`)

Tabbed interfaces.

- **React:** `<AgentTabs active="profile">`
- **Core API:** `agent.tabs({ active: 'profile' })`

### 26. Command (`agent.command`)

Command menu search palettes.

- **React:** `<AgentCommand name="Quick Actions">`
- **Core API:** `agent.command({ name: 'Quick Actions' })`

### 27. Shortcut (`agent.shortcut`)

Keyboard shortcut triggers.

- **React:** `<AgentShortcut keys="Ctrl+S">`
- **Core API:** `agent.shortcut({ keys: 'Ctrl+S' })`

### 28. Tooltip (`agent.tooltip`)

Help hover tips.

- **React:** `<AgentTooltip text="Click to delete this list permanently.">`
- **Core API:** `agent.tooltip({ text: 'Click to delete this list permanently.' })`

## 🌐 Standardization & WebMCP Alignment

AgentLayerWeb primitives align closely with evolving open standards like the **Web Model Context Protocol (WebMCP)** so that WebMCP-compliant web browsers can read your tags out of the box.

When you annotate elements with AgentLayerWeb, the primitives automatically output standard declarative WebMCP HTML attributes alongside standard `data-agent-*` metadata:

- **`toolname`**: The unique identifier of the tool/action (defaults to the primitive's `id` or `submitAction`).
- **`tooldescription`**: Natural language description detailing what the tool does (defaults to the primitive's `purpose` or `description`).
- **`toolautosubmit`**: Boolean configuration specifying whether form tools should submit immediately upon being filled by an agent.

This allows browsers supporting WebMCP (such as Chrome Canary with the `WebMCP` flag enabled) to detect, register, and execute actions on your website natively as tools.

---

## 🚨 Local DOM Validation

Audit your layout dynamically in the browser (or unit test environment) using the built-in validator. It catches nesting, reference, and registry violations:

```javascript
import { validateAgentLayerWeb } from "@agentlayerweb/core";

// Scans the active DOM tree and logs warning summaries to console
const warnings = validateAgentLayerWeb();
```

---

## 📊 Real AI Agent Performance Benchmarks

We run interactive benchmarks of AI browser agents executing multi-step workflows. The tests are executed directly against the local page files:
- **Human Page (No Annotations)**: [Website/src/app/example/human/page.tsx](./Website/src/app/example/human/page.tsx)
- **Agent Page (AgentLayerWeb)**: [Website/src/app/example/agentlayerweb/page.tsx](./Website/src/app/example/agentlayerweb/page.tsx)

### The Benchmark Task
The AI agent is given a complex form validation, modal approval, and state wait workflow task:
> "Add a new client entity. Fill the Company Legal Name with 'error', fill the Billing Email with 'test@example.com', select 'Enterprise Tier' as the Billing Tier, click the 'Enable Auto-Charge billing sweeps' checkbox, and click the 'Create client profile' button. Wait for the validation error message to appear, then change the Company Legal Name to 'Acme Corp' and click 'Create client profile' again. Once the confirmation modal appears, click 'Confirm'. Wait until the loading state finishes, and verify that the success notice is shown."

### Playwright MCP Benchmark (Testing Environment & Methodology)

To compare the approaches fairly, both scenarios run using the **Model Context Protocol (MCP)** to connect the AI Agent to the browser environment:

1. **Scenario 1: Playwright MCP + Agent (Human Page)**
   * **Setup:** The agent connects to the official `@playwright/mcp` server.
   * **Execution:** The server launches a headed Chromium instance and exposes generic, low-level browser automation tools (`browser_click`, `browser_fill_form`, `browser_snapshot`). The agent inspects the raw Accessibility Tree to locate element coordinates and CSS selectors, executing the workflow step-by-step.
   * **Task Target:** Visually optimized page with no agentic annotations.

2. **Scenario 2: AgentLayerWeb + Agent (Agent Page)**
   * **Setup:** The agent connects to a custom semantic MCP server.
   * **Execution:** The server exposes high-level, page-specific semantic tools (`get_page_state`, `create_client_profile`, `confirm_modal_action`, `wait_for_loader`) directly generated from the AgentLayerWeb AX component properties. The agent operates purely on these high-level APIs without interacting with coordinates or selectors.
   * **Task Target:** Page optimized with AgentLayerWeb.

| Model | Scenario | Duration | Steps | Total Tokens | API Cost (USD) | Speedup & Savings |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **claude-haiku-4-5** | Human Page <br> Agent Page | 76.11s <br> **34.71s** | 12 steps <br> **8 steps** | 135,110 <br> **13,346** | $0.010633 <br> **$0.001309** | **2.19x speedup** <br> **90.1% token savings** <br> **87.7% cost reduction** |
| **gpt-4o-mini** | Human Page <br> Agent Page | 52.33s <br> **15.49s** | 11 steps <br> **6 steps** | 65,468 <br> **2,807** | $0.005087 <br> **$0.000260** | **3.38x speedup** <br> **95.7% token savings** <br> **94.9% cost reduction** |

*Note: LLM planning noise is common on lower-tier models where reasoning loop variations occur.*

### Key Takeaways
1. **Dramatic Efficiency Gains**: For capable models (like `gpt-4o-mini`), using high-level semantic tools generated by AgentLayerWeb yields a **3.38x speedup** and **95.7% token savings**.
2. **Minimal Steps**: Instead of wasting steps writing custom CSS selectors, dealing with browser syntax errors (e.g. `:contains`), or fetching raw page HTML repeatedly, the agent performs actions directly, resolving the form validation flow in just **6 steps** vs **11 steps** on the raw DOM.

---

### 🗄️ Raw Benchmark Datasets
- **[docs/browser-use-results.json](./docs/browser-use-results.json)**: Contains the consolidated summary comparison statistics across all models.
- **[docs/browser-use-raw-traces.json](./docs/browser-use-raw-traces.json)**: Contains the detailed step-by-step tool invocation traces and durations for each model run.
