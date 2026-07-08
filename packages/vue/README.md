# @agentlayerweb/vue

> **Vue 3 custom directive bindings for AgentLayerWeb semantic annotations**

Expose your Vue user interfaces cleanly to AI browser agents using semantic directives.

---

## Installation

```bash
npm install @agentlayerweb/core @agentlayerweb/vue
# or
bun add @agentlayerweb/core @agentlayerweb/vue
```

---

## Usage

Use the custom `v-agent` directive to attach metadata dynamically to your templates:

```html
<script setup>
import { agent } from '@agentlayerweb/core';
</script>

<template>
  <form v-agent="agent.form({ purpose: 'Book Demo', submitAction: 'book_demo' })">
    <input 
      type="email" 
      v-agent="agent.field({ name: 'email', type: 'email', required: true })" 
    />
    
    <button v-agent="agent.action({ id: 'book_demo', intent: 'submit' })">
      Request Demo
    </button>
  </form>
</template>
```

---

## License

MIT License
