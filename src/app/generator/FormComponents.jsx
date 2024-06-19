import React,{useState} from 'react';
import "./FormComponents.sass";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import { EffectCoverflow, Navigation, Pagination } from 'swiper';

// export function Carousel({ children }) {
//     return (
//       <Swiper
//         modules={[EffectCoverflow, Navigation, Pagination]}
//         pagination={{ clickable: true }}
//         speed={1000}
//         slidesPerView="auto"
//         centeredSlides
//         effect="coverflow"
//         coverflowEffect={{
//           rotate: 50,
//           stretch: 0,
//           depth: 100,
//           modifier: 1,
//           slideShadows: true,
//         }}
//       >
//         {React.Children.map(children, (child, index) => (
//           <SwiperSlide key={index}>
//             {child}
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     );
//   }

export function FormSection({ title,children }) {
    return (
        <section className="form-section">
            <h2>{title}</h2>
            <div className="form-fields">
                {children}
            </div>
        </section>
    );
}
export function FormSection2({ title,subtitle,children }) {
    const [images, setImages] = useState([null, null, null]);

  const handleInputChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = URL.createObjectURL(file);
    setImages(newImages);
  };
  return (
    <div className="form-section">
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <div className="form-field">
        <div className='row-ver'>
        {images.map((image, index) => (
          <div key={index} className="upload-container">
            <label className="upload-cover">
              <input
                className="upload-btn"
                type="file"
                accept="image/*"
                onChange={(e) => handleInputChange(index, e.target.files[0])}
              />
              {image ? (
                <img src={image} alt={`Upload ${index + 1}`} className="uploaded-image" />
              ) : (
                <span className="upload-icon">+</span>
              )}
            </label>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};


export function FormField({ label, column="1-1", children }) {
    return (
        <div className={`form-field column-frac-${column}`}>
            <label>{label ?? "　"}</label>
            {children}
        </div>
    );
}
export function FormField2({column="1-1", children }) {
    return (
        <div className={`form-field column-frac-${column}`}>
            {children}
        </div>
    );
}