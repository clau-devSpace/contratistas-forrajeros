import React, {useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import carrusel from '../assets/images/imagenes-secciones/carrusel.jpg';
import carrusel2 from '../assets/images/imagenes-secciones/muestra-forraje.jpg';
import carrusel3 from '../assets/images/imagenes-secciones/edicion-6.jpg';
import carrusel4 from '../assets/images/imagenes-secciones/edicion-4.jpg';
import carrusel5 from '../assets/images/imagenes-secciones/carrusel5.jpg';
import carrusel6 from '../assets/images/imagenes-secciones/carrusel6.jpg';
import carrusel7 from '../assets/images/imagenes-secciones/socios-mesa.jpg';
import carrusel8 from '../assets/images/imagenes-secciones/edicion-5.jpg';
import carrusel10 from '../assets/images/imagenes-secciones/carrusel10.jpg';
import carrusel11 from '../assets/images/imagenes-secciones/carrusel11.jpg';

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
          <img className="imagen-galeria" src={carrusel} alt="Contratista" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="imagen-galeria" src={carrusel2} alt="Ganado" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="imagen-galeria" src={carrusel5} alt="Máquinas" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="imagen-galeria" src={carrusel4} alt="Capacitacion CACF" />
        </SwiperSlide>
         <SwiperSlide>
          <img className="imagen-galeria" src={carrusel3} alt="Camioneta CACF" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="imagen-galeria" src={carrusel6} alt="socios CACF" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="imagen-galeria" src={carrusel7} alt="socios CACF" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="imagen-galeria" src={carrusel8} alt="socios CACF" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="imagen-galeria" src={carrusel10} alt="socios CACF" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="imagen-galeria" src={carrusel11} alt="socios CACF" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}