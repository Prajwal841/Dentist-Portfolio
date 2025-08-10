import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Users, Clock, Star } from 'lucide-react'
import styles from './About.module.css'

const Counter = ({ end, duration = 2, icon: Icon }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.5 })

  useEffect(() => {
    if (isInView) {
      let startTime = null
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        const currentCount = Math.floor(progress * end)
        setCount(currentCount)
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])

  return (
    <motion.div
      ref={ref}
      className={styles.counter}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.counterIcon}>
        <Icon size={32} />
      </div>
      <div className={styles.counterContent}>
        <span className={styles.counterNumber}>{count}+</span>
        <span className={styles.counterLabel}>
          {end === 3 ? 'Years Experience' : 
           end === 500 ? 'Patients Treated' : 
           end === 10 ? 'Awards Won' : 'Satisfaction Rate'}
        </span>
      </div>
    </motion.div>
  )
}

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })

  return (
    <section id="about" className={styles.about} ref={ref}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2>About Dr. Pratiksha Patil</h2>
          <p>Dedicated to providing exceptional dental care with a personal touch</p>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.imageSection}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={styles.imageContainer}>
              <img 
                src="/assets/pratiksha-patil.jpeg" 
                alt="Dr. Pratiksha Patil"
                className={styles.doctorImage}
              />
            </div>
          </motion.div>

          <motion.div
            className={styles.textSection}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3>Your Trusted Dental Care Partner</h3>
            <p>
              Dr. Pratiksha Patil is a board-certified PERIODONTIST AND ORAL IMPLANTOLOGIST with good hand work with placing implants palced more than 75 plus implants in her career.
              in providing comprehensive dental care. She graduated with honors from the 
             MAHARASTRA UNIVERSITY OF HEALTH SCIENCES, and has completed advanced training in PERIODONTLOGY cosmetic 
              dentistry,and implantology. She is also a member of the Indian society of Periodontology.Her expertise in LASER AND SURGICAL TECHNIQUES, IMMIDIATE IMPLANTS ,DIRECT & INDIRECT IMPLNATS, RIDGE AGGUMENTATION , BONE REGENRATION  ESTHETIC DENTISTRY has helped her provide comprehensive dental care to her patients. she has achieved 98% satisfaction rate from her patients. She has also been awarded with best paper and poster presentation in implants field of dentistry.
            </p>
            <p>
              Dr. Patil believes in creating a painless,comfortable, welcoming environment where 
              patients feel at ease. Her approach combines cutting-edge technology with 
              personalized care, ensuring each patient receives the attention and treatment 
              they deserve.
            </p>
            
            <div className={styles.credentials}>
              <h4>Education & Certifications</h4>
              <ul>
                <li>BDS - MAHARASTRA UNIVERSITY OF HEALTH SCIENCES</li>
                <li>MDS - PERIODONTLOGY - MAHARASTRA UNIVERSITY OF HEALTH SCIENCES</li>
                <li>Advanced Training in IMPLANTOLOGY - MAHARASTRA UNIVERSITY OF HEALTH SCIENCES</li>
                <li>Member of Indian society of Periodontology</li>
              </ul>
            </div>
          </motion.div>
        </div>

        <motion.div
          className={styles.counters}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Counter end={3} icon={Clock} />
          <Counter end={500} icon={Users} />
          <Counter end={10} icon={Award} />
          <Counter end={98} icon={Star} />
        </motion.div>
      </div>
    </section>
  )
}

export default About
