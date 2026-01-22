# Stelliform Digital - Claude Development Guide

## Project Overview
A modern digital marketing agency website built with Next.js 16, featuring immersive 3D graphics, smooth animations, and a space/astronomy theme. The codebase emphasizes visual effects including particle systems, smooth scrolling, and interactive animations.

## Technology Stack

### Core Framework
- **Next.js 16** (App Router) - React-based web framework
- **React 19** - Latest React with enhanced features
- **TypeScript 5** - Type safety throughout

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework with custom theme tokens
- **Tailwind PostCSS Plugin** - Build-time CSS processing
- **Framer Motion 12** - Advanced animations and scroll effects
- **Custom CSS** - Star animations, logo scrolling, gradient effects

### 3D Graphics & Animation
- **Three.js** - WebGL 3D library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Helper components for R3F
- **GSAP** - High-performance animations
- **@studio-freight/lenis** - Smooth scrolling library

### Icons & Assets
- **@tabler/icons-react** - Icon library
- **Custom SVGs and graphics**

### Development Tools
- **ESLint** with Next.js TypeScript config
- **TypeScript** strict mode enabled
- **PM2** ecosystem for process management (development)

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# PM2 development mode (if configured)
pm2 start ecosystem.config.js
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── case-study/[slug]/  # Dynamic case study pages
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Homepage composition
│   └── globals.css         # Global styles & theme tokens
├── components/             # React components (~24 components, 2500 LOC)
│   ├── Hero.tsx           # Main hero section with parallax
│   ├── Navigation.tsx     # Site navigation
│   ├── ParticlesBackground.tsx  # 3D particle system (WebGL shaders)
│   ├── SmoothScrolling.tsx     # Lenis smooth scroll wrapper
│   ├── LogoCarousel*.tsx       # Multiple logo carousel variants
│   └── [other components]/    # Features, Portfolio, Testimonials, etc.
```

## Key Architecture Patterns

### 1. Component Composition
- Homepage (`page.tsx`) composes multiple sections as independent components
- Each component is self-contained with its own animations and state
- Heavy use of React hooks for animation and lifecycle management

### 2. Animation Strategy
- **Framer Motion**: Page-level scroll-triggered animations
- **GSAP**: Micro-interactions and complex sequences  
- **Three.js**: 3D particle systems with custom shaders
- **Lenis**: Global smooth scrolling with cinematic easing

### 3. 3D Graphics Implementation
```tsx
// Custom WebGL shaders for particle effects
// Camera parallax following mouse movement
// Performance-optimized with useFrame and useMemo
```

### 4. Styling Approach
- Tailwind utilities for layout and basic styling
- Custom CSS classes for complex animations
- CSS-in-JS for dynamic Three.js materials
- Theme tokens defined in `globals.css`

## Important Configuration Files

### `next.config.ts`
- Basic Next.js configuration (currently minimal)
- Ready for extensions (image optimization, etc.)

### `tsconfig.json`
- Strict TypeScript settings
- Path mapping: `@/*` → `./src/*`
- Next.js plugin enabled

### `eslint.config.mjs`
- Next.js TypeScript ESLint configuration
- Extends core web vitals and TypeScript rules

### `postcss.config.mjs`
- Tailwind CSS PostCSS plugin only
- No additional PostCSS processing

### `ecosystem.config.js`
- PM2 configuration for development
- Configured for Windows development environment
- Includes production deployment template

### `globals.css`
- Tailwind imports and theme tokens
- Custom utility classes (`.gradient-text`, `.golden-glow`, `.feature-card`)
- Keyframe animations for stars and logo scrolling
- Dark theme base styles

## Development Guidelines

### Performance Considerations
- 3D effects use `useFrame` for 60fps animations
- Particles optimized with instanced rendering
- Smooth scrolling configured for cinematic feel (slower duration: 6.1s)
- Component-level code splitting with dynamic imports where beneficial

### Animation Patterns
```tsx
// Scroll-based animations
const { scrollYProgress } = useScroll();
const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

// 3D particle systems with custom shaders
// Mouse parallax with smooth easing
// Intersection observer for scroll triggers
```

### Styling Conventions
- Orange/amber/yellow gradient theme (`#FF8C00`, `#FFA500`)
- Space/astronomy visual metaphors
- Glass morphism effects (`bg-white/[0.03]`)
- Consistent hover states with transform and glow effects

### Component Organization
- Each major section is a separate component
- 3D components isolated in dedicated files
- Animation logic encapsulated within components
- Responsive design with Tailwind breakpoints

## Unique Features

1. **Custom WebGL Particle System**: Star field background with mouse parallax
2. **Multiple Logo Carousel Variants**: Different animation approaches (3D, particles, glitch)
3. **Cinematic Smooth Scrolling**: Carefully tuned Lenis configuration
4. **Corner Peel Effects**: Custom CSS/SVG decorative elements
5. **Intersection Observer Integration**: Performance-optimized scroll triggers

## Quick Start for Claude

1. This is a **visual-heavy, animation-focused** website
2. Most components use **client-side rendering** (`'use client'`)
3. **3D graphics are performance-critical** - test on various devices
4. **Animation timing is carefully tuned** - preserve easing curves and durations
5. **Orange theme** is central to brand identity
6. **Code organization favors component isolation** over shared utilities

## Testing Strategy
- No formal testing framework configured
- Manual testing recommended for animations and 3D effects
- Browser compatibility testing important for WebGL features
- Performance monitoring for smooth 60fps animations

## Deployment Notes
- PM2 ecosystem includes production deployment template
- Next.js static optimization enabled
- Consider CDN for 3D assets and animations
- WebGL feature detection recommended for fallbacks