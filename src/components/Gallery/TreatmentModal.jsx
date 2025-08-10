import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, Users, Award, CheckCircle } from 'lucide-react'
import styles from './TreatmentModal.module.css'
import AppointmentModal from '../UI/AppointmentModal'

const treatmentDetails = {
  1: {
    title: 'Dental Implant Treatment',
    category: 'Implantology',
    duration: '3-6 Months',
    successRate: '98%',
    description: 'Our advanced dental implant procedure provides a permanent solution for missing teeth. Using state-of-the-art technology and premium materials, we ensure optimal integration and long-lasting results.',
    images: [
      { src: '/assets/ip3.jpeg', alt: 'Implant Procedure Step 1', caption: 'Initial implant placement with precision guided surgery' },
      { src: '/assets/ip4.jpeg', alt: 'Implant Procedure Step 2', caption: 'Final crown placement showing natural results' }
    ],
    benefits: [
      'Permanent solution for missing teeth',
      'Preserves jawbone structure',
      'Natural look and feel',
      'No damage to adjacent teeth',
      'Improved chewing and speech',
      '98% success rate with proper care'
    ],
    process: [
      { step: 1, title: 'Consultation & Planning', description: 'Comprehensive examination and 3D imaging for precise treatment planning' },
      { step: 2, title: 'Implant Placement', description: 'Surgical placement of titanium implant into the jawbone' },
      { step: 3, title: 'Healing Period', description: '3-6 months healing time for osseointegration' },
      { step: 4, title: 'Crown Placement', description: 'Custom crown attached for natural appearance and function' }
    ],
    aftercare: [
      'Regular brushing and flossing',
      'Routine dental checkups every 6 months',
      'Avoid hard foods initially',
      'Use antibacterial mouthwash',
      'Report any unusual symptoms immediately'
    ]
  },
  2: {
    title: 'Periodontal Treatment',
    category: 'Periodontology',
    duration: '2-4 Weeks',
    successRate: '95%',
    description: 'Comprehensive periodontal treatment to address gum disease and restore oral health. Our advanced techniques focus on eliminating infection, reducing inflammation, and promoting healthy gum regeneration.',
    images: [
      { src: '/assets/ip1.jpeg', alt: 'Periodontal Assessment', caption: 'Initial examination and assessment of gum condition' },
      { src: '/assets/ip2.jpeg', alt: 'Post-Treatment Results', caption: 'Healthy gums after successful periodontal therapy' }
    ],
    benefits: [
      'Eliminates gum disease and infection',
      'Prevents tooth loss',
      'Reduces gum inflammation and bleeding',
      'Improves overall oral health',
      'Fresh breath and confident smile',
      'Prevents systemic health complications'
    ],
    process: [
      { step: 1, title: 'Comprehensive Evaluation', description: 'Detailed examination of gums, measurement of pocket depths, and X-rays' },
      { step: 2, title: 'Deep Cleaning (Scaling)', description: 'Removal of plaque and tartar from above and below the gum line' },
      { step: 3, title: 'Root Planing', description: 'Smoothing of tooth roots to help gums reattach to teeth' },
      { step: 4, title: 'Follow-up Care', description: 'Regular monitoring and maintenance to ensure continued gum health' }
    ],
    aftercare: [
      'Gentle brushing with soft-bristled toothbrush',
      'Daily flossing and interdental cleaning',
      'Use prescribed antibacterial mouthwash',
      'Regular periodontal maintenance visits',
      'Avoid smoking and tobacco products',
      'Maintain a healthy diet low in sugar'
    ]
  },
  3: {
    title: 'Tooth Restoration & Repair',
    category: 'Restorative Dentistry',
    duration: '1-3 Visits',
    successRate: '97%',
    description: 'Advanced tooth restoration techniques to repair damaged, broken, or fallen teeth. We use modern materials and methods to restore both function and aesthetics, giving you back your confident smile.',
    images: [
      { src: '/assets/ip5.jpeg', alt: 'Damaged Tooth Assessment', caption: 'Initial evaluation of fallen/damaged middle tooth requiring restoration' },
      { src: '/assets/ip6.jpeg', alt: 'Completed Restoration', caption: 'Successfully restored middle tooth with natural appearance and function' }
    ],
    benefits: [
      'Restores damaged or broken teeth',
      'Natural appearance and color matching',
      'Preserves remaining healthy tooth structure',
      'Prevents further damage and decay',
      'Improved chewing and speaking ability',
      'Long-lasting and durable results'
    ],
    process: [
      { step: 1, title: 'Damage Assessment', description: 'Comprehensive evaluation of the fallen/damaged tooth and surrounding structures' },
      { step: 2, title: 'Treatment Planning', description: 'Development of optimal restoration approach based on damage extent' },
      { step: 3, title: 'Tooth Preparation', description: 'Careful preparation of the tooth structure for restoration placement' },
      { step: 4, title: 'Restoration Placement', description: 'Precise placement and shaping of the restoration for perfect fit and appearance' }
    ],
    aftercare: [
      'Avoid hard foods for 24-48 hours',
      'Maintain excellent oral hygiene',
      'Use fluoride toothpaste regularly',
      'Schedule regular dental checkups',
      'Report any sensitivity or discomfort',
      'Avoid grinding or clenching teeth'
    ]
  }
}

const TreatmentModal = ({ isOpen, onClose, treatmentId }) => {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false)
  const treatment = treatmentDetails[treatmentId]

  if (!treatment) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modalContent}
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeButton} onClick={onClose}>
              <X size={24} />
            </button>

            <div className={styles.header}>
              <h2>{treatment.title}</h2>
              <span className={styles.category}>{treatment.category}</span>
            </div>

            <div className={styles.stats}>
              <div className={styles.stat}>
                <Clock size={20} />
                <span>Duration: {treatment.duration}</span>
              </div>
              <div className={styles.stat}>
                <Award size={20} />
                <span>Success Rate: {treatment.successRate}</span>
              </div>
            </div>

            <div className={styles.content}>
                          <div className={styles.section}>
              <h3>Treatment Overview</h3>
              <div className={styles.overviewContainer}>
                <div className={styles.overviewText}>
                  <p>{treatment.description}</p>
                </div>
                {treatmentId === 1 && (
                  <div className={styles.patientImageContainer}>
                    <img 
                      src="/assets/befour1.jpeg" 
                      alt="Patient Case Overview"
                      className={styles.patientOverviewImage}
                      onError={(e) => {
                        console.error('Failed to load patient overview image')
                        e.target.style.display = 'none'
                      }}
                    />
                    <div className={styles.imageLabel}>Patient Case</div>
                  </div>
                )}
                {treatmentId === 2 && (
                  <div className={styles.patientImageContainer}>
                    <img 
                      src="/assets/ip1.jpeg" 
                      alt="Periodontal Treatment Overview"
                      className={styles.patientOverviewImage}
                      onError={(e) => {
                        console.error('Failed to load treatment overview image')
                        e.target.style.display = 'none'
                      }}
                    />
                    <div className={styles.imageLabel}>Treatment Case</div>
                  </div>
                )}
                {treatmentId === 3 && (
                  <div className={styles.patientImageContainer}>
                    <img 
                      src="/assets/ip5.jpeg" 
                      alt="Tooth Restoration Overview"
                      className={styles.patientOverviewImage}
                      onError={(e) => {
                        console.error('Failed to load restoration overview image')
                        e.target.style.display = 'none'
                      }}
                    />
                    <div className={styles.imageLabel}>Restoration Case</div>
                  </div>
                )}
              </div>
            </div>

              <div className={styles.section}>
                <h3>Procedure Images</h3>
                <div className={styles.imageGrid}>
                  {treatment.images.map((image, index) => (
                    <div key={index} className={styles.imageContainer}>
                      <img 
                        src={image.src} 
                        alt={image.alt}
                        className={styles.procedureImage}
                        onError={(e) => {
                          console.error('Failed to load treatment image:', image.src)
                          e.target.style.display = 'none'
                        }}
                      />
                      <p className={styles.imageCaption}>{image.caption}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <h3>Treatment Benefits</h3>
                <div className={styles.benefitsList}>
                  {treatment.benefits.map((benefit, index) => (
                    <div key={index} className={styles.benefit}>
                      <CheckCircle size={16} className={styles.checkIcon} />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <h3>Treatment Process</h3>
                <div className={styles.processList}>
                  {treatment.process.map((step, index) => (
                    <div key={index} className={styles.processStep}>
                      <div className={styles.stepNumber}>{step.step}</div>
                      <div className={styles.stepContent}>
                        <h4>{step.title}</h4>
                        <p>{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <h3>Post-Treatment Care</h3>
                <div className={styles.aftercareList}>
                  {treatment.aftercare.map((care, index) => (
                    <div key={index} className={styles.aftercareItem}>
                      <CheckCircle size={14} className={styles.checkIcon} />
                      <span>{care}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.footer}>
              <button 
                className={styles.consultButton}
                onClick={() => setIsAppointmentModalOpen(true)}
              >
                Schedule Consultation
              </button>
              <button className={styles.closeFooterButton} onClick={onClose}>
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        services={[]}
      />
    </AnimatePresence>
  )
}

export default TreatmentModal
