import { BusinessDashboardPage } from "@/components/business-dashboard-page"
import { businessDashboards } from "@/lib/business-dashboards"

export default function HazierPage() {
  return <BusinessDashboardPage dashboard={businessDashboards.hazier} />
}
