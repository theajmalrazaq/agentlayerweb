"use client";

import {
	AgentAction,
	AgentApp,
	AgentBreadcrumb,
	AgentCollection,
	AgentCommand,
	AgentConfirmation,
	AgentDialog,
	AgentEmptyState,
	AgentEntity,
	AgentError,
	AgentField,
	AgentFilter,
	AgentForm,
	AgentLoading,
	AgentNavigation,
	AgentPage,
	AgentSearch,
	AgentSection,
	AgentShortcut,
	AgentSidebar,
	AgentSort,
	AgentStatus,
	AgentStep,
	AgentSuccess,
	AgentTable,
	AgentTabs,
	AgentTooltip,
	AgentWorkflow,
} from "@agentlayerweb/react";
import {
	AlertTriangle,
	Check,
	Download,
	FileText,
	HelpCircle,
	LayoutDashboard,
	Loader2,
	Search,
	Settings,
	User,
	Users,
} from "lucide-react";
import type React from "react";
import { useState } from "react";

export default function AgentLayerWebExamplePage() {
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [tier, setTier] = useState("enterprise");
	const [autoCharge, setAutoCharge] = useState(false);
	const [showToast, setShowToast] = useState(false);

	// Advanced interactive simulation states
	const [searchQuery, setSearchQuery] = useState("");
	const [showConfirmDialog, setShowConfirmDialog] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [showError, setShowError] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (name.toLowerCase() === "error") {
			setShowError(true);
			setShowSuccess(false);
			return;
		}
		setShowError(false);
		setShowConfirmDialog(true);
	};

	const confirmSubmit = () => {
		setShowConfirmDialog(false);
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			setShowSuccess(true);
			setShowToast(true);
			setName("");
			setEmail("");
			setTimeout(() => {
				setShowToast(false);
			}, 4000);
		}, 1500);
	};

	return (
		<AgentApp name="Corp Portal" version="2.4" environment="production">
			<div className="bg-background-lighter/30 text-accent-black min-h-screen font-sans antialiased flex flex-col">
				{/* Top Header Navigation */}
				<AgentNavigation type="topbar">
					<header className="border-b border-border-muted bg-background-base sticky top-0 z-40">
						<div className="max-w-1200 w-full mx-auto px-24 py-16 flex justify-between items-center">
							<div className="flex items-center gap-12">
								<div className="w-32 h-32 bg-accent-black flex items-center justify-center font-bold text-accent-white text-body-medium border-sharp">
									CP
								</div>
								<span className="text-body-medium font-bold tracking-wider uppercase text-accent-black">
									Corp Portal{" "}
									<span className="text-accent-black/40 font-normal font-mono text-body-small">
										v2.4
									</span>
								</span>
							</div>
							<div className="flex items-center gap-16 text-body-small font-medium">
								<div className="flex items-center gap-8 text-accent-black/60 pr-16 border-r border-border-muted">
									<User size={14} className="text-accent-black/40" />
									<span>
										Welcome,{" "}
										<span className="text-accent-black font-semibold">
											Admin
										</span>
									</span>
								</div>
								<AgentAction id="logout" intent="logout" priority="secondary">
									<button
										type="button"
										id="btn-logout"
										className="px-12 py-6 bg-accent-crimson hover:bg-accent-crimson/95 text-accent-white font-semibold cursor-pointer text-body-small transition-colors duration-150 border-sharp border-0"
									>
										Logout
									</button>
								</AgentAction>
							</div>
						</div>
					</header>
				</AgentNavigation>

				{/* Main Container */}
				<div className="flex-1 max-w-1200 w-full mx-auto px-24 py-32 flex flex-col md:flex-row gap-32">
					{/* Sidebar Navigation wrapped in AgentSidebar and AgentNavigation */}
					<AgentSidebar name="sidebar_menu">
						<AgentNavigation type="sidebar">
							<aside className="w-60 shrink-0 flex flex-col gap-6">
								<div>
									<span className="text-[10px] font-bold text-accent-black/40 uppercase tracking-widest px-12 mb-8 block">
										Navigation
									</span>
									<div className="flex flex-col gap-4">
										<AgentAction id="nav_dashboard" intent="navigate">
											<a
												href="#home"
												className="flex items-center gap-8 px-12 py-10 text-body-small text-accent-black bg-background-base border border-border-loud border-l-2 border-l-heat-100 font-semibold pl-10 whitespace-nowrap transition-all border-sharp"
											>
												<LayoutDashboard size={14} className="text-heat-100" />
												Dashboard
											</a>
										</AgentAction>
										<AgentAction id="nav_users" intent="navigate">
											<a
												href="#users"
												className="flex items-center gap-8 px-12 py-10 text-body-small text-accent-black/60 hover:text-accent-black hover:bg-background-base border border-transparent hover:border-border-muted pl-12 whitespace-nowrap transition-all border-sharp"
											>
												<Users size={14} className="text-accent-black/40" />
												User Management
											</a>
										</AgentAction>
										<AgentAction id="nav_reports" intent="navigate">
											<a
												href="#reports"
												className="flex items-center gap-8 px-12 py-10 text-body-small text-accent-black/60 hover:text-accent-black hover:bg-background-base border border-transparent hover:border-border-muted pl-12 whitespace-nowrap transition-all border-sharp"
											>
												<FileText size={14} className="text-accent-black/40" />
												System Reports
											</a>
										</AgentAction>
										<AgentAction id="nav_settings" intent="navigate">
											<a
												href="#settings"
												className="flex items-center gap-8 px-12 py-10 text-body-small text-accent-black/60 hover:text-accent-black hover:bg-background-base border border-transparent hover:border-border-muted pl-12 whitespace-nowrap transition-all border-sharp"
											>
												<Settings size={14} className="text-accent-black/40" />
												Global Settings
											</a>
										</AgentAction>
									</div>
								</div>

								{/* Command Console Bar */}
								<AgentCommand name="global_search_commands">
									<div className="border border-border-loud bg-background-base p-12 flex flex-col gap-8 text-[11px] border-sharp">
										<div className="flex justify-between items-center text-accent-black/60 font-medium">
											<span>Quick Commands</span>
											<AgentShortcut keys="meta+k">
												<span className="text-[9px] font-bold text-heat-100 bg-heat-10 px-6 py-2 border-sharp">
													⌘K
												</span>
											</AgentShortcut>
										</div>
										<span className="text-[10px] text-accent-black/40">
											Press ⌘K to query system services.
										</span>
									</div>
								</AgentCommand>
							</aside>
						</AgentNavigation>
					</AgentSidebar>

					{/* Main Workspace */}
					<AgentPage
						id="dashboard_home"
						title="Dashboard Home"
						purpose="Monitor and manage corporate financial workflows"
					>
						<main className="flex-1 flex flex-col gap-24">
							{/* Technical Breadcrumbs */}
							<AgentBreadcrumb path="system/billing/console">
								<div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-accent-black/40">
									<span>System</span>
									<span>/</span>
									<span>Billing</span>
									<span>/</span>
									<span className="text-heat-100 font-bold">Console</span>
								</div>
							</AgentBreadcrumb>

							{/* Dashboard Title Header */}
							<div className="flex flex-col gap-4 border-b border-border-muted pb-16">
								<h1 className="text-title-h5 font-bold tracking-tight text-accent-black">
									Console Dashboard
								</h1>
								<p className="text-body-small text-accent-black/60">
									Manage onboarding workflow status, client invoicing query
									collections, and new accounts.
								</p>
							</div>

							{/* Simulated Validation Error Block */}
							{showError && (
								<AgentError code="invalid_company_name">
									<div className="bg-accent-crimson/10 border border-accent-crimson text-accent-crimson p-16 text-body-small font-semibold flex items-center gap-8 mb-4 border-sharp">
										<AlertTriangle size={16} />
										<span>
											Error code: INVALID_COMPANY_NAME. Legal company name
											cannot be &apos;error&apos;.
										</span>
									</div>
								</AgentError>
							)}

							{/* Simulated Success Block */}
							{showSuccess && (
								<AgentSuccess message="Client account created successfully">
									<div className="bg-accent-forest/10 border border-accent-forest text-accent-forest p-16 text-body-small font-semibold flex items-center gap-8 mb-4 border-sharp">
										<Check size={16} />
										<span>
											Success: Secure database client profile created
											successfully!
										</span>
									</div>
								</AgentSuccess>
							)}

							{/* Simulated Processing Loading Block */}
							{isLoading && (
								<AgentLoading operation="provisioning_client">
									<div className="bg-heat-10 border border-heat-100 text-heat-100 p-16 text-body-small font-semibold flex items-center gap-8 mb-4 border-sharp">
										<Loader2 size={16} className="animate-spin" />
										<span>
											Loading: Provisioning new secure billing account...
										</span>
									</div>
								</AgentLoading>
							)}

							<div className="grid grid-cols-1 lg:grid-cols-3 gap-24 items-start">
								{/* Left Column (col-span-2): Main Content */}
								<div className="lg:col-span-2 flex flex-col gap-24">
									{/* Workflow Progress Card */}
									<AgentWorkflow id="user_onboarding">
										<AgentStep id="wizard-steps-container" current>
											<div
												className="bg-background-base border border-border-loud p-24 shadow-sm relative"
												id="wizard-steps"
												data-agent-step-current="2"
												data-agent-step-total="3"
											>
												<h3 className="text-[10px] font-bold uppercase tracking-widest text-accent-black/40 mb-16">
													Onboarding Workflow
												</h3>
												<div className="grid grid-cols-1 sm:grid-cols-3 gap-16">
													<div className="flex items-center gap-12 p-12 bg-accent-forest/5 border border-accent-forest/20 border-sharp">
														<span className="w-24 h-24 bg-accent-forest text-accent-white flex items-center justify-center text-body-small font-bold border-sharp">
															<Check size={12} strokeWidth={3} />
														</span>
														<div className="flex flex-col">
															<span className="text-[9px] text-accent-forest font-bold uppercase tracking-wider">
																Step 1
															</span>
															<span className="text-body-small font-bold text-accent-black/80">
																Account Setup
															</span>
														</div>
													</div>
													<div className="flex items-center gap-12 p-12 bg-heat-4 border border-heat-100/30 border-sharp relative shadow-[0_1px_3px_rgba(0,54,254,0.05)]">
														<span className="w-24 h-24 bg-heat-100 text-accent-white flex items-center justify-center text-body-small font-bold border-sharp">
															2
														</span>
														<div className="flex flex-col">
															<span className="text-[9px] text-heat-100 font-bold uppercase tracking-wider">
																Step 2
															</span>
															<span className="text-body-small font-bold text-accent-black">
																Profile Configuration
															</span>
														</div>
													</div>
													<div className="flex items-center gap-12 p-12 bg-background-lighter/20 border border-border-faint opacity-50 border-sharp">
														<span className="w-24 h-24 border border-border-loud text-accent-black/40 flex items-center justify-center text-body-small font-bold border-sharp bg-background-base">
															3
														</span>
														<div className="flex flex-col">
															<span className="text-[9px] text-accent-black/40 font-bold uppercase tracking-wider">
																Step 3
															</span>
															<span className="text-body-small font-bold text-accent-black/40">
																Verification
															</span>
														</div>
													</div>
												</div>
											</div>
										</AgentStep>
									</AgentWorkflow>

									{/* Invoices collection & Search panel */}
									<AgentCollection
										entity="invoices"
										searchable
										filterable
										sortable
									>
										<div
											className="bg-background-base border border-border-loud p-24 shadow-sm"
											id="data-table-view"
										>
											{/* Collection Header Tabs */}
											<AgentTabs active="active_invoices">
												<div className="flex border-b border-border-muted mb-16 gap-16 text-body-small">
													<button
														type="button"
														className="px-12 py-8 border-b-2 border-heat-100 text-accent-black font-bold bg-transparent cursor-pointer"
													>
														Active Invoices
													</button>
													<button
														type="button"
														className="px-12 py-8 text-accent-black/60 hover:text-accent-black bg-transparent cursor-pointer"
													>
														Archived
													</button>
												</div>
											</AgentTabs>

											<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-12 mb-16 pb-12 border-b border-border-muted">
												<h3 className="text-[10px] font-bold uppercase tracking-widest text-accent-black/40">
													Invoices Collection
												</h3>
												<span className="text-[10px] font-bold text-heat-100 bg-heat-10 px-8 py-2 uppercase tracking-wider">
													Active Database
												</span>
											</div>

											{/* Search & Filter Controls */}
											<AgentSection
												id="search_filter"
												title="Search filter area"
											>
												<div
													className="mb-16 p-12 bg-background-lighter/30 border border-border-muted"
													id="search-filter-panel"
												>
													<div className="flex flex-col sm:flex-row gap-12">
														<div className="flex-1 relative">
															<Search
																size={14}
																className="absolute left-12 top-10 text-accent-black/40"
															/>
															<AgentSearch target="invoices">
																<input
																	type="text"
																	id="search-query"
																	value={searchQuery}
																	onChange={(e) =>
																		setSearchQuery(e.target.value)
																	}
																	placeholder="Search invoices or users..."
																	className="w-full pl-36 pr-12 py-8 bg-background-base border border-border-loud text-accent-black text-body-small focus:outline-none focus:border-heat-100 focus:ring-1 focus:ring-heat-100/15 transition-all placeholder-accent-black/30 font-sans border-sharp"
																/>
															</AgentSearch>
														</div>
														<AgentFilter field="status">
															<select
																id="filter-status"
																className="w-full sm:w-[160px] px-12 py-8 bg-background-base border border-border-loud text-accent-black text-body-small focus:outline-none focus:border-heat-100 transition-all font-sans cursor-pointer border-sharp"
															>
																<option value="all">All statuses</option>
																<option value="active">Active</option>
																<option value="pending">Pending</option>
															</select>
														</AgentFilter>
														<AgentAction
															id="execute_search"
															intent="search"
															priority="primary"
														>
															<button
																type="button"
																id="btn-search-execute"
																className="px-16 py-8 bg-heat-100 hover:bg-heat-100/90 text-accent-white font-semibold text-body-small cursor-pointer transition-colors border-0 border-sharp"
															>
																Query Invoices
															</button>
														</AgentAction>
													</div>
												</div>
											</AgentSection>

											{/* Simulated Empty State */}
											{searchQuery.toLowerCase() === "empty" ? (
												<AgentEmptyState reason="no_invoices_matched">
													<div className="flex flex-col items-center justify-center p-32 text-center bg-background-lighter/30 border border-dashed border-border-loud border-sharp">
														<span className="text-body-medium font-bold text-accent-black/60 mb-4">
															No Invoices Found
														</span>
														<span className="text-body-small text-accent-black/40">
															No items match query &quot;{searchQuery}&quot;.
															Try using another keyword.
														</span>
													</div>
												</AgentEmptyState>
											) : (
												<AgentTable
													columns={[
														"invoice_id",
														"client",
														"amount",
														"status",
														"actions",
													]}
												>
													<table
														className="w-full border-collapse mt-8"
														data-agent-table="invoices_list"
													>
														<thead>
															<tr className="border-b border-border-loud text-left">
																<th className="py-12 px-12 text-[10px] font-bold text-accent-black/40 uppercase tracking-widest">
																	<AgentSort field="invoice_id">
																		<span className="cursor-pointer hover:text-accent-black">
																			Invoice ID
																		</span>
																	</AgentSort>
																</th>
																<th className="py-12 px-12 text-[10px] font-bold text-accent-black/40 uppercase tracking-widest">
																	Entity / Client
																</th>
																<th className="py-12 px-12 text-[10px] font-bold text-accent-black/40 uppercase tracking-widest">
																	<AgentSort field="amount">
																		<span className="cursor-pointer hover:text-accent-black">
																			Amount
																		</span>
																	</AgentSort>
																</th>
																<th className="py-12 px-12 text-[10px] font-bold text-accent-black/40 uppercase tracking-widest">
																	Status
																</th>
																<th className="py-12 px-12 text-[10px] font-bold text-accent-black/40 uppercase tracking-widest">
																	Actions
																</th>
															</tr>
														</thead>
														<tbody className="divide-y divide-border-muted">
															<AgentEntity type="invoice" id="9821">
																<tr className="hover:bg-background-lighter/30 transition-colors">
																	<td className="py-12 px-12 text-body-small font-bold text-accent-black">
																		#INV-9821
																	</td>
																	<td className="py-12 px-12 text-body-small font-medium text-accent-black/70">
																		Acme Corp Ltd
																	</td>
																	<td className="py-12 px-12 text-body-small font-mono font-semibold text-accent-black">
																		$12,450.00
																	</td>
																	<td className="py-12 px-12 text-body-small">
																		<span className="inline-flex px-8 py-2 text-[10px] font-bold uppercase tracking-wider bg-accent-forest/10 text-accent-forest border border-accent-forest/20 border-sharp">
																			Paid
																		</span>
																	</td>
																	<td className="py-12 px-12 text-body-small">
																		<AgentAction
																			id="download_pdf_9821"
																			intent="download"
																			priority="secondary"
																		>
																			<button
																				type="button"
																				className="inline-flex items-center gap-6 px-12 py-6 border border-border-loud hover:bg-background-lighter text-accent-black/80 hover:text-accent-black text-body-small font-semibold cursor-pointer transition-colors border-sharp"
																				id="action-download-inv-9821"
																			>
																				<Download size={12} />
																				Download
																			</button>
																		</AgentAction>
																	</td>
																</tr>
															</AgentEntity>
															<AgentEntity type="invoice" id="9822">
																<tr className="hover:bg-background-lighter/30 transition-colors">
																	<td className="py-12 px-12 text-body-small font-bold text-accent-black">
																		#INV-9822
																	</td>
																	<td className="py-12 px-12 text-body-small font-medium text-accent-black/70">
																		Globex Industry
																	</td>
																	<td className="py-12 px-12 text-body-small font-mono font-semibold text-accent-black">
																		$8,900.00
																	</td>
																	<td className="py-12 px-12 text-body-small">
																		<span className="inline-flex px-8 py-2 text-[10px] font-bold uppercase tracking-wider bg-accent-honey/10 text-accent-honey border border-accent-honey/20 border-sharp">
																			Pending
																		</span>
																	</td>
																	<td className="py-12 px-12 text-body-small">
																		<AgentAction
																			id="download_pdf_9822"
																			intent="download"
																			priority="secondary"
																		>
																			<button
																				type="button"
																				className="inline-flex items-center gap-6 px-12 py-6 border border-border-loud hover:bg-background-lighter text-accent-black/80 hover:text-accent-black text-body-small font-semibold cursor-pointer transition-colors border-sharp"
																				id="action-download-inv-9822"
																			>
																				<Download size={12} />
																				Download
																			</button>
																		</AgentAction>
																	</td>
																</tr>
															</AgentEntity>
														</tbody>
													</table>
												</AgentTable>
											)}

											{/* Pagination */}
											<div className="flex justify-between items-center mt-24 text-[10px] font-bold text-accent-black/40 uppercase tracking-widest">
												<span>Showing 1-2 of 48 items</span>
												<div
													className="flex gap-8"
													data-agent-role="pagination"
													data-agent-pagination="invoices_pages"
												>
													<AgentAction
														id="page_prev"
														intent="paginate"
														disabled
													>
														<button
															type="button"
															className="px-12 py-6 border border-border-muted bg-background-lighter text-accent-black/20 cursor-not-allowed text-body-small font-semibold border-sharp"
															id="page-prev-btn"
															disabled
															data-agent-disabled="true"
														>
															Prev
														</button>
													</AgentAction>
													<AgentAction id="page_next" intent="paginate">
														<button
															type="button"
															className="px-12 py-6 border border-border-loud hover:bg-background-lighter text-accent-black/80 hover:text-accent-black cursor-pointer transition-colors text-body-small font-semibold border-sharp"
															id="page-next-btn"
														>
															Next
														</button>
													</AgentAction>
												</div>
											</div>
										</div>
									</AgentCollection>
								</div>

								{/* Right Column (col-span-1): Form and Charts */}
								<div className="flex flex-col gap-24">
									{/* Form Panel */}
									<AgentSection
										id="client_creation"
										title="Client Profile setup form"
									>
										<div
											className="bg-background-base border border-border-loud p-24 shadow-sm"
											id="form-modal-block"
										>
											<h3 className="text-[10px] font-bold uppercase tracking-widest text-accent-black/40 mb-16">
												Add New Client Entity
											</h3>
											<AgentForm
												purpose="create_client"
												submitAction="submit_client"
											>
												<form
													id="new-client-form"
													onSubmit={handleSubmit}
													className="flex flex-col gap-16"
												>
													<div>
														<label
															htmlFor="client-name"
															className="block mb-6 text-[10px] font-bold text-accent-black/40 uppercase tracking-widest"
														>
															Company Legal Name
														</label>
														<AgentField
															name="company_name"
															type="text"
															label="Company legal corporate name"
															required
														>
															<input
																type="text"
																id="client-name"
																name="company_name"
																required
																value={name}
																onChange={(e) => setName(e.target.value)}
																className="w-full px-12 py-8 bg-background-base border border-border-loud text-accent-black text-body-small focus:outline-none focus:border-heat-100 focus:ring-1 focus:ring-heat-100/15 transition-all font-sans border-sharp"
															/>
														</AgentField>
													</div>
													<div>
														<label
															htmlFor="client-email"
															className="block mb-6 text-[10px] font-bold text-accent-black/40 uppercase tracking-widest"
														>
															Billing Email
														</label>
														<AgentField
															name="billing_email"
															type="email"
															label="Contact financial billing email"
															required
														>
															<input
																type="email"
																id="client-email"
																name="billing_email"
																required
																value={email}
																onChange={(e) => setEmail(e.target.value)}
																className="w-full px-12 py-8 bg-background-base border border-border-loud text-accent-black text-body-small focus:outline-none focus:border-heat-100 focus:ring-1 focus:ring-heat-100/15 transition-all font-sans border-sharp"
															/>
														</AgentField>
													</div>
													<div>
														<label
															htmlFor="billing-tier"
															className="block mb-6 text-[10px] font-bold text-accent-black/40 uppercase tracking-widest"
														>
															Billing Tier
														</label>
														<AgentField
															name="billing_tier"
															type="select"
															label="Select corporate billing tier"
														>
															<select
																id="billing-tier"
																value={tier}
																onChange={(e) => setTier(e.target.value)}
																className="w-full px-12 py-8 bg-background-base border border-border-loud text-accent-black text-body-small focus:outline-none focus:border-heat-100 transition-all font-sans cursor-pointer border-sharp"
															>
																<option value="enterprise">
																	Enterprise Tier
																</option>
																<option value="pro">Pro tier</option>
															</select>
														</AgentField>
													</div>

													{/* File Uploader */}
													<div>
														<label
															htmlFor="contract-file"
															className="block mb-6 text-[10px] font-bold text-accent-black/40 uppercase tracking-widest"
														>
															Upload Contract (PDF)
														</label>
														<input
															type="file"
															id="contract-file"
															name="contract"
															accept=".pdf"
															className="w-full py-4 text-body-small text-accent-black/60 file:mr-16 file:py-6 file:px-12 file:border file:border-border-loud file:bg-background-lighter file:text-accent-black/80 file:text-body-small file:font-semibold hover:file:bg-background-lighter/80 cursor-pointer border-sharp"
															data-agent-role="uploader"
															data-agent-uploader="contract_uploader"
														/>
													</div>

													{/* Toggle Switch */}
													<div className="flex items-center gap-8 py-4">
														<input
															type="checkbox"
															id="auto-charge-toggle"
															checked={autoCharge}
															onChange={(e) => setAutoCharge(e.target.checked)}
															className="w-16 h-16 accent-heat-100 border border-border-loud cursor-pointer"
															data-agent-role="toggle"
															data-agent-toggle="auto_charge"
														/>
														<label
															htmlFor="auto-charge-toggle"
															className="text-body-small font-bold text-accent-black/60 uppercase select-none cursor-pointer hover:text-accent-black transition-colors"
														>
															Enable Auto-Charge billing sweeps
														</label>
													</div>

													<div className="pt-8">
														<AgentAction
															id="submit_client"
															intent="submit"
															priority="primary"
														>
															<button
																type="submit"
																className="w-full px-24 py-10 bg-heat-100 hover:bg-heat-100/90 text-accent-white font-bold text-body-small tracking-wider uppercase transition-colors cursor-pointer border-sharp border-0"
																id="btn-submit-entity-form"
															>
																Create client profile
															</button>
														</AgentAction>
													</div>
												</form>
											</AgentForm>
										</div>
									</AgentSection>

									{/* Chart metrics */}
									<div
										className="bg-background-base border border-border-loud p-24 shadow-sm"
										id="metrics-chart-box"
										data-agent-role="chart"
										data-agent-chart="sales_metrics"
									>
										<h3 className="text-[10px] font-bold uppercase tracking-widest text-accent-black/40 mb-16">
											Monthly Sales metrics
										</h3>
										<div className="h-180 border border-border-faint p-16 flex items-end gap-12 bg-background-lighter/20 relative">
											{/* Grid Lines */}
											<div className="absolute inset-0 flex flex-col justify-between pointer-events-none p-16">
												<div className="border-b border-border-faint w-full"></div>
												<div className="border-b border-border-faint w-full"></div>
												<div className="border-b border-border-faint w-full"></div>
												<div className="w-full"></div>
											</div>
											{/* Bars */}
											<div
												style={{ height: "30%" }}
												className="bg-linear-to-t from-heat-100 to-accent-bluetron/80 hover:from-heat-100 hover:to-accent-bluetron flex-1 transition-all duration-200 relative group cursor-help z-10 border-sharp"
											>
												<span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-accent-black text-accent-white text-[9px] px-6 py-2 uppercase font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
													Q1: $12.4k
												</span>
											</div>
											<div
												style={{ height: "55%" }}
												className="bg-linear-to-t from-heat-100 to-accent-bluetron/80 hover:from-heat-100 hover:to-accent-bluetron flex-1 transition-all duration-200 relative group cursor-help z-10 border-sharp"
											>
												<span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-accent-black text-accent-white text-[9px] px-6 py-2 uppercase font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
													Q2: $24.8k
												</span>
											</div>
											<div
												style={{ height: "80%" }}
												className="bg-linear-to-t from-heat-100 to-accent-bluetron/80 hover:from-heat-100 hover:to-accent-bluetron flex-1 transition-all duration-200 relative group cursor-help z-10 border-sharp"
											>
												<span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-accent-black text-accent-white text-[9px] px-6 py-2 uppercase font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
													Q3: $36.0k
												</span>
											</div>
										</div>
										{/* Chart Axis labels */}
										<div className="flex justify-between mt-8 text-[9px] font-bold text-accent-black/40 uppercase tracking-widest">
											<span className="flex-1 text-center">Q1 Metrics</span>
											<span className="flex-1 text-center">Q2 Metrics</span>
											<span className="flex-1 text-center">Q3 Metrics</span>
										</div>
									</div>
								</div>
							</div>
						</main>
					</AgentPage>
				</div>

				{/* Confirmation Dialog Modal */}
				{showConfirmDialog && (
					<AgentDialog purpose="confirm_client_creation">
						<div className="fixed inset-0 bg-accent-black/40 flex items-center justify-center z-50 p-24">
							<div className="bg-background-base border border-border-loud p-24 max-w-120 w-full shadow-2xl border-sharp">
								<h4 className="text-body-large font-bold mb-8 text-accent-black">
									Confirm Client Setup
								</h4>
								<p className="text-body-small text-accent-black/60 mb-24">
									Are you sure you want to initialize the client secure profile
									with Company name{" "}
									<span className="font-bold text-accent-black">
										&quot;{name}&quot;
									</span>{" "}
									and Billing Email{" "}
									<span className="font-bold text-accent-black">
										&quot;{email}&quot;
									</span>
									?
								</p>
								<div className="flex justify-end gap-12">
									<button
										type="button"
										onClick={() => setShowConfirmDialog(false)}
										className="px-12 py-8 border border-border-loud hover:bg-background-lighter text-accent-black font-semibold text-body-small cursor-pointer transition-colors border-sharp bg-transparent"
									>
										Cancel
									</button>
									<AgentConfirmation action="confirm_submit">
										<button
											type="button"
											onClick={confirmSubmit}
											className="px-16 py-8 bg-heat-100 hover:bg-heat-100/90 text-accent-white font-bold text-body-small cursor-pointer transition-colors border-sharp border-0"
										>
											Confirm
										</button>
									</AgentConfirmation>
								</div>
							</div>
						</div>
					</AgentDialog>
				)}

				{/* Toast notifications */}
				{showToast && (
					<AgentStatus value="success">
						<div
							className="bg-heat-100 text-accent-white p-16 shadow-xl fixed bottom-24 right-24 flex items-center gap-12 z-50 border-sharp"
							id="toast-notify-status"
						>
							<div
								className="border-2 border-accent-white/20 border-t-accent-white w-16 h-16 animate-spin border-sharp"
								data-agent-role="loader"
								data-agent-loader="sync_progress"
							></div>
							<span className="text-body-small font-semibold flex items-center gap-6">
								Data successfully synchronized!
								<AgentTooltip text="billing_help">
									<span
										title="Last checked 2 mins ago"
										className="cursor-help opacity-80 flex items-center hover:opacity-100 transition-opacity"
									>
										<HelpCircle size={14} />
									</span>
								</AgentTooltip>
							</span>
						</div>
					</AgentStatus>
				)}
			</div>
		</AgentApp>
	);
}
