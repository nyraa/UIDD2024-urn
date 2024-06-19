"use client";
import { useState } from 'react';
import './searching.sass';

export default function SearchBar( ) {
const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="search-container">
      <div className="search-box">
        <input 
          type="text" 
          placeholder="輸入關鍵字尋找逝者..." 
          className="search-bar" 
          /*value={searchInput}*/ 
          onChange={(e) => setSearchInput(e.target.value)} 
        />
        <button className="search-button">🔍</button>
      </div>
      <div className="tags-container">
        <div className="selected-tags">
          <span className="tag">標籤1 <button className="remove-tag">x</button></span>
          <span className="tag">標籤2 <button className="remove-tag">x</button></span>
          <span className="tag">標籤3 <button className="remove-tag">x</button></span>
        </div>
        <div className={`expandable-tags ${isExpanded ? 'expanded' : ''}`}>
          <div className="popular-tags">
            <span className="title">熱門 TOP 5</span>
            <div className="tags">
              <span className="tag">熱門標籤1</span>
              <span className="tag">熱門標籤2</span>
              <span className="tag">熱門標籤3</span>
              <span className="tag">熱門標籤4</span>
              <span className="tag">熱門標籤5</span>
            </div>
          </div>
          <div className="all-tags">
            <input type="text" placeholder="搜尋更多標籤" className="search-more-tags" />
            <div className="tags">
              <span className="tag">標籤A</span>
              <span className="tag">標籤B</span>
              <span className="tag">標籤C</span>
              <span className="tag">標籤D</span>
            </div>
          </div>
        </div>
        <button className="expand-button" onClick={toggleExpand}>
          {isExpanded ? '⬆' : '⬇'}
        </button>
      </div>
    </div>
  );
};
