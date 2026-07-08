/* biome-ignore-all lint/suspicious/noExplicitAny: wrapper attributes intentionally accept flexible values */
import { agent } from "@agentlayerweb/core";

/**
 * Vue directive to attach AgentLayerWeb semantic annotations to any DOM element.
 * Usage: `<button v-agent="agent.action({ id: 'checkout' })">Checkout</button>`
 */
export const vAgent = {
	mounted(el: HTMLElement, binding: { value: Record<string, any> }) {
		agent.attach(el, binding.value);
	},
	updated(el: HTMLElement, binding: { value: Record<string, any> }) {
		agent.attach(el, binding.value);
	},
};

export * from "@agentlayerweb/core";
