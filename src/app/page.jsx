import Image from "next/image";
import Nav from "@app/components/Nav";
import HomeBanner from "@app/components/HomeBanner";

import "@app/homepage.sass";

export default function Home() {
    return (
        <>
            <Nav title={true} />
            <HomeBanner />
            <FindYourLove />
        </>
    );
}

// 尋找所愛
function FindYourLove() {
    return (
        <section className="find-your-love">
            <h1>尋找所愛</h1>
            <div className="description">
                搜尋全球首創AI互動線上靈塔
            </div>
        </section>
    )
}