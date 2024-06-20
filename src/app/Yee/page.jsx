"use client";
import Nav from "@app/components/Nav";
import Splitter from "@app/components/Splitter";
import React, { useEffect, useState, useRef } from 'react';
import movies from "./peoplepicture.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Yee.sass";
export default function Finalpage() {
    const [positions, setPositions] = useState({});
    const slidesRef = useRef(null);
    const currentIndexRef = useRef(0);
    
    useEffect(() => {
        const setBack2Position = () => {
          const back1Height = document.querySelector('.back1').offsetHeight;
          const back2Height = document.querySelector('.back2').offsetHeight;
          const mountainHeight = document.querySelector('.mountain').offsetHeight;

    
          const TopPosition = back1Height - (back2Height / 2);
          const BottomPosition = back1Height - mountainHeight;

    
          setPositions({
            back2: TopPosition,
            mountain: BottomPosition,
          });
        };
    
        window.addEventListener('load', setBack2Position);
        window.addEventListener('resize', setBack2Position);
    
        setBack2Position();
    
        return () => {
          window.removeEventListener('load', setBack2Position);
          window.removeEventListener('resize', setBack2Position);
        };
      }, []);
    
      useEffect(() => {
        const nextSlide = () => {
          if (slidesRef.current) {
            const slides = slidesRef.current;
            const slideItems = slides.querySelectorAll('.slide');
            currentIndexRef.current = (currentIndexRef.current + 1) % slideItems.length;
            slides.style.transform = `translateX(-${currentIndexRef.current * 100}%)`;
          }
        };
    
        const interval = setInterval(nextSlide, 3000); // 每隔3秒切换到下一张幻灯片
        return () => clearInterval(interval);
      }, []);
    
    return (
        <>
            <Nav title={true} />
            <Background children={positions}/>
            <Goldenword/>            
            <Photoshot />
            <Name/>
            <About/>
            <Slidepicture/>
            <Story/>
        </>
    );

};
function Background({children}){
  return(
    <section className="backgrounds">
      <img className="back1" src="./picture/background.png"/>  
      <img className="back2" style={{ top: children.back2 }} src="./picture/Rectangle 110.png"/>
      <img className="mountain" style={{ top: children.mountain }} src="./picture/Mountain.png"/>
      <div className="back3"></div>
      <img className="cloud" src="./picture/cloud.png"/>
    </section>
  );
}

function Photoshot(){
  return(
    <section className="photoshot">
    <Mainphoto/>
    <Bonebox/>
    <Smoke/>
    </section>
  );
}

function Mainphoto(){
    return(
        <section className="picture">
        <img className="people" src="./picture/people.png"/>      
        {/* <img className="behind-people" src="./picture/Ellipse 37.png"/> */}
        </section>
    );
}
function Bonebox(){
  return(
    <section className="bonebox">
      <img className="box" src="./picture/box.png"/>
      <img className="behind-box" src="./picture/Ellipse 38.png"/> 
    </section>
  );
}
function Smoke(){
  return(
    <section className="smoke">
      <img className="xianglu" src="./picture/xianglu.png"/>
    </section>
  );
}
function Goldenword(){
    return(
        <div className = "goldenword"><p>哩娘卡好！</p></div>
    );
};
function Name(){
    return(
        <section className="name" >
          <p className="n1">豬哥亮</p>
          <p className="n2">永遠的秀場之王</p>
          <p className="n2">1985-2024</p>
          <Share/>
        </section>
    );
};
function Share(){
return(
<>
          <div className="n-line"></div> 
          <div className="like">
            <a href="" target="_blank"> <img className="ic" src="./picture/love.png"/></a>
            <a href="" target="_blank"> <img className="ic" src="./picture/ig.png"/></a>
            <a href="" target="_blank"> <img className="ic" src="./picture/fb.png"/></a>
            <a href="" target="_blank"> <img className="ic" src="./picture/twitter.png"/></a>
          </div>
          <Splitter>選擇並立即開始</Splitter>
</>
);
}

function About (){
  return(
    <section className="detail"  >
      <p id="d1">豬哥亮是一位著名的台灣喜劇演員，
        以其獨特的幽默風格和深具感染力的表演而聞名，
        他在自己的演藝生涯中積極推廣笑聲，為觀眾帶來歡樂。
        </p>
      <p id="d2">逝世</p>
      <p id="d1">預估2024年5月17日</p>
      <p id="d2">死亡詳情</p>
      <p id="d1">在台灣的家中因疾病去世,享年72歲。</p>
    </section>
  );
};

function Story(){
  return(
    <section className="mainstory" >
        <div className="s1"> 生命故事</div>
        <div className="s2">
            豬哥亮，原名周慶煌,1949年生於台灣彰化縣，是台灣娛樂界的傳奇人物之一。他的生命故事充滿了戲劇性和鼓舞人心的奮鬥精神。
            <br/><br/><br/><br/>
            年輕時，豬哥亮並沒有一帆風順的成長經歷。他出生在一個貧困的家庭，面對著生活的種種困難，但他從不放棄對夢想的追求。年輕時期，他曾從事過各種工作，包括農夫、水電工、修車工等，生活十分艱辛。
            <br/><br/><br/><br/>
            然而，豬哥亮的命運在1970年代發生了轉折。當時，他加入了知名的「喜劇雙人組」，與王傑搭檔演出，成為了台灣笑匠的代表之一。他們以滑稽搞笑的風格在電視節目中大放異彩，獲得了觀眾的熱烈喜愛，開啟了豬哥亮輝煌的演藝生涯。
            豬哥亮不僅在電視節目中表現出色，在電影界也嶄露頭角。他參演了許多經典喜劇電影，如《賭聖》、《賭俠》等，飾演的角色深入人心，成為了經典中的經典。
            <br/><br/><br/><br/>
            除了他的演藝事業外，豬哥亮還是一位熱心的社會公益人士。他積極參與各種慈善活動，關心社會弱勢群體，用自己的行動影響著更多人。
            豬哥亮的一生充滿了汗水、淚水和笑聲，他用自己的努力和才華，從一個平凡的人走向了台灣娛樂界的巔峰。他的生命故事鼓舞著我們，告訴我們只要努力奮鬥，就一定能夠實現夢想。
        </div>
    </section>
  );
};
function Slidepicture(){
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
        {movies.map((movie) => (
          <div className="wrap">
            <img src={movie.url} />
          </div>
        ))}
      </Slider>
    </div>
  );
}