# GSAP Scroll Animation Implementation Guide

This guide explains how to implement Aspekto-style scroll animations using GSAP + ScrollTrigger.

## Features

- **Text reveal animation**: Masked bottom-to-top reveal with staggered delays
- **Image reveal animation**: Scale + translateY with opacity fade
- **Viewport-based trigger**: Activates at 70% from top
- **One-time animation**: Plays only once per page load
- **Smooth easing**: Uses `easeOutExpo` for cinematic feel

## Components

### 1. GSAPScrollReveal (Main Container)

Wraps your entire section and manages all animations.

```tsx
<GSAPScrollReveal
  className={styles.section}
  triggerStart="top 70%"     // When to start animation
  duration={0.8}              // Animation duration (seconds)
  staggerDelay={0.12}         // Delay between staggered elements
>
  {/* Your content here */}
</GSAPScrollReveal>
```

**Props:**
- `triggerStart`: ScrollTrigger start position (default: `"top 70%"`)
- `duration`: Animation duration in seconds (default: `0.8`)
- `staggerDelay`: Delay between staggered animations (default: `0.12`)
- `className`: CSS class for styling

### 2. TextReveal (Text Animation)

Wraps text elements to create the masked reveal effect.

```tsx
<TextReveal
  as="h2"                     // HTML tag (h1-h6, p, span, div)
  animateType="heading"       // "heading", "paragraph", or "button"
  className={styles.title}    // Your CSS class
>
  Your Text Here
</TextReveal>
```

**animateType values:**
- `"heading"`: For titles, headings
- `"paragraph"`: For paragraphs, body text
- `"button"`: For call-to-action buttons

### 3. ImageReveal (Image Animation)

Wraps images with scale + translateY animation.

```tsx
<ImageReveal
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  className={styles.image}
  priority={false}
/>
```

## Usage Example

### Before (Basic Framer Motion)
```tsx
<motion.h2
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Title
</motion.h2>
```

### After (GSAP Scroll Animation)
```tsx
<GSAPScrollReveal>
  <div className={styles.section}>
    <TextReveal as="h2" animateType="heading" className={styles.title}>
      Title
    </TextReveal>
    
    <TextReveal as="p" animateType="paragraph">
      Your paragraph text here...
    </TextReveal>
    
    <ImageReveal
      src="/image.jpg"
      alt="Section image"
    />
    
    <TextReveal as="button" animateType="button" className={styles.button}>
      Learn More
    </TextReveal>
  </div>
</GSAPScrollReveal>
```

## Animation Sequence

By default, animations play in this order:

1. **Heading** (animateType="heading") → starts at 0ms
2. **Paragraph** (animateType="paragraph") → starts at ~120ms delay
3. **Button** (animateType="button") → starts at ~240ms delay
4. **Images** (animateType="image") → starts at 0ms (simultaneous with heading)

## Customization Examples

### Faster animation
```tsx
<GSAPScrollReveal duration={0.6} staggerDelay={0.08}>
  {/* content */}
</GSAPScrollReveal>
```

### Slower animation with more spacing
```tsx
<GSAPScrollReveal duration={1.2} staggerDelay={0.15}>
  {/* content */}
</GSAPScrollReveal>
```

### Trigger at different viewport position
```tsx
<GSAPScrollReveal triggerStart="top 80%">  {/* Earlier trigger */}
  {/* content */}
</GSAPScrollReveal>

<GSAPScrollReveal triggerStart="top 50%">  {/* Later trigger */}
  {/* content */}
</GSAPScrollReveal>
```

## CSS Classes Available

In `ScrollAnimations.module.css`:

- `.textWrapper` - Inline text wrapper with overflow hidden
- `.textWrapperBlock` - Block-level text wrapper
- `.textWrapperFullWidth` - Full-width text wrapper
- `.revealText` - The animated text element
- `.imageWrapper` - Image container with overflow hidden
- `.imageContent` - Image content with transform applied
- `.sectionContainer` - Main section container

## Performance Notes

- Uses `will-change` for optimized performance
- `contain: layout style` for paint optimization
- ScrollTrigger automatically cleans up on unmount
- All animations are GPU-accelerated

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (with -webkit prefixes)
- Mobile browsers: Full support with touch-optimized rendering

## Tips for Best Results

1. **Keep text concise** - Long text blocks look better with multiple paragraph elements
2. **Match pacing** - Use consistent `duration` and `staggerDelay` across your site
3. **Hierarchy** - Animate headings first, then paragraphs, then buttons
4. **Images** - Always use ImageReveal for high-quality image animation
5. **Test on mobile** - Animations should feel smooth on slower devices

## Easing Options

Current: `ease: 'expo.out'` (recommended for cinematic feel)

Other GSAP easing options:
- `'power4.out'` - Smooth and fast
- `'power3.out'` - Balanced ease-out
- `'power2.out'` - Subtle ease-out
- `'sine.out'` - Very smooth
- `'back.out'` - Slight bounce effect

## Troubleshooting

**Animation not triggering?**
- Ensure `GSAPScrollReveal` wraps the entire section
- Check browser console for GSAP warnings
- Verify ScrollTrigger is registered with `gsap.registerPlugin(ScrollTrigger)`

**Text appearing before animation?**
- Ensure `TextReveal` wraps all text that should animate
- Check CSS for conflicting styles

**Image distortion?**
- Ensure proper aspect ratio in `ImageReveal` props
- Check parent container width constraints

## Applied Sections

Currently updated:
- ✅ AboutSection

Ready to implement in:
- Services
- BenefitsSection
- WhyChooseUs
- MissionVision
- VideoSection
- WantToKnowMore
- And more...
