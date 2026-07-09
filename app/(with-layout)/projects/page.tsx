"use client"

import ProjectsContent from "@/app/(with-layout)/projects/ProjectsContent";
import {RefreshProvider} from "@/app/contexts/RefreshContext/RefreshProvider";

/**
 * Projects page component
 * @constructor
 */
export default function ProjectsPage() {

    return (
        <RefreshProvider>
            <ProjectsContent/>
        </RefreshProvider>
    )
}
