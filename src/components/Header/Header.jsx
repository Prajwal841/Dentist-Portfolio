import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import ThemeToggle from '../UI/ThemeToggle'
import styles from './Header.module.css'

const Header = ({ activeSection, onBookAppointment }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        <motion.div
          className={styles.logo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToSection('home')}
        >
          <img 
            src="/assets/logo.png" 
            alt="Dr. Pratiksha Patil" 
            className={styles.logoImage}
          />
          <span className={styles.logoText}>Dr. Pratiksha Patil</span>
        </motion.div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`${styles.navLink} ${activeSection === item.id ? styles.active : ''}`}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.headerActions}>
          <ThemeToggle />
          <motion.button
            className={styles.ctaButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBookAppointment}
          >
            Book Appointment
          </motion.button>
        </div>

        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <motion.div
        className={styles.mobileMenu}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <ul className={styles.mobileNavList}>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`${styles.mobileNavLink} ${activeSection === item.id ? styles.active : ''}`}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
          <li>
            <div className={styles.mobileThemeToggle}>
              <ThemeToggle />
            </div>
          </li>
          <li>
            <button
              className={styles.mobileCtaButton}
              onClick={onBookAppointment}
            >
              Book Appointment
            </button>
          </li>
        </ul>
      </motion.div>
    </motion.header>
  )
}

export default Header
