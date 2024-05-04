import "@app/components/Title.sass";

export default function Title({ children }) {
    return (
        <div className="section-title">
            {children}
        </div>
    )
}