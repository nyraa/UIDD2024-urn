import "@app/components/Title.sass";

export default function Title({ children }) {
    return (
        <div className="logo-title">
            {children}
        </div>
    )
}