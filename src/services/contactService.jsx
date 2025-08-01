import whatsappService from "./openWhatsapp";

const contactService = {
  handleWhatsAppClick: (phoneNumber, memberName, memberTitle) => {
  if (!phoneNumber) {
    console.warn('No hay número de teléfono disponible para:', memberName);
    return;
  }

  const message = `Hola ${memberName} (${memberTitle}), me comunico desde la página web de CACF. Me gustaría contactar con usted.`;
  
  const success = whatsappService.openWhatsApp(phoneNumber, message);
  
  if (!success) {
    alert('No se pudo abrir WhatsApp. Verifique que el número sea válido.');
  }
  },

  handleEmailClick: (email, memberName, memberTitle) => {
  if (!email) {
    console.warn('No hay email disponible para:', memberName);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.error('Email inválido:', email);
    alert('El email no tiene un formato válido.');
    return;
  }

  const subject = encodeURIComponent(`Consulta desde página web CACF - ${memberTitle}`);
  const body = encodeURIComponent(
    `Estimado/a ${memberName},\n\n` +
    `Me comunico desde la página web de CACF.\n\n` +
    `[Escriba aquí su consulta]\n\n` +
    `Saludos cordiales.`
  );

  const mailtoURL = `mailto:${email}?subject=${subject}&body=${body}`;

  try {
    window.location.href = mailtoURL;
  } catch (error) {
    console.error('Error al abrir cliente de email:', error);
    alert('No se pudo abrir el cliente de email.');
  }
  },

  canShowWhatsAppButton: (phoneNumber) => {
  return phoneNumber && whatsappService.isValidWhatsAppNumber(phoneNumber);
  },

  canShowEmailButton: (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
  }
};

export default contactService;