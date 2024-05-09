import "./Form.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function Form({ onChange=() => {}}) {
    return (
        <form className="form" onSubmit={(e) => e.preventDefault()}>
            <FormSection title="基本資料">
                <FormField label="姓名" column="1-2">
                    <input type="text" onChange={(e) => onChange("name", e.target.value)} />
                </FormField>
                <FormField label="最後居住城市" column="1-2">
                    <input type="text" onChange={(e) => onChange("city", e.target.value)} />
                </FormField>
                <FormField label="出生日期" column="2-3">
                    <input type="date" onChange={(e) => onChange("birthdate", e.target.value)} />
                </FormField>
                <FormField column="1-3">
                    <select onChange={(e) => onChange("birth_calendar", e.target.value)}>
                        <option value="lunar">農曆</option>
                        <option value="solar">陽曆</option>
                    </select>
                </FormField>
                <FormField label="逝世日期" column="2-3">
                    <input type="date" onChange={(e) => onChange("deathdate", e.target.value)} />
                </FormField>
                <FormField column="1-3">
                    <select onChange={(e) => onChange("death_calendar", e.target.value)}>
                        <option value="lunar">農曆</option>
                        <option value="solar">陽曆</option>
                    </select>
                </FormField>
            </FormSection>
            <FormSection title="生命故事">
                <FormField column="1-1">
                    <textarea placeholder="寫下寶貴的生命故事，與世人分享..." onChange={(e) => onChange("story", e.target.value)} />
                    <button className="generate-helper"><FontAwesomeIcon icon={faStar} size="2x" /><span>需要幫忙嗎？ 試試 AI 輔助引導式生命故事撰寫</span><FontAwesomeIcon icon={faArrowRight} size="2x" /></button>
                </FormField>
            </FormSection>
            <FormSection title="個人金句">
                <FormField column="1-1">
                    <textarea placeholder="寫下最常說的勵志金句..." onChange={(e) => onChange("quote", e.target.value)} />
                </FormField>
            </FormSection>
            <FormSection title="照片">
                
            </FormSection>
        </form>
    );
}

function FormSection({ title, children }) {
    return (
        <section className="form-section">
            <h2>{title}</h2>
            <div className="form-fields">
                {children}
            </div>
        </section>
    );
}

function FormField({ label, column="1-1", children }) {
    return (
        <div className={`form-field column-frac-${column}`}>
            <label>{label ?? "　"}</label>
            {children}
        </div>
    );
}