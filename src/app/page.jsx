import Image from "next/image";
import Nav from "@app/components/Nav";
import HomeBanner from "@app/components/HomeBanner";
import SearchBox from "@app/components/SearchBox";
import Splitter from "@app/components/Splitter";

import "./homepage.sass";

export default function Home() {
    return (
        <>
            <Nav title={true} />
            <HomeBanner />
            <FindYourLove />
            <Splitter>以不同類別探索靈骨塔</Splitter>
            <Splitter>今日逝世紀念</Splitter>
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
            <SearchBox />
        </section>
    )
}