"use client"

import styles from "./AccountModal.module.css"
import TextInput from "@/components/input/TextInput/TextInput"
import { useState } from "react"
import Button from "@/components/input/Button/Button"
import { useRouter } from "next/navigation"

export default function AccountForm() {

    const router = useRouter()

    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleNewAccountInfos(e: React.FormEvent) {

        e.preventDefault()

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
    }

    async function handleLogout() {

        await fetch("/api/logout", {
            method: "POST",
        })

        router.push("/")
        router.refresh()
    }

    return (
        <section className="flex-col align-center gap30">

            <section className={`flex-col align-center ${styles["account-modal-container"]}`}>

                <div className={`flex-col ${styles["account-modal-title"]}`}>
                    <h5 className="manrope18600 grey800 margin-bottom-zero">
                        Mon compte
                    </h5>
                    <p className="inter16400 grey600">
                        Amélie Dupont
                    </p>
                </div>

                <form
                    onSubmit={handleNewAccountInfos}
                    className={`flex-col ${styles["account-modal-form"]}`}
                >

                    <TextInput
                        label="Nom"
                        type="text"
                        width="1097px"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />

                    <TextInput
                        label="Prénom"
                        type="text"
                        width="1097px"
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                    />

                    <TextInput
                        label="Email"
                        type="email"
                        width="1097px"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextInput
                        label="Mot de passe"
                        type="password"
                        width="1097px"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button
                        text="Modifier les informations"
                        type="submit"
                        width="242px"
                    />

                </form>

            </section>

            <Button
                text="Se déconnecter"
                type="button"
                width="242px"
                onClick={handleLogout}
            />

        </section>
    )
}