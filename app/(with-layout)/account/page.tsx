import AccountForm from "@/components/Account/Account";
import styles from "./Account.module.css"

export default function accountPage (){

    return(
        <section className={`flex-col align-center justify-center ${styles["account-container"]}`}>
            <AccountForm />
        </section>
    )
}