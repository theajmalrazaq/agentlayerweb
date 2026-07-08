# @agentlayerweb/vite-plugin

> **Vite & Next.js plugin for auto-annotating applications with AgentLayerWeb semantic markup**

Automatically parse your template files at build time and inject AgentLayerWeb semantic attributes to make your web app natively understandable to AI agents. Zero manual markup required.

---

## Installation

```bash
npm install @agentlayerweb/vite-plugin --save-dev
# or
bun add @agentlayerweb/vite-plugin -d
```

---

## Usage

### Vite Config (`vite.config.ts`)

Add the plugin to your Vite configuration:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { agentLayerWeb } from '@agentlayerweb/vite-plugin';

export default defineConfig({
  plugins: [
    react(),
    agentLayerWeb({
      verbose: true, // Output details of automated annotations
      annotateButtons: true,
      annotateForms: true,
    })
  ]
});
```

### Next.js Config (`next.config.js`)

You can use the plugin as a Webpack loader/plugin. More instructions coming soon.

---

## Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `annotateButtons` | `boolean` | `true` | Auto-detect and annotate buttons based on text/aria labels |
| `annotateForms` | `boolean` | `true` | Auto-detect and annotate forms by ID/name attributes |
| `annotateFields` | `boolean` | `true` | Auto-detect and annotate input fields |
| `annotateNavigation` | `boolean` | `true` | Auto-detect navigation menus |
| `verbose` | `boolean` | `true` | Print summaries of elements annotated during builds |

---

## License

MIT License
