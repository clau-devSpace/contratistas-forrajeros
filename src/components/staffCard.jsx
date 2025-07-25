import React from 'react';

export default function StaffCard({ 
  name, 
  title, 
  phone, 
  email, 
  imageUrl = "/api/placeholder/80/80" 
}) {
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    margin: '10px 0',
    minWidth: '300px',
    maxWidth: '400px'
  };

  const imageStyle = {
    width: '120px',
    height: '120px',
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
    color: '#333333',
    margin: '0 0 2px 0'
  };

  const titleStyle = {
    fontSize: '14px',
    color: '#666666',
    margin: '0 0 8px 0',
    fontWeight: 'bold'
  };

  const contactStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#25D366',
    margin: '2px 0'
  };

  const emailStyle = {
    fontSize: '13px',
    color: '#666666',
    margin: '2px 0'
  };

  const IconStyle = {
    width: '16px',
    height: '16px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
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
        <p style={titleStyle}>{title}</p>
        
        {phone && (
          <div style={contactStyle}>
            <div style={IconStyle}>
               <i class="bi bi-whatsapp"></i>
            </div>
            <span>{phone}</span>
          </div>
        )}
        
        {email && (
          <div style={emailStyle}>
            <div style={IconStyle}>
              <i class="bi bi-envelope-at"></i>
            </div>
            {email}
          </div>
        )}
      </div>
    </div>
  );
};
