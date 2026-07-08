import { describe, expect, it } from "vitest";
import { agent } from "../agent.js";

describe("AgentLayerWeb Core Primitives", () => {
	it("generates correct attributes for agent.app()", () => {
		const attrs = agent.app({
			name: "Test Application",
			version: "1.2.3",
			environment: "production",
			description: "A test app",
		});

		expect(attrs["data-agent-role"]).toBe("app");
		expect(attrs["data-agent-app"]).toBe("Test Application");
		expect(attrs["data-agent-version"]).toBe("1.2.3");
		expect(attrs["data-agent-environment"]).toBe("production");
		expect(attrs["data-agent-description"]).toBe("A test app");
	});

	it("generates correct attributes for agent.page()", () => {
		const attrs = agent.page({
			id: "settings_page",
			title: "Settings",
			purpose: "Manage user credentials",
		});

		expect(attrs["data-agent-role"]).toBe("page");
		expect(attrs["data-agent-page"]).toBe("settings_page");
		expect(attrs["data-agent-title"]).toBe("Settings");
		expect(attrs["data-agent-purpose"]).toBe("Manage user credentials");
	});

	it("generates correct attributes for agent.action()", () => {
		const attrs = agent.action({
			id: "submit_payment",
			intent: "checkout",
			priority: "primary",
			description: "Confirms and charges card",
			confirmation: true,
			destructive: false,
			disabled: true,
		});

		expect(attrs["data-agent-role"]).toBe("action");
		expect(attrs["data-agent-id"]).toBe("submit_payment");
		expect(attrs["data-agent-intent"]).toBe("checkout");
		expect(attrs["data-agent-priority"]).toBe("primary");
		expect(attrs["data-agent-description"]).toBe("Confirms and charges card");
		expect(attrs["data-agent-confirmation"]).toBe("true");
		expect(attrs["data-agent-destructive"]).toBeUndefined();
		expect(attrs["data-agent-disabled"]).toBe("true");

		// WebMCP Standardization asserts
		expect(attrs.toolname).toBe("submit_payment");
		expect(attrs.tooldescription).toBe("Confirms and charges card");
	});

	it("generates correct attributes for agent.form() with WebMCP support", () => {
		const attrs = agent.form({
			purpose: "User Login",
			submitAction: "login_user",
			toolautosubmit: true,
		});

		expect(attrs["data-agent-role"]).toBe("form");
		expect(attrs["data-agent-form"]).toBe("User Login");
		expect(attrs["data-agent-submit-action"]).toBe("login_user");

		// WebMCP Standardization asserts
		expect(attrs.toolname).toBe("login_user");
		expect(attrs.tooldescription).toBe("User Login");
		expect(attrs.toolautosubmit).toBe("true");
	});

	it("generates correct attributes for agent.field()", () => {
		const attrs = agent.field({
			name: "email_address",
			type: "email",
			label: "Email",
			required: true,
			format: "email-format",
		});

		expect(attrs["data-agent-role"]).toBe("field");
		expect(attrs["data-agent-field"]).toBe("email_address");
		expect(attrs["data-agent-type"]).toBe("email");
		expect(attrs["data-agent-label"]).toBe("Email");
		expect(attrs["data-agent-required"]).toBe("true");
		expect(attrs["data-agent-format"]).toBe("email-format");
	});

	it("attaches attributes to a custom element via agent.attach()", () => {
		// Mock simple element
		const mockElement = {
			attributes: {} as Record<string, string>,
			setAttribute(key: string, value: string) {
				this.attributes[key] = value;
			},
		};

		const attrs = agent.action({ id: "save_doc" });
		agent.attach(mockElement, attrs);

		expect(mockElement.attributes["data-agent-role"]).toBe("action");
		expect(mockElement.attributes["data-agent-id"]).toBe("save_doc");
	});
});
