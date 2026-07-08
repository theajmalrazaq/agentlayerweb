import { describe, expect, it } from "vitest";
import { agentAction } from "../index.js";

describe("Svelte Action Export", () => {
	it("exports agentAction helper correctly", () => {
		expect(agentAction).toBeDefined();
		expect(agentAction).toBeTypeOf("function");
	});
});
