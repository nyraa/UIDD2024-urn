import "./Form.sass";

export default function Form({ onChange }) {
    return (
        <form className="form" onSubmit={(e) => e.preventDefault()}>
            <FormSection title="基本資料">
            </FormSection>
        </form>
    );
}

function FormSection({ title, children }) {
    return (
        <section className="form-section">
            <h2>{title}</h2>
            {children}
        </section>
    );
}