# Dr. Sarah Johnson - Dentist Portfolio

A sleek, modern, and highly attractive dentist portfolio landing page built with React, featuring a 3D dental chair model with scroll-driven animations.

## 🚀 Features

- **3D Dental Chair Model**: Interactive 3D model using React Three Fiber
- **Scroll-Driven Animations**: Smooth parallax effects and stage reveals using GSAP ScrollTrigger
- **Responsive Design**: Mobile-first approach with touch-friendly interactions
- **Accessibility**: WCAG compliant with reduced motion support
- **Performance Optimized**: Lazy loading, code splitting, and optimized assets
- **Modern UI/UX**: Glassmorphism design with smooth animations

## 🛠️ Tech Stack

- **React 18** - Latest React with functional components and hooks
- **React Three Fiber** - 3D graphics and model rendering
- **@react-three/drei** - Useful helpers for React Three Fiber
- **Framer Motion** - Smooth animations and transitions
- **GSAP** - Scroll-driven animations and ScrollTrigger
- **CSS Modules** - Scoped styling
- **Vite** - Fast build tool and development server
- **Lucide React** - Beautiful icons

## 📁 Project Structure

```
src/
├── components/
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Header.module.css
│   ├── Hero/
│   │   ├── Hero.jsx
│   │   └── Hero.module.css
│   ├── About/
│   │   ├── About.jsx
│   │   └── About.module.css
│   ├── Services/
│   │   ├── Services.jsx
│   │   └── Services.module.css
│   ├── Gallery/
│   │   ├── Gallery.jsx
│   │   └── Gallery.module.css
│   ├── Testimonials/
│   │   ├── Testimonials.jsx
│   │   └── Testimonials.module.css
│   ├── Contact/
│   │   ├── Contact.jsx
│   │   └── Contact.module.css
│   ├── Footer/
│   │   ├── Footer.jsx
│   │   └── Footer.module.css
│   └── UI/
│       ├── Preloader.jsx
│       ├── Preloader.module.css
│       ├── Modal.jsx
│       └── Modal.module.css
├── hooks/
│   ├── usePrefersReducedMotion.js
│   └── useScrollProgress.js
├── assets/
│   ├── images/
│   └── models/
│       └── chair.glb
├── styles/
│   └── global.css
├── App.jsx
└── main.jsx
```

## 🎯 Key Features

### 3D Model Integration
- Loads dental chair model from `src/assets/models/chair.glb`
- Smooth breathing animation with subtle vertical oscillation
- Scroll-driven rotation, translation, and scaling
- Mouse parallax effect on non-touch devices
- Mobile fallback with static image

### Scroll Animations
- GSAP ScrollTrigger for smooth scroll-driven animations
- Camera movement and model transformations
- Section reveal animations with Framer Motion
- Performance optimized with `requestAnimationFrame`

### Responsive Design
- Mobile-first approach
- Touch-friendly interactions
- Optimized 3D performance on mobile devices
- Progressive enhancement

### Accessibility
- Semantic HTML structure
- ARIA labels and keyboard navigation
- Reduced motion support
- Screen reader friendly

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dentist-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add the dental chair model**
   - Place your `chair.glb` file in `src/assets/models/chair.glb`
   - The model should be optimized for web (compressed, reasonable file size)

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎨 Customization

### Colors
Update the CSS variables in `src/styles/global.css`:

```css
:root {
  --primary: #2CB1BC;    /* Teal */
  --secondary: #1C7C82;  /* Dark Teal */
  --accent: #F4D35E;     /* Soft Gold */
  --bg-light: #F9FAFB;   /* Off White */
  --bg-dark: #101820;    /* Dark Navy */
  --text-primary: #1F2937; /* Charcoal */
  --text-light: #F9FAFB;   /* Off White */
}
```

### Content
- Update doctor information in `src/components/About/About.jsx`
- Modify services in `src/components/Services/Services.jsx`
- Change testimonials in `src/components/Testimonials/Testimonials.jsx`
- Update contact information in `src/components/Contact/Contact.jsx`

### 3D Model
- Replace `src/assets/models/chair.glb` with your own model
- Adjust model positioning and scaling in `src/components/Hero/Hero.jsx`
- Modify animation parameters in the `DentalChair` component

## 📱 Mobile Optimization

The project includes several mobile optimizations:

- **3D Model Fallback**: Static image on mobile devices
- **Touch Interactions**: Optimized for touch devices
- **Performance**: Reduced animations on low-power devices
- **Responsive Layout**: Mobile-first design approach

## 🔧 Performance Tips

1. **Optimize GLB Model**:
   - Compress textures
   - Reduce polygon count
   - Use draco compression if available

2. **Image Optimization**:
   - Use WebP format
   - Implement lazy loading
   - Optimize image sizes

3. **Code Splitting**:
   - Lazy load non-critical components
   - Split vendor bundles

## 🐛 Troubleshooting

### 3D Model Not Loading
- Ensure the model file is in the correct location: `src/assets/models/chair.glb`
- Check browser console for errors
- Verify the model format is GLB/GLTF

### Performance Issues
- Reduce model complexity
- Enable draco compression
- Check for memory leaks in animations

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Verify all dependencies are installed

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support and questions:
- Email: info@drjohnson.com
- Phone: +1 (555) 123-4567

---

**Note**: This is a demo project. Replace placeholder content with actual dental practice information before deployment.
