"use client"

import AccountForm from "@/components/Account/Account";
import styles from "./Account.module.css"
import {setPageTitle} from "@/lib/utils";
import {useEffect} from "react";

export default function accountPage (){

    useEffect(() => {
        setPageTitle("Compte")
    }, [])

    return(
        <section className={`flex-col  align-center justify-center ${styles["account-container"]}`}>
            <AccountForm />
        </section>
    )
}
