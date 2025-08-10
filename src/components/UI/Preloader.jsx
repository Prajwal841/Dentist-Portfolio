import React from 'react'
import { motion } from 'framer-motion'
import styles from './Preloader.module.css'
import dentalImage from '../../assets/dental.png'

const Preloader = () => {
  return (
    <motion.div
      className={styles.preloader}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.content}>
        <motion.div
          className={styles.tooth}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <motion.img
            src={dentalImage}
            alt="Dental Care"
            className={styles.dentalImage}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className={styles.title}
        >
          Dr. Pratiksha Patil
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className={styles.subtitle}
        >
          Crafting Perfect Smiles
        </motion.p>
      </div>
    </motion.div>
  )
}

export default Preloader
