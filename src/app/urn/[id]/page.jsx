"use client";
import Nav from "@app/components/Nav";
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();
import React, { useEffect, useState, useRef } from 'react';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Yee.sass";
import Urn from "@app/components/Urn";

 //const ID = 'clxbkpi7y000454fu4bdatqey'; // 替換ID 


export default  function Finalpage({ params }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  const { id } = params;

  useEffect(() => {
    async function fetchData() {
      try {
        console.log(`Fetching data with ID: ${id}`);
        const response = await fetch(`/api/finalpage?id=${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        if (result.error) {
          throw new Error(result.error);
        }
        console.log('Fetched data:', result); // 调试日志
        setData(result);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching the data:', error);
      }
    }

    fetchData();
  }, []);

    return (
        <>
            <Nav title={true} />
            <Background />
            <Goldenword props={data}/>
            <Morgueitems/>     
            <Photoshot props={data} data={data}/>
            <Name props={data}/>
            <About props={data}/>
            <Slidepicture galleries={data?.gallery}/>
            <Story props={data}/>
            <AIchat/>
        </>
    );

};

function Background(){
    //  const [positions, setPositions] = useState({});
    
    // useEffect(() => {
    //     const setBack2Position = () => {
    //       //對齊背景
    //       const back1Height = document.querySelector('.back1').offsetHeight;
    //       const back2Height = document.querySelector('.back2').offsetHeight;
    //       const mountainHeight = document.querySelector('.mountain').offsetHeight;

    //       const TopPosition = back1Height - (back2Height / 2);
    //       const BottomPosition = back1Height - mountainHeight;
    //       setPositions({
    //         back2: TopPosition,
    //         mountain: BottomPosition,
    //       });


    //     };
    // //window及時刷新
    //     window.addEventListener('load', setBack2Position);
    //     window.addEventListener('resize', setBack2Position);
    //     setBack2Position();
    //     return () => {
    //       window.removeEventListener('load', setBack2Position);
    //       window.removeEventListener('resize', setBack2Position);
    //     };
    //   }, []);
     
    // style={{ top: positions.back2 }} 要用時後再丟
    // style={{ top: positions.mountain }} 要用時後再丟

  return(
    <section className="backgrounds">
      <img className="back2"  src="/picture/Rectangle 110.png"/>
      <img className="mountain"  src="/picture/Mountain.png"/>      
      <img className="back1" src="/picture/background.png"/>  
      <div className="back3"></div>
      <img className="cloud" src="/picture/cloud.png"/>
    </section>
  );
}

function Photoshot({props, data}){
  return(
    <section className="photoshot">
    <Mainphoto picturedata={props}/>
    <Bonebox data={data}/>
    
    </section>
  );
}

function Mainphoto({picturedata}){
    return(
        <section className="picture">
        <img className="people" src={ picturedata?.gallery?.[0]?.image }/>      
        <img className="behind-people" src="/picture/Ellipse 37.png"/>
        </section>
    );
}
function Bonebox({ data }){
  return(
    <section className="bonebox">
      {/* 骨灰罈 box*/}
      <Urn textureSrc={data?.urn_texture_src} objIndex={data?.urn_index ?? 0} preview={true} enableRotate={true} />
      <img className="behind-box" src="/picture/Ellipse 38.png"/> 
    </section>
  );
}

function Morgueitems(){
  const [isExpanded, setIsExpanded] = useState(false);

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  const intervalRef = useRef(null);

  const [count, setCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  const [IsVisibility, setIsVisibility] = useState(false);
//展開
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };


//香爐
// 點擊按鈕變更滑鼠形狀
const handleParentButtonClick = () => {
  setIsButtonClicked(true); 
};
// 點擊圖片 A 顯示圖片 B, C 和 D 並開始計時，或者顯示剩餘時間
const handleImageAClick = () => {
  if (isButtonClicked) {
    setShowImages(true);
    setIsButtonClicked(false);
    if (!intervalRef.current) {
      startTimer();
    }
  } else if (showImages && intervalRef.current) {
    alert(`剩下: ${remainingTime} 秒`);
  }
};
// 開始計時
const startTimer = () => {
  intervalRef.current = setInterval(() => {
    setRemainingTime((prev) => {
      if (prev === 1) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setShowImages(false);
        return 60;
      }
      return prev - 1;
    });
  }, 1000);
};
// 清理計時器
useEffect(() => {
  return () => {
    clearInterval(intervalRef.current);
  };
}, []);


//獻花
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const savedCount = localStorage.getItem('count');
      if (savedCount !== null) {
        setCount(parseInt(savedCount, 10));
      }
    }
  }, []);
//存獻花次數
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('count', count.toString());
    }
  }, [count, isClient]);
//增加獻花次數
  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };
//重設次數
  const handleReset = () => {
    setCount(0);
  };
//播音樂
  const toggleVisibility = () => {
    setIsVisibility(!IsVisibility);
  };

return(
  <>

  <div className={`expandable-tags ${isExpanded ? 'expanded' : ''}`}>
    <button onClick={handleParentButtonClick} className="click">上香</button>
    <p className="counter">獻花次數: {count}次</p>
    <button className="cl1" onClick={handleIncrement}>獻花</button>
    <button className="cl2" onClick={handleReset}>Reset</button>
    <button className="toggle-button" onClick={toggleVisibility}>
      聽佛經
    </button>
  </div>
  <button className="expand-button" onClick={toggleExpand}>
      {isExpanded ? '⬆' : '⬇'}
  </button>  
    <Smoke
      isButtonClicked={isButtonClicked}
      showImages={showImages}
      handleImageAClick={handleImageAClick}
    />
    <Flower count={count}/>
    <Music musictrigger={IsVisibility}/>    
  </>

)
};
function Smoke({ isButtonClicked, showImages, handleImageAClick }) {
  return (
    <section className="smoke" style={{ cursor: isButtonClicked ? 'url("/picture/littlexiang.png"), auto' : 'default' }}>
      <div onClick={handleImageAClick}>
        <img className="xianglu" src="/picture/xianglu.png" />
        {showImages && (
          <>
            <img className="image_b" src="/picture/xiang.png" alt="Image B" />

          </>
        )}
      </div>
    </section>
  );
}
function Flower({ count }){

  return(
    <section className="flowers">
      {count >= 20 && (
        <>
          <img className="flower1" src="/picture/flower1.png" alt="Flower 1" />
          <img className="flower4" src="/picture/flower4.png" alt="Flower 4" />
        </>
      )}
      {count >= 10 && (
        <>
          <img className="flower2" src="/picture/flower2.png" alt="Flower 2" />
          <img className="flower3" src="/picture/flower3.png" alt="Flower 3" />
        </>
      )}

    </section>

  );
}
function Music({musictrigger}){
  const [hovered, setHovered] = useState(false);
  

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleClick = () => {
    const audio = new Audio("/music/yisell_sound.mp3");
    audio.play();
  };

  return(
    <>
    <div className={`playmusic ${musictrigger ? 'visible' : ''}`}>
      <img className="god" src="/picture/god.png"/>
      <p></p>
      <audio className="musicbox" src="/music/music_1.mp3" controls></audio>
      <div
        className="bellcontainer"
        style={{ cursor: hovered ? `url("/picture/bellstick.png"), auto` : 'auto' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <img className="bell" src="/picture/bell.png" alt="A" />
      </div>
    </div>    
    </>

  );
}

function Goldenword({props}){
    return(
        <div className = "goldenword"><p>{props ? props.golden_quote : 'Loading...'}</p></div>
    );
};
function formatYear(isoDate) {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份從0開始，所以+1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}`;
}

function Name({props}){

    return(
        <section className="name" >
          <p className="n1">{props ? props.name : 'Loading...'}</p>
          <p className="n2">{props ? props.title : 'Loading...'}</p>
          <p className="n2">{formatYear(props?.born_date)} - {formatYear(props?.death_date)}</p>
          <Share/>
        </section>
    );
};
function Share(){
return(
<>
          <div className="n-line"></div> 
          <div className="like">
            <a href="" target="_blank"> <img className="ic" src="/picture/love.png"/></a>
            <a href="" target="_blank"> <img className="ic" src="/picture/ig.png"/></a>
            <a href="" target="_blank"> <img className="ic" src="/picture/fb.png"/></a>
            <a href="" target="_blank"> <img className="ic" src="/picture/twitter.png"/></a>
          </div>
          <LittleSplitter>選擇並立即開始</LittleSplitter>
</>
);
}
 function LittleSplitter({ props: children }) {
  return (
      <div className="littlesplitter">
          {children}
      </div>
  );
}

function formatDate(isoDate) {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份從0開始，所以+1
  const day = String(date.getDate()).padStart(2, '0');
  return `${year} 年 ${month} 月 ${day} 日`;
}
function About ({props}){

  return(
    <section className="detail"  >
      <p id="d2">逝世</p>
      <p id="d1">{formatDate(props?.born_date)}</p>
      <p id="d2">死亡詳情</p>
      <p id="d1">{props ? props.last_live_city : 'Loading...'}</p>
    </section>
  );
};

function Story({props}){
  return(
    <section className="mainstory" >
        <div className="s1"> 生命故事</div>
        <div className="s2">
        {props ? props.life_story : 'Loading...'}
        </div>
    </section>
  );
};
function Slidepicture({ galleries }){
  console.log('Galleries:', galleries);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div className="slidepicture">
      <Slider {...settings}>
        {galleries?.map((gallery) => (
          <div className="wrap" key={gallery?.id}>
            <img src={gallery.image} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
function AIchat(){
  return(
    <iframe className="aichat"  allow="microphone;" src="https://console.dialogflow.com/api-client/demo/embedded/c3390601-f5cc-49f4-9c08-c08b4c288fe9"></iframe>
    )
}
