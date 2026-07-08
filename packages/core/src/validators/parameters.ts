/* biome-ignore-all lint/suspicious/noExplicitAny: parameter schema traversal handles arbitrary JSON */
import type { JSONSchema } from "../types/action.js";

export interface ParameterValidationErrorDetail {
	field: string;
	reason: string;
}

export class ParameterValidationError extends Error {
	public details: ParameterValidationErrorDetail[];

	constructor(details: ParameterValidationErrorDetail[]) {
		super(
			`Parameter validation failed: ${details.map((d) => `${d.field}: ${d.reason}`).join(", ")}`,
		);
		this.name = "ParameterValidationError";
		this.details = details;
	}
}

export function validateParameters(
	params: unknown,
	schema: JSONSchema,
	path = "",
): void {
	if (schema.type === "object") {
		if (typeof params !== "object" || params === null) {
			throw new ParameterValidationError([
				{
					field: path || "root",
					reason: `Expected an object, got ${typeof params}`,
				},
			]);
		}
		const obj = params as Record<string, any>;
		const details: ParameterValidationErrorDetail[] = [];

		// Check required fields
		if (schema.required) {
			for (const req of schema.required) {
				if (obj[req] === undefined || obj[req] === null) {
					const fieldPath = path ? `${path}.${req}` : req;
					details.push({ field: fieldPath, reason: "Field is required" });
				}
			}
		}

		// Check properties
		if (schema.properties) {
			for (const key of Object.keys(schema.properties)) {
				if (obj[key] !== undefined && obj[key] !== null) {
					const fieldPath = path ? `${path}.${key}` : key;
					try {
						validateParameters(obj[key], schema.properties[key], fieldPath);
					} catch (err) {
						if (err instanceof ParameterValidationError) {
							details.push(...err.details);
						} else if (err instanceof Error) {
							details.push({ field: fieldPath, reason: err.message });
						}
					}
				}
			}
		}

		if (details.length > 0) {
			throw new ParameterValidationError(details);
		}
		return;
	}

	const fieldName = path || "value";

	if (schema.type === "string") {
		if (typeof params !== "string") {
			throw new ParameterValidationError([
				{ field: fieldName, reason: `Expected string, got ${typeof params}` },
			]);
		}
		if (schema.enum && !schema.enum.includes(params)) {
			throw new ParameterValidationError([
				{
					field: fieldName,
					reason: `Value must be one of: ${schema.enum.join(", ")}`,
				},
			]);
		}
	} else if (schema.type === "number" || schema.type === "integer") {
		if (typeof params !== "number" || Number.isNaN(params)) {
			throw new ParameterValidationError([
				{ field: fieldName, reason: `Expected number, got ${typeof params}` },
			]);
		}
		if (schema.type === "integer" && !Number.isInteger(params)) {
			throw new ParameterValidationError([
				{ field: fieldName, reason: "Expected integer, got float" },
			]);
		}
		if (schema.minimum !== undefined && params < schema.minimum) {
			throw new ParameterValidationError([
				{ field: fieldName, reason: `Value must be >= ${schema.minimum}` },
			]);
		}
		if (schema.maximum !== undefined && params > schema.maximum) {
			throw new ParameterValidationError([
				{ field: fieldName, reason: `Value must be <= ${schema.maximum}` },
			]);
		}
	} else if (schema.type === "boolean") {
		if (typeof params !== "boolean") {
			throw new ParameterValidationError([
				{ field: fieldName, reason: `Expected boolean, got ${typeof params}` },
			]);
		}
	} else if (schema.type === "array") {
		if (!Array.isArray(params)) {
			throw new ParameterValidationError([
				{ field: fieldName, reason: `Expected array, got ${typeof params}` },
			]);
		}
		if (schema.items) {
			const details: ParameterValidationErrorDetail[] = [];
			params.forEach((item, index) => {
				const itemPath = `${fieldName}[${index}]`;
				try {
					validateParameters(item, schema.items, itemPath);
				} catch (err) {
					if (err instanceof ParameterValidationError) {
						details.push(...err.details);
					} else if (err instanceof Error) {
						details.push({ field: itemPath, reason: err.message });
					}
				}
			});
			if (details.length > 0) {
				throw new ParameterValidationError(details);
			}
		}
	}
}

export function safeValidateParameters(
	params: unknown,
	schema: JSONSchema,
	path = "",
): { success: true } | { success: false; error: ParameterValidationError } {
	try {
		validateParameters(params, schema, path);
		return { success: true };
	} catch (err) {
		if (err instanceof ParameterValidationError) {
			return { success: false, error: err };
		}
		return {
			success: false,
			error: new ParameterValidationError([
				{ field: path || "root", reason: String(err) },
			]),
		};
	}
}
