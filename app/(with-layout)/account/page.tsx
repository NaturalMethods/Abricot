"use client"

import AccountForm from "@/components/Account/Account";
import styles from "./Account.module.css"
import {setPageTitle} from "@/lib/utils";
import {useEffect} from "react";

/**
 * Component for the account page of the application
 * @constructor
 */
export default function AccountPage() {

    useEffect(() => {
        setPageTitle("Compte")
    }, [])

    return (
        <section className={`flex-col  align-center justify-center ${styles["account-container"]}`}>
            <AccountForm/>
        </section>
    )
}
