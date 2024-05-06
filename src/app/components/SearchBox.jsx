import "@app/components/SearchBox.sass"

export default function SearchBox() {
    return (
        <div className="search-box">
            <input type="text" placeholder="搜尋..." value="請維護者美化一下" />
            <button>搜尋</button>
        </div>
    );
};