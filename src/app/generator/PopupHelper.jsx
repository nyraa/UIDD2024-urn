import { FormField } from "./FormComponents";
import { useCollapse } from "react-collapsed";

export default function PopupHelper({ setStory }) {
    return (
        <div className="popup-helper">
            <HelperSection title="基本資料">
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
            </HelperSection>
        </div>
    )
}

function HelperSection({ title, children }) {
    const { getCollapseProps, getToggleProps } = useCollapse();
    return (
        <section className="helper-section">
            <h2 {...getToggleProps()}>{title}</h2>
            <div {...getCollapseProps()} className="form-fields">
                {children}
            </div>
        </section>
    );
}