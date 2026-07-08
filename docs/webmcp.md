# WebMCP Alignment

AgentLayerWeb primitives align closely with evolving open standards like the **Web Model Context Protocol (WebMCP)** so that WebMCP-compliant web browsers can read your tags out of the box.

When you annotate elements with AgentLayerWeb, the primitives automatically output standard declarative WebMCP HTML attributes alongside standard `data-agent-*` metadata:

- **`toolname`**: The unique identifier of the tool/action (defaults to the primitive's `id` or `submitAction`).
- **`tooldescription`**: Natural language description detailing what the tool does (defaults to the primitive's `purpose` or `description`).
- **`toolautosubmit`**: Boolean configuration specifying whether form tools should submit immediately upon being filled by an agent.

This allows browsers supporting WebMCP (such as Chrome Canary with the `WebMCP` flag enabled) to detect, register, and execute actions on your website natively as tools.
