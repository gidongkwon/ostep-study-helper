import { createFileRoute } from "@tanstack/react-router";
import { ProgressChart } from "../components/ProgressChart";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50/30 dark:bg-gray-900/30">
      <div className="max-w-6xl mx-auto">
        <ProgressChart />
      </div>
    </div>
  );
}