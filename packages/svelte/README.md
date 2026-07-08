# @agentlayerweb/svelte

> **Svelte action bindings for AgentLayerWeb semantic annotations**

Expose your Svelte user interfaces cleanly to AI browser agents using native actions.

---

## Installation

```bash
npm install @agentlayerweb/core @agentlayerweb/svelte
# or
bun add @agentlayerweb/core @agentlayerweb/svelte
```

---

## Usage

Use the Svelte action directive `use:agentAction` to attach semantic metadata to elements:

```html
<script>
  import { agent } from '@agentlayerweb/core';
  import { agentAction } from '@agentlayerweb/svelte';
</script>

<form use:agentAction={agent.form({ purpose: 'Contact form', submitAction: 'send' })}>
  <input 
    type="text" 
    use:agentAction={agent.field({ name: 'message', required: true })} 
  />
  
  <button use:agentAction={agent.action({ id: 'send', intent: 'submit' })}>
    Send Message
  </button>
</form>
```

---

## License

MIT License
