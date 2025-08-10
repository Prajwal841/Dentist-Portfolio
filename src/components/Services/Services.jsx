import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Smile, 
  Braces, 
  Zap, 
  Droplets, 
  Sparkles, 
  Activity 
} from 'lucide-react'
import AppointmentModal from '../UI/AppointmentModal'
import styles from './Services.module.css'

const services = [
  {
    id: 1,
    title: 'Cosmetic Dentistry',
    description: 'Transform your smile with advanced cosmetic procedures including veneers, bonding, and smile makeovers.',
    icon: Smile,
    color: '#2CB1BC'
  },
  {
    id: 2,
    title: 'Periodontology',
    description: 'Periodontal treatment for gum disease and other periodontal problems.',
    icon: Braces,
    color: '#1C7C82'
  },
  {
    id: 3,
    title: 'Dental Implants',
    description: 'Restore missing teeth with durable, natural-looking dental implants that last a lifetime.',
    icon: Zap,
    color: '#F4D35E'
  },
  {
    id: 4,
    title: 'Teeth Cleaning',
    description: 'Professional dental cleaning and hygiene services to maintain optimal oral health.',
    icon: Droplets,
    color: '#2CB1BC'
  },
  {
    id: 5,
    title: 'Teeth Whitening',
    description: 'Brighten your smile with professional teeth whitening treatments for a more confident appearance.',
    icon: Sparkles,
    color: '#1C7C82'
  },
  {
    id: 6,
    title: 'Root Canal',
    description: 'Advanced endodontic treatment to save damaged teeth and relieve pain effectively.',
    icon: Activity,
    color: '#F4D35E'
  }
]

const ServiceCard = ({ service, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })
  const Icon = service.icon

  return (
    <motion.div
      ref={ref}
      className={styles.serviceCard}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
      }}
    >
      <motion.div 
        className={styles.cardHeader}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div 
          className={styles.iconContainer}
          style={{ backgroundColor: service.color }}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Icon size={32} color="white" />
        </motion.div>
        <h3>{service.title}</h3>
      </motion.div>
      <p>{service.description}</p>

    </motion.div>
  )
}

const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)

  return (
    <section id="services" className={styles.services} ref={ref}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Our Services</h2>
          <p>Comprehensive dental care tailored to your unique needs</p>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p>Ready to transform your smile?</p>
          <motion.button
            className={`${styles.ctaButton} btn btn-primary`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsAppointmentModalOpen(true)}
          >
            Schedule Consultation
          </motion.button>
        </motion.div>
      </div>
      
      <AppointmentModal 
        isOpen={isAppointmentModalOpen} 
        onClose={() => setIsAppointmentModalOpen(false)}
        services={services.map(service => service.title)}
      />
    </section>
  )
}

export default Services
