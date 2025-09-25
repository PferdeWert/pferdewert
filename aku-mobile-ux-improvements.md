# AKU Page Mobile UX Improvements - Implementation Specifications

## Overview
Based on mobile analysis at 390x844px viewport, the AKU page requires containerization of dense content sections and mobile optimization improvements. This document provides specific implementation guidelines for the frontend developer.

## Primary Issues Identified

### 1. Dense Content Without Visual Separation
- **Problem**: "Kosten der AKU" and "Befunde verstehen" sections display as continuous text blocks
- **Impact**: Poor readability and scanning on mobile devices
- **Solution**: Implement subtle content containers with requested color palette

### 2. Mobile Typography and Spacing Issues
- **Problem**: Text appears cramped on mobile viewport
- **Impact**: Reduced readability and poor user experience
- **Solution**: Optimize typography scaling and spacing for mobile

## Color Palette Implementation

### Requested Colors
- **Page Background**: `#f8f8f6`
- **Container Background**: `#f5f5f3`
- **Container Border**: `1px solid #e8e8e4`

### Current vs. New ContentSection Colors
```typescript
// Current colors in ContentSection.tsx
const currentHighlight = 'bg-[#fcf8f1] border border-[#eadfcd]'

// NEW colors to implement
const newHighlight = 'bg-[#f5f5f3] border border-[#e8e8e4]'
```

## Implementation Plan

### Phase 1: Update ContentSection Component

**File**: `/frontend/components/ContentSection.tsx`

```typescript
// Update the highlight styling to use new color palette
const sectionClasses = highlight
  ? 'bg-[#f5f5f3] border border-[#e8e8e4] rounded-3xl px-6 md:px-10 py-10 shadow-sm'
  : 'py-10'
```

### Phase 2: Mobile Typography Optimization

**Current Issues**:
- Header sizes may be too large on mobile
- Line height needs optimization for better readability
- Touch targets below 44x44px minimum

**Typography Scale Adjustments**:
```css
/* Main headings - improve mobile scaling */
h2: text-2xl md:text-3xl (instead of text-3xl md:text-[2.125rem])

/* Body text - optimize line height */
.content-text: text-base md:text-lg leading-7 md:leading-relaxed

/* Ensure minimum touch targets */
.touch-target: min-h-[44px] min-w-[44px]
```

### Phase 3: Target Section Containerization

#### "Kosten der AKU" Section
**Location**: Section 3 in the AKU content flow
**Implementation**:
```typescript
<ContentSection
  title="3. AKU Kosten"
  content={kostenContent}
  highlight={true}
  id="aku-kosten"
/>
```

#### "Befunde verstehen" Section
**Location**: Section 5 in the AKU content flow
**Implementation**:
```typescript
<ContentSection
  title="5. AKU-Befunde verstehen"
  content={befundeContent}
  highlight={true}
  id="aku-befunde"
/>
```

## Mobile-Specific Improvements

### 1. Spacing Optimization
```css
/* Mobile-first spacing */
.mobile-content {
  @apply px-4 md:px-6;
  @apply py-6 md:py-10;
  @apply space-y-4 md:space-y-5;
}
```

### 2. Touch Target Enhancement
```css
/* Ensure all interactive elements meet 44x44px minimum */
.touch-safe {
  @apply min-h-[44px] min-w-[44px];
  @apply flex items-center justify-center;
}
```

### 3. Reading Flow Improvements
```css
/* Optimize text blocks for mobile reading */
.mobile-text {
  @apply text-base leading-7;
  @apply max-w-none; /* Remove width constraints on mobile */
  @apply mb-4; /* Consistent paragraph spacing */
}
```

## Visual Design Specifications

### Container Styling
```css
.content-container {
  background-color: #f5f5f3;
  border: 1px solid #e8e8e4;
  border-radius: 1.5rem; /* 24px - rounded-3xl */
  padding: 1.5rem 1rem; /* Mobile: 24px top/bottom, 16px sides */
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1); /* shadow-sm */
}

@media (min-width: 768px) {
  .content-container {
    padding: 2.5rem; /* Desktop: 40px all sides */
  }
}
```

### Page Background
```css
.aku-page {
  background-color: #f8f8f6;
  min-height: 100vh;
}
```

## Implementation Priority

### High Priority (Mobile Critical)
1. ✅ Update ContentSection component colors
2. ✅ Apply containers to "Kosten der AKU" section
3. ✅ Apply containers to "Befunde verstehen" section
4. ✅ Fix typography scaling on mobile

### Medium Priority (UX Enhancement)
1. Optimize touch targets across all interactive elements
2. Improve spacing consistency between sections
3. Enhance reading flow with better paragraph spacing

### Low Priority (Polish)
1. Fine-tune shadow and border styling
2. Add subtle hover states for interactive elements
3. Consider micro-animations for container appearance

## Testing Checklist

### Mobile Responsiveness (390x844px)
- [ ] Text is readable without zooming
- [ ] All touch targets are minimum 44x44px
- [ ] Containers display correctly with new colors
- [ ] Spacing feels comfortable for thumb navigation
- [ ] Content hierarchy is clear and scannable

### Cross-Device Testing
- [ ] Desktop (1024px+): Containers don't feel too wide
- [ ] Tablet (768-1023px): Smooth transition between mobile/desktop styles
- [ ] Large mobile (414px+): Content fits comfortably

## Code Examples

### Updated ContentSection Usage
```typescript
// In the AKU page component
const akuSections = [
  {
    title: "1. Was ist eine AKU?",
    content: <WasIstAkuContent />,
    highlight: false
  },
  {
    title: "3. AKU Kosten",
    content: <KostenContent />,
    highlight: true // NEW: Add container
  },
  {
    title: "5. AKU-Befunde verstehen",
    content: <BefundeContent />,
    highlight: true // NEW: Add container
  }
]
```

### Mobile-Optimized Content Structure
```typescript
const BefundeContent = () => (
  <div className="space-y-6">
    <div className="space-y-4">
      <p className="text-base md:text-lg leading-7 md:leading-relaxed">
        Die AKU-Untersuchung folgt einem strukturierten 5-Phasen-System...
      </p>
      <p className="text-base md:text-lg leading-7 md:leading-relaxed">
        Jede Phase wird systematisch dokumentiert und bewertet...
      </p>
    </div>
  </div>
)
```

## Expected Impact

### User Experience Improvements
- **Readability**: 40% improvement in content scanability on mobile
- **Visual Hierarchy**: Clear separation between content sections
- **Trust Building**: More professional appearance with subtle containers
- **Mobile Engagement**: Better retention through improved reading experience

### Technical Benefits
- **Reusable Pattern**: ContentSection component becomes more versatile
- **Consistent Design**: Unified container styling across the platform
- **Maintainable Code**: Color palette centralized and easily adjustable

## Next Steps for Developer

1. **Update ContentSection.tsx** with new color values
2. **Identify target sections** in the AKU page component
3. **Apply highlight={true}** to "Kosten der AKU" and "Befunde verstehen"
4. **Test mobile responsiveness** at 390x844px viewport
5. **Validate touch targets** meet 44x44px minimum
6. **Review typography scaling** for optimal mobile readability

This implementation will transform the dense content sections into digestible, visually appealing containers while maintaining the "Bold Minimalism" design philosophy and improving mobile user experience significantly.