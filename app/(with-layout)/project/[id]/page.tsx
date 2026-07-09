import {RefreshProvider} from "@/app/contexts/RefreshContext/RefreshProvider";
import SingleProjectContent from "@/components/Project/ProjectContent";

/**
 * Single project page component
 */
export default function singleProjectsPage() {

    return (
        <RefreshProvider>
            <SingleProjectContent/>
        </RefreshProvider>
    );
}