export default function TextBox({ setContent, onSubmit=() => {}}) {
    return (
        <input type="text" onChange={(e) => setContent(e.target.value)} onKeyDown={(e) => e.key == "Enter" && onSubmit()} />
    );
}