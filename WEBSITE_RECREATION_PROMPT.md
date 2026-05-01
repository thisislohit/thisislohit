# High-Fidelity Website Recreation Prompt (Ronas IT Style)

Use this prompt in your design/AI generation workflow to recreate the visual style, structure, and polish of **https://ronasit.com/** using my provided reference images as the primary source of truth.

---

## MASTER PROMPT

You are an expert **product designer + senior frontend engineer** specializing in high-end agency/SaaS marketing websites.

Your task is to recreate a website that matches the **visual quality, layout system, and premium feel** of this reference:
**https://ronasit.com/**

I will provide section screenshots/images. Those references are the **PRIMARY SOURCE OF TRUTH** for composition and spacing.

### Core objective
Recreate the same premium aesthetic and UX behavior — not just similar content.
Prioritize:
- Layout structure
- Section ordering and rhythm
- Spacing and padding scale
- Typography hierarchy
- Component sizing/proportions
- Contrast and visual balance
- Micro-interactions and motion polish

Do **not** redesign. Do **not** simplify. Do **not** invent new layouts unless something is missing.

---

## Reference handling rules
1. If screenshot and live site differ, **follow screenshot first**.
2. Maintain relative spacing exactly (hero-to-next-section gaps, card internal paddings, heading/body spacing).
3. Preserve alignment logic (left baseline alignment, centered blocks, two-column ratios, etc.).
4. Reuse section patterns exactly as seen (do not merge or split sections unless explicitly instructed).
5. If one element is unclear, infer from the nearest section with matching style.

---

## Visual style targets (Ronas IT-like)

### Overall mood
- Premium digital agency aesthetic
- Minimal but bold
- Clean grids and strong typography
- High-end interaction design

### Color system
- Primarily light theme (unless references show dark segments)
- Neutral backgrounds with occasional contrast blocks
- Vivid accent color for CTAs/highlights
- Subtle gradients and glows where present

### Typography
- Strong hierarchy and generous scale contrast
- Hero headline: very large, confident, bold
- Section titles: medium-large, compact line-height
- Body copy: readable, neutral contrast, balanced measure
- Tight letter-spacing on large display text where needed

### Spacing system
- Large vertical rhythm between sections (roughly 88–140px on desktop)
- Consistent container widths and gutters
- Tight card internals (16–28px) but breathable section spacing
- Preserve whitespace as a design element

### UI treatment
- Rounded corners with controlled radius consistency
- Soft, layered shadows (never muddy/heavy)
- Crisp border usage with low-contrast neutrals
- Precise icon/text alignment
- Premium button treatments with states

---

## Required page structure (adapt to references exactly)

1. **Sticky Header / Navbar**
   - Transparent at top, transitions on scroll
   - Brand/logo at left
   - Navigation links in center/right
   - Primary CTA button
   - Mobile menu with polished open/close motion

2. **Hero Section**
   - Bold value proposition headline
   - Supporting paragraph with optimal line length
   - Primary + secondary CTAs
   - Optional trust labels/ratings/awards if shown
   - Visual media (mockup/illustration/video) placed exactly per references

3. **Social Proof / Logos (if present)**
   - Client logos or trust marks
   - Balanced spacing and grayscale/opacity treatment

4. **Service/Feature Blocks**
   - Card/grid layout matching reference columns
   - Exact icon placement, title scale, copy width
   - Hover elevation and subtle transform

5. **Case Study / Showcase Sections**
   - Alternating image-text compositions if shown
   - Maintain exact media aspect ratios
   - Include tags, metrics, or labels where visible

6. **Process / Workflow Section (if present)**
   - Steps/timeline/cards as per screenshot
   - Keep numbering/iconography styles consistent

7. **Testimonials / Reviews (if present)**
   - Quote cards/sliders with author identity block
   - Exact visual hierarchy for quote vs meta info

8. **Final CTA Section**
   - High-contrast, concise conversion message
   - One dominant action button
   - Clear separation from prior section

9. **Footer**
   - Multi-column information architecture
   - Link grouping and legal/meta line
   - Clean, structured, minimal clutter

---

## Motion & interaction requirements (mandatory)
- Scroll reveal: fade + slight upward translation
- Stagger for repeated items (cards/logos/steps)
- Hover states:
  - cards: slight lift + shadow enhancement
  - buttons: micro-scale/contrast change
  - links: subtle color/underline transitions
- Sticky header transition should feel smooth and premium
- Avoid exaggerated/bouncy/cartoon effects

---

## Responsiveness requirements

### Desktop (first priority)
- Pixel-accurate composition vs references
- Correct container widths and section spacing

### Tablet
- Preserve hierarchy and rhythm
- Reduce columns gracefully (e.g., 4→2, 3→2)

### Mobile
- Stack sections without breaking reading flow
- Scale typography proportionally
- Keep CTA prominence
- Maintain spacing consistency and touch-friendly controls

---

## Implementation constraints
- Use semantic HTML structure and accessible headings
- Ensure sufficient color contrast for text/buttons
- Optimize image sizing and loading behavior
- Keep CSS architecture clean and reusable
- Do not add unnecessary decorative elements

---

## Output format required
When generating the implementation, provide:
1. A concise section-by-section mapping from reference to output
2. The final code/components
3. Notes on animation behaviors used
4. Responsive behavior summary
5. Any assumptions made due to missing reference elements

---

## Optional “strict mode” add-on
If I say **STRICT MODE**, enforce:
- Near pixel-perfect spacing parity with screenshots
- Matching border radius and shadow intensity values
- Matching typographic scale ratios per section
- No deviations in section ordering

