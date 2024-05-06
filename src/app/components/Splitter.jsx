import "@app/components/Splitter.sass"

export default function Splitter({ children }) {
    return (
        <div className="splitter">
            {children}
        </div>
    );
}