import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, User, Phone, Mail, MessageSquare, X, CheckCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { EMAILJS_CONFIG } from '../../config/emailjs'
import styles from './AppointmentModal.module.css'

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY)

const AppointmentModal = ({ isOpen, onClose, services = [] }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    selectedServices: []
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
            const [isSubmitted, setIsSubmitted] = useState(false)
          const [submittedData, setSubmittedData] = useState({})
          const [availableTimes] = useState([
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
  ])

  // Get today's date for min date
  const today = new Date().toISOString().split('T')[0]

  // Get next 3 months for max date
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 3)
  const maxDateString = maxDate.toISOString().split('T')[0]

  // Helper function to get next available appointment date
  const getNextAvailableDate = () => {
    const today = new Date()
    let nextDate = new Date(today)
    
    // Skip weekends and find next available date
    while (nextDate.getDay() === 0 || nextDate.getDay() === 6) {
      nextDate.setDate(nextDate.getDate() + 1)
    }
    
    return nextDate.toISOString().split('T')[0]
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Phone number is invalid'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.appointmentDate) {
      newErrors.appointmentDate = 'Appointment date is required'
    } else {
      // Check if selected date is not in the past
      const selectedDate = new Date(formData.appointmentDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (selectedDate < today) {
        newErrors.appointmentDate = 'Appointment date cannot be in the past'
      } else {
        // Check if selected date is not a weekend
        const dayOfWeek = selectedDate.getDay()
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          newErrors.appointmentDate = 'Appointments are not available on weekends'
        }
      }
    }

    if (!formData.appointmentTime) {
      newErrors.appointmentTime = 'Appointment time is required'
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Reason for visit is required'
    }

    if (formData.selectedServices.length === 0) {
      newErrors.selectedServices = 'Please select at least one service'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const { SERVICE_ID, APPOINTMENT_TEMPLATE_ID, PUBLIC_KEY } = EMAILJS_CONFIG

      const templateParams = {
        to_name: 'Dr. Pratiksha Patil',
        patient_name: formData.patientName,
        patient_email: formData.email,
        patient_phone: formData.phone,
        appointment_date: formData.appointmentDate,
        appointment_time: formData.appointmentTime,
        reason: formData.reason,
        selected_services: formData.selectedServices.join(', '),
        reply_to: formData.email
      }

                    await emailjs.send(SERVICE_ID, APPOINTMENT_TEMPLATE_ID, templateParams, PUBLIC_KEY)

              setIsSubmitting(false)
              setSubmittedData({ ...formData })
              setIsSubmitted(true)
              
              // Clear form data after successful submission
              setTimeout(() => {
                setFormData({
                  patientName: '',
                  phone: '',
                  email: '',
                  appointmentDate: '',
                  appointmentTime: '',
                  reason: '',
                  selectedServices: []
                })
                setErrors({})
              }, 1000)

                    // Reset submitted state after 5 seconds
              setTimeout(() => {
                setIsSubmitted(false)
                setSubmittedData({})
                onClose()
              }, 5000)
    } catch (error) {
      console.error('Failed to book appointment:', error)
      setIsSubmitting(false)
      alert(`Failed to book appointment: ${error.text || error.message || 'Unknown error'}. Please try again or contact us directly.`)
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

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter(s => s !== service)
        : [...prev.selectedServices, service]
    }))

    // Clear error when user selects services
    if (errors.selectedServices) {
      setErrors(prev => ({
        ...prev,
        selectedServices: ''
      }))
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      onClose()
    }
  }

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className={styles.modalOverlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleClose}
      >
        <motion.div
          className={styles.modalContent}
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25,
            duration: 0.6 
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className={styles.modalHeader}>
            <h2>Book Your Appointment</h2>
            <button 
              className={styles.closeButton}
              onClick={handleClose}
              disabled={isSubmitting}
            >
              <X size={24} />
            </button>
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <motion.div
              className={styles.successMessage}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <CheckCircle size={48} className={styles.successIcon} />
              <h3>Appointment Booked Successfully!</h3>
                                    <div className={styles.appointmentDetails}>
                        <p><strong>Patient:</strong> {submittedData.patientName}</p>
                        <p><strong>Date:</strong> {new Date(submittedData.appointmentDate).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</p>
                        <p><strong>Time:</strong> {submittedData.appointmentTime}</p>
                        <p><strong>Services:</strong> {submittedData.selectedServices.join(', ')}</p>
                      </div>
              <p>We've sent you a confirmation email. We'll contact you within 24 hours to confirm your appointment.</p>
            </motion.div>
          )}

          {/* Appointment Form */}
          {!isSubmitted && (
            <form onSubmit={handleSubmit} className={styles.appointmentForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="patientName">
                    <User size={16} />
                    Patient Name *
                  </label>
                  <input
                    type="text"
                    id="patientName"
                    name="patientName"
                    value={formData.patientName}
                    onChange={handleChange}
                    className={errors.patientName ? styles.error : ''}
                    placeholder="Enter patient's full name"
                  />
                  {errors.patientName && <span className={styles.errorText}>{errors.patientName}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="phone">
                    <Phone size={16} />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? styles.error : ''}
                    placeholder="Enter phone number"
                  />
                  {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">
                  <Mail size={16} />
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? styles.error : ''}
                  placeholder="Enter email address"
                />
                {errors.email && <span className={styles.errorText}>{errors.email}</span>}
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="appointmentDate">
                    <Calendar size={16} />
                    Preferred Date *
                  </label>
                  <input
                    type="date"
                    id="appointmentDate"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    min={today}
                    max={maxDateString}
                    className={errors.appointmentDate ? styles.error : ''}
                  />
                  <small className={styles.helpText}>Available Monday-Friday only</small>
                  <small className={styles.suggestionText}>
                    Suggested: {new Date(getNextAvailableDate()).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </small>
                  {errors.appointmentDate && <span className={styles.errorText}>{errors.appointmentDate}</span>}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="appointmentTime">
                    <Calendar size={16} />
                    Preferred Time *
                  </label>
                  <select
                    id="appointmentTime"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleChange}
                    className={errors.appointmentTime ? styles.error : ''}
                  >
                    <option value="">Select time</option>
                    {availableTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                  {errors.appointmentTime && <span className={styles.errorText}>{errors.appointmentTime}</span>}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="reason">
                  <MessageSquare size={16} />
                  Reason for Visit *
                </label>
                <textarea
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className={errors.reason ? styles.error : ''}
                  placeholder="Please describe your dental concerns or reason for visit"
                  rows={3}
                />
                {errors.reason && <span className={styles.errorText}>{errors.reason}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>
                  <MessageSquare size={16} />
                  Services Required *
                </label>
                <div className={styles.servicesGrid}>
                  {services.map((service, index) => (
                    <motion.button
                      key={index}
                      type="button"
                      className={`${styles.serviceChip} ${
                        formData.selectedServices.includes(service) ? styles.selected : ''
                      }`}
                      onClick={() => handleServiceToggle(service)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {service}
                    </motion.button>
                  ))}
                </div>
                {errors.selectedServices && <span className={styles.errorText}>{errors.selectedServices}</span>}
              </div>

              <motion.button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <span>Booking Appointment...</span>
                ) : (
                  <>
                    <CheckCircle size={20} />
                    Confirm Appointment
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AppointmentModal
