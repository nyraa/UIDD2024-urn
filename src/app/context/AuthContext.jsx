"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isLogin, setLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [useremail, setEmail] = useState("");
    const [userid, setUserid] = useState("");
    
    // init
    useEffect(() => {
        console.log("init");
        if(sessionStorage.getItem("isLogin") == "true")
        {
            setUsername(sessionStorage.getItem("username"));
            setEmail(sessionStorage.getItem("useremail"));
            setUserid(sessionStorage.getItem("userid"));
            setLogin(true);
        }
    }, []);

    // update session storage
    useEffect(() => {
        console.log("login update to ", isLogin);
        sessionStorage.setItem("isLogin", isLogin);
        if(isLogin)
        {
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("useremail", useremail);
            sessionStorage.setItem("userid",userid);
        }
    }, [isLogin]);

    const login = (email, name, id) => {
        setUsername(name);
        setEmail(email);
        setUserid(id);
        setLogin(true);
    };
    const logout = () => {
        setLogin(false);
    }

    return (
        <AuthContext.Provider value={{ isLogin, username, useremail, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};