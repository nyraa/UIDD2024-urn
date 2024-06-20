"use client";
import "./Form.sass";
import "./Form2.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowRight, faL } from "@fortawesome/free-solid-svg-icons";
import { FormSection, FormField } from "./FormComponents";
import { useEffect, useState } from "react";
import Urn from "@app/components/Urn";
import Button from "@app/components/Button";

export default function Form2({ onChange=() => {}, formData, setFormData }) {
    const [prompt, setPrompt] = useState("");
    const [select, setSelect] = useState(0);
    const [textureSrc, setTextureSrc] = useState("");
    const [generatePending, setGeneratePending] = useState(false);
    function generate(e)
    {
        if(generatePending)
        {
            return;
        }
        if(!prompt)
        {
            return;
        }
        setGeneratePending(true);
        e.target.classList.add("pending");
        fetch("/api/generate_image", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt
            })
        }).then((res) => res.json()).then((data) => {
            console.log(data);
            const img_path = "/api/image_proxy?path=" + data.images[0];
            setTextureSrc(img_path);
            setFormData({ ...formData, urn_texture_src: img_path });
            setGeneratePending(false);
            e.target.classList.remove("pending");
        }).catch((e) => {
            console.error(e);
            setGeneratePending(false);
            e.target.classList.remove("pending");
        });
    }
    useEffect(() => {
        console.log(select);
        setFormData({ ...formData, urn_index: select });
    }, [select]);
    useEffect(() => {
        setTextureSrc(formData.urn_texture_src);
        setSelect(formData.urn_index);
    }, []);
    return (
        <form className="form" onSubmit={(e) => e.preventDefault()}>
            <section className="generator-section">
                <div className="prompt">
                    <h2>輸入一些文字敘述想生成的材質樣式</h2>
                    <textarea placeholder="例如顏色、感受等形容" value={prompt} onChange={(e) => setPrompt(e.target.value)}>
                    </textarea>
                    <h2>選擇骨灰罈外型</h2>
                    <UrnSelector select={select} count={5} setSelect={(i) => setSelect(i)} />
                    <Button onClick={generate}>生成</Button>
                </div>
                <div className="preview">
                    <Urn objIndex={select} key="urnpreview" textureSrc={textureSrc} preview={true} />
                </div>
            </section>
            {/* <FormSection title="生成紀錄">
                
            </FormSection> */}
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