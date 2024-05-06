import "@app/components/Nav.sass";
import Title from "@app/components/Title";

export default function Nav( { title, children } ) {
    return (
        <nav>
            {title && <Title>骨諺云</Title>}
            <NavLink href="https://www.youtube.com/watch?v=Zl7T3tIqrDA">聯絡我們</NavLink>
            <NavLink href="https://www.youtube.com/watch?v=Zl7T3tIqrDA">登入</NavLink>
            <NavLink href="https://www.youtube.com/watch?v=Zl7T3tIqrDA">註冊</NavLink>
        </nav>
    )
};

function NavLink({ href, children }) {
    return <a href={href} target="_blank">{children}</a>;
};