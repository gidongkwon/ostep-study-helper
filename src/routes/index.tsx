import { createFileRoute } from "@tanstack/react-router";
import { ProgressChart } from "../features/progress/ProgressChart";
import { PageContainer } from "../components/ui/PageContainer";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <PageContainer maxWidth="6xl">
      <ProgressChart />
    </PageContainer>
  );
}
