import React, { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, ZoomIn, Info } from 'lucide-react'
import styles from './Gallery.module.css'
import TreatmentModal from './TreatmentModal'

const galleryImages = [
  {
    id: 1,
    title: 'Treatment Result 1',
    before: '/assets/befour1.jpeg',
    after: '/assets/after1.jpeg',
    category: 'treatment'
  },
  {
    id: 2,
    title: 'Treatment Result 2',
    before: '/assets/befour2.jpeg',
    after: '/assets/after2.jpeg',
    category: 'treatment'
  },
  {
    id: 3,
    title: 'Treatment Result 3',
    before: '/assets/befour3.jpeg',
    after: '/assets/after3.jpeg',
    category: 'treatment'
  }
]

const BeforeAfterSlider = ({ image, isActive }) => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [imagesLoaded, setImagesLoaded] = useState({ before: false, after: false })
  const containerRef = useRef(null)

  const handleImageLoad = (type) => {
    setImagesLoaded(prev => ({ ...prev, [type]: true }))
  }

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const percentage = (x / rect.width) * 100
      setSliderPosition(Math.max(0, Math.min(100, percentage)))
    }
  }

  const handleTouchMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const touch = e.touches[0]
      const x = touch.clientX - rect.left
      const percentage = (x / rect.width) * 100
      setSliderPosition(Math.max(0, Math.min(100, percentage)))
    }
  }

  return (
    <motion.div
      className={styles.sliderContainer}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.beforeImage}>
        <img 
          src={image.before} 
          alt={`Before - ${image.title}`}
          className={styles.slideImage}
          onLoad={() => handleImageLoad('before')}
          onError={(e) => {
            console.error('Failed to load before image:', image.before)
            e.target.style.display = 'none'
          }}
        />
        <div className={styles.imageLabel}>
          <span>Before</span>
        </div>
      </div>
      <div 
        className={styles.afterImage}
        style={{ 
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          transition: 'clip-path 0.1s ease-out'
        }}
      >
        <img 
          src={image.after} 
          alt={`After - ${image.title}`}
          className={styles.slideImage}
          onLoad={() => handleImageLoad('after')}
          onError={(e) => {
            console.error('Failed to load after image:', image.after)
            e.target.style.display = 'none'
          }}
        />
        <div className={styles.imageLabel}>
          <span>After</span>
        </div>
      </div>
      <div 
        className={styles.slider}
        style={{ left: `${sliderPosition}%` }}
      >
        <div className={styles.sliderHandle}></div>
      </div>
      <div className={styles.sliderLabel}>
        <span>Drag to compare</span>
      </div>

    </motion.div>
  )
}

const getGalleryImageSrc = (treatmentId) => {
  switch (treatmentId) {
    case 1:
      return '/assets/after1.jpeg' // Original after image for treatment 1
    case 2:
      return '/assets/ip1.jpeg'   // IP1 image for treatment 2
    case 3:
      return '/assets/ip5.jpeg'   // IP5 image for treatment 3
    default:
      return '/assets/after1.jpeg'
  }
}

const GalleryItem = ({ image, index, onViewMore }) => {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })

  const handleClick = () => {
    if ((image.id === 1 || image.id === 2 || image.id === 3) && onViewMore) {
      onViewMore(image.id)
    }
  }

  return (
    <motion.div
      ref={ref}
      className={styles.galleryItem}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ cursor: (image.id === 1 || image.id === 2 || image.id === 3) ? 'pointer' : 'default' }}
    >
      <div className={styles.imageContainer}>
        <img 
          src={getGalleryImageSrc(image.id)} 
          alt={image.title}
          className={styles.galleryItemImage}
          onError={(e) => {
            console.error('Failed to load gallery image:', getGalleryImageSrc(image.id))
            e.target.style.display = 'none'
          }}
        />
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {(image.id === 1 || image.id === 2 || image.id === 3) ? <Info size={24} /> : <ZoomIn size={24} />}
          <span>{(image.id === 1 || image.id === 2 || image.id === 3) ? 'Treatment Details' : 'View Details'}</span>
        </motion.div>
      </div>
      <h3>{image.title}</h3>
    </motion.div>
  )
}

const Gallery = () => {
  const [activeSlider, setActiveSlider] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTreatment, setSelectedTreatment] = useState(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })

  const nextSlider = () => {
    setActiveSlider((prev) => (prev + 1) % galleryImages.length)
  }

  const prevSlider = () => {
    setActiveSlider((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const openModal = (treatmentId) => {
    setSelectedTreatment(treatmentId)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setSelectedTreatment(null)
  }

  return (
    <section id="gallery" className={styles.gallery} ref={ref}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Before & After Gallery</h2>
          <p>See the amazing transformations our patients have experienced</p>
        </motion.div>

        <motion.div
          className={styles.sliderSection}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className={styles.sliderWrapper}>
            <button 
              className={styles.sliderButton}
              onClick={prevSlider}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className={styles.sliderContent}>
              {galleryImages.map((image, index) => (
                <BeforeAfterSlider
                  key={image.id}
                  image={image}
                  isActive={index === activeSlider}
                />
              ))}
            </div>

            <button 
              className={styles.sliderButton}
              onClick={nextSlider}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className={styles.sliderDots}>
            {galleryImages.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${index === activeSlider ? styles.active : ''}`}
                onClick={() => setActiveSlider(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          className={styles.grid}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {galleryImages.map((image, index) => (
            <GalleryItem 
              key={image.id} 
              image={image} 
              index={index} 
              onViewMore={openModal}
            />
          ))}
        </motion.div>
      </div>

      <TreatmentModal
        isOpen={modalOpen}
        onClose={closeModal}
        treatmentId={selectedTreatment}
      />
    </section>
  )
}

export default Gallery
