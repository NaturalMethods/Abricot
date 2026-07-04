"use client"

import Link from "next/link"
import HeaderMenu from "./header/HeaderMenu";
import UserButton from "./header/UserButton";
import {useUser} from "@/app/contexts/useUser";
import Image from "next/image";

export default function Header() {

    const { user } = useUser()

    return (
        <header className={`flex flex-row items-center pl-8 pr-8 justify-evenly w-full lg:gap-12 min-h-[70px] md:h-[100px]`}>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img width={147} height={48} className=" w-[90px] sm:w-[147px] h-auto" src="/Logo.svg" alt="Website Logo"/>

            <HeaderMenu />
            <Link className="link" href="/account"><UserButton firstName={user?.firstName} lastName={user?.lastName} /></Link>
        </header>
    )
}