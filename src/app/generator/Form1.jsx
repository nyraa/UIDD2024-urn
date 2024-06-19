import "./Form.sass";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FormSection,FormSection2,FormField ,FormField2,Carousel} from "./FormComponents";
import PopupHelper from './PopupHelper';
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();
//Create


export default function Form1({ onChange=() => {}, setPopup }) {
    // //特效
    // const FormWithCarousel = () => {
    //     const handleChange = (type, file) => {
    //       console.log(type, file);
    //     };
    // }
    const [formData, setFormData] = useState({
        name: "",
        city: "",
        birthdate: "",
        birth_calendar: "solar",
        deathdate: "",
        death_calendar: "solar",
        story: "",
        quote: "",
        images: []
    });

    const [showPopup, setShowPopup] = useState(false);
    
    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        onChange(field, value);
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files).map(file => URL.createObjectURL(file));
        setFormData({ ...formData, images: files });
        onChange("images", files);
    };
      
    const handleButtonClick = () => {
      setShowPopup(true);
    };
    const closePopup = () => {
        setShowPopup(false);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('api/generator_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Data saved successfully');
            } else {
                console.log('Failed to save data');
            }
        } catch (error) {
            console.error('An error occurred while saving data', error);
        }
    };


    return (
        <form className="form" onSubmit={handleSubmit}>
            <FormSection title="基本資料">
                <FormField label="姓名" column="1-2">
                    <input type="text" onChange={(e) => handleInputChange("name", e.target.value)} />
                </FormField>
                <FormField label="最後居住城市" column="1-2">
                    <input type="text" onChange={(e) => handleInputChange("city", e.target.value)} />
                </FormField>
                <FormField label="出生日期" column="2-3">
                    <input type="date" onChange={(e) => handleInputChange("birthdate", e.target.value)} />
                </FormField>
                <FormField column="1-3">
                    <select onChange={(e) => handleInputChange("birth_calendar", e.target.value)}>
                        <option value="lunar">農曆</option>
                        <option value="solar">陽曆</option>
                    </select>
                </FormField>
                <FormField label="逝世日期" column="2-3">
                    <input type="date" onChange={(e) => handleInputChange("deathdate", e.target.value)} />
                </FormField>
                <FormField column="1-3">
                    <select onChange={(e) => handleInputChange("death_calendar", e.target.value)}>
                        <option value="lunar">農曆</option>
                        <option value="solar">陽曆</option>
                    </select>
                </FormField>
            </FormSection>

            <FormSection title="生命故事">
                <FormField column="1-1">
                    <textarea
                        placeholder="將下表帶的生命故事，與世人分享..."
                        onChange={(e) => handleInputChange("story", e.target.value)}
                    />
                    <button className="generate-helper" onClick={handleButtonClick}>
                        <FontAwesomeIcon icon={faStar} size="2x" />
                        <span className="helper-text">需要幫忙嗎？試試AI輔助引導生命故事撰寫</span>
                    </button>
                    {showPopup && <PopupHelper showPopup={showPopup} setShowPopup={setShowPopup} />}
                </FormField>
            </FormSection>

            <FormSection title="個人金句">
                <FormField column="1-1">
                    <textarea placeholder="寫下最常說的勵志金句..." onChange={(e) => handleInputChange("quote", e.target.value)} />
                </FormField>
            </FormSection>

            <FormSection2 title="影像回顧" subtitle="*檔案上傳最高上限為50MB">
            </FormSection2>

        </form>
    );
}
