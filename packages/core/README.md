# @agentlayerweb/core

> **Core framework-agnostic client annotations and DOM validation for AgentLayerWeb**

AgentLayerWeb adds a lightweight, zero-overhead semantic layer on top of your existing HTML. It helps AI browser agents (like Claude Computer Use, ChatGPT Canvas, or Browser Use) interact with your application with 100% precision.

---

## Installation

```bash
npm install @agentlayerweb/core
# or
yarn add @agentlayerweb/core
# or
pnpm add @agentlayerweb/core
# or
bun add @agentlayerweb/core
```

---

## Usage (Vanilla JS)

Directly annotate DOM elements programmatically:

```typescript
import { agent } from '@agentlayerweb/core';

const checkoutButton = document.querySelector('#checkout-btn');

// Attach metadata helper attributes
agent.attach(checkoutButton, agent.action({
  id: 'checkout',
  intent: 'checkout',
  description: 'Place order and proceed to payment'
}));
```

---

## Local DOM Validation

Verify that your annotations are correct and follow WebMCP standards:

```typescript
import { validateAgentLayerWeb } from '@agentlayerweb/core';

// Scan the active DOM tree and log validation warnings to the console
const warnings = validateAgentLayerWeb();
```

---

## License

MIT License
