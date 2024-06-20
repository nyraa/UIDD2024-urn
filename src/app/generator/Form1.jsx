import "./Form.sass";
import { useState ,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FormSection,FormSection2,FormField ,FormField2,Carousel} from "./FormComponents";
import PopupHelper from './PopupHelper';
import {PrismaClient} from '@prisma/client';
import { Effects } from "@react-three/drei";
const prisma = new PrismaClient();

export default function Form1({ onChange=() => {}, setPopup }) {
    
    const [formData, setFormData] = useState({
        id:"",
        ownerId: "clxnhadhu0000i8gftwklh8xw", // 假設已經有用戶的 ID
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
        gallery: [null, null, null]
    });

    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        if(formData.id === "")
        {
            handleSubmit();
            console.log("save when pop shows: ", formData.id); // 在提交時輸出 
        }
    }, [showPopup]);
    
    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        onChange(field, value);
    };

    const handleFileChange = (index, file) => {
        const newGallery = [...formData.gallery];
        newGallery[index] = URL.createObjectURL(file);
        setFormData({ ...formData, gallery: newGallery });
        onChange("gallery", newGallery);
        console.log("Updated gallery:", newGallery); // 日誌輸出檢查
    };
      
    const handleButtonClick = () => {
      setShowPopup(true);
    };
    const closePopup = () => {
        setShowPopup(false);
      };

    const handleSubmit = async (e) => {
        e?.preventDefault?.();
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
    };


    return (
        <form className="form" onSubmit={handleSubmit}>
            <FormSection title="基本資料">
                <FormField label="姓名" column="1-2">
                    <input type="text" onChange={(e) => handleInputChange("name", e.target.value)} />
                </FormField>
                <FormField label="稱謂/號稱" column="1-2">
                    <input type="text" onChange={(e) => handleInputChange("last_live_city", e.target.value)} />
                </FormField>
                <FormField label="出生日期" column="2-3">
                    <input type="date" onChange={(e) => handleInputChange("born_date", e.target.value)} />
                </FormField>
                <FormField column="1-3">
                    <select onChange={(e) => handleInputChange("born_calendar", e.target.value)}>
                        <option value="none"> 選擇</option>
                        <option value="lunar">農曆</option>
                        <option value="solar">陽曆</option>
                    </select>
                </FormField>
                <FormField label="逝世日期" column="2-3">
                    <input type="date" onChange={(e) => handleInputChange("death_date", e.target.value)} />
                </FormField>
                <FormField column="1-3">
                    <select onChange={(e) => handleInputChange("death_calendar", e.target.value)}>
                        <option value="none"> 選擇</option>
                        <option value="lunar">農曆</option>
                        <option value="solar">陽曆</option>
                    </select>
                </FormField>
            </FormSection>

            <FormSection title="生命故事">
                <FormField column="1-1">
                    <textarea
                        placeholder="將下表帶的生命故事，與世人分享..."
                        onChange={(e) => handleInputChange("life_story", e.target.value)}
                    />
                    <button className="generate-helper" onClick={handleButtonClick}>
                        <FontAwesomeIcon icon={faStar} size="2x" />
                        <span className="helper-text">需要幫忙嗎？試試AI輔助引導生命故事撰寫</span>
                    </button>
                    {
                        showPopup && <PopupHelper showPopup={showPopup}  
                        setShowPopup={setShowPopup} 
                        morgueid = {formData.id}/>
                    }
                </FormField>
            </FormSection>

            <FormSection title="個人金句">
                <FormField column="1-1">
                    <textarea placeholder="寫下最常說的勵志金句..." onChange={(e) => handleInputChange("golden_quote", e.target.value)} />
                </FormField>
            </FormSection>

            <FormSection2 title="影像回顧" subtitle="*檔案上傳最高上限為50MB" gallery={formData.gallery} handleFileChange={handleFileChange}>
                <div className="form-field">
                    <div className="row-ver">
                        {formData.gallery.map((image, index) => (
                            <div key={index} className="upload-container">
                                <label className="upload-cover">
                                    <input
                                        className="upload-btn"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(index, e.target.files[0])}
                                    />
                                    {image ? (
                                        <img src={image} alt={`Upload ${index + 1}`} className="uploaded-image" />
                                    ) : (
                                        <span className="upload-icon">+</span>
                                    )}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </FormSection2>

        </form>
    );
}
