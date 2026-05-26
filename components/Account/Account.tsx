"use client"

import styles from "./AccountModal.module.css"
import TextInput from "@/components/input/TextInput/TextInput"
import {useState} from "react"
import Button from "@/components/input/Button/Button"
import {useRouter} from "next/navigation"
import {useUser} from "@/app/contexts/useUser";

import {
    updateProfile,
    logout, updatePassword
} from "@/lib/accountActions"

export default function AccountForm() {

    const router = useRouter()

    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const { user,setUser} = useUser()

    async function handleNewAccountInfos(
        e: React.FormEvent
    ) {

        e.preventDefault()

        const status = await updateProfile(
            firstName,
            lastName,
            email,
            user,
            setUser,
        )

        const passstatus = await updatePassword(
            password,
            newPassword
        )

        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
        setNewPassword("")

        router.refresh()
    }

    async function handleLogout() {

        await logout()

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
                        {user?.firstName} {user?.lastName}
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
                        value={lastName}
                        placeholder={user?.lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <TextInput
                        label="Prénom"
                        type="text"
                        width="1097px"
                        value={firstName}
                        placeholder={user?.firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <TextInput
                        label="Email"
                        type="email"
                        width="1097px"
                        value={email}
                        placeholder={user?.mail}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextInput
                        label="Mot de passe"
                        type="password"
                        width="1097px"
                        value={password}
                        placeholder={"●●●●●●●●●●●"}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <TextInput
                        label="Nouveau mot de passe"
                        type="password"
                        width="1097px"
                        value={newPassword}
                        placeholder={"●●●●●●●●●●●"}
                        onChange={(e) => setNewPassword(e.target.value)}
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