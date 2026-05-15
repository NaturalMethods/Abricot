
import styles from "./Login.module.css"
import TextInput from "@/components/input/TextInput";
export default function loginPage (){

    return(
        <section className={styles.loginpage}>
            <div className={`flex-col align-center justify-space-evenly ${styles.logincontainer}`}>
                <img className="logo" src="/Logo.svg" alt="Logo" width={252} />
                <div className={`flex-col align-center ${styles.conform}`}>
                    <h1 className="manrope40700 dark-orange">Connexion</h1>
                    <TextInput
                        label="Email"
                        type="email"
                        width="282px"
                    />
                    <TextInput label="Password"
                               type="password"
                               width="282px"
                    />
                </div>
            </div>
        </section>
    )
}