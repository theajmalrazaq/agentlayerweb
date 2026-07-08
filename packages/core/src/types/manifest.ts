import type { AgentAction } from "./action.js";
import type { AgentMetadata } from "./metadata.js";
import type { AgentPage } from "./page.js";
import type { AgentWorkflow } from "./workflow.js";
import type { AgentZone } from "./zone.js";

export interface AgentManifest {
	application: string;
	metadata?: AgentMetadata;
	pages: AgentPage[];
	zones: AgentZone[];
	actions: AgentAction[];
	workflows: AgentWorkflow[];
	permissions: string[];
}
