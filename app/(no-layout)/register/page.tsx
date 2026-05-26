"use client"
import styles from "@/app/(no-layout)/Login.module.css";
import Image from "next/image";
import TextInput from "@/components/input/TextInput/TextInput";
import Button from "@/components/input/Button/Button";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useUser} from "@/app/contexts/useUser";

export default function registerPage (){

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [hasRegisterError, setHasRegisterError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const { setUser } = useUser()

    async function handleRegister(
        e: React.FormEvent
    ) {
        e.preventDefault()

        if (isLoading) {
            return
        }

        setHasRegisterError(false)
        setIsLoading(true)

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            })

            const data = await response.json()

            console.log("data", data)

            // Wrong IDs, set error state and return nothing
            if (!response.ok) {
                setHasRegisterError(true)
                setIsLoading(false)
                return
            }

            // Success login
            const dataUser = data.data.user

            const [firstName, lastName] = dataUser.name.split(" ")
            const mail = dataUser.email

            setUser({firstName, lastName, mail})

            router.push("/dashboard")
            router.refresh()

        } catch (error) {
            console.error("Network error :", error)
            setIsLoading(false)
        }
    }

    return(
        <section className={styles.loginpage}>

            <form onSubmit={handleRegister} className={`flex-col align-center justify-space-evenly ${styles.logincontainer}`}>
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
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                        <TextInput label="Password"
                                   type="password"
                                   width="282px"
                                   onChange={(e) => {
                                       setPassword(e.target.value)
                                   }}
                        />
                        <Button text={isLoading ? "Enregistrement" : "S'inscrire"}
                                type="submit"
                                disabled={isLoading}
                        />

                    </div>
                </div>
                <div className={`flex-row align-center inter14400 ${styles["account"]}`}>
                    <p>Déjà inscrit ?</p>
                    <Link href="/"><span className={`${styles["new-account"]}`}>Se connecter</span></Link>
                </div>
            </form>
        </section>
    )
}