"use client"

import styles from "@/app/(no-layout)/Login.module.css";
import Image from "next/image";
import TextInput from "@/components/input/TextInput/TextInput";
import Button from "@/components/input/Button/Button";
import Link from "next/link";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {useUser} from "@/app/contexts/useUser";
import {register} from "@/lib/authService";

/**
 * Component containing the registration page with the registration form.
 * @constructor
 */
export default function RegisterPage() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [hasRegisterError, setHasRegisterError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const router = useRouter()

    const {setUser} = useUser()

    // Executed actions when submitting the form
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

            const {ok, data} = await register(
                email,
                password
            )

            // Display error message if registration failed
            if (!ok) {
                setHasRegisterError(true)
                return
            }

            // Set user data in context
            setUser({
                id: data.user.id,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                mail: data.user.email
            })

            router.push("/account")
            router.refresh()

        } catch (error) {
            console.error(
                "Network error:",
                error
            )

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className={styles.loginpage}>

            <form onSubmit={handleRegister}
                  className={`flex-col align-center sm:w-[562px] justify-space-evenly ${styles.logincontainer}`}>
                <Image loading={"eager"}
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
                            ariaLabel={"Email"}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                        <TextInput label="Password"
                                   type="password"
                                   width="282px"
                                   ariaLabel={"Password"}
                                   onChange={(e) => {
                                       setPassword(e.target.value)
                                   }}
                        />
                        <Button text={isLoading ? "Enregistrement" : "S'inscrire"}
                                type="submit"
                                width="250px"
                                disabled={isLoading}
                        />

                    </div>
                    {hasRegisterError && (
                        <p className={`manrope40700 ${styles["error-message"]}`}>
                            Identifiants invalides
                        </p>
                    )}
                </div>
                <div className={`flex-row align-center inter14400 ${styles["account"]}`}>
                    <p>Déjà inscrit ?</p>
                    <Link href="/"><span className={`${styles["new-account"]}`}>Se connecter</span></Link>
                </div>
            </form>
        </section>
    )
}