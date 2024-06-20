import Nav from "@app/components/Nav";
import "./page.sass";
import Splitter from "@app/components/Splitter";
import SearchBar from "@app/components/Searching";

export default function SearchPage() {
    return (
        <>
            <Nav title={true} />
            <SearchBar />           
            <Block text1="熱門搜尋" text2="藝文娛樂" text3="就在附近"/>
        </>
    );
};


function Block({text1, text2, text3}) {
    return(
        <section className="block">
            <div className="block1">         
                <Splitter className="block-title">{text1}</Splitter>
                <DieToday />
            </div>
            <div className="block2">         
                <Splitter className="block-title">{text2}</Splitter>
                <DieToday />
            </div>  
            <div className="block3">         
                <Splitter className="block-title">{text3}</Splitter>
                <DieToday />
            </div>    
        </section>        
    )
    
}

function DieToday() {
    return (
        <section className="die-today">
            <Avatar src="assets/person1.png" />
            <Avatar src="assets/person2.png" />
            <Avatar src="assets/person3.png" />
        </section>
    );
}

function Avatar({ src }) {
    return (
        <div className="person">
            <img className="picture" src={src} />
            <img className="urn" src="assets/urn.png" />
        </div>
    )
}