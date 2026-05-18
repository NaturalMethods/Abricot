"use client"

import styles from "./Login.module.css"
import TextInput from "../../components/input/TextInput/TextInput"
import Image from "next/image"
import Button from "../../components/input/Button/Button"
import Link from "next/link"
import {useState} from "react"
import {useRouter} from "next/navigation";
import {useUser} from "@/app/contexts/useUser";

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [hasLoginError, setHasLoginError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const { setUser } = useUser()


    async function handleLogin(
        e: React.FormEvent
    ) {
        e.preventDefault()

        if (isLoading) {
            return
        }

        setHasLoginError(false)
        setIsLoading(true)

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })

            const data = await response.json()

            console.log("data", data)

            // Wrong IDs, set error state and return nothing
            if (!response.ok) {
                setHasLoginError(true)
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

    return (
        <section className={styles.loginpage}>

            <form
                onSubmit={handleLogin}
                className={`flex-col align-center justify-space-evenly ${styles.logincontainer}`}
            >

                <Image
                    src="/logo.svg"
                    alt="logo"
                    width={252}
                    height={32}
                />

                <div className="flex-col align-center">

                    <div className={`flex-col align-center ${styles.conform}`}>

                        <h1 className="manrope40700 dark-orange">
                            Connexion
                        </h1>

                        <TextInput
                            label="Email"
                            type="email"
                            width="282px"
                            value={email}
                            hasError={hasLoginError}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />

                        <TextInput
                            label="Password"
                            type="password"
                            width="282px"
                            value={password}
                            hasError={hasLoginError}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />

                        <Button
                            text={isLoading ? "Connexion..." : "Se connecter"}
                            type="submit"
                            disabled={isLoading}
                        />

                    </div>

                    <p className={`inter14400 ${styles["forgotten-password"]}`}>
                        Mot de passe oublié?
                    </p>

                    {hasLoginError && (
                        <p
                            className={`manrope18600 ${styles["login-error"]}`}
                            role="alert"
                        >
                            Email ou mot de passe incorrect
                        </p>
                    )}

                </div>

                <div className={`flex-row align-center inter14400 ${styles["account"]}`}>

                    <p>Pas encore de compte ?</p>

                    <Link href="/register">
                        <span className={styles["new-account"]}>
                            Créer un compte
                        </span>
                    </Link>

                </div>

            </form>

        </section>
    )
}
