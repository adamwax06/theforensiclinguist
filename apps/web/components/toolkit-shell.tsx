"use client";

import { Suspense, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./header";
import { ResearchLibrary } from "./research-library";

export function ToolkitShell({ children }: { children: React.ReactNode }) {
  const covered = usePathname() === "/";
  useEffect(() => {
    if (covered) window.scrollTo({ top: 0, behavior: "instant" });
    else
      document.getElementById("reader-title")?.focus({ preventScroll: true });
  }, [covered]);
  return (
    <>
      <div inert={covered} aria-hidden={covered || undefined}>
        <Header active="library" />
        <Suspense
          fallback={
            <div className="library-loading">Opening the research library…</div>
          }
        >
          <ResearchLibrary covered={covered} />
        </Suspense>
      </div>
      {children}
    </>
  );
}
