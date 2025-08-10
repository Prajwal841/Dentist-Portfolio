#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

console.log('🎯 Setting up Dr. Sarah Johnson Dentist Portfolio...\n')

// Check if dental_chair_ostem.glb exists
const modelPath = path.join(__dirname, 'src', 'assets', 'models', 'dental_chair_ostem.glb')
if (!fs.existsSync(modelPath)) {
  console.log('⚠️  Warning: Dental chair model not found!')
  console.log('   Please place your dental_chair_ostem.glb file in: src/assets/models/dental_chair_ostem.glb')
  console.log('   The app will use a placeholder model until you add the real one.\n')
} else {
  console.log('✅ Dental chair model found!')
}

// Check if node_modules exists
const nodeModulesPath = path.join(__dirname, 'node_modules')
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 Installing dependencies...')
  console.log('   Run: npm install')
  console.log('')
} else {
  console.log('✅ Dependencies found!')
}

console.log('🚀 To get started:')
console.log('   1. Run: npm install')
console.log('   2. Run: npm run dev')
console.log('   3. Open: http://localhost:3000')
console.log('')
console.log('📝 Next steps:')
console.log('   - Replace placeholder content with your dental practice information')
console.log('   - Add your dental chair GLB model to src/assets/models/dental_chair_ostem.glb')
console.log('   - Customize colors in src/styles/global.css')
console.log('   - Update contact information in src/components/Contact/Contact.jsx')
console.log('')
console.log('📚 For more information, see README.md')
