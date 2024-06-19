"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from "@app/components/Nav";
import Splitter from "@app/components/Splitter";
import SearchBar from "@app/components/Searching";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./page.sass";


export default function SearchPage() {
  const [urnData, setUrnData] = useState([]);

  useEffect(() => {
    fetchUrnData();
  }, []);

  const fetchUrnData = async () => {
    try {
      const response = await axios.get('/api/urns');
      setUrnData(response.data);
    } catch (error) {
      console.error('Error fetching URN data:', error);
    }
  };

  return (
    <>
      <Nav title={true} />
      <SearchBar />
      <Block urnData={urnData} />
    </>
  );
}

function Block({ urnData }) {
  return (
    <section className="block">
      <div className="block1">
        <Splitter className="block-title">熱門搜尋</Splitter>
        <DieToday urnData={urnData} index={0} />
      </div>
      <div className="block2">
        <Splitter className="block-title">藝文娛樂</Splitter>
        <DieToday urnData={urnData} index={1} />
      </div>
      <div className="block3">
        <Splitter className="block-title">就在附近</Splitter>
        <DieToday urnData={urnData} index={2} />
      </div>
    </section>
  );
}

function DieToday({ urnData, index }) {
  if (!urnData || urnData.length === 0) {
    return null;
  }

  const { person } = urnData[index];
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
        <Avatar src={`${person}`} />
        <Avatar src="assets/person2.png" />
        <Avatar src="assets/person3.png" />
        <Avatar src="assets/dog1.jfif" />
        <Avatar src="assets/dog2.jfif" />
      </Slider>  
      
    </section>
  );
}

function Avatar({ src }) {
  return (
    <div className="person">
      <img className="picture" src={src} alt="Person" />
      <img className="urn" src="assets/urn.png" alt="Urn" />
    </div>
  );
}
