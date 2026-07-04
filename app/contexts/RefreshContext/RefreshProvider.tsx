"use client"
import { useState } from "react";
import { RefreshContext } from "./RefreshContext";

export function RefreshProvider({ children }: { children: React.ReactNode }) {
    const [reloadKey, setReloadKey] = useState(0);

    const refresh = () => {
        setReloadKey(k => k + 1);
    };

    return (
        <RefreshContext.Provider value={{ refresh, reloadKey }}>
            {children}
        </RefreshContext.Provider>
    );
}