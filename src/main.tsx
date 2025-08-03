import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";
import "./features/i18n";
import { StudyProgressProvider } from "./features/progress/StudyProgressProvider";
import { LabProvider } from "./features/lab/LabProvider";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StudyProgressProvider>
      <LabProvider>
        <RouterProvider router={router} />
      </LabProvider>
    </StudyProgressProvider>
  </StrictMode>,
);
