import { describe, expect, it } from "vitest";
import { vAgent } from "../index.js";

describe("Vue Directive Export", () => {
	it("exports vAgent directive correctly", () => {
		expect(vAgent).toBeDefined();
		expect(vAgent.mounted).toBeTypeOf("function");
	});
});
