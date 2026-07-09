import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import React from "react"

export default function Layout({
                                   children,
                               }: {
    children: React.ReactNode
}) {
    return (
        <div className="layout">

            <Header/>

            <main className="content">
                {children}
            </main>

            <Footer/>

        </div>
    )
}