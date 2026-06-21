import { createContext } from "react";

type RefreshContextType = () => void;
export const RefreshContext = createContext<RefreshContextType>(() => {});