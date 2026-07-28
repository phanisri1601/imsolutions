# GSAP Scroll Animations - Quick Start Guide

## What Was Implemented

✅ **GSAP ScrollTrigger integration** - Cinematic scroll-based animations
✅ **Text reveal animations** - Bottom-to-top masked reveal with stagger
✅ **Image animations** - Scale + translate with opacity
✅ **One-time playback** - Animations play only once on page load
✅ **Viewport triggers** - Activate at 70% from top (customizable)

## Files Created

1. **GSAPScrollReveal.tsx** - Main animation controller
2. **TextReveal.tsx** - Text animation wrapper
3. **ImageReveal.tsx** - Image animation wrapper
4. **ScrollAnimations.module.css** - Animation utilities and helpers
5. **SCROLL_ANIMATION_GUIDE.md** - Detailed documentation
6. **GSAP_QUICK_START.md** - This file

## Components Already Updated

✅ **AboutSection** - Full text + image reveal animations
✅ **Services** - Section heading animations

## Quick Implementation (Copy-Paste)

### Step 1: Wrap Your Section
```tsx
<GSAPScrollReveal className={styles.section}>
  {/* Your content */}
</GSAPScrollReveal>
```

### Step 2: Animate Text Elements
```tsx
<TextReveal as="h2" animateType="heading">
  Your Heading
</TextReveal>

<TextReveal as="p" animateType="paragraph">
  Your paragraph text
</TextReveal>

<TextReveal as="button" animateType="button">
  Call to Action
</TextReveal>
```

### Step 3: Animate Images
```tsx
<ImageReveal
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
/>
```

## Animation Timeline (Default)

```
0ms   → Heading enters (translateY: 100% → 0, opacity: 0 → 1)
120ms → Paragraph enters (same transition)
240ms → Button enters (same transition)
0ms   → Image scales in (scale: 1.08 → 1) simultaneously
Duration: 0.8s | Easing: expo.out
```

## Customize Animations

### Slower animations
```tsx
<GSAPScrollReveal duration={1.2} staggerDelay={0.15}>
```

### Faster animations
```tsx
<GSAPScrollReveal duration={0.6} staggerDelay={0.08}>
```

### Trigger earlier in viewport
```tsx
<GSAPScrollReveal triggerStart="top 80%">
```

### Trigger later in viewport
```tsx
<GSAPScrollReveal triggerStart="top 50%">
```

## Apply to More Sections

### BenefitsSection
1. Wrap with `<GSAPScrollReveal>`
2. Replace `motion.div` with `TextReveal`
3. Remove old Framer Motion animation props

### WhyChooseUs
1. Wrap section with `<GSAPScrollReveal>`
2. Use `TextReveal` for headings, paragraphs, buttons
3. Use `ImageReveal` for images

### MissionVision
1. Same pattern - wrap + use TextReveal + ImageReveal

### WantToKnowMore
1. Wrap with `<GSAPScrollReveal>`
2. Animate form labels with `TextReveal`
3. Keep form interaction logic intact

## Performance Tips

- ✅ Uses GPU acceleration (transform + opacity only)
- ✅ Automatic ScrollTrigger cleanup on unmount
- ✅ `will-change` CSS for paint optimization
- ✅ `contain: layout style` for render optimization

## Browser Support

- Chrome/Edge: ✅ Full
- Firefox: ✅ Full
- Safari: ✅ Full (with -webkit prefix)
- Mobile: ✅ Full

## Troubleshooting

**Animation not playing?**
- Ensure section is inside viewport at scroll
- Check console for GSAP warnings
- Verify `GSAPScrollReveal` wraps the entire section

**Text jumpy or overlapping?**
- Ensure no conflicting CSS animations
- Check line-height is consistent
- Use `text-reveal` class for proper overflow

**Images distorted?**
- Set correct `width` and `height` props
- Ensure parent container has defined width
- Check CSS for width/height constraints

## Next Steps

1. Read `SCROLL_ANIMATION_GUIDE.md` for detailed docs
2. Apply to other sections using the template above
3. Test on mobile devices
4. Adjust timings to match your brand feel

## Example Sections Ready to Update

- BenefitsSection.tsx
- WhyChooseUs.tsx
- MissionVision.tsx
- VideoSection.tsx
- WantToKnowMore.tsx
- Offerings.tsx
- FeaturesCards.tsx
- And more...

---

**Start animating!** Pick one section and transform it with these cinematic scroll effects. 🚀
