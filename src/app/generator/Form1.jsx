import "./Form.sass";
import { useState ,useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FormSection,FormSection2,FormField ,FormField2,Carousel} from "./FormComponents";
import PopupHelper from './PopupHelper';
import {PrismaClient} from '@prisma/client';
import { Effects } from "@react-three/drei";
const prisma = new PrismaClient();


export default function Form1({ onChange=() => {}, setPopup, formData, setFormData, handleUpload }) {
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        fetch("/api/get_draft_morgue", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ownerId: formData.ownerId
            })
        }).then((res) => {
            if(!res.ok)
            {
                if(res.status === 404)
                {
                    console.log("No draft morgue found.");
                    // create one
                    handleUpload();
                }
            }
            else
            {
                res.json().then((data) => {
                    if(data.id)
                    {
                        console.log("Draft morgue found:", data);
                        setFormData(data);
                    }
                }).catch((error) => {
                    console.error("Error decoding draft morgue:", error);
                });
            }
        }).catch((error) => {
                console.error("Error fetching draft morgue:", error);
        });
    }, []);
    
    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
        onChange(field, value);
    };

    const handleFileChange = (index, file) => {
        const newGallery = formData.gallery;
        newGallery[index] = newGallery[index] ?? {};
        newGallery[index].image = URL.createObjectURL(file);
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
        handleUpload();
    };


    return (
        <form className="form" onSubmit={handleSubmit}>
            <FormSection title="基本資料">
                <FormField label="姓名" column="1-2">
                    <input type="text" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} />
                </FormField>
                <FormField label="稱謂/號稱" column="1-2">
                    <input type="text" value={formData.last_live_city} onChange={(e) => handleInputChange("last_live_city", e.target.value)} />
                </FormField>
                <FormField label="出生日期" column="2-3">
                    <input type="date" value={formData.born_date} onChange={(e) => handleInputChange("born_date", e.target.value)} />
                </FormField>
                <FormField column="1-3">
                    <select value={formData.born_calendar} onChange={(e) => handleInputChange("born_calendar", e.target.value)}>
                        <option value="none"> 選擇</option>
                        <option value="lunar">農曆</option>
                        <option value="solar">陽曆</option>
                    </select>
                </FormField>
                <FormField label="逝世日期" column="2-3">
                    <input value={formData.death_date} type="date" onChange={(e) => handleInputChange("death_date", e.target.value)} />
                </FormField>
                <FormField column="1-3">
                    <select value={formData.death_calendar} onChange={(e) => handleInputChange("death_calendar", e.target.value)}>
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
                        value={formData.life_story}
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
                    <textarea value={formData.golden_quote} placeholder="寫下最常說的勵志金句..." onChange={(e) => handleInputChange("golden_quote", e.target.value)} />
                </FormField>
            </FormSection>

            <FormSection2 title="影像回顧" subtitle="*檔案上傳最高上限為50MB" gallery={formData.gallery} handleFileChange={handleFileChange}>
                <div className="form-field">
                    <div className="row-ver">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="upload-container">
                                <label className="upload-cover">
                                    <input
                                        className="upload-btn"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(index, e.target.files[0])}
                                    />
                                    {formData.gallery[index] ? (
                                        <img src={formData.gallery[index].image} alt={`Upload ${index + 1}`} className="uploaded-image" />
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
