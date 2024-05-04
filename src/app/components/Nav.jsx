import { func } from "prop-types"

export default function Nav() {
    return (
        <nav>
            <NavLink href="https://www.youtube.com/watch?v=Zl7T3tIqrDA">聯絡我們</NavLink>
            <NavLink href="https://www.youtube.com/watch?v=Zl7T3tIqrDA">登入</NavLink>
            <NavLink href="https://www.youtube.com/watch?v=Zl7T3tIqrDA">註冊</NavLink>
        </nav>
    )
};

function NavLink({ href, children }) {
    return <a href={href} target="_blank">{children}</a>;
};