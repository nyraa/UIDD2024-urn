"use client";
import { useState } from 'react';
import './searching.sass';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SearchBar( ) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  
  const [searchValue, setSearchValue] = useState('');

  const handleTagClick = (tag) => {
    setSearchValue(tag);
  };
  return (
    <div className="search-container">
      <div className="search-box">
        <input 
          type="text" 
          placeholder="輸入關鍵字尋找逝者..." 
          className="search-bar" 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button className="search-button">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="tags-container">
        <div className="selected-tags">
          <button className="tag" onClick={() => handleTagClick('標籤1')}>標籤1</button>
          <button className="tag" onClick={() => handleTagClick('標籤2')}>標籤2</button>
          <button className="tag" onClick={() => handleTagClick('標籤3')}>標籤3</button>
        </div>
        <div className={`expandable-tags ${isExpanded ? 'expanded' : ''}`}>
          <div className="popular-tags">
            <span className="title">熱門 TOP 5</span>
            <div className="tags">
            <button className="tag" onClick={() => handleTagClick('熱門標籤1')}>熱門標籤1</button>
            <button className="tag" onClick={() => handleTagClick('熱門標籤2')}>熱門標籤2</button>
            <button className="tag" onClick={() => handleTagClick('熱門標籤3')}>熱門標籤3</button>
            <button className="tag" onClick={() => handleTagClick('熱門標籤4')}>熱門標籤4</button>
            <button className="tag" onClick={() => handleTagClick('熱門標籤5')}>熱門標籤5</button>
            </div>
          </div>
          <div className="all-tags">
            <input type="text" placeholder="搜尋更多標籤" className="search-more-tags" />
            <div className="tags">
            <button className="tag" onClick={() => handleTagClick('標籤1')}>標籤1</button>
            <button className="tag" onClick={() => handleTagClick('標籤2')}>標籤2</button>
            <button className="tag" onClick={() => handleTagClick('標籤3')}>標籤3</button>
            <button className="tag" onClick={() => handleTagClick('標籤4')}>標籤4</button>
            <button className="tag" onClick={() => handleTagClick('標籤5')}>標籤5</button>
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