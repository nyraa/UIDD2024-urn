import "./Form.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FormSection, FormField } from "./FormComponents";
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

export default function Form2({ onChange=() => {}}) {
    return (
        <form className="form" onSubmit={(e) => e.preventDefault()}>
            <FormSection title="生成紀錄">
                
            </FormSection>
        </form>
    )
}