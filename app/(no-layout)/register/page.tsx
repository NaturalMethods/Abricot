import styles from "@/app/(no-layout)/Login.module.css";
import Image from "next/image";
import TextInput from "@/components/input/TextInput/TextInput";
import Button from "@/components/input/Button/Button";
import Link from "next/link";

export default function registerPage (){

    return(
        <section className={styles.loginpage}>
            <div className={`flex-col align-center justify-space-evenly ${styles.logincontainer}`}>
                <Image
                    src="/logo.svg"
                    alt="logo"
                    width={252}
                    height={32}
                />
                <div className="flex-col align-center">
                    <div className={`flex-col align-center ${styles.conform}`}>
                        <h1 className="manrope40700 dark-orange">Inscription</h1>
                        <TextInput
                            label="Email"
                            type="email"
                            width="282px"
                        />
                        <TextInput label="Password"
                                   type="password"
                                   width="282px"
                        />
                        <Button text={"S'inscrire"} />

                    </div>
                </div>
                <div className={`flex-row align-center inter14400 ${styles["account"]}`}>
                    <p>Déjà inscrit ?</p>
                    <Link href="/"><span className={`${styles["new-account"]}`}>Se connecter</span></Link>
                </div>
            </div>
        </section>
    )
}