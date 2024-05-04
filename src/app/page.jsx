import Image from "next/image";
import Nav from "@app/components/Nav";

export default function Home() {
    return (
        <>
            <Nav />
            <h1>Home</h1>
            <a href="foo">foo</a>
        </>
    );
}
