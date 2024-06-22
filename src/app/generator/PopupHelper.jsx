import "./PopupHelper.sass";
import { useState, useEffect } from 'react';
import { FormField } from "./FormComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";  
import { useCollapse } from "react-collapsed";
import { faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function PopupHelper({ showPopup, setShowPopup, morgueid }) {
    const [formData, setFormData] = useState({
        id: "",
        promptId: morgueid,
        death_story: "",
        person_features: "",
        memorial_activity: "",
        alive_family: "",
        dead_family: "",
        elementary_school: "",
        middle_school: "",
        high_school: "",
        college: "",
        graduate: "",
        career: "",
        hobby: "",
        volunteer: "",
        religion: ""
    });
    

    useEffect(() => {
        if (showPopup) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [showPopup]);

    if (!showPopup) return null;

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleClose = async () => {
        try {
            console.log("current id: " + formData.id);
            const response = await fetch('/api/prompt_data', {
                method: formData.id === "" ? 'POST' : 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Prompt created/updated:', result.id);
                setFormData({ ...formData, id: result.id });
                console.log({ ...formData, id: result.id });
                console.log(formData);
                console.log(formData.death_story===""?"":"死因:"+ formData.death_story)
                console.log(formData.person_features===""?"":"特點:"+ formData.person_features)
                console.log(formData.memorial_activity===""?"":"悼念活動:"+ formData.memorial_activity)
                console.log(formData.alive_family===""?"":"親愛的在世家人:"+ formData.alive_family) 
                console.log(formData.dead_family===""?"":"親愛的已逝家人:"+ formData.dead_family)
                console.log(formData.elementary_school===""?"":"小學:"+ formData.elementary_school)
                console.log(formData.middle_school===""?"":"國中:"+ formData.middle_school)
                console.log(formData.high_school===""?"":"高中:"+ formData.high_school)
                console.log(formData.college===""?"":"大學:"+ formData.college)
                console.log(formData.graduate===""?"":"研究所:"+ formData.graduate)
                console.log(formData.career===""?"":"職業生涯:"+ formData.career)
                console.log(formData.hobby===""?"":"興趣愛好:"+ formData.hobby)
                console.log(formData.volunteer===""?"":"志願服務:"+ formData.volunteer)
                console.log(formData.religion===""?"":"宗教信仰:"+ formData.religion)
                //setShowPopup(false);
            } else {
                const errorText = await response.text();
                console.error('Failed to save data:', errorText);
                alert(`Failed to save data: ${errorText}`);
            }
        } catch (error) {
            console.error('Error saving data:', error);
            alert(`Error saving data: ${error.message}`);
        }
    };

    return (
        <div className="popup-helper">
            <div className="Header">Ai 輔助生命故事撰寫</div>
            <div className="subHeader">請填寫相關的生命的資訊以開始。可以嘗試創建多個版本，並挑選最喜愛的版本。</div>
            <HelperSection title="死亡資料" image="/assets/image 18.png">
                <div className="popup-content form-fields">
                    <FormField label="死亡詳情">
                        <textarea placeholder="怎麼死亡的？" onChange={(e) => handleInputChange("death_story", e.target.value)} />
                    </FormField>
                </div>
            </HelperSection>
            <HelperSection title="常見資訊" image="assets/image 18-1.png">
                <div className="popup-content form-fields">
                    <FormField label="逝者的特點">
                        <textarea placeholder="如何描述他們的性格、特質等？" onChange={(e) => handleInputChange("person_features", e.target.value)} />
                    </FormField>
                    <FormField label="悼念活動">
                        <textarea placeholder="是否計劃了悼念活動？地點和時間是？" onChange={(e) => handleInputChange("memorial_activity", e.target.value)} />
                    </FormField>
                </div>
            </HelperSection>
            <HelperSection title="家庭背景" image="/assets/image 17.png">
                <div className="popup-content form-fields">
                    <FormField label="親愛的在世家人">
                        <textarea placeholder="請為親近的在世家人提供名字和關係。" onChange={(e) => handleInputChange("alive_family", e.target.value)} />
                    </FormField>
                    <FormField label="親愛的已逝家人">
                        <textarea placeholder="請為親近的已逝家人提供名字和關係。" onChange={(e) => handleInputChange("dead_family", e.target.value)} />
                    </FormField>
                </div>
            </HelperSection>
            <HelperSection title="教育程度" image="/assets/image 19.png">
                <div className="popup-content form-fields">
                    <FormField label="小學">
                        <input type="text" onChange={(e) => handleInputChange("elementary_school", e.target.value)} />
                    </FormField>
                    <FormField label="國中">
                        <input type="text" onChange={(e) => handleInputChange("middle_school", e.target.value)} />
                    </FormField>
                    <FormField label="高中">
                        <input type="text" onChange={(e) => handleInputChange("high_school", e.target.value)} />
                    </FormField>
                    <FormField label="大學">
                        <input type="text" onChange={(e) => handleInputChange("college", e.target.value)} />
                    </FormField>
                    <FormField label="研究所">
                        <input type="text" onChange={(e) => handleInputChange("graduate", e.target.value)} />
                    </FormField>
                </div>
            </HelperSection>
            <HelperSection title="職業生涯" image="/assets/image 21.png">
                <div className="popup-content form-fields">
                    <FormField label="職業／職涯亮點">
                        <textarea placeholder="請列出逝者的工作經驗和任何職涯成就" onChange={(e) => handleInputChange("career", e.target.value)} />
                    </FormField>
                </div>
            </HelperSection>
            <HelperSection title="興趣愛好" image="/assets/image 23.png">
                <div className="popup-content form-fields">
                    <FormField label="任何的興趣愛好">
                        <textarea placeholder="平日熱衷於做什麼？" onChange={(e) => handleInputChange("hobby", e.target.value)} />
                    </FormField>
                </div>
            </HelperSection>
            <HelperSection title="志願服務" image="assets/image 22.png">
                <div className="popup-content form-fields">
                    <FormField label="任何志願服務">
                        <textarea placeholder="是否有志願服務？" onChange={(e) => handleInputChange("volunteer", e.target.value)} />
                    </FormField>
                </div>
            </HelperSection>
            <HelperSection title="宗教信仰" image="/assets/image 24.png">
                <div className="popup-content form-fields">
                    <FormField label="所信仰的宗教">
                        <textarea placeholder="請列出逝者的信仰" onChange={(e) => handleInputChange("religion", e.target.value)} />
                    </FormField>
                </div>
            </HelperSection>
            <div className="popup-helper-buttons">
                <button onClick={() => setShowPopup(false)}>關閉</button>
                <button onClick={handleClose}>生成生命故事</button>
            </div>
        </div>
    );
}

function HelperSection({ title, children, image }) {
    const [isOpen, setIsOpen] = useState(false);
    const { getCollapseProps, getToggleProps } = useCollapse({ isOpen });

    const toggleSection = () => {
        setIsOpen(!isOpen);
    };

    return (
        <section className="helper-section">
            <div className="helper-section-header" {...getToggleProps({ onClick: toggleSection })}>
                {image && <img src={image} alt="icon" className="section-image" />}
                <h2>{title}</h2>
                <div className="arrow-icon">
                    <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} className={`arrow-icon ${isOpen ? 'open' : ''}`} />
                </div>
            </div>
            <div {...getCollapseProps()} className="form-fields">
                {isOpen && children}
            </div>
            <hr className="section-divider" />
        </section>
    );
}