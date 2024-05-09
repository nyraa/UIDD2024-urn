"use client";

import { useState } from "react";
import "./generator.sass"
import Nav from "@app/components/Nav"
import Splitter from "@app/components/Splitter";

export default function GeneratorPage() {
    const [stage, setStage] = useState(0);

    return (
        <>
            <Nav title={true} />
            <Header stage={stage} setStage={setStage} />
        </>
    );
}

function Header({ stage, setStage }) {
    const stage_text = [
        "選擇並立即開始",
        "完成填寫並建立",
        "開始設計塔位"
    ]
    return (
        <section className="header">
            <div className="header-text">
                <h1>建立互動塔位　傳承精彩一生</h1>
                <Splitter>{stage_text[stage]}</Splitter>
            </div>
            <div className="action-indicator">
                {stage == 0 ? <ModeSelector setStage={setStage} /> : <ProgressIndicator stage={stage} />}
            </div>
        </section>
    );
}

function ModeSelector({ setStage }) {
    return (
        <div className="mode-selector">
            <ModeButton mode="self" setStage={setStage}>個人建立</ModeButton>
            <ModeButton mode="otherone" setStage={setStage}>協助建立</ModeButton>
        </div>
    );
}

function ModeButton({ mode, setStage }) {
    return (
        <button className="mode-button" onClick={() => setStage(1)}>
            <img src={mode == "self" ? "/assets/self-icon.png" : "/assets/help-icon.png"} />
            <span className="mode">{mode == "self" ? "個人建立" : "協助建立"}</span>
            {mode == "otherone" && <span className="free">免費試用</span>}
        </button>
    );
}

function ProgressIndicator({ stage }) {
    return (
        <div className="progress-indicator">
            <div className="progress-bar">
                <div className="progress" style={{ width: `${stage * 33.3}%` }}></div>
            </div>
        </div>
    );
}