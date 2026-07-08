# Primitives Reference

AgentLayerWeb provides a rich set of 28 semantic primitives. In React, these are exported as components with the prefix `Agent` (e.g. `<AgentApp>`). In Vue, Svelte, and Plain HTML, they are accessed under the `agent` namespace object.

## Core Hierarchy

### 1. Application (`agent.app`)
Declares the root application metadata.
- **React:** `<AgentApp name="Portal" version="1.0" environment="production" description="Dashboard">`
- **Core API:** `agent.app({ name: 'Portal', version: '1.0' })`

### 2. Page (`agent.page`)
Represents an active view or page route.
- **React:** `<AgentPage id="dashboard" title="Admin Dashboard" purpose="Manage billing">`
- **Core API:** `agent.page({ id: 'dashboard', title: 'Admin Dashboard' })`

### 3. Section (`agent.section`)
A logical grouping of visual components.
- **React:** `<AgentSection id="profile_settings" title="Profile Details">`
- **Core API:** `agent.section({ id: 'profile_settings', title: 'Profile Details' })`

### 4. Navigation (`agent.navigation`)
Marks standard navigation menus or navbars.
- **React:** `<AgentNavigation type="sidebar">`
- **Core API:** `agent.navigation({ type: 'sidebar' })`

---

## Interactions & Data Entry

### 5. Action (`agent.action`)
An interactive action the agent can trigger (buttons, links).
- **React:** `<AgentAction id="save" intent="save" priority="primary" confirmation destructive>`
- **Core API:** `agent.action({ id: 'save', intent: 'save', priority: 'primary' })`

### 6. Form (`agent.form`)
Identifies user inputs forms and their submission action targets.
- **React:** `<AgentForm purpose="Update Email" submitAction="save_email">`
- **Core API:** `agent.form({ purpose: 'Update Email', submitAction: 'save_email' })`

### 7. Field (`agent.field`)
Defines input field parameters, units, formats, and constraints.
- **React:** `<AgentField name="price" type="currency" label="Amount" required unit="AUD">`
- **Core API:** `agent.field({ name: 'price', type: 'currency', required: true })`

---

## Content & Layout

### 8. Entity (`agent.entity`)
Marks specific business data objects (e.g. users, products).
- **React:** `<AgentEntity type="Invoice" id="inv_2026_99">`
- **Core API:** `agent.entity({ type: 'Invoice', id: 'inv_99' })`

### 9. Collection (`agent.collection`)
Represents lists, grids, or collections of items.
- **React:** `<AgentCollection entity="Product" searchable filterable sortable>`
- **Core API:** `agent.collection({ entity: 'Product', searchable: true })`

### 10. Table (`agent.table`)
Specifies data tabular grids and active columns.
- **React:** `<AgentTable columns={['Name', 'Email']} sorting="Name" pagination="page-1">`
- **Core API:** `agent.table({ columns: ['Name', 'Email'], sorting: 'Name' })`

### 11. Search (`agent.search`)
Search bars and input filters.
- **React:** `<AgentSearch target="Invoices">`
- **Core API:** `agent.search({ target: 'Invoices' })`

### 12. Filter (`agent.filter`)
Active filter toggles or dropdowns.
- **React:** `<AgentFilter field="Status">`
- **Core API:** `agent.filter({ field: 'Status' })`

### 13. Sort (`agent.sort`)
Sort order trigger controls.
- **React:** `<AgentSort field="Price">`
- **Core API:** `agent.sort({ field: 'Price' })`

---

## State & Flow

### 14. Workflow (`agent.workflow`)
Container for step-by-step user procedures.
- **React:** `<AgentWorkflow id="checkout_flow">`
- **Core API:** `agent.workflow({ id: 'checkout_flow' })`

### 15. Step (`agent.step`)
Represent a single step in a workflow.
- **React:** `<AgentStep id="billing_step" current={true} completed={false} next="shipping_step">`
- **Core API:** `agent.step({ id: 'billing_step', current: true })`

### 16. Dialog (`agent.dialog`)
Modals, dialog overlays, or warnings.
- **React:** `<AgentDialog purpose="Delete Property Warning">`
- **Core API:** `agent.dialog({ purpose: 'Delete Property Warning' })`

### 17. Confirmation (`agent.confirmation`)
Asks the user or agent for confirmation.
- **React:** `<AgentConfirmation action="publish_listing">`
- **Core API:** `agent.confirmation({ action: 'publish_listing' })`

---

## Status & Indicators

### 18. Loading (`agent.loading`)
Indicates background server actions or rendering loading states.
- **React:** `<AgentLoading operation="Uploading documents...">`
- **Core API:** `agent.loading({ operation: 'Uploading documents...' })`

### 19. Success (`agent.success`)
Success message prompts or states.
- **React:** `<AgentSuccess message="Item created successfully.">`
- **Core API:** `agent.success({ message: 'Success' })`

### 20. Error (`agent.error`)
Detailed error warning codes for agent recovery.
- **React:** `<AgentError code="EXPIRED_TOKEN">`
- **Core API:** `agent.error({ code: 'EXPIRED_TOKEN' })`

### 21. Status (`agent.status`)
Lifecycle status indicators (e.g. active, draft).
- **React:** `<AgentStatus value="published">`
- **Core API:** `agent.status({ value: 'published' })`

### 22. Empty State (`agent.emptyState`)
Empty container warnings.
- **React:** `<AgentEmptyState reason="No documents uploaded yet.">`
- **Core API:** `agent.emptyState({ reason: 'No documents uploaded yet.' })`

---

## UI Elements

### 23. Breadcrumb (`agent.breadcrumb`)
Nesting navigation hierarchies.
- **React:** `<AgentBreadcrumb path="Home > Listings > Edit">`
- **Core API:** `agent.breadcrumb({ path: 'Home > Listings > Edit' })`

### 24. Sidebar (`agent.sidebar`)
Sidebar panels.
- **React:** `<AgentSidebar name="Control Center">`
- **Core API:** `agent.sidebar({ name: 'Control Center' })`

### 25. Tabs (`agent.tabs`)
Tabbed interfaces.
- **React:** `<AgentTabs active="profile">`
- **Core API:** `agent.tabs({ active: 'profile' })`

### 26. Command (`agent.command`)
Command menu search palettes.
- **React:** `<AgentCommand name="Quick Actions">`
- **Core API:** `agent.command({ name: 'Quick Actions' })`

### 27. Shortcut (`agent.shortcut`)
Keyboard shortcut triggers.
- **React:** `<AgentShortcut keys="Ctrl+S">`
- **Core API:** `agent.shortcut({ keys: 'Ctrl+S' })`

### 28. Tooltip (`agent.tooltip`)
Help hover tips.
- **React:** `<AgentTooltip text="Click to delete this list permanently.">`
- **Core API:** `agent.tooltip({ text: 'Click to delete this list permanently.' })`
