"use client";
import Nav from "@app/components/Nav";
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

import React, { useEffect, useState, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Yee.sass";

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
            <Goldenword children={data}/>
            <Morgueitems/>     
            <Photoshot children={data}/>
            <Name children={data}/>
            <About children={data}/>
            <Slidepicture galleries={data?.gallery}/>
            <Story children={data}/>
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

function Photoshot({children}){
  return(
    <section className="photoshot">
    <Mainphoto picturedata={children}/>
    <Bonebox/>
    
    </section>
  );
}

function Mainphoto({picturedata}){
    return(
        <section className="picture">
        <img className="people" src={ picturedata?.cover_src }/>      
        <img className="behind-people" src="/picture/Ellipse 37.png"/>
        </section>
    );
}
function Bonebox(){
  return(
    <section className="bonebox">
      {/* 骨灰罈 box*/}
      <img className="box" src="/picture/box.png"/>
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
const handleParentButtonClick = () => {
  setIsButtonClicked(true); // 设置按钮点击状态为 true
};

const handleImageAClick = () => {
  if (isButtonClicked) {
    setShowImages(true);
    setIsButtonClicked(false);
    if (!intervalRef.current) {
      startTimer();
    }
  } else if (showImages && intervalRef.current) {
    alert(`Remaining time: ${remainingTime} seconds`);
  }
};

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

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('count', count.toString());
    }
  }, [count, isClient]);

  const handleIncrement = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleReset = () => {
    setCount(0);
  };

  const toggleVisibility = () => {
    setIsVisibility(!IsVisibility);
  };

return(
  <>

  <div className={`expandable-tags ${isExpanded ? 'expanded' : ''}`}>
    <button onClick={handleParentButtonClick} className="click">上香</button>
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
// function Smoke({trigger}){
//   const [isButtonClicked, setIsButtonClicked] = useState(false);
//   const [showImages, setShowImages] = useState(false);
//   const [remainingTime, setRemainingTime] = useState(60);
//   const intervalRef = useRef(null);

//   // 點擊按鈕變更滑鼠形狀
//   useEffect(() => {
//     if (trigger) {
//       setIsButtonClicked(true);
//     }
//   }, [trigger]);

//   // const handleButtonClick = () => {
//   //   setIsButtonClicked(true);
//   // };

//   // 點擊圖片 A 顯示圖片 B, C 和 D 並開始計時，或者顯示剩餘時間
//   const handleImageAClick = () => {
//     if (isButtonClicked) {
//       setShowImages(true);
//       setIsButtonClicked(false);
//       if (!intervalRef.current) {
//         startTimer();
//       }
//     } else if (showImages && intervalRef.current) {
//       alert(`Remaining time: ${remainingTime} seconds`);
//     }
//   };

//   // 開始計時
//   const startTimer = () => {
//     intervalRef.current = setInterval(() => {
//       setRemainingTime((prev) => {
//         if (prev === 1) {
//           clearInterval(intervalRef.current);
//           intervalRef.current = null;
//           setShowImages(false);
//           return 60;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   // 清理計時器
//   useEffect(() => {
//     return () => {
//       clearInterval(intervalRef.current);
//     };
//   }, []);

//   return(
//     <section className="smoke" style={{ cursor: isButtonClicked ? 'url("/picture/littlexiang.png"), auto' : 'default' }} >
//        {/* <button onClick={handleButtonClick} className="click">上香</button> */}
//        <div  onClick={handleImageAClick} >
//         <div onClick={handleImageAClick}>
//           <img className="xianglu" src="/picture/xianglu.png"/>
//         </div>
//       {showImages && (
//         <>
//         <img className="image_b" src="/picture/xiang.png" alt="Image B" />
//         <img className="image_c" src="/picture/Ellipse 38.png" alt="Image C" />
//         <img className="image_d" src="/picture/Ellipse 38.png" alt="Image D" />
//         </>
//       )}
//       </div>
//     </section>
//   );
// }

function Smoke({ isButtonClicked, showImages, handleImageAClick }) {
  return (
    <section className="smoke" style={{ cursor: isButtonClicked ? 'url("/picture/littlexiang.png"), auto' : 'default' }}>
      <div onClick={handleImageAClick}>
        <img className="xianglu" src="/picture/xianglu.png" />
        {showImages && (
          <>
            <img className="image_b" src="/picture/xiang.png" alt="Image B" />
            <img className="image_c" src="/picture/Ellipse 38.png" alt="Image C" />
            <img className="image_d" src="/picture/Ellipse 38.png" alt="Image D" />
          </>
        )}
      </div>
    </section>
  );
}

function Flower({ count }){
  // const [count, setCount] = useState(0);
  // const [isClient, setIsClient] = useState(false);

  // useEffect(() => {
  //   // 確認這段程式碼在瀏覽器中運行
  //   setIsClient(true);
  //   if (typeof window !== 'undefined') {
  //     const savedCount = localStorage.getItem('count');
  //     if (savedCount !== null) {
  //       setCount(parseInt(savedCount, 10));
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isClient) {
  //     localStorage.setItem('count', count);
  //   }
  // }, [count, isClient]);

  // const handleIncrement = () => {
  //   setCount(prevCount => prevCount + 1);
  // };

  // const handleReset = () => {
  //   setCount(0);
  // };

  return(
    <section className="flowers">
      <p className="counter">Counter: {count}</p>
      {/* <button className="cl1" onClick={handleIncrement}>獻花</button>
      <button className="cl2" onClick={handleReset}>Reset</button> */}
      {count >= 10 && (
        <>
          <img className="flower1" src="/picture/flower1.png" alt="Flower 1" />
          <img className="flower2" src="/picture/flower2.png" alt="Flower 2" />
          <img className="flower4" src="/picture/flower4.png" alt="Flower 4" />
          <img className="flower3" src="/picture/flower3.png" alt="Flower 3" />
        </>
      )}
    </section>

  );
}
function Music({musictrigger}){
  const [hovered, setHovered] = useState(false);
  // const [isVisible, setIsVisible] = useState(false);

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

  // const toggleVisibility = () => {
  //   setIsVisible(!isVisible);
  // };
  // useEffect(() => {
  //   if (musictrigger) {
  //     setIsVisible(!isVisible);
  //   }
  // }, [musictrigger]);

  return(
    <>
    {/* <button className="toggle-button" onClick={toggleVisibility}>
      聽佛經time
    </button> */}
    <div className={`playmusic ${musictrigger ? 'visible' : ''}`}>
      <img className="god" src="/picture/god.png"/>
      <p></p>
      <audio className="musicbox" src="/music/music_1.mp3" controls></audio>
      <div
        className="bellcontainer"
        style={{ cursor: hovered ? `url("/picture/fb.png"), auto` : 'auto' }}
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



function Goldenword({children}){
    return(
        <div className = "goldenword"><p>{children ? children.golden_quote : 'Loading...'}</p></div>
    );
};
 function Name({children}){

    return(
        <section className="name" >
          <p className="n1">{children ? children.name : 'Loading...'}</p>
          <p className="n2">{children ? children.title : 'Loading...'}</p>
          <p className="n2">{children ? children.born_date : 'Loading...'}-{children ? children.death_date : 'Loading...'}</p>
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
 function LittleSplitter({ children }) {
  return (
      <div className="littlesplitter">
          {children}
      </div>
  );
}


function About ({children}){
  return(
    <section className="detail"  >
      <p id="d1">
      {children ? children.urn_texture_src : 'Loading...'}
      </p>
      <p id="d2">逝世</p>
      <p id="d1">{children ? children.death_date : 'Loading...'}</p>
      <p id="d2">死亡詳情</p>
      <p id="d1">{children ? children.last_live_city : 'Loading...'}</p>
    </section>
  );
};

function Story({children}){
  return(
    <section className="mainstory" >
        <div className="s1"> 生命故事</div>
        <div className="s2">
        {children ? children.life_story : 'Loading...'}
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