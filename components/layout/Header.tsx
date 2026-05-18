"use client"

import Link from "next/link"
import styles from "./Header.module.css"
import HeaderMenu from "./header/HeaderMenu";
import UserButton from "./header/UserButton";
import {useUser} from "@/app/contexts/useUser";

export default function Header() {

    const { user } = useUser()

    return (
        <header className={`flex-row align-center justify-space-evenly ${styles.header}`}>

            <img className="logo" src="/Logo.svg" alt="Logo" width={147} />

            <HeaderMenu />
            <Link className="link" href="/account"><UserButton firstName={user?.firstName} lastName={user?.lastName} /></Link>
        </header>
    )
}