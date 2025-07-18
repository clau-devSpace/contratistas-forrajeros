import React, {useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './gallery.css';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Gallery() {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth >= 1024;
  
  return (
    <>
      <Swiper
        key={isDesktop ? "desktop" : "mobile"}
        slidesPerView={1}
        spaceBetween={10}
        centeredSlides={false}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          type: "progressbar",
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="mySwiper"
      >
        <SwiperSlide>
          <img className="imagen-galeria" src={contratista} alt="Contratista" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="imagen-galeria" src={ganado} alt="Ganado" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="imagen-galeria" src={maquinas} alt="Máquinas" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="imagen-galeria" src={capacitacion} alt="Capacitacion CACF" />
        </SwiperSlide>
         <SwiperSlide>
          <img className="imagen-galeria" src={camioneta} alt="Camioneta CACF" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="imagen-galeria" src={socios} alt="socios CACF" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}