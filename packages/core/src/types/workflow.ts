export type AgentStateValue =
	| "idle"
	| "loading"
	| "saving"
	| "processing"
	| "waiting_approval"
	| "completed"
	| "failed";

export interface AgentStep {
	id: string;
	title?: string;
	status: "idle" | "running" | "completed" | "failed";
	requirements?: string[];
	allowedTransitions?: string[]; // Step IDs
}

export interface AgentWorkflow {
	id: string;
	title?: string;
	steps: AgentStep[];
	currentStep?: string; // ID of active step
	status?: "idle" | "running" | "completed" | "failed";
	completionRules?: string[];
}
