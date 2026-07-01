import {proxyFetch} from "@/lib/projectsService";


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

    const body = { name: newName,
                   email: newEmail }

    if(firstName !== "" || lastName !== "" || email !== "") {

        const data = await proxyFetch(`/api/profile`, "PUT", body)

        if(data.success) {

            const [fName, lName] =
                data.data.user.name.split(" ")

            setUser({
                firstName: fName,
                lastName: lName,
                mail: data.data.user.email
            })

            return data
        }
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


// Function to fecth login
export async function login(
    email: string,
    password: string
) {

    const response = await fetch(
        "/api/login",
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }
    )

    const data = await response.json()

    console.log("login:", data)

    return {
        ok: response.ok,
        data
    }
}

export function formatName(name: string) {

    if(!name){
        return {
            firstName:"",
            lastName:""
        }
    }
    const [firstName = "", lastName = ""] = name.split(" ")

    return { firstName, lastName }
}

export async function register(
    email: string,
    password: string
) {

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

    const user = data?.data?.user

    if (!response.ok || !user) {
        return {
            ok: false,
            data,
        }
    }

    const [firstName = "", lastName = ""] =
        (user.name ?? "").split(" ")

    return {
        ok: true,
        data: {
            user: {
                ...user,
                firstName,
                lastName,
            },
        },
    }
}
