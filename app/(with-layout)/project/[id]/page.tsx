import {RefreshProvider} from "@/app/contexts/RefreshContext/RefreshProvider";
import SingleProjectContent from "@/components/Project/ProjectContent";

export default function singleProjectsPage() {

    return (
        <RefreshProvider>
            <SingleProjectContent />
        </RefreshProvider>
    );
}