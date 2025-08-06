import React from 'react';

export default function StaffCard({ 
  name, 
  title, 
  phone, 
  email, 
  imageUrl = "/api/placeholder/80/80",
  onWhatsAppClick,
  onEmailClick,
  showWhatsApp,
  showEmail,
  imageSize = "normal" // "normal" o "large"
}) {
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '15px',
    backgroundColor: '#ffffff',
    borderTop: ' 4px solid #0c51a6',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    margin: '10px 0',
    minWidth: '300px',
    maxWidth: '400px'
  };

  const imageStyle = {
    width: imageSize === "large" ? '150px' : '120px',
    height: imageSize === "large" ? '150px' : '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    flexShrink: 0
  };

  const contentStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center'
  };

  const nameStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#212529',
    margin: '0 0 2px 0'
  };

  const titleStyle = {
    fontSize: '14px',
    color: '#666666',
    margin: '0 0 5px 0',
    fontWeight: 'bold'
  };

  const contactStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '13px',
    color: '#27a127',
    fontWeight: '500',
    margin: '2px 0',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'background-color 0.2s'
  };

  const emailStyle = {
    fontSize: '13px',
    color: '#666666',
    margin: '2px 0',
    cursor: 'pointer',
    padding: '4px 8px',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const IconStyle = {
    width: '16px',
    height: '16px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '15px',
  };

  const lineStyle = {
    height: '2px',
    backgroundColor: '#666666',
    width: '130px',
    marginTop: '5px',
    marginBottom: '5px'
  };

  // Handlers para los clicks
  const handleWhatsAppClick = () => {
    if (onWhatsAppClick && phone) {
      onWhatsAppClick(phone, name, title);
    }
  };

  const handleEmailClick = () => {
    if (onEmailClick && email) {
      onEmailClick(email, name, title);
    }
  };

  return (
    <div style={cardStyle}>
      <img 
        src={imageUrl} 
        alt={name}
        style={imageStyle}
      />
      <div style={contentStyle}>
        <h3 style={nameStyle}>{name}</h3>
        <span style={lineStyle}></span>
        <p style={titleStyle}>{title}</p>
        
        {/* Mostrar WhatsApp solo si showWhatsApp es true y hay teléfono */}
        {showWhatsApp && phone && (
          <div 
            style={contactStyle}
            onClick={handleWhatsAppClick}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <div style={IconStyle}>
               <i className="bi bi-whatsapp"></i>
            </div>
            <span>{phone}</span>
          </div>
        )}
        
        {/* Mostrar Email solo si showEmail es true y hay email */}
        {showEmail && email && (
          <div 
            style={emailStyle}
            onClick={handleEmailClick}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#f0f0f0'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <div style={IconStyle}>
              <i className="bi bi-envelope-at"></i>
            </div>
            <span>{email}</span>
          </div>
        )}
      </div>
    </div>
  );
};