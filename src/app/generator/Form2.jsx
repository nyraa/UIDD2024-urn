"use client";
import "./Form.sass";
import "./Form2.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowRight, faL } from "@fortawesome/free-solid-svg-icons";
import { FormSection, FormField } from "./FormComponents";
import { useEffect, useState } from "react";
import Urn from "@app/components/Urn";
import Button from "@app/components/Button";

export default function Form2({ onChange=() => {}}) {
    const [prompt, setPrompt] = useState("");
    const [select, setSelect] = useState(0);
    const [textureSrc, setTextureSrc] = useState("");
    useEffect(() => {
        console.log(select);
    }, [select]);
    return (
        <form className="form" onSubmit={(e) => e.preventDefault()}>
            <section className="generator-section">
                <div className="prompt">
                    <h2>輸入一些文字敘述想生成的材質樣式</h2>
                    <textarea placeholder="例如顏色、感受等形容" value={prompt} onChange={(e) => setPrompt(e.target.value)}>
                    </textarea>
                    <h2>選擇骨灰罈外型</h2>
                    <UrnSelector select={select} count={5} setSelect={(i) => setSelect(i)} />
                    <Button>生成</Button>
                </div>
                <div className="preview">
                    <Urn objIndex={select} key="urnpreview" textureSrc={textureSrc} preview={true} />
                </div>
            </section>
            <FormSection title="生成紀錄">
                
            </FormSection>
        </form>
    )
}

function UrnSelector({ select, setSelect, count })
{
    return (
        <div className="urn-selector">
            {
                Array.from({ length: count }, (_, i) => (
                        <div className={`urn-option ${select == i ? "selected" : ""}`} onClick={() => setSelect(i)} key={i}>
                        <Urn objIndex={i} key={i} enableRotate={false} />
                    </div>
                ))
            }
        </div>
    );
}