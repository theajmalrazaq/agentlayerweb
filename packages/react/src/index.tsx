/* biome-ignore-all lint/suspicious/noExplicitAny: wrapper attributes intentionally accept flexible values */
import {
	type ActionConfig,
	type AppConfig,
	agent,
	type BreadcrumbConfig,
	type CollectionConfig,
	type CommandConfig,
	type ConfirmationConfig,
	type DialogConfig,
	type EmptyStateConfig,
	type EntityConfig,
	type ErrorConfig,
	type FieldConfig,
	type FilterConfig,
	type FormConfig,
	type LoadingConfig,
	type NavigationConfig,
	type PageConfig,
	type SearchConfig,
	type SectionConfig,
	type ShortcutConfig,
	type SidebarConfig,
	type SortConfig,
	type StatusConfig,
	type StepConfig,
	type SuccessConfig,
	type TableConfig,
	type TabsConfig,
	type TooltipConfig,
	type WorkflowConfig,
} from "@agentlayerweb/core";
import React from "react";

export function wrapWithAttributes(
	children: React.ReactNode,
	attributes: Record<string, any>,
	wrapperTag: keyof React.JSX.IntrinsicElements = "div",
) {
	if (React.isValidElement(children)) {
		const existingProps = children.props || {};
		return React.cloneElement(children as React.ReactElement<any>, {
			...existingProps,
			...attributes,
		});
	}
	return React.createElement(wrapperTag, attributes, children);
}

// React Primitive Wrappers
export const AgentApp: React.FC<AppConfig & { children?: React.ReactNode }> = ({
	children,
	...props
}) => wrapWithAttributes(children, agent.app(props), "div");

export const AgentPage: React.FC<
	PageConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.page(props), "div");

export const AgentSection: React.FC<
	SectionConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.section(props), "section");

export const AgentNavigation: React.FC<
	NavigationConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.navigation(props), "nav");

export const AgentAction: React.FC<
	ActionConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.action(props), "div");

export const AgentForm: React.FC<
	FormConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.form(props), "form");

export const AgentField: React.FC<
	FieldConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.field(props), "div");

export const AgentEntity: React.FC<
	EntityConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.entity(props), "div");

export const AgentCollection: React.FC<
	CollectionConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.collection(props), "div");

export const AgentTable: React.FC<
	TableConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.table(props), "table");

export const AgentSearch: React.FC<
	SearchConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.search(props), "div");

export const AgentFilter: React.FC<
	FilterConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.filter(props), "div");

export const AgentSort: React.FC<
	SortConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.sort(props), "div");

export const AgentWorkflow: React.FC<
	WorkflowConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.workflow(props), "div");

export const AgentStep: React.FC<
	StepConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.step(props), "div");

export const AgentDialog: React.FC<
	DialogConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.dialog(props), "div");

export const AgentConfirmation: React.FC<
	ConfirmationConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.confirmation(props), "div");

export const AgentLoading: React.FC<
	LoadingConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.loading(props), "div");

export const AgentSuccess: React.FC<
	SuccessConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.success(props), "div");

export const AgentError: React.FC<
	ErrorConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.error(props), "div");

export const AgentStatus: React.FC<
	StatusConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.status(props), "div");

export const AgentEmptyState: React.FC<
	EmptyStateConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.emptyState(props), "div");

export const AgentBreadcrumb: React.FC<
	BreadcrumbConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.breadcrumb(props), "nav");

export const AgentSidebar: React.FC<
	SidebarConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.sidebar(props), "aside");

export const AgentTabs: React.FC<
	TabsConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.tabs(props), "div");

export const AgentCommand: React.FC<
	CommandConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.command(props), "div");

export const AgentShortcut: React.FC<
	ShortcutConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.shortcut(props), "div");

export const AgentTooltip: React.FC<
	TooltipConfig & { children?: React.ReactNode }
> = ({ children, ...props }) =>
	wrapWithAttributes(children, agent.tooltip(props), "div");

// Re-export all core members
export * from "@agentlayerweb/core";
