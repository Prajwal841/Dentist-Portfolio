import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import styles from './Testimonials.module.css'

const testimonials = [
  {
    id: 1,
    name: 'Sayli Kulkarni',
    role: 'Patient',
    image: '/assets/images/testimonial-1.jpg',
    quote: 'Dr. Patil transformed my smile completely. The entire experience was comfortable and professional. I couldn\'t be happier with the results!',
    rating: 5
  },
  {
    id: 2,
    name: 'Malavika Yadav',
    role: 'Patient',
    image: '/assets/images/testimonial-2.jpg',
    quote: 'After years of being self-conscious about my teeth, Dr. Patil gave me the confidence to smile again. Her attention to detail is incredible.',
    rating: 5
  },
  {
    id: 3,
    name: 'Eshaan Patel',
    role: 'Patient',
    image: '/assets/images/testimonial-3.jpg',
    quote: 'The best dental experience I\'ve ever had. Dr. Patil and her team are amazing. They made me feel comfortable throughout the entire process.',
    rating: 5
  },
  {
    id: 4,
    name: 'Dhruvi Desai',
    role: 'Patient',
    image: '/assets/images/testimonial-4.jpg',
    quote: 'Professional, caring, and exceptional results. Dr. Patil exceeded all my expectations. I highly recommend her to anyone looking for quality dental care.',
    rating: 5
  },
  {
    id: 5,
    name: 'Leela Patil',
    role: 'Patient',
    image: '/assets/images/testimonial-5.jpg',
    quote: 'From the moment I walked in, I felt welcomed and cared for. Dr. Pratiksha\'s expertise and gentle approach made all the difference in my treatment.',
    rating: 5
  }
]

const TestimonialCard = ({ testimonial, isActive }) => {
  return (
    <motion.div
      className={styles.testimonialCard}
      initial={{ opacity: 0, x: 100 }}
      animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.quoteIcon}>
        <Quote size={32} />
      </div>
      <p className={styles.quote}>{testimonial.quote}</p>
      <div className={styles.rating}>
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} size={20} fill="var(--accent)" color="var(--accent)" />
        ))}
      </div>
      <div className={styles.author}>
        <div className={styles.authorImage}>
          <div className={styles.imagePlaceholder}>
            <span>{testimonial.name.charAt(0)}</span>
          </div>
        </div>
        <div className={styles.authorInfo}>
          <h4>{testimonial.name}</h4>
          <span>{testimonial.role}</span>
        </div>
      </div>
    </motion.div>
  )
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const ref = useRef(null)
  const intervalRef = useRef(null)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index) => {
    setCurrentIndex(index)
    // Pause auto-play temporarily when user manually selects
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 3000) // Resume after 3 seconds
  }

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000) // 5 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying])

  // Pause auto-scroll on hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false)
  }

  const handleMouseLeave = () => {
    setIsAutoPlaying(true)
  }

  // Handle manual navigation
  const handlePrevClick = () => {
    prevTestimonial()
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 3000)
  }

  const handleNextClick = () => {
    nextTestimonial()
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 3000)
  }

  return (
    <section id="testimonials" className={styles.testimonials} ref={ref}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, threshold: 0.3 }}
        >
          <h2>What Our Patients Say</h2>
          <p>Real stories from real patients who have transformed their smiles</p>
        </motion.div>

        <motion.div
          className={styles.carousel}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, threshold: 0.3 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button 
            className={styles.carouselButton}
            onClick={handlePrevClick}
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <div className={styles.carouselContent}>
            <AnimatePresence mode="wait">
              <TestimonialCard
                key={currentIndex}
                testimonial={testimonials[currentIndex]}
                isActive={true}
              />
            </AnimatePresence>
          </div>

          <button 
            className={styles.carouselButton}
            onClick={handleNextClick}
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </motion.div>

        <motion.div
          className={styles.dots}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true, threshold: 0.3 }}
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => goToTestimonial(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </motion.div>

        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true, threshold: 0.3 }}
        >
          <div className={styles.stat}>
            <h3>5000+</h3>
            <p>Happy Patients</p>
          </div>
          <div className={styles.stat}>
            <h3>98%</h3>
            <p>Satisfaction Rate</p>
          </div>
          <div className={styles.stat}>
            <h3>15+</h3>
            <p>Years Experience</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
