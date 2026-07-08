/* biome-ignore-all lint/suspicious/noExplicitAny: wrapper attributes intentionally accept flexible values */
import { agent } from "@agentlayerweb/core";

/**
 * Svelte action to attach AgentLayerWeb semantic annotations to any DOM element.
 * Usage: `<button use:agentAction={agent.action({ id: 'checkout' })}>Checkout</button>`
 */
export function agentAction(
	node: HTMLElement,
	attributes: Record<string, any>,
) {
	agent.attach(node, attributes);
	return {
		update(newAttributes: Record<string, any>) {
			agent.attach(node, newAttributes);
		},
	};
}

export * from "@agentlayerweb/core";
