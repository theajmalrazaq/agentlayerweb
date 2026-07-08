export interface AgentError {
	code: string;
	reason: string;
	retry: boolean;
	recovery: string;
	fields?: Record<string, string>; // Parameter-specific validation issues
}
