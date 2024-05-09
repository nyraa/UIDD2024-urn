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
            <ActionLinks />
            <Splitter>以不同類別探索靈骨塔</Splitter>
            <Splitter>今日逝世紀念</Splitter>
        </>
    );
}

// 尋找所愛
function FindYourLove() {
    return (
        <section className="find-your-love">
            <video src="assets/homepage.mp4" className="background-video" autoPlay={true} loop={true} muted={true}>
            </video>
            <h1>尋找所愛</h1>
            <div className="description">
                搜尋全球首創AI互動線上靈塔
            </div>
            <SearchBox />
        </section>
    )
}

function ActionLinks() {
    return (
        <section className="action-links">
            <ActionLink title="協助創建塔位" line1="AI 輔助個人事蹟創建" line2="助您珍藏在世寶貴回憶" />
            <ActionLink title="AI悼念互動" line1="搜尋全球首創" line2="AI 互動線上靈塔" />
        </section>
    )
}

function ActionLink({ title, line1, line2, href }) {
    return (
        <div className="action-link">
            <img className="logo" src="assets/logo.png" />
            <div className="intro-title">{title}</div>
            <div className="hr"></div>
            <div className="intro-text">{line1}<br />{line2}</div>
        </div>
    )
}