import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Services from './components/Services/Services'
import Gallery from './components/Gallery/Gallery'
import Achievements from './components/Achievements/Achievements'
import Testimonials from './components/Testimonials/Testimonials'
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import Preloader from './components/UI/Preloader'
import Modal from './components/UI/Modal'
import AppointmentModal from './components/UI/AppointmentModal'
import usePrefersReducedMotion from './hooks/usePrefersReducedMotion'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const prefersReducedMotion = usePrefersReducedMotion()

  // Available dental services
  const dentalServices = [
    'Cosmetic Dentistry',
    'Periodontology',
    'Dental Implants',
    'Teeth Cleaning',
    'Teeth Whitening',
    'Root Canal'
  ]

  useEffect(() => {
    // Simulate loading time for assets
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'gallery', 'testimonials', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleBookAppointment = () => {
    setIsAppointmentModalOpen(true)
  }

  if (isLoading) {
    return <Preloader />
  }

  return (
    <ThemeProvider>
      <div className="App">
        <Header activeSection={activeSection} onBookAppointment={handleBookAppointment} />
        
        <main>
          <Hero onBookAppointment={handleBookAppointment} prefersReducedMotion={prefersReducedMotion} />
          <About />
          <Services />
          <Gallery />
          <Achievements />
          <Testimonials />
          <Contact onBookAppointment={handleBookAppointment} />
        </main>

        <Footer />

        {/* Appointment Modal */}
        <AppointmentModal
          isOpen={isAppointmentModalOpen}
          onClose={() => setIsAppointmentModalOpen(false)}
          services={dentalServices}
        />
      </div>
    </ThemeProvider>
  )
}

export default App
