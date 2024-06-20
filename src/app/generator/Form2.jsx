"use client";
import "./Form.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FormSection, FormField } from "./FormComponents";
import { useEffect, useState } from "react";
import Urn from "@app/components/Urn";

export default function Form2({ onChange=() => {}}) {
    const [prompt, setPrompt] = useState("");
    const [select, setSelect] = useState(0);
    useEffect(() => {
        console.log(select);
    }, [select]);
    return (
        <form className="form" onSubmit={(e) => e.preventDefault()}>
            <div className="generator">
                <div className="prompt">
                    <h2>輸入一些文字敘述想生成的材質樣式</h2>
                    <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)}>
                    </textarea>
                    <h2>選擇骨灰罈外型</h2>
                    <UrnSelector count={5} setSelect={(i) => setSelect(i)} />
                </div>
                <div className="preview">
                    <Urn objIndex={select} key="urnpreview" textureSrc="/assets/background.png" />
                </div>
            </div>
            <FormSection title="生成紀錄">
                
            </FormSection>
        </form>
    )
}

function UrnSelector({ setSelect, count })
{
    return (
        <div className="urn-selector">
            {
                Array.from({ length: count }, (_, i) => (
                    <div className="urn-option" onClick={() => setSelect(i)} key={i}>
                        <Urn objIndex={i} key={i} />
                    </div>
                ))
            }
        </div>
    );
}