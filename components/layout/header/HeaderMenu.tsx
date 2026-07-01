import Link from "next/link"
import DashboardButton from "@/components/layout/header/DashboardButton";
import ProjectsButton from "@/components/layout/header/ProjectsButton";

export default function HeaderMenu() {
    return (
            <nav className={`flex flex-row items-center w-full justify-center` }>
                <div className={` flex flex-row lg:h-[78px]  w-full lg:w-[512px] items-center justify-evenly lg:justify-center lg:gap-4` }>
                    <Link className="link" href="/dashboard"><DashboardButton /></Link>
                    <Link className="link" href="/projects"><ProjectsButton /></Link>
                </div>
            </nav>

    )
}