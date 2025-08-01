
import { useEffect } from 'react';
import StaffCard from '../components/staffCard'; 
import styles from './juntaDirectiva.module.css';
import contactService from '../services/contactService';
import Staff1 from '../assets/images/imagenes-secciones/staff1.jpg';
import Staff2 from '../assets/images/imagenes-secciones/staff2.jpg';
import Staff3 from '../assets/images/imagenes-secciones/staff3.gif';
import Staff4 from '../assets/images/imagenes-secciones/staff4.jpg';
import Staff5 from '../assets/images/imagenes-secciones/staff5.jpg';
import Staff6 from '../assets/images/imagenes-secciones/staff6.jpg';
import Staff7 from '../assets/images/imagenes-secciones/staff7.jpg';
import Staff8 from '../assets/images/imagenes-secciones/staff8.jpg';
import Staff9 from '../assets/images/imagenes-secciones/staff9.jpg';
import Staff10 from '../assets/images/imagenes-secciones/staff10.jpg';
import Staff11 from '../assets/images/imagenes-secciones/staff11.jpg';
import Staff12 from '../assets/images/imagenes-secciones/staff12.jpg';
import Staff13 from '../assets/images/imagenes-secciones/staff13.jpg';
import Staff14 from '../assets/images/imagenes-secciones/staff14.jpg';
import Staff15 from '../assets/images/imagenes-secciones/staff15.jpg';
import Staff16 from '../assets/images/imagenes-secciones/staff16.jpg';
import Oficinas from '../assets/images/imagenes-secciones/contacto_r19_c11.gif'
import Prueba13 from '../assets/images/imagenes-secciones/reunion-plenaria-copia.jpg';

const JuntaDirectiva = () => {
  const staffMembers = [
    {
      id: 1,
      name: "Ing. P. A. Fernando Opacak",
      title: "Coordinador General",
      phone: "+54 9 11 5637 2785",
      email: "fopacak@ensiladores.com.ar",
      imageUrl: Staff1,
    },
    {
      id: 2,
      name: "Ing. Agr. Mauro Rabozzi",
      title: "Coordinador Zonal",
      phone: "+54 9 3534 212921",
      email: "mauro.rabozzi@ensiladores.com.ar",
      imageUrl: Staff2,
    },
    {
      id: 3,
      name: "Lic. Cristina Simunic",
      title: "Coordinación de eventos & Promoción de marca",
      phone: "+54 9 11 6245 2785",
      email: "cristina.simunic@ensiladores.com.ar",
      imageUrl: Staff3,
    },
    { id: 4, name: "Luciano Toldo", title: "Presidente", imageUrl: Staff4 },
    {
      id: 5,
      name: "Pablo Destefanis",
      title: "Vice Presidente",
      imageUrl: Staff5,
    },
    {
      id: 6,
      name: "Ignacio López Seco",
      title: "Secretario",
      imageUrl: Staff6,
    },
    { id: 7, name: "Emilio Gahan", title: "Tesorero", imageUrl: Staff7 },
    {
      id: 8,
      name: "Mario Aisemberg",
      title: "Vocal Titular",
      imageUrl: Staff8,
    },
    {
      id: 9,
      name: "Norbert Brenner",
      title: "Vocal Titular",
      imageUrl: Staff9,
    },
    {
      id: 10,
      name: "Federico Sonego",
      title: "Vocal Titular",
      imageUrl: Staff10,
    },
    {
      id: 11,
      name: "Facundo Sauton",
      title: "Vocal Suplente",
      imageUrl: Staff11,
    },
    {
      id: 12,
      name: "Juan Martin Barneix",
      title: "Vocal Suplente",
      imageUrl: Staff12,
    },
    { id: 13, name: "Mario Nioi", title: "Vocal Suplente", imageUrl: Staff13 },
    {
      id: 14,
      name: "Patricio Aguirre Saravia",
      title: "Junta Fizcalizadora (Titular)",
      imageUrl: Staff14,
    },
    {
      id: 15,
      name: "Carlos Malaspina",
      title: "Junta Fiscalizadora (Titular)",
      imageUrl: Staff15,
    },
    {
      id: 16,
      name: "Cesar Hubeli",
      title: "Junta Fiscalizadora (Suplente)",
      imageUrl: Staff16,
    },
  ];

  const staff = staffMembers.slice(0, 3);
  const directiva = staffMembers.slice(3);

  useEffect(() => {
    let ticking = false;

    const updateParallax = () => {
      const scrolled = window.pageYOffset;
      const backgrounds = document.querySelectorAll(".parallax-background");

      backgrounds.forEach((bg) => {
        const section = bg.closest(".parallax-section");
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const offsetTop = section.offsetTop;
        const height = section.offsetHeight;

        const speed = 0.3;

        if (
          scrolled + window.innerHeight >= offsetTop &&
          scrolled <= offsetTop + height
        ) {
          const yPos = (scrolled - offsetTop) * speed;
          bg.style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      });

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    updateParallax();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={styles.header}
        style={{
          backgroundImage: `url(${Prueba13})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className={styles.heroContent}>
          <h1 className={styles.equipoCACF}>
            Conocé al Equipo <span className={styles.cacf}>CACF</span>
          </h1>
          <p className={styles.heroDescription}>
            Donde la Experiencia se encuentra con la Innovación
          </p>
        </div>
      </header>

      <div className={styles.staffMainContainer}>
        <div className={styles.staffHeroSection}>
          <div className={styles.sectionContent}>
            <div className={styles.staffSection}>
              <h2 className={styles.sectionTitle}>Nuestro Staff</h2>
              <div className={styles.staffGrid}>
                {staff.map((member) => (
                  <StaffCard
                    key={member.id}
                    {...member}
                    onWhatsAppClick={() =>
                      contactService.handleWhatsAppClick(
                        member.phone,
                        member.name,
                        member.title
                      )
                    }
                    onEmailClick={() =>
                      contactService.handleEmailClick(
                        member.email,
                        member.name,
                        member.title
                      )
                    }
                    showWhatsApp={contactService.canShowWhatsAppButton(
                      member.phone
                    )}
                    showEmail={contactService.canShowEmailButton(member.email)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.directivaSection}>
          <div className={styles.sectionContent}>
            <h2 className={`${styles.sectionTitle} ${styles.extraPadding}`}>
              Junta Directiva
            </h2>
            <div className={styles.staffGrid}>
              {directiva.map((member, index) => (
                <StaffCard
                  key={member.id}
                  {...member}
                  imageSize={index < 3 ? "large" : "normal"} // ← Las primeras 3 serán grandes
                />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.oficinas}>
        <img src={Oficinas} className={styles.imagenOficinas} alt='Oficinas administrativas CACF' />
      </div>
      </div>
    </>
  );
};

export default JuntaDirectiva;
