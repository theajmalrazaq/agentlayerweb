/* biome-ignore-all lint/suspicious/noExplicitAny: schema types intentionally permit flexible JSON values */
export interface JSONSchema {
	type: "object" | "string" | "number" | "integer" | "boolean" | "array";
	description?: string;
	properties?: Record<string, any>;
	required?: string[];
	items?: any;
	enum?: any[];
	[key: string]: any;
}

export type ActionRisk = "low" | "medium" | "high";

export interface AgentAction {
	id: string;
	title: string;
	description: string;
	parameters: JSONSchema;
	scope?: string[]; // Permissions required for execution
	risk?: ActionRisk;
	confirmation?: boolean;
	retryable?: boolean;
	timeout?: number; // Milliseconds
	sideEffects?: string;
}
