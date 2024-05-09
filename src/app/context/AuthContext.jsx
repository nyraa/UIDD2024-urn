"use client";

import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isLogin, setLogin] = useState(false);

    const login = () => setLogin(true);
    const logout = () => setLogin(false);

    return (
        <AuthContext.Provider value={{ isLogin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};