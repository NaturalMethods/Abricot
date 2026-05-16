"use client"

import styles from "./Login.module.css"
import TextInput from "../../components/input/TextInput/TextInput"
import Image from "next/image"
import Button from "../../components/input/Button/Button"
import Link from "next/link"
import { useState } from "react"
import {useRouter} from "next/navigation";

export default function LoginPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()

    async function handleLogin(
        e: React.FormEvent
    ) {
        e.preventDefault()

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

            // ❌ erreur HTTP (401, 500...)
            if (!response.ok) {
                console.error("Erreur HTTP login")
                return
            }

            // ❌ échec logique backend
            if (!data.success) {
                console.error("Login échoué :", data.message)

                // optionnel : afficher les détails de validation
                if (data.details) {
                    console.error("Détails :", data.details)
                }

                return
            }

            // ✅ succès login
            const token = data.data.token
            const user = data.data.user

            console.log("user connecté :", user)
            console.log("token :", token)

            router.push("/dashboard")
            router.refresh()

        } catch (error) {
            console.error("Erreur réseau :", error)
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
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                        <TextInput
                            label="Password"
                            type="password"
                            width="282px"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />

                        <Button
                            text="Se connecter"
                            type="submit"
                        />

                    </div>

                    <p className={`inter14400 ${styles["forgotten-password"]}`}>
                        Mot de passe oublié?
                    </p>

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