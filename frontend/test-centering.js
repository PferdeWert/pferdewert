// Test script to verify mobile card centering calculations
// Run with: node test-centering.js

const MOBILE_LAYOUT = {
  CARD_WIDTH: 280,
  SPACE_BETWEEN: 16,
  CONTAINER_PADDING: 48,
  SCALE_FACTOR: 1.08,
  MIN_CARD_HEIGHT: 450,
  PRO_ENHANCED_HEIGHT: 480
};

// Test for different viewport widths
const viewportWidths = [375, 390, 414, 428];

console.log('Mobile Pricing Card Centering Analysis');
console.log('=====================================\n');

viewportWidths.forEach(viewportWidth => {
  console.log(`Viewport Width: ${viewportWidth}px`);
  console.log('-'.repeat(30));
  
  // Pro card container is now wider to accommodate the scaled card
  const proCardActualWidth = MOBILE_LAYOUT.CARD_WIDTH * MOBILE_LAYOUT.SCALE_FACTOR;
  
  // Position of Pro tier start (middle card)
  const basicCardEnd = MOBILE_LAYOUT.CONTAINER_PADDING + MOBILE_LAYOUT.CARD_WIDTH;
  const proTierStart = basicCardEnd + MOBILE_LAYOUT.SPACE_BETWEEN;
  
  // Calculate viewport center position
  const viewportCenter = viewportWidth / 2;
  const proCardCenter = proCardActualWidth / 2;
  
  // Optimal scroll position for perfect Pro tier centering
  const optimalScrollLeft = proTierStart + proCardCenter - viewportCenter;
  
  // Calculate actual Pro card center position when scrolled
  const proCardAbsoluteCenter = proTierStart + proCardCenter;
  const proCenterInViewport = proCardAbsoluteCenter - optimalScrollLeft;
  const centeringOffset = proCenterInViewport - viewportCenter;
  
  console.log(`  Basic card: 0 - ${MOBILE_LAYOUT.CARD_WIDTH}px`);
  console.log(`  Pro card start: ${proTierStart}px`);
  console.log(`  Pro card width: ${proCardActualWidth}px (scaled from ${MOBILE_LAYOUT.CARD_WIDTH}px)`);
  console.log(`  Pro card center: ${proCardAbsoluteCenter}px`);
  console.log(`  Viewport center: ${viewportCenter}px`);
  console.log(`  Optimal scroll: ${optimalScrollLeft}px`);
  console.log(`  Pro center in viewport: ${proCenterInViewport}px`);
  console.log(`  Centering offset: ${centeringOffset}px ${Math.abs(centeringOffset) < 1 ? '✅ PERFECT' : '⚠️ OFF-CENTER'}`);
  console.log('');
});

console.log('\nCard Dimensions Summary:');
console.log('------------------------');
console.log(`Basic Card: ${MOBILE_LAYOUT.CARD_WIDTH}px wide`);
console.log(`Pro Card Container: ${MOBILE_LAYOUT.CARD_WIDTH * MOBILE_LAYOUT.SCALE_FACTOR}px wide`);
console.log(`Pro Card Visual: ${MOBILE_LAYOUT.CARD_WIDTH}px scaled to ${MOBILE_LAYOUT.SCALE_FACTOR}x`);
console.log(`Premium Card: ${MOBILE_LAYOUT.CARD_WIDTH}px wide`);
console.log(`Gap between cards: ${MOBILE_LAYOUT.SPACE_BETWEEN}px`);
console.log(`Container padding: ${MOBILE_LAYOUT.CONTAINER_PADDING}px each side`);