"use client";

import "@app/components/Nav.sass";
import Title from "@app/components/Title";
import { useAuth } from "@app/context/AuthContext";

export default function Nav( { title, children } ) {
    const { isLogin, login, logout } = useAuth();
    return (
        <nav>
            {title && <Title>骨諺云</Title>}
            <NavLink href="https://www.youtube.com/watch?v=Zl7T3tIqrDA">聯絡我們</NavLink>
            {
                isLogin
                    ? <NavLink href="#" onClick={logout}>登出</NavLink>
                    : <>
                        <NavLink href="#" onClick={login}>登入</NavLink>
                        <NavLink href="#">註冊</NavLink>
                    </>
            }
        </nav>
    )
};

function NavLink({ href, onClick, children }) {
    return <a href={href} onClick={onClick}>{children}</a>;
};