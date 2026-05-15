import "../globals.css"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer";
import React from "react";
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
        <body className="layout">
        <Header />

        <main className="content">
            {children}
        </main>

        <Footer />
        </body>
        </html>
    )
}