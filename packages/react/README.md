# @agentlayerweb/react

> **React wrapper components for AgentLayerWeb semantic annotations**

Expose your React user interfaces cleanly to AI browser agents using semantic components.

---

## Installation

```bash
npm install @agentlayerweb/core @agentlayerweb/react
# or
bun add @agentlayerweb/core @agentlayerweb/react
```

---

## Usage

React wrapper components accept configuration metadata and clone their direct children, attaching the semantic attributes automatically:

```tsx
import { AgentForm, AgentField, AgentAction } from '@agentlayerweb/react';

export default function CheckoutForm() {
  return (
    <AgentForm purpose="Checkout Form" submitAction="submit_payment">
      <form onSubmit={handleSubmit}>
        <AgentField name="email" type="email" required label="Email Address">
          <input type="email" placeholder="Enter your email" />
        </AgentField>
        
        <AgentAction id="submit_payment" intent="checkout" priority="primary">
          <button type="submit">Pay Now</button>
        </AgentAction>
      </form>
    </AgentForm>
  );
}
```

### Component Reference

- `<AgentApp>`
- `<AgentPage>`
- `<AgentSection>`
- `<AgentAction>`
- `<AgentForm>`
- `<AgentField>`
- `<AgentEntity>`
- (Supports all 28 AgentLayerWeb primitives)

---

## License

MIT License
