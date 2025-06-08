import React, { useState, useEffect } from 'react';
import './Menu.css';
import logo from '../assets/images/logos/Group 5.svg'
import imagen_menu from '../assets/images/imagenes-secciones/nueva-menu.png';

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeDesktopSubmenu, setActiveDesktopSubmenu] = useState('nosotros');
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState('');
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    // Cerrar menú con tecla Escape
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    // Cerrar menú al hacer clic fuera
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.menu-container') && !e.target.closest('.menu-toggle')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);

    // Controlar scroll del body
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      window.removeEventListener('resize', checkIfMobile);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen && !isMobile) {
      // En escritorio, mostrar submenu por defecto
      setTimeout(() => {
        setActiveDesktopSubmenu('nosotros');
        setActiveLink('nosotros');
      }, 300);
    }
    if (isMenuOpen) {
      // Cerrar todos los submenús móviles al cerrar el menú
      setActiveMobileSubmenu('');
      setActiveLink('');
    }
  };

  const handleSubmenuClick = (e, submenuId) => {
    e.preventDefault();
    
    if (isMobile) {
      // Toggle mobile submenu
      setActiveMobileSubmenu(activeMobileSubmenu === submenuId ? '' : submenuId);
    } else {
      // Show desktop submenu
      setActiveDesktopSubmenu(submenuId);
      setActiveLink(submenuId);
    }
  };

  const menuItems = [
    {
      id: 'nosotros',
      title: 'Nosotros',
      hasSubmenu: true,
      submenuItems: [
        'Misión, Visión y Valores',
        'Junta Directiva',
        'Nuestros Socios',
        'Convenios',
        'Quiero Asociarme'
      ]
    },
    {
      id: 'socios',
      title: 'Nuestros Socios',
      hasSubmenu: false,
    },
     {
      id: 'convenios',
      title: 'Convenios',
      hasSubmenu: false,
    },
    {
      id: 'area-economica',
      title: 'Área Económica',
      hasSubmenu: true,
      submenuItems: [
        'Precios de referencia',
        'Costos Silaje',
        'Costos MS',
        'Costos Transportes MV'
      ]
    },
    {
      id: 'area-tecnica',
      title: 'Área Técnica',
      hasSubmenu: true,
      submenuItems: [
        'Protocolo de Extracción de muestras',
        'Manuales técnicos',
        'Notas Periodísticas'
      ]
    },
   
    {
      id: 'mapa',
      title: 'Mapa',
      hasSubmenu: false
    },
    {
      id: 'exclusivo',
      title: 'Exclusivo Socios',
      hasSubmenu: false
    },
    {
      id: 'contacto',
      title: 'Contacto',
      hasSubmenu: false
    }
  ];

  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <a href="#">
            <img src={logo} className="logo-menu" alt="Logo" />
          </a>

          <div className="nav-items">
            <a href="#" className="btn-asociate">
              Asóciate
            </a>

            <div className="menu-toggle" onClick={toggleMenu}>
              <i
                className="bi bi-list menu-icon-open"
                style={{
                  fontSize: "2.2rem",
                  color: "white",
                  display: isMenuOpen ? "none" : "inline",
                }}
              ></i>
              <i
                className="bi bi-x-lg menu-icon-close"
                style={{
                  fontSize: "1.8rem",
                  color: "white",
                  display: isMenuOpen ? "inline" : "none",
                }}
              ></i>
            </div>
          </div>
        </div>
      </nav>

      <div className={`menu-container  ${isMenuOpen ? "active" : ""}`}>
        <div className="menu-content">
          <div className="main-menu">
            <ul className="menu-items">
              {menuItems.map((item, index) => (
                <li key={item.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  <a
                    href="#"
                    data-submenu={item.id}
                    className={`${item.hasSubmenu ? "has-submenu" : ""} ${
                      activeLink === item.id ? "active" : ""
                    }`}
                    onClick={
                      item.hasSubmenu
                        ? (e) => handleSubmenuClick(e, item.id)
                        : undefined
                    }
                  >
                    <span>
                      <i className="bi bi-arrow-right arrow-icon"></i>
                      {item.title}
                    </span>
                    {item.hasSubmenu && (
                      <i
                        className={`bi bi-chevron-right expand-indicator ${
                          activeMobileSubmenu === item.id ? "expanded" : ""
                        }`}
                        style={{ display: isMobile ? "block" : "none" }}
                      ></i>
                    )}
                  </a>
                  {item.hasSubmenu && (
                    <ul
                      className={`mobile-submenu ${
                        activeMobileSubmenu === item.id ? "active" : ""
                      }`}
                    >
                      {item.submenuItems.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          style={{ animationDelay: `${subIndex * 0.1}s` }}
                        >
                          <a href="#">{subItem}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="vertical-separator"></div>

          <div className="submenu-container">
            <ul
              className={`submenu ${
                activeDesktopSubmenu === "nosotros" ? "active" : ""
              }`}
            >
              <li>
                <a href="#">Misión, Visión y Valores</a>
              </li>
              <li>
                <a href="#">Junta Directiva</a>
              </li>
              <li>
                <a href="#">Nuestros Socios</a>
              </li>
              <li>
                <a href="#">Convenios</a>
              </li>
              <li>
                <a href="#">Quiero Asociarme</a>
              </li>
            </ul>

            <ul
              className={`submenu ${
                activeDesktopSubmenu === "area-economica" ? "active" : ""
              }`}
            >
              <li>
                <a href="#">Precios de referencia</a>
              </li>
              <li>
                <a href="#">Costos Silaje</a>
              </li>
              <li>
                <a href="#">Costo MS</a>
              </li>
              <li>
                <a href="#">Costos Transportes MV</a>
              </li>
            </ul>

             <ul
              className={`submenu ${
                activeDesktopSubmenu === "area-tecnica" ? "active" : ""
              }`}
            >
              <li>
                <a href="#">Protocolo de extracción de muestras</a>
              </li>
              <li>
                <a href="#">Manuales Técnicos</a>
              </li>
               <li>
                <a href="#">Notas periodísticas</a>
              </li>
            </ul>
          </div>

          <div className="menu-image-container">
            <img className="menu-image" src={imagen_menu} alt="Menu Image" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;