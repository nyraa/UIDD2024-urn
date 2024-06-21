"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from "@app/components/Nav";
import Splitter from "@app/components/Splitter";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./page.sass";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SearchPage() {
  const [urnData, setUrnData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [initialData, setInitialData] = useState([]);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const response = await axios.get('/api/search');
      setInitialData(response.data.urns);
    } catch (error) {
      console.error('Error fetching initial URN data:', error);
    }
  };

  const fetchUrnData = async (searchValue = '') => {
    try {
      const response = await axios.get('/api/search', {
        params: { query: searchValue },
      });
      setUrnData(response.data.urns);
      if (response.data.playAudio && response.data.audioFile) {
        setAudio(new Audio(response.data.audioFile));
      } else {
        setAudio(null);
      }
    } catch (error) {
      console.error('Error fetching URN data:', error);
    }
  };

  useEffect(() => {
    if (audio) {
      audio.play();
    }
  }, [audio]);

  const handleSearch = (searchValue) => {
    setHasSearched(true);
    fetchUrnData(searchValue);
  };

  return (
    <>
      <Nav title={true} />
      <SearchBar onSearch={handleSearch} />
      <Search urnData={urnData} hasSearched={hasSearched} />
      <Block urnData={initialData} />
    </>
  );
}

function SearchBar({ onSearch }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleTagClick = (tag) => {
    setSearchValue(tag);
    onSearch(tag);
  };

  const handleSearch = () => {
    onSearch(searchValue);
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
        <button className="search-button" onClick={handleSearch}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <div className="tags-container">
        <div className="selected-tags">
          <button className="tag" onClick={() => handleTagClick('豬哥亮')}>豬哥亮</button>
          <button className="tag" onClick={() => handleTagClick('鄧麗君')}>鄧麗君</button>
          <button className="tag" onClick={() => handleTagClick('mygo')}>mygo</button>
        </div>
        <div className={`expandable-tags ${isExpanded ? 'expanded' : ''}`}>
          <div className="popular-tags">
            <span className="title">熱門 TOP 5</span>
            <div className="tags">
              <button className="tag" onClick={() => handleTagClick('豬哥亮')}>豬哥亮</button>
              <button className="tag" onClick={() => handleTagClick('鄧麗君')}>鄧麗君</button>
              <button className="tag" onClick={() => handleTagClick('台南')}>台南</button>
              <button className="tag" onClick={() => handleTagClick('王希銘')}>王希銘</button>
              <button className="tag" onClick={() => handleTagClick('桃園')}>桃園</button>
            </div>
          </div>         
        </div>
        <button className="expand-button" onClick={toggleExpand}>
          {isExpanded ? '⬆' : '⬇'}
        </button>
      </div>
    </div>
  );
}

function Search({ urnData, hasSearched }) {
  if (!hasSearched) {
    return null;
  }

  if (!urnData || urnData.length === 0) {
    return (
      <section className="search">
        <Splitter className="search-result">搜尋結果</Splitter>
        <div className="search-no-results">未找到匹配的結果</div>
      </section>
    );
  }

  return (
    <section className="search">
      <Splitter className="search-result">搜尋結果</Splitter>
      <div className="search-results">
        {urnData.map((item, i) => (
          <Avatar className="search-person" key={i} src={item.gallery?.[0]?.image} src1={item.urn_texture_src} href={`/urn/${item.id}`} />
        ))}
      </div>
    </section>
  );
}

function Block({ urnData }) {
  return (
    <section className="block">
      <div className="block1">
        <Splitter className="block-title">熱門搜尋</Splitter>
        <DieToday 
          person1="assets/person1.png"
          urn1="assets/urn.png" 
          href1="#"
          person2="assets/person2.png"
          urn2="assets/urn.png" 
          href2="#"
          person3="assets/person3.png"
          urn3="assets/urn.png" 
          href3="#"
        />
      </div>
      <div className="block2">
        <Splitter className="block-title">藝文娛樂</Splitter>
        <DieToday  
          person1="assets/person1.png"
          urn1="assets/urn.png" 
          href1="#"
          person2="assets/person2.png"
          urn2="assets/urn.png" 
          href2="#"
          person3="assets/person3.png"
          urn3="assets/urn.png" 
          href3="#"
        />
      </div>
      <div className="block3">
        <Splitter className="block-title">就在附近</Splitter>
        <DieToday  
          person1="assets/person1.png"
          urn1="assets/urn.png" 
          href1="#"
          person2="assets/person2.png"
          urn2="assets/urn.png" 
          href2="#"
          person3="assets/person3.png"
          urn3="assets/urn.png" 
          href3="#" 
        />
      </div>
    </section>
  );
}

function DieToday({person1,urn1,href1,person2,urn2,href2,person3,urn3,href3}) {

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
  };

  return (
    <section className="die-today">
      <Slider {...settings} className="slider-test">
        <Avatar src={person1} src1={urn1} href={href1} />
        <Avatar src={person2} src1={urn2} href={href2} />
        <Avatar src={person3} src1={urn3} href={href3} />
      </Slider>
    </section>
  );
}

function Avatar({ src, src1, href }) {
  return (
    <a className="person" href={href} target="_blank" rel="noopener noreferrer">
      <img className="picture" src={src} alt="Person" />
      <img className="urn" src={src1} alt="Urn" />
    </a>
  );
}
