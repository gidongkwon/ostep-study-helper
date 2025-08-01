import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { ErrorBoundary } from "../components/ErrorBoundary";
import { NotFound } from "../components/NotFound";
import { useState } from "react";

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: ErrorBoundary,
  notFoundComponent: NotFound,
});

function RootComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out lg:transition-none`}
        >
          <Sidebar />
        </div>

        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
      </div>

      <TanStackRouterDevtools />
    </div>
  );
}
