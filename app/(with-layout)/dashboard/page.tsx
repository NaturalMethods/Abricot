import {RefreshProvider} from "@/app/contexts/RefreshContext/RefreshProvider";
import DashboardContent from "@/components/dashboard/DashboardContent";

/**
 * Dashboard page component
 */
export default function dashboardPage() {

    return (
        <RefreshProvider>
            <DashboardContent />
        </RefreshProvider>
    );
}