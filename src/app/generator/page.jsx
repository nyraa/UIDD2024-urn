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

export default function GeneratorPage() {
    const debug_owner_id = "clxnhadhu0000i8gftwklh8xw";
    const [stage, setStage] = useState(0);
    const [popup, setPopup] = useState(false);
    const [formData, setFormData] = useState({
        id:"",
        ownerId: debug_owner_id, // 假設已經有用戶的 ID
        golden_quote: "",
        cover_src: "",
        urn_index: 0,
        urn_texture_src: "",
        name: "",
        title: "",
        born_date: "",
        born_calendar: "solar",
        death_date: "",
        death_calendar: "solar",
        last_live_city: "",
        life_story: "",
        gallery: [null, null, null],
        is_draft: true
    });

    async function handleUpload()
    {
        console.log("Form Data on Submit:", formData); // 在提交時輸出 
        // 確保日期字段是有效的 Date 對象
        const formDataWithValidDates = {
            ...formData,
            born_date: formData.born_date, // 保持字符串格式
            born_calendar: formData.born_calendar,
            death_date: formData.death_date, // 保持字符串格式
            death_calendar: formData.death_calendar,
            gallery: formData.gallery.filter(image => image !== null) // 過濾掉 null 值
        };
            console.log("Form Data with Valid Dates:", formDataWithValidDates);


        try {
            const response = await fetch('/api/generator_data', {
                method: formData.id === "" ?'POST':'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataWithValidDates)
            });

            if (response.ok) {
                const result = await response.json();
                setFormData({ ...formData, id: result.id });
                console.log('Data saved successfully');
            } else {
                const errorText = await response.text();
                console.log('Failed to save data');
                console.log('Response Status:', response.status);
                console.log('Response Text:', errorText);
            }
        } catch (error) {
            console.error('An error occurred while saving data', error);
        }
    }

    useEffect(() => {
        if(stage >= 4)
        {
            // upload
            formData.is_draft = false;
            handleUpload().then(() => {
                window.location.href = `/urn/${formData.id}`;
            });
        }
    }, [stage]);

    return (
        <>
            <Nav title={true} />
            <div className={`generator ${stage >= 1 && stage <= 2 ? "wave-bg" : ""}`}>
                <Header stage={stage} setStage={setStage} />
                {stage == 1 && <Form1 setPopup={setPopup} formData={formData} setFormData={setFormData} handleUpload={handleUpload} />}
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