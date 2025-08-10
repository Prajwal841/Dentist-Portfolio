import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import styles from './ThemeToggle.module.css'

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <motion.button
      className={styles.themeToggle}
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <motion.div
        className={styles.iconContainer}
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isDarkMode ? (
          <Sun size={20} className={styles.icon} />
        ) : (
          <Moon size={20} className={styles.icon} />
        )}
      </motion.div>
    </motion.button>
  )
}

export default ThemeToggle
