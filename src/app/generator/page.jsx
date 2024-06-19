"use client";
import { useState, useEffect } from "react";
import "./generator.sass"
import Nav from "@app/components/Nav"
import Splitter from "@app/components/Splitter";
import Form1 from "./Form1"
import Form2 from "./Form2"
import PopupHelper from "./PopupHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faDownload } from "@fortawesome/free-solid-svg-icons";
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export default function GeneratorPage() {
    const [stage, setStage] = useState(0);
    const [popup, setPopup] = useState(false);

    useEffect(() => {
        if(stage >= 4)
        {
            window.location.href = "/bonelast/main.html";
        }
    }, [stage]);

    return (
        <>
            <Nav title={true} />
            <div className={`generator ${stage >= 1 && stage <= 2 ? "wave-bg" : ""}`}>
                <Header stage={stage} setStage={setStage} />
                {stage == 1 && <Form1 setPopup={setPopup} />}
                {stage == 2 && <Form2 />}
                {stage > 0 && <Navigation stage={stage} setStage={setStage} />}
            </div>
            {popup && <PopupHelper setPopup={setPopup} />}
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
            <Stage stage={stage} targetStage={0} />
            <Stage stage={stage} targetStage={1} />
            <Stage stage={stage} targetStage={2} />
            <Stage stage={stage} targetStage={3} />
        </div>
    );
}

function Stage({ stage, targetStage }) {
    const stage_text = [
        "方案選擇",
        "資料填寫",
        "塔位生成",
        "上傳設定"
    ];
    return (
        <div className="stage">
            <div className={`stage-number ${stage == targetStage ? "current-stage" : stage > targetStage ? "completed-stage" : "future-stage"}`}>
                <span>{targetStage + 1}</span>
            </div>
            <span className="stage-text">{stage_text[targetStage]}</span>
        </div>
    );
}

function Navigation({ stage, setStage }) {
    const handleSave = () => {
        // 獲取表單並提交
        const form = document.querySelector('form');
        if (form) {
          form.requestSubmit(); // 使用 requestSubmit() 提交表單
        }
      };
    return (
        <div className="navigation">
            <button className="prev" onClick={() => setStage(stage - 1)}><FontAwesomeIcon icon={faArrowLeft} />　上一步</button>
            <button className="save" onClick={handleSave}><FontAwesomeIcon icon={faDownload} />　儲存草稿</button>
            <button className="next" onClick={() => setStage(stage + 1)}>下一步　<FontAwesomeIcon icon={faArrowRight} /></button>
        </div>
    );
}