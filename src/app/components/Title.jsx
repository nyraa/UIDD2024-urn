import "@app/components/Title.sass";

export default function Title({ children }) {
    return (
        <a className="logo-title" href="/">
            {children}
        </a>
    )
}