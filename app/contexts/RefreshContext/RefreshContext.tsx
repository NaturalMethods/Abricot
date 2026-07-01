"use client"
import { createContext } from "react";

type RefreshContextType = {
    refresh: () => void;
    reloadKey: number;
};

export const RefreshContext = createContext<RefreshContextType>({
    refresh: () => {},
    reloadKey: 0,
});