import "./PopupHelper.sass";
import { useState }from 'react';
import React, { useEffect } from 'react';
import { FormField } from "./FormComponents";
import { useCollapse } from "react-collapsed";

//flags

export default function PopupHelper({ showPopup, setShowPopup, setStory }) {
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

    const handleClose = () => {
      setShowPopup(false);
    };
    return (
        <div className="popup-helper">
                <div className="Header">Ai 輔助生命故事撰寫</div>
                <div className="subHeader">請填寫相關的生命的資訊以開始。可以嘗試創建多個版本，並挑選最喜愛的版本。</div>
            <HelperSection title="基本資料">
                <div className="popup-content">
                <FormField label="姓名" column="1-2">
                    <input type="text" onChange={(e) => setStory("name", e.target.value)} />
                </FormField>
                <FormField label="最後居住城市" column="1-2">
                    <input type="text" onChange={(e) => setStory("city", e.target.value)} />
                </FormField>
                <FormField label="出生日期" column="2-3">
                    <input type="date" onChange={(e) => setStory("birthdate", e.target.value)} />
                </FormField>
                <FormField column="1-3">
                    <select onChange={(e) => setStory("birth_calendar", e.target.value)}>
                        <option value="lunar">農曆</option>
                        <option value="solar">陽曆</option>
                    </select>
                </FormField>
                <FormField label="逝世日期" column="2-3">
                    <input type="date" onChange={(e) => setStory("deathdate", e.target.value)} />
                </FormField>
                <FormField column="1-3">
                    <select onChange={(e) => setStory("death_calendar", e.target.value)}>
                        <option value="lunar">農曆</option>
                        <option value="solar">陽曆</option>
                    </select>
                </FormField>
                </div>
            </HelperSection>
            <HelperSection title="常見資訊">
                <div className="popup-content">
                <FormField label="逝者的特點">
                    <textarea placeholder="如何描述他們的性個、特質等？"onChange={(e) => setStory("如何描述他們的性個、特質等？", e.target.value)} />
                </FormField>
                <FormField label="悼念活動">
                    <textarea placeholder="是否計劃了悼念活動？地點和時間是？"onChange={(e) => setStory("是否計劃了悼念活動？地點和時間是？", e.target.value)} />
                </FormField>
                </div>
            </HelperSection>
            <HelperSection title="家庭背景">
                <div className="popup-content">
                <FormField label="親愛的在事家人">
                    <textarea placeholder="請為親近的在事家人提供名字和關係。"onChange={(e) => setStory("請為親近的在世家庭成員提供名字和關係。", e.target.value)} />
                </FormField>
                <FormField label="親愛的已逝家人">
                    <textarea placeholder="請為親近的已逝家人提供名字和關係。"onChange={(e) => setStory("請為親近的已逝家庭成員提供名字和關係。", e.target.value)} />
                </FormField>
                </div>
            </HelperSection>
            <HelperSection title="教育程度">
                <div className="popup-content">
                <FormField label="小學">
                    <input type="text" onChange={(e) => setStory("", e.target.value)} />
                </FormField>
                <FormField label="國中">
                    <input type="text" onChange={(e) => setStory("", e.target.value)} />
                </FormField>
                <FormField label="高中">
                    <input type="text" onChange={(e) => setStory("", e.target.value)} />    
                </FormField>
                <FormField label="大學">
                    <input type="text" onChange={(e) => setStory("", e.target.value)} />    
                </FormField>

                <FormField label="研究所">  
                    <input type="text" onChange={(e) => setStory("", e.target.value)} />    
                </FormField>
                </div>
            </HelperSection>
            <HelperSection title="職業生涯">
                <div className="popup-content">
                <FormField label="職業／職涯亮點">
                    <textarea placeholder="請列出逝者的工作經驗和任何職涯成就 "onChange={(e) => setStory("請列出逝者的工作經驗和任何職涯成就", e.target.value)} />    
                </FormField>
                </div>
            </HelperSection>
            <HelperSection title="興趣愛好">
                <div className="popup-content">
                <FormField label="任何的興趣愛好">
                    <textarea placeholder="平日熱衷於做什麼？"onChange={(e) => setStory("平日熱衷於做什麼？", e.target.value)} />    
                </FormField>
                </div>
            </HelperSection>
            <HelperSection title="志願服務">
                <div className="popup-content">
                <FormField label="任何志願服務">
                    <textarea placeholder="是否有志願服務？"onChange={(e) => setStory("是否有志願服務？", e.target.value)} />    
                </FormField>
                </div>
            </HelperSection>
            <HelperSection title="宗教信仰">
                <div className="popup-content">
                <FormField label="所信仰的宗教">
                    <textarea placeholder="請列出逝者的信仰"onChange={(e) => setStory("請列出逝者的信仰", e.target.value)} />    
                </FormField>
                </div>
            </HelperSection>
            <div className="popup-helper-buttons">
                <button onClick={() => setShowPopup(false)}>取消</button>    
                <button onClick={handleClose}>生成生命故事</button>
            </div>
        </div>
    )
    };


function HelperSection({ title, children,icon }) {
    const [isOpen, setIsOpen] = useState(false);
    const { getCollapseProps, getToggleProps } = useCollapse({ isOpen });   

    const toggleSection = () => {
        setIsOpen(!isOpen);
    };
    return (
        <section className="helper-section">
             <div className="helper-section-header" {...getToggleProps({ onClick: toggleSection })}>
                
                <h2>{title}</h2>
        
            </div>
            <div {...getCollapseProps()} className="form-fields">
                {isOpen && children}
            </div>
            <hr className="section-divider" />
        </section>
    );
}
