import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';
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

  const menuItems = [
    { id: 'nosotros', title: 'Nosotros', hasSubmenu: true, submenuItems: [
      { label: 'Misión, Visión y Valores', to: '/mision' },
      { label: 'Junta Directiva', to: '/junta' },
      { label: 'Nuestros Socios', to: '/socios' },
      { label: 'Convenios', to: '/convenios' },
      { label: 'Quiero Asociarme', to: '/asociarme' },
    ] },
    { id: 'socios', title: 'Nuestros Socios', hasSubmenu: false, to: '/socios' },
    { id: 'convenios', title: 'Convenios', hasSubmenu: false, to: '/convenios' },
    { id: 'area-economica', title: 'Área Económica', hasSubmenu: true, submenuItems: [
      { label: 'Precios de referencia', to: '/precios' },
      { label: 'Costos Silaje', to: '/costos-silaje' },
      { label: 'Costos MS', to: '/costos-ms' },
      { label: 'Costos Transportes MV', to: '/costos-transportes' },
    ] },
    { id: 'area-tecnica', title: 'Área Técnica', hasSubmenu: true, submenuItems: [
      { label: 'Protocolo de Extracción de muestras', to: '/protocolo' },
      { label: 'Manuales técnicos', to: '/manuales' },
      { label: 'Notas Periodísticas', to: '/notas' },
    ] },
    { id: 'mapa', title: 'Mapa', hasSubmenu: false, to: '/mapa' },
    { id: 'exclusivo', title: 'Exclusivo Socios', hasSubmenu: false, to: '/exclusivo' },
    { id: 'contacto', title: 'Contacto', hasSubmenu: false, to: '/contacto' },
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
                        <i className="bi bi-arrow-right arrow-icon"></i>
                        {item.title}
                      </span>
                      {item.hasSubmenu && (
                        <i className={`bi bi-chevron-right expand-indicator ${activeMobileSubmenu === item.id ? "expanded" : ""}`} style={{ display: isMobile ? "block" : "none" }}></i>
                      )}
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
                        <i className="bi bi-arrow-right arrow-icon"></i>
                        {item.title}
                      </span>
                    </Link>
                  )}

                  {item.hasSubmenu && (
                    <ul className={`mobile-submenu ${activeMobileSubmenu === item.id ? "active" : ""}`}>
                      {item.submenuItems.map((subItem, subIndex) => (
                        <li key={subIndex} style={{ animationDelay: `${subIndex * 0.1}s` }}>
                          <Link to={subItem.to} onClick={() => setIsMenuOpen(false)}>{subItem.label}</Link>
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
                      <Link to={subItem.to} onClick={() => setIsMenuOpen(false)}>{subItem.label}</Link>
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
