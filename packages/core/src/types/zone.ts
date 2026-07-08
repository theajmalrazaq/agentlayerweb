/* biome-ignore-all lint/suspicious/noExplicitAny: zone config allows arbitrary nested values */
import type { AgentAction } from "./action.js";

export interface AgentZone {
	id: string;
	title: string;
	description?: string;
	actions: AgentAction[];
	context?: Record<string, any>;
	permissions?: string[]; // Scopes required to interact with this zone
}
