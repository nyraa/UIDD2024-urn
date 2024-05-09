export function FormSection({ title, children }) {
    return (
        <section className="form-section">
            <h2>{title}</h2>
            <div className="form-fields">
                {children}
            </div>
        </section>
    );
}

export function FormField({ label, column="1-1", children }) {
    return (
        <div className={`form-field column-frac-${column}`}>
            <label>{label ?? "　"}</label>
            {children}
        </div>
    );
}