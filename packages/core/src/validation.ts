/* biome-ignore-all lint/suspicious/noExplicitAny: validator helpers work with untyped JSON inputs */
export interface ValidationError {
	rule: string;
	message: string;
	element?: any;
}

/**
 * Validates the AgentLayerWeb semantic structure on the active DOM
 */
export function validateAgentLayerWeb(rootElement?: any): ValidationError[] {
	const errors: ValidationError[] = [];

	// Guard against non-browser environments
	if (typeof document === "undefined") {
		return errors;
	}

	const root = rootElement || document.documentElement;

	// Helper to check if an element has an ancestor with a specific attribute value
	function hasAncestorRole(el: any, role: string): boolean {
		let parent = el.parentElement;
		while (parent) {
			if (parent.getAttribute("data-agent-role") === role) {
				return true;
			}
			parent = parent.parentElement;
		}
		return false;
	}

	// Helper to find all steps belonging to a specific workflow element
	function findWorkflowSteps(workflowEl: any): any[] {
		const steps: any[] = [];
		const allSteps = root.querySelectorAll('[data-agent-role="step"]');
		allSteps.forEach((step: any) => {
			let parent = step.parentElement;
			while (parent) {
				if (parent === workflowEl) {
					steps.push(step);
					break;
				}
				if (parent.getAttribute("data-agent-role") === "workflow") {
					// Nested in another workflow
					break;
				}
				parent = parent.parentElement;
			}
		});
		return steps;
	}

	// 1. Check for presence of pages if other agent components exist
	const allAgentElements = root.querySelectorAll("[data-agent-role]");
	const pageElements = root.querySelectorAll('[data-agent-role="page"]');

	if (allAgentElements.length > 0 && pageElements.length === 0) {
		errors.push({
			rule: "Missing page",
			message:
				"AgentLayerWeb elements exist but no Page wrapper was found (missing agent.page).",
		});
	}

	// 2. Duplicate Action IDs check
	const actionElements = root.querySelectorAll('[data-agent-role="action"]');
	const actionIds = new Set<string>();
	actionElements.forEach((el: any) => {
		const id = el.getAttribute("data-agent-id");
		if (id) {
			if (actionIds.has(id)) {
				errors.push({
					rule: "Duplicate action ids",
					message: `Duplicate Action ID detected: '${id}'`,
					element: el,
				});
			} else {
				actionIds.add(id);
			}
		}
	});

	// 3. Action Outside Page check
	actionElements.forEach((el: any) => {
		const id = el.getAttribute("data-agent-id") || "unnamed";
		if (!hasAncestorRole(el, "page")) {
			errors.push({
				rule: "Action outside page",
				message: `Action '${id}' is defined outside of a Page context (missing ancestor with data-agent-role="page").`,
				element: el,
			});
		}
	});

	// 4. Workflow without Steps check
	const workflowElements = root.querySelectorAll(
		'[data-agent-role="workflow"]',
	);
	workflowElements.forEach((workflowEl: any) => {
		const id = workflowEl.getAttribute("data-agent-workflow") || "unnamed";
		const steps = findWorkflowSteps(workflowEl);
		if (steps.length === 0) {
			errors.push({
				rule: "Workflow without steps",
				message: `Workflow '${id}' is defined but contains no Step annotations.`,
				element: workflowEl,
			});
		} else {
			// 5. Unknown references (Step 'next' refers to non-existent step inside same workflow)
			const stepIds = new Set(
				steps.map((s) => s.getAttribute("data-agent-step")),
			);
			steps.forEach((stepEl: any) => {
				const nextStepId = stepEl.getAttribute("data-agent-next");
				if (nextStepId && !stepIds.has(nextStepId)) {
					errors.push({
						rule: "Unknown references",
						message: `Step '${stepEl.getAttribute("data-agent-step")}' transitions to next step '${nextStepId}', which does not exist in this workflow.`,
						element: stepEl,
					});
				}
			});
		}
	});

	// 6. Invalid nesting (e.g. Action nested inside another Action)
	actionElements.forEach((el: any) => {
		if (hasAncestorRole(el, "action")) {
			errors.push({
				rule: "Invalid nesting",
				message: `Action '${el.getAttribute("data-agent-id")}' is nested inside another Action, which is invalid.`,
				element: el,
			});
		}
	});

	// 7. Pages nested inside pages check
	pageElements.forEach((el: any) => {
		if (hasAncestorRole(el, "page")) {
			errors.push({
				rule: "Invalid nesting",
				message: `Page '${el.getAttribute("data-agent-page")}' is nested inside another Page, which is invalid.`,
				element: el,
			});
		}
	});

	// Log warnings to developer console automatically
	if (errors.length > 0) {
		console.warn("⚠️ AgentLayerWeb Validation Warnings:", errors);
	}

	return errors;
}
