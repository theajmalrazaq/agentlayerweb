/* biome-ignore-all lint/suspicious/noExplicitAny: metadata shape allows arbitrary nested values */
export interface AgentMetadata {
	version: string;
	owner?: string;
	goal?: string;
	[key: string]: any;
}
