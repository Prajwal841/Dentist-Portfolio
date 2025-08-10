import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award, Trophy, Medal, Star, Crown, Shield } from 'lucide-react'
import styles from './Achievements.module.css'

const achievementData = [
  {
    id: 1,
    title: 'Professional Excellence',
    image: '/assets/achivements1.jpeg',
    icon: Award,
    description: 'Recognition for outstanding dental practice and patient care'
  },
  {
    id: 2,
    title: 'Clinical Achievement',
    image: '/assets/achivements2.jpeg',
    icon: Trophy,
    description: 'Excellence in clinical procedures and treatment outcomes'
  },
  {
    id: 3,
    title: 'Medical Honor',
    image: '/assets/achivement3.jpeg',
    icon: Medal,
    description: 'Distinguished achievement in dental medicine and research'
  },
  {
    id: 4,
    title: 'Practice Excellence',
    image: '/assets/achivement4.jpeg',
    icon: Star,
    description: 'Outstanding contribution to dental healthcare community'
  },
  {
    id: 5,
    title: 'Leadership Recognition',
    image: '/assets/achivement5.jpeg',
    icon: Crown,
    description: 'Leadership excellence in dental practice management and innovation'
  },
  {
    id: 6,
    title: 'Professional Certification',
    image: '/assets/achivement6.jpeg',
    icon: Shield,
    description: 'Advanced certification and specialized training in dental procedures'
  }
]

const AchievementCard = ({ achievement, index }) => {
  const Icon = achievement.icon

  return (
    <motion.div
      className={styles.achievementCard}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      viewport={{ once: true, threshold: 0.3 }}
      whileHover={{ y: -10 }}
    >
      <div className={styles.imageContainer}>
        <img 
          src={achievement.image} 
          alt={achievement.title}
          className={styles.achievementImage}
          onError={(e) => {
            console.error('Failed to load achievement image:', achievement.image)
            e.target.style.display = 'none'
          }}
        />
        <div className={styles.overlay}>
          <Icon size={32} className={styles.icon} />
        </div>
      </div>
      <div className={styles.content}>
        <h3>{achievement.title}</h3>
        <p>{achievement.description}</p>
      </div>
    </motion.div>
  )
}

const Achievements = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.3 })

  return (
    <section id="achievements" className={styles.achievements} ref={ref}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Our Achievements</h2>
          <p>Recognition and awards that reflect our commitment to excellence in dental care</p>
        </motion.div>

        <div className={styles.achievementsGrid}>
          {achievementData.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              index={index}
            />
          ))}
        </div>

        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true, threshold: 0.3 }}
        >
          <div className={styles.stat}>
            <div className={styles.statNumber}>3+</div>
            <div className={styles.statLabel}>Publications</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>1</div>
            <div className={styles.statLabel}>Research Grant</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNumber}>20+</div>
            <div className={styles.statLabel}>Workshops Attended</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Achievements
