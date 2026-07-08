# Local DOM Validation

Audit your layout dynamically in the browser (or unit test environment) using the built-in validator. It catches nesting, reference, and registry violations.

## Programmatic Validation

```javascript
import { validateAgentLayerWeb } from "@agentlayerweb/core";

// Scans the active DOM tree and logs warning summaries to console
const warnings = validateAgentLayerWeb();
```

## End-to-End (E2E) Test Integration

You can easily integrate validation into your automated E2E testing pipelines (such as Playwright, Cypress, or Puppeteer) to ensure your page remains agent-ready during CI/CD.

### Playwright Integration Example

```typescript
import { test, expect } from "@playwright/test";

test("Verify page AX semantics are correct", async ({ page }) => {
  await page.goto("http://localhost:3000");
  
  // Inject and execute the validator in the page context
  const warnings = await page.evaluate(() => {
    // validateAgentLayerWeb must be imported/bundled in the page bundle,
    // or exposed globally on the window object
    return (window as any).validateAgentLayerWeb();
  });
  
  expect(warnings).toHaveLength(0);
});
```
