/* biome-ignore-all lint/suspicious/noExplicitAny: schema types intentionally permit flexible JSON values */
import type { JSONSchema } from "./action.js";

export interface AgentField {
	name: string;
	description: string;
	type: "string" | "number" | "integer" | "boolean" | "array" | "object";
	required?: boolean;
	defaultValue?: any;
	currency?: string; // Optional currency code (e.g., 'AUD')
	enum?: any[];
	[key: string]: any;
}

export interface AgentForm {
	id?: string;
	schema: JSONSchema;
	fields?: AgentField[];
}
