import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './menu.css';
import logo from '../assets/images/logos/Group 5.svg';
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

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.menu-container') && !e.target.closest('.menu-toggle')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);
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
      setTimeout(() => {
        setActiveDesktopSubmenu('nosotros');
        setActiveLink('nosotros');
      }, 300);
    }
    if (isMenuOpen) {
      setActiveMobileSubmenu('');
      setActiveLink('');
    }
  };

  const handleSubmenuClick = (e, submenuId) => {
    e.preventDefault();
    if (isMobile) {
      setActiveMobileSubmenu(activeMobileSubmenu === submenuId ? '' : submenuId);
    } else {
      setActiveDesktopSubmenu(submenuId);
      setActiveLink(submenuId);
    }
  };

  // Función para manejar clicks en enlaces externos
  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsMenuOpen(false);
  };

  // Función para manejar clicks en PDFs
  const handlePdfLink = (pdfUrl) => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
    setIsMenuOpen(false);
  };

  const menuItems = [
    { id: 'nosotros', title: 'Nosotros', hasSubmenu: true, submenuItems: [
      { label: 'Misión, Visión y Valores', to: '/mision-vision-valores' },
      { label: 'Junta Directiva', to: '/JuntaDirectiva' },
      { label: 'Quiero Asociarme', to: '/asociarme' },
      { label: 'Contacto', to: '/contacto' }
    ] },
    { id: 'socios', title: 'Nuestros Socios', hasSubmenu: false, to: '/socios' },
    { id: 'convenios', title: 'Convenios', hasSubmenu: false, to: '/convenios' },
    { 
      id: 'area-economica', title: 'Área Económica', hasSubmenu: false, to: '/areaEconomica'
      // Comentamos las subcategorías para futuro uso
      // submenuItems: [
      //   { label: 'Precios de referencia', to: '/precios' },
      //   { label: 'Costos Silaje', to: '/costos-silaje' },
      //   { label: 'Costos MS', to: '/costos-ms' },
      //   { label: 'Costos Transportes MV', to: '/costos-transportes' },
      // ]
    },
    { id: 'area-tecnica', title: 'Área Técnica', hasSubmenu: true, submenuItems: [
      { 
        label: 'Protocolo de Extracción de muestras', 
        pdfUrl: 'pdf/CACF_AgriNIR_Protocolo_Extraccion_y_Conservacion_de_Muestras_de_ensilajes.pdf' 
      },
      { label: 'Manuales técnicos', to: '/manuales' },
      { label: 'Notas Periodísticas', to: '/notas' },
    ] },
    { id: 'mapa',
      title: 'Mapa',
      hasSubmenu: false, 
      to: '/mapa',
     },
    { id: 'exclusivo', title: 'Exclusivo Socios', hasSubmenu: false, to: '/exclusivo' }
  ];

  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <Link to="/">
            <img src={logo} className="logo-menu" alt="Logo" />
          </Link>

          <div className="nav-items">
            <Link to="/asociarme" className="btn-asociate">
              Asóciate
            </Link>

            <div className="menu-toggle" onClick={toggleMenu}>
              <i className="bi bi-list menu-icon-open" style={{ fontSize: "2.3rem", color: "white", display: isMenuOpen ? "none" : "block" }}></i>
              <i className="bi bi-x-lg menu-icon-close" style={{ fontSize: "1.5rem", color: "white", display: isMenuOpen ? "block" : "none" }}></i>
            </div>
          </div>
        </div>
      </nav>

      <div className={`menu-container ${isMenuOpen ? "active" : ""}`}>
        <div className="menu-content">
          <div className="main-menu">
            <ul className="menu-items">
              {menuItems.map((item, index) => (
                <li key={item.id} style={{ animationDelay: `${index * 0.1}s` }}>
                  {item.hasSubmenu ? (
                    <a
                      href="#"
                      data-submenu={item.id}
                      className={`${item.hasSubmenu ? "has-submenu" : ""} ${activeLink === item.id ? "active" : ""}`}
                      onClick={(e) => handleSubmenuClick(e, item.id)}
                    >
                      <span>
                        {item.title}
                      </span>
                      {item.hasSubmenu && (
                        <i className={`bi bi-chevron-right expand-indicator ${activeMobileSubmenu === item.id ? "expanded" : ""}`} style={{ display: isMobile ? "block" : "none" }}></i>
                      )}
                    </a>
                  ) : (
                    // Verificamos si es un enlace externo o interno
                    item.externalUrl ? (
                      <a
                        href="#"
                        className={activeLink === item.id ? "active" : ""}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveLink(item.id);
                          handleExternalLink(item.externalUrl);
                        }}
                      >
                        <span>
                          {item.title}
                        </span>
                      </a>
                    ) : (
                      <Link
                        to={item.to}
                        className={activeLink === item.id ? "active" : ""}
                        onClick={() => {
                          setActiveLink(item.id);
                          setIsMenuOpen(false);
                        }}
                      >
                        <span>
                          {item.title}
                        </span>
                      </Link>
                    )
                  )}

                  {item.hasSubmenu && (
                    <ul className={`mobile-submenu ${activeMobileSubmenu === item.id ? "active" : ""}`}>
                      {item.submenuItems.map((subItem, subIndex) => (
                        <li key={subIndex} style={{ animationDelay: `${subIndex * 0.1}s` }}>
                          {subItem.pdfUrl ? (
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePdfLink(subItem.pdfUrl);
                              }}
                            >
                              {subItem.label}
                            </a>
                          ) : (
                            <Link to={subItem.to} onClick={() => setIsMenuOpen(false)}>
                              {subItem.label}
                            </Link>
                          )}
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
            {menuItems
              .filter((item) => item.hasSubmenu && item.id === activeDesktopSubmenu)
              .map((item) => (
                <ul className="submenu active" key={item.id}>
                  {item.submenuItems.map((subItem, i) => (
                    <li key={i}>
                      {subItem.pdfUrl ? (
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePdfLink(subItem.pdfUrl);
                          }}
                        >
                          {subItem.label}
                        </a>
                      ) : (
                        <Link to={subItem.to} onClick={() => setIsMenuOpen(false)}>
                          {subItem.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              ))}
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