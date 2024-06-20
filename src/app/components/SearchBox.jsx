import "@app/components/SearchBox.sass"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function SearchBox() {
    return (
        <div className="search-box">
            <a href="/search" >
                <input type="text" placeholder="搜尋逝者姓名" />
                <button>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="2x" />
                </button>
            </a>
        </div>
    );
};