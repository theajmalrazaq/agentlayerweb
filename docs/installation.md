# Installation

Install the core annotations package or any framework wrapper from the monorepo:

### NPM / Bun / PNPM

```bash
# Core framework-agnostic package
bun add @agentlayerweb/core

# React wrappers (clones elements and attaches attributes)
bun add @agentlayerweb/react

# Vue directive bindings
bun add @agentlayerweb/vue

# Svelte action bindings
bun add @agentlayerweb/svelte
```

## Quick Start (React)

```tsx
import { AgentAction, AgentForm, AgentField } from "@agentlayerweb/react";

export default function BookDemo() {
  return (
    <AgentForm purpose="Book briefing" submitAction="submit_briefing">
      <AgentField name="email" type="email" required>
        <input type="email" />
      </AgentField>
      <AgentAction id="submit" intent="submit">
        <button type="submit">Send</button>
      </AgentAction>
    </AgentForm>
  );
}
```
