

/**
 * @param {string} phoneNumber 
 * @returns {boolean} 
 */
const isInternationalNumber = (phoneNumber) => {
  if (!phoneNumber) return false;
  
  const cleaned = phoneNumber.replace(/[\s\-()]/g, '');
  
  return !cleaned.startsWith('+54') && !cleaned.startsWith('54');
};

/**
 * @param {string} phoneNumber 
 * @returns {string|null} 
 */
const cleanPhoneNumber = (phoneNumber) => {
  if (!phoneNumber || typeof phoneNumber !== 'string') {
    return null;
  }

  let cleaned = phoneNumber.replace(/[\s\-()]/g, '');
  
  if (isInternationalNumber(phoneNumber)) {
    return cleaned.replace(/^\+/, ''); 
  }
  
  cleaned = cleaned.replace(/^\+/, '');
  
  if (cleaned.startsWith('549') && cleaned.length >= 12) {
    return cleaned;
  }
  
  if (cleaned.startsWith('54') && cleaned.length >= 11) {
    return cleaned;
  }
  
  return null;
};

/**
 * @param {string} phoneNumber 
 * @param {string} message 
 * @returns {string|null} 
 */
const generateWhatsAppURL = (phoneNumber, message = '') => {
  const cleanedNumber = cleanPhoneNumber(phoneNumber);
  
  if (!cleanedNumber) {
    return null;
  }
  
  let url = `https://wa.me/${cleanedNumber}`;
  
  if (message && message.trim()) {
    const encodedMessage = encodeURIComponent(message.trim());
    url += `?text=${encodedMessage}`;
  }
  
  return url;
};

/**
 * @param {string} phoneNumber 
 * @param {string} message 
 * @returns {boolean} 
 */
const openWhatsApp = (phoneNumber, message = '') => {
  const url = generateWhatsAppURL(phoneNumber, message);
  
  if (!url) {
    console.error('Número de teléfono inválido para WhatsApp:', phoneNumber);
    return false;
  }
  
  try {
    window.open(url, '_blank', 'noopener,noreferrer');
    return true;
  } catch (error) {
    console.error('Error al abrir WhatsApp:', error);
    return false;
  }
};

/**

 * @param {string} phoneNumber 
 * @returns {boolean} 
 */
const isValidWhatsAppNumber = (phoneNumber) => {
  const cleanedNumber = cleanPhoneNumber(phoneNumber);
  
  if (!cleanedNumber) return false;
  
  if (isInternationalNumber(phoneNumber)) {
    return cleanedNumber.length >= 8;
  }
  
  return cleanedNumber.startsWith('549') && cleanedNumber.length >= 12;
};

/**
 * @param {Object} props 
 * @returns {React.ReactElement|null} 
 */
const WhatsAppButton = ({ 
  phoneNumber, 
  message = '', 
  className = '', 
  children = '💬'
}) => {
  if (!isValidWhatsAppNumber(phoneNumber)) {
    return null;
  }

  const handleClick = (e) => {
    e.preventDefault();
    openWhatsApp(phoneNumber, message);
  };

  return (
    <button
      onClick={handleClick}
      className={`whatsapp-button ${className}`}
      type="button"
      title="Abrir WhatsApp"
    >
      {children}
    </button>
  );
};

/**
 * Hook para usar WhatsApp
 * @returns {object} 
 */
const useWhatsApp = () => {
  return {
    openWhatsApp: (phoneNumber, message = '') => openWhatsApp(phoneNumber, message),
    generateURL: (phoneNumber, message = '') => generateWhatsAppURL(phoneNumber, message),
    isValidNumber: (phoneNumber) => isValidWhatsAppNumber(phoneNumber),
    cleanNumber: (phoneNumber) => cleanPhoneNumber(phoneNumber),
    isInternational: (phoneNumber) => isInternationalNumber(phoneNumber)
  };
};

const whatsappService = {
  cleanPhoneNumber,
  generateWhatsAppURL,
  openWhatsApp,
  isValidWhatsAppNumber,
  isInternationalNumber,
  WhatsAppButton,
  useWhatsApp
};

export default whatsappService;

// Exportaciones nombradas
export {
  cleanPhoneNumber,
  generateWhatsAppURL,
  openWhatsApp,
  isValidWhatsAppNumber,
  isInternationalNumber,
  WhatsAppButton,
  useWhatsApp
};