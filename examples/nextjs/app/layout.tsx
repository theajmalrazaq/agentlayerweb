import { AgentApp } from "@agentlayerweb/react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "AgentLayerWeb Next.js Example",
	description: "Next.js application semantic interface",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<AgentApp name="Real Estate App" version="1.0">
					{children}
				</AgentApp>
			</body>
		</html>
	);
}
