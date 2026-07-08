/* biome-ignore-all lint/suspicious/noExplicitAny: flexible attribute mapping */
// Types for each config category
export interface AppConfig {
	name: string;
	version?: string;
	environment?: string;
	description?: string;
}

export interface PageConfig {
	id: string;
	title: string;
	purpose?: string;
}

export interface SectionConfig {
	id: string;
	title?: string;
}

export interface NavigationConfig {
	type?: "sidebar" | "navbar" | "breadcrumbs" | "tabs" | string;
}

export interface ActionConfig {
	id: string;
	intent?: string;
	priority?: "primary" | "secondary" | "tertiary" | string;
	description?: string;
	confirmation?: boolean;
	destructive?: boolean;
	next?: string;
	disabled?: boolean;
	loading?: boolean;
	toolname?: string;
	tooldescription?: string;
}

export interface FormConfig {
	purpose: string;
	submitAction?: string;
	validationMode?: string;
	toolname?: string;
	tooldescription?: string;
	toolautosubmit?: boolean | string;
}

export interface FieldConfig {
	name: string;
	type?:
		| "text"
		| "number"
		| "currency"
		| "date"
		| "email"
		| "checkbox"
		| "select"
		| string;
	label?: string;
	description?: string;
	required?: boolean;
	format?: string;
	unit?: string;
}

export interface EntityConfig {
	type: string;
	id: string;
}

export interface CollectionConfig {
	entity: string;
	searchable?: boolean;
	sortable?: boolean;
	filterable?: boolean;
	selectable?: boolean;
}

export interface TableConfig {
	columns?: string[];
	sorting?: string;
	filters?: string;
	pagination?: string;
}

export interface SearchConfig {
	target: string;
}

export interface FilterConfig {
	field: string;
}

export interface SortConfig {
	field: string;
}

export interface WorkflowConfig {
	id: string;
}

export interface StepConfig {
	id: string;
	current?: boolean;
	completed?: boolean;
	next?: string;
}

export interface DialogConfig {
	purpose: string;
}

export interface ConfirmationConfig {
	action: string;
}

export interface LoadingConfig {
	operation: string;
}

export interface SuccessConfig {
	message?: string;
}

export interface ErrorConfig {
	code: string;
}

export interface StatusConfig {
	value: string;
}

export interface EmptyStateConfig {
	reason: string;
}

export interface BreadcrumbConfig {
	path?: string;
}

export interface SidebarConfig {
	name?: string;
}

export interface TabsConfig {
	active?: string;
}

export interface CommandConfig {
	name?: string;
}

export interface ShortcutConfig {
	keys: string;
}

export interface TooltipConfig {
	text: string;
}

// Namespace helper functions that return semantic HTML data attributes
export const agent = {
	app(config: AppConfig) {
		return {
			"data-agent-role": "app",
			"data-agent-app": config.name,
			...(config.version ? { "data-agent-version": config.version } : {}),
			...(config.environment
				? { "data-agent-environment": config.environment }
				: {}),
			...(config.description
				? { "data-agent-description": config.description }
				: {}),
		};
	},

	page(config: PageConfig) {
		return {
			"data-agent-role": "page",
			"data-agent-page": config.id,
			"data-agent-title": config.title,
			...(config.purpose ? { "data-agent-purpose": config.purpose } : {}),
		};
	},

	section(config: SectionConfig) {
		return {
			"data-agent-role": "section",
			"data-agent-section": config.id,
			...(config.title ? { "data-agent-title": config.title } : {}),
		};
	},

	navigation(config?: NavigationConfig) {
		return {
			"data-agent-role": "navigation",
			...(config?.type ? { "data-agent-navigation": config.type } : {}),
		};
	},

	action(config: ActionConfig) {
		return {
			"data-agent-role": "action",
			"data-agent-id": config.id,
			...(config.intent ? { "data-agent-intent": config.intent } : {}),
			...(config.priority ? { "data-agent-priority": config.priority } : {}),
			...(config.description
				? { "data-agent-description": config.description }
				: {}),
			...(config.confirmation ? { "data-agent-confirmation": "true" } : {}),
			...(config.destructive ? { "data-agent-destructive": "true" } : {}),
			...(config.next ? { "data-agent-next": config.next } : {}),
			...(config.disabled ? { "data-agent-disabled": "true" } : {}),
			...(config.loading ? { "data-agent-loading": "true" } : {}),
			// WebMCP Standardization
			toolname: config.toolname || config.id,
			tooldescription:
				config.tooldescription || config.description || `Action: ${config.id}`,
		};
	},

	form(config: FormConfig) {
		return {
			"data-agent-role": "form",
			"data-agent-form": config.purpose,
			...(config.submitAction
				? { "data-agent-submit-action": config.submitAction }
				: {}),
			...(config.validationMode
				? { "data-agent-validation-mode": config.validationMode }
				: {}),
			// WebMCP Standardization
			toolname:
				config.toolname ||
				config.submitAction ||
				config.purpose.replace(/\s+/g, "-").toLowerCase(),
			tooldescription: config.tooldescription || config.purpose,
			...(config.toolautosubmit !== undefined
				? { toolautosubmit: String(config.toolautosubmit) }
				: {}),
		};
	},

	field(config: FieldConfig) {
		return {
			"data-agent-role": "field",
			"data-agent-field": config.name,
			...(config.type ? { "data-agent-type": config.type } : {}),
			...(config.label ? { "data-agent-label": config.label } : {}),
			...(config.description
				? { "data-agent-description": config.description }
				: {}),
			...(config.required ? { "data-agent-required": "true" } : {}),
			...(config.format ? { "data-agent-format": config.format } : {}),
			...(config.unit ? { "data-agent-unit": config.unit } : {}),
		};
	},

	entity(config: EntityConfig) {
		return {
			"data-agent-role": "entity",
			"data-agent-entity": config.type,
			"data-agent-id": config.id,
		};
	},

	collection(config: CollectionConfig) {
		return {
			"data-agent-role": "collection",
			"data-agent-collection": config.entity,
			...(config.searchable ? { "data-agent-searchable": "true" } : {}),
			...(config.sortable ? { "data-agent-sortable": "true" } : {}),
			...(config.filterable ? { "data-agent-filterable": "true" } : {}),
			...(config.selectable ? { "data-agent-selectable": "true" } : {}),
		};
	},

	table(config?: TableConfig) {
		return {
			"data-agent-role": "table",
			...(config?.columns
				? { "data-agent-columns": config.columns.join(",") }
				: {}),
			...(config?.sorting ? { "data-agent-sorting": config.sorting } : {}),
			...(config?.filters ? { "data-agent-filters": config.filters } : {}),
			...(config?.pagination
				? { "data-agent-pagination": config.pagination }
				: {}),
		};
	},

	search(config: SearchConfig) {
		return {
			"data-agent-role": "search",
			"data-agent-search": config.target,
		};
	},

	filter(config: FilterConfig) {
		return {
			"data-agent-role": "filter",
			"data-agent-filter": config.field,
		};
	},

	sort(config: SortConfig) {
		return {
			"data-agent-role": "sort",
			"data-agent-sort": config.field,
		};
	},

	workflow(config: WorkflowConfig) {
		return {
			"data-agent-role": "workflow",
			"data-agent-workflow": config.id,
		};
	},

	step(config: StepConfig) {
		return {
			"data-agent-role": "step",
			"data-agent-step": config.id,
			...(config.current ? { "data-agent-current": "true" } : {}),
			...(config.completed ? { "data-agent-completed": "true" } : {}),
			...(config.next ? { "data-agent-next": config.next } : {}),
		};
	},

	dialog(config: DialogConfig) {
		return {
			"data-agent-role": "dialog",
			"data-agent-dialog": config.purpose,
		};
	},

	confirmation(config: ConfirmationConfig) {
		return {
			"data-agent-role": "confirmation",
			"data-agent-confirmation": config.action,
		};
	},

	loading(config: LoadingConfig) {
		return {
			"data-agent-role": "loading",
			"data-agent-loading": config.operation,
		};
	},

	success(config?: SuccessConfig) {
		return {
			"data-agent-role": "success",
			"data-agent-success": config?.message || "true",
		};
	},

	error(config: ErrorConfig) {
		return {
			"data-agent-role": "error",
			"data-agent-error": config.code,
		};
	},

	status(config: StatusConfig) {
		return {
			"data-agent-role": "status",
			"data-agent-status": config.value,
		};
	},

	emptyState(config: EmptyStateConfig) {
		return {
			"data-agent-role": "emptyState",
			"data-agent-empty-state": config.reason,
		};
	},

	breadcrumb(config?: BreadcrumbConfig) {
		return {
			"data-agent-role": "breadcrumb",
			"data-agent-breadcrumb": config?.path || "true",
		};
	},

	sidebar(config?: SidebarConfig) {
		return {
			"data-agent-role": "sidebar",
			"data-agent-sidebar": config?.name || "true",
		};
	},

	tabs(config?: TabsConfig) {
		return {
			"data-agent-role": "tabs",
			"data-agent-tabs": config?.active || "true",
		};
	},

	command(config?: CommandConfig) {
		return {
			"data-agent-role": "command",
			"data-agent-command": config?.name || "true",
		};
	},

	shortcut(config: ShortcutConfig) {
		return {
			"data-agent-role": "shortcut",
			"data-agent-shortcut": config.keys,
		};
	},

	tooltip(config: TooltipConfig) {
		return {
			"data-agent-role": "tooltip",
			"data-agent-tooltip": config.text,
		};
	},

	/**
	 * Attaches semantic AgentLayerWeb attributes to a plain HTML DOM element
	 */
	attach(element: any, attributes: Record<string, any>): void {
		if (!element || typeof element.setAttribute !== "function") return;
		for (const [key, val] of Object.entries(attributes)) {
			if (val !== undefined && val !== null) {
				element.setAttribute(key, String(val));
			}
		}
	},
};
