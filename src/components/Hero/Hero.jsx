import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './Hero.module.css'
import dentalImage from '../../assets/dental.png'

const HeroContent = ({ onBookAppointment }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <motion.div
      ref={ref}
      className={styles.content}
      style={{ y, opacity }}
    >
      <motion.h1 
        className={styles.title}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.span
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
        >
          Dr. Pratiksha Patil
        </motion.span>
        <motion.span 
          className={styles.designation}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          whileHover={{ scale: 1.02, color: '#ffffff' }}
        >
          BDS, MDS – Periodontology & Oral Implantology
        </motion.span>
        <motion.span 
          className={styles.subtitle}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          whileHover={{ scale: 1.1, color: 'var(--accent)' }}
        >
          Crafting Perfect Smiles
        </motion.span>
      </motion.h1>
      <motion.p 
        className={styles.description}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        Experience world-class dental care in a comfortable, modern environment. 
        From routine checkups to advanced cosmetic procedures, we're here to help 
        you achieve the smile you've always dreamed of.
      </motion.p>
      <motion.button
        className={`${styles.ctaButton} btn btn-primary`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: "0 20px 40px rgba(44, 177, 188, 0.3)",
          y: -5
        }}
        whileTap={{ scale: 0.95 }}
        onClick={onBookAppointment}
      >
        Book Appointment
      </motion.button>
    </motion.div>
  )
}

const FloatingElements = () => {
  return (
    <div className={styles.floatingElements}>
      <motion.div
        className={styles.floatingElement}
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 5, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ left: '10%', top: '20%' }}
        whileHover={{ scale: 1.2, rotate: 180 }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="var(--primary)" opacity="0.3"/>
        </svg>
      </motion.div>
      <motion.div
        className={styles.floatingElement}
        animate={{
          y: [20, -20, 20],
          rotate: [0, -5, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ right: '15%', top: '30%' }}
        whileHover={{ scale: 1.3, rotate: -180 }}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke="var(--accent)" strokeWidth="2" fill="none" opacity="0.4"/>
        </svg>
      </motion.div>
      <motion.div
        className={styles.floatingElement}
        animate={{
          y: [-15, 15, -15],
          rotate: [0, 3, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ left: '20%', bottom: '25%' }}
        whileHover={{ scale: 1.25, rotate: 90 }}
      >
        <svg width="25" height="25" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z" fill="var(--secondary)" opacity="0.3"/>
        </svg>
      </motion.div>
      <motion.div
        className={styles.floatingElement}
        animate={{
          y: [15, -15, 15],
          rotate: [0, -3, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ right: '25%', bottom: '15%' }}
        whileHover={{ scale: 1.2, rotate: -90 }}
      >
        <svg width="35" height="35" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="var(--primary)" strokeWidth="1.5" fill="none" opacity="0.2"/>
        </svg>
      </motion.div>
      <motion.div
        className={styles.floatingElement}
        animate={{
          y: [-10, 10, -10],
          rotate: [0, 2, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ left: '5%', bottom: '10%' }}
        whileHover={{ scale: 1.15, rotate: 45 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L13.09 8.26L20 9L14 14.14L15.18 21.02L12 17.77L8.82 21.02L10 14.14L4 9L10.91 8.26L12 2Z" fill="var(--accent)" opacity="0.4"/>
        </svg>
      </motion.div>
    </div>
  )
}

const Hero = ({ onBookAppointment, prefersReducedMotion }) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.container}>
        <HeroContent onBookAppointment={onBookAppointment} />
        
        <motion.div 
          className={styles.heroImage}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div 
            className={styles.imageContainer}
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className={styles.imagePlaceholder}
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, 0],
                boxShadow: [
                  "0 20px 40px rgba(0, 0, 0, 0.1)",
                  "0 30px 60px rgba(0, 0, 0, 0.15)",
                  "0 20px 40px rgba(0, 0, 0, 0.1)"
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                boxShadow: "0 40px 80px rgba(0, 0, 0, 0.2)"
              }}
            >
              <motion.img
                src={dentalImage}
                alt="Dental Care"
                className={styles.dentalImage}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.3 }
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      
      <FloatingElements />
      
      <div className={styles.background}>
        <div className={styles.gradient}></div>
        <div className={styles.particles}></div>
      </div>
    </section>
  )
}

export default Hero
