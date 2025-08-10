import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '../../config/emailjs'
import styles from './Contact.module.css'

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)

const Contact = ({ onBookAppointment, isModal = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone number is invalid'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Check if all required fields are filled
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      // EmailJS configuration
      const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY } = EMAILJS_CONFIG

      const templateParams = {
        to_name: 'Dr. Pratiksha Patil',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        reply_to: formData.email
      }

      console.log('Form data being sent:', formData)
      console.log('Template parameters:', templateParams)
      console.log('Sending email with params:', {
        serviceID: SERVICE_ID,
        templateID: TEMPLATE_ID,
        publicKey: PUBLIC_KEY,
        templateParams
      })

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)

      setIsSubmitting(false)
      setIsSubmitted(true)
      
      // Clear form data after successful email send
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '', message: '' })
        setErrors({})
      }, 1000)

      // Reset submitted state after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000)
    } catch (error) {
      console.error('Failed to send email:', error)
      console.error('Error details:', {
        status: error.status,
        text: error.text,
        response: error.response
      })
      setIsSubmitting(false)
      // You could add error state handling here
      alert(`Failed to send message: ${error.text || error.message || 'Unknown error'}. Please try again or contact us directly.`)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 8767504553',
      link: 'tel:+918767504553'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'patilpratiksha0@gmail.com',
      link: 'mailto:patilpratiksha0@gmail.com'
    },
    {
      icon: MapPin,
      title: 'Address',
      content: '123 Dental Street, City, State 12345',
      link: 'https://maps.google.com'
    },
    {
      icon: Clock,
      title: 'Hours',
      content: 'Mon-Fri: 8AM-6PM, Sat: 9AM-3PM',
      link: null
    }
  ]

  return (
    <section id="contact" className={styles.contact} ref={ref}>
      <div className="container">
        {!isModal && (
          <motion.div
            className={styles.header}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
          >
            <h2>Get In Touch</h2>
            <p>Ready to transform your smile? Contact us today to schedule your consultation</p>
          </motion.div>
        )}

        <div className={styles.content}>
          <motion.div
            className={styles.formSection}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3>Send us a Message</h3>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? styles.error : ''}
                  placeholder="Enter your full name"
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? styles.error : ''}
                  placeholder="Enter your email address"
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? styles.error : ''}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? styles.error : ''}
                  placeholder="Tell us about your dental needs"
                  rows={5}
                />
                {errors.message && <span className={styles.errorText}>{errors.message}</span>}
              </div>

              <motion.button
                type="submit"
                className={`${styles.submitButton} btn btn-primary`}
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </motion.button>

              {isSubmitted && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    className={styles.backdrop}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setIsSubmitted(false)}
                  />
                  
                  {/* Floating Particles */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={styles.particle}
                      initial={{ 
                        opacity: 0, 
                        scale: 0,
                        x: 0,
                        y: 0
                      }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: Math.random() * 200 - 100,
                        y: Math.random() * 200 - 100
                      }}
                      transition={{ 
                        duration: 2,
                        delay: i * 0.1,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                      style={{
                        left: `calc(50% + ${Math.random() * 100 - 50}px)`,
                        top: `calc(50% + ${Math.random() * 100 - 50}px)`
                      }}
                    />
                  ))}
                  
                  {/* Success Popup */}
                  <motion.div
                    className={styles.successPopup}
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 50 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 25,
                      duration: 0.6 
                    }}
                  >
                    <div className={styles.successIcon}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                        whileHover={{ 
                          scale: 1.1,
                          rotate: [0, -10, 10, 0],
                          transition: { duration: 0.5 }
                        }}
                      >
                        ✓
                      </motion.div>
                    </div>
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      Email Sent Successfully!
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      Thank you for your message! We'll get back to you within 24 hours.
                    </motion.p>
                    <motion.div
                      className={styles.successActions}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <button 
                        className={styles.closeButton}
                        onClick={() => setIsSubmitted(false)}
                      >
                        Close
                      </button>
                    </motion.div>
                  </motion.div>
                </>
              )}
            </form>
          </motion.div>

          <motion.div
            className={styles.infoSection}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3>Contact Information</h3>
            <div className={styles.contactInfo}>
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  className={styles.contactItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                >
                  <div className={styles.iconContainer}>
                    <info.icon size={24} />
                  </div>
                  <div className={styles.infoContent}>
                    <h4>{info.title}</h4>
                    {info.link ? (
                      <a href={info.link} target="_blank" rel="noopener noreferrer">
                        {info.content}
                      </a>
                    ) : (
                      <span>{info.content}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className={styles.mapContainer}>
              <div className={styles.mapPlaceholder}>
                <MapPin size={48} />
                <p>Interactive Map</p>
                <span>123 Dental Street, City, State 12345</span>
              </div>
            </div>

            <motion.button
              className={`${styles.ctaButton} btn btn-primary`}
              onClick={onBookAppointment}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Book Appointment
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
