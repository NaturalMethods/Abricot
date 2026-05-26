import {useUser} from "@/app/contexts/useUser";

export async function updateProfile(
    firstName: string,
    lastName: string,
    email: string,
    user: any,
    setUser: any
) {

    const newFirstName = firstName || user?.firstName
    const newLastName = lastName || user?.lastName
    const newEmail = email || user?.mail
    const newName = `${newFirstName} ${newLastName}`

    if(firstName !== "" || lastName !== "" || email !== "") {
        const response = await fetch(
            "/api/profile",
            {
                method: "PUT",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify({
                    name: newName,
                    email: newEmail,
                }),
            }
        )

        const data = await response.json()

        if (!data)
            return

        const [fName, lName] =
            data.data.user.name.split(" ")

        setUser({
            firstName: fName,
            lastName: lName,
            mail: data.data.user.email
        })

        return data
    }
    return null
}

export async function updatePassword(
    password : string,
    newPassword : string,
){

    if(password?.trim() && newPassword?.trim()) {

        const response = await fetch(
            "/api/password",
            {
                method: "PUT",
                headers: {
                    "Content-Type":
                        "application/json",
                },
                body: JSON.stringify({
                    currentPassword: password,
                    newPassword: newPassword,
                }),
            }
        )
        if (response.ok)
            return response.json()

        else return null
    }
}

export async function logout() {

    await fetch(
        "/api/logout",
        {
            method: "POST",
        }
    )
}