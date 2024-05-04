import "@app/components/Title.sass";

export default function Title({ position, children }) {
    return (
        <div className={`logo-title ${position}`}>
            {children}
        </div>
    )
}