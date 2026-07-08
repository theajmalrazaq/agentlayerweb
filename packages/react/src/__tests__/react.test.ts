import { describe, expect, it } from "vitest";
import { AgentAction, AgentPage } from "../index.js";

describe("React Component Wrappers", () => {
	it("exports wrappers correctly", () => {
		expect(AgentAction).toBeDefined();
		expect(AgentPage).toBeDefined();
	});
});
