import { BusinessDashboardPage } from "@/components/business-dashboard-page"
import { businessDashboards } from "@/lib/business-dashboards"

export default function InfiniteEventsPage() {
  return <BusinessDashboardPage dashboard={businessDashboards["infinite-events"]} />
}
