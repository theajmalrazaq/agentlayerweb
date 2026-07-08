/* biome-ignore-all lint/suspicious/noExplicitAny: page config allows arbitrary nested values */
import type { AgentZone } from "./zone.js";

export interface AgentPage {
	id: string;
	title: string;
	description: string;
	route?: string;
	zones: AgentZone[];
	navigationMetadata?: Record<string, any>;
}
