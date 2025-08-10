// EmailJS Configuration
// To get these values:
// 1. Create account at https://www.emailjs.com/
// 2. Create email service (Gmail, Outlook, etc.)
// 3. Create email template
// 4. Get your Public Key from Account settings

export const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_9vzj31v',      // Replace with your EmailJS service ID
  TEMPLATE_ID: 'template_v63dy1o',    // Replace with your EmailJS template ID for contact form
  APPOINTMENT_TEMPLATE_ID: 'template_efxmjza', // Replace with your EmailJS template ID for appointments
  PUBLIC_KEY: 'RLM474FEt0gv25apa'       // Replace with your EmailJS public key
}

// Contact form template should include these variables:
// {{from_name}} - Sender's name
// {{from_email}} - Sender's email
// {{phone}} - Sender's phone
// {{message}} - Message content

// Appointment template should include these variables:
// {{patient_name}} - Patient's name
// {{patient_email}} - Patient's email
// {{patient_phone}} - Patient's phone
// {{appointment_date}} - Preferred appointment date
// {{appointment_time}} - Preferred appointment time
// {{reason}} - Reason for visit
// {{selected_services}} - Selected services
// Note: The recipient email is configured in your EmailJS service settings
