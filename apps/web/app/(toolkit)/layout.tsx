import { ToolkitShell } from "../../components/toolkit-shell";

export default function ToolkitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ToolkitShell>{children}</ToolkitShell>;
}
