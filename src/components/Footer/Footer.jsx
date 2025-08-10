import React from 'react'
import { motion } from 'framer-motion'
import { Youtube, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'
import styles from './Footer.module.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://youtube.com/@drpratikshapatilmds?si=NCXP2tYwF55olu8H',
      color: '#ff0000'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/perio_chick/',
      color: '#e4405f'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/dr-pratiksha-patil-281582234?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      color: '#0077b5'
    }
  ]

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' }
  ]

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.content}>
          <motion.div
            className={styles.section}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, threshold: 0.3 }}
          >
            <div className={styles.logo}>
              <img 
                src="/assets/logo.png" 
                alt="Dr. Pratiksha Patil Dental Clinic Logo" 
                width="40" 
                height="40"
                className={styles.logoImage}
              />
              <div>
                <h3>Dr. Pratiksha Patil</h3>
                <p>Crafting Perfect Smiles</p>
              </div>
            </div>
            <p className={styles.description}>
              Dedicated to providing exceptional dental care with a personal touch. 
              Your smile is our priority.
            </p>
            <div className={styles.social}>
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ '--social-color': social.color }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className={styles.section}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, threshold: 0.3 }}
          >
            <h4>Quick Links</h4>
            <ul className={styles.links}>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className={styles.link}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className={styles.section}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true, threshold: 0.3 }}
          >
            <h4>Services</h4>
            <ul className={styles.links}>
              <li>Cosmetic Dentistry</li>
              <li>Orthodontics</li>
              <li>Dental Implants</li>
              <li>Teeth Cleaning</li>
              <li>Teeth Whitening</li>
              <li>Root Canal</li>
            </ul>
          </motion.div>

          <motion.div
            className={styles.section}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true, threshold: 0.3 }}
          >
            <h4>Contact Info</h4>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Phone size={16} />
                <span>+91 8767504553</span>
              </div>
              <div className={styles.contactItem}>
                <Mail size={16} />
                <span>patilpratiksha0@gmail.com</span>
              </div>
              <div className={styles.contactItem}>
                <MapPin size={16} />
                <span>123 Dental Street, City, State 12345</span>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className={styles.bottom}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, threshold: 0.3 }}
        >
          <div className={styles.copyright}>
            <p>&copy; {currentYear} Dr. Pratiksha Patil. All rights reserved.</p>
          </div>
          <div className={styles.legal}>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/sitemap">Sitemap</a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
