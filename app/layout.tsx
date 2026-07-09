import "./globals.css"
import UserProvider from "@/app/contexts/UserProvider";

export default function RootLayout({children}: { children: React.ReactNode }) {

    return (
        <html lang="fr">
        <body>
            <UserProvider>
                {children}
            </UserProvider>
        </body>
        </html>
    )
}