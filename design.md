---
name: Technical Editorial
colors:
  surface: '#faf9f5'
  surface-dim: '#dadad6'
  surface-bright: '#faf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f4f0'
  surface-container: '#eeeeea'
  surface-container-high: '#e8e8e4'
  surface-container-highest: '#e2e3df'
  on-surface: '#1a1c1a'
  on-surface-variant: '#444748'
  inverse-surface: '#2f312e'
  inverse-on-surface: '#f1f1ed'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#1151d3'
  on-secondary: '#ffffff'
  secondary-container: '#3a6bed'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#171e00'
  on-tertiary-container: '#738e00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c4ff'
  on-secondary-fixed: '#00174c'
  on-secondary-fixed-variant: '#003daa'
  tertiary-fixed: '#c8f31d'
  tertiary-fixed-dim: '#aed500'
  on-tertiary-fixed: '#171e00'
  on-tertiary-fixed-variant: '#3d4d00'
  background: '#faf9f5'
  on-background: '#1a1c1a'
  surface-variant: '#e2e3df'
typography:
  display-xl:
    fontFamily: Geist
    fontSize: 150px
    fontWeight: '900'
    lineHeight: '0.85'
    letterSpacing: -0.08em
  display-lg:
    fontFamily: Geist
    fontSize: 96px
    fontWeight: '800'
    lineHeight: '0.9'
    letterSpacing: -0.06em
  headline-lg:
    fontFamily: Geist
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '0.95'
    letterSpacing: -0.04em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Geist
    fontSize: 17px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  metadata:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.15em
spacing:
  margin-page: 4rem
  gutter: 1.5rem
  stack-xl: 8rem
  stack-lg: 4rem
  stack-md: 2rem
---

## Brand & Style
The design system is a high-end editorial framework tailored for a high-seniority mobile engineer. It merges the structural discipline of Swiss International Style with the precision of modern software engineering. The aesthetic is "Technical Minimalist"—avoiding common SaaS tropes like soft shadows and gradients in favor of raw typography, stark contrasts, and asymmetric layouts.

The UI should feel like a premium printed monograph: confident, spacious, and utilitarian. It positions the developer not just as a coder, but as an architect of digital experiences. Every element serves a functional or structural purpose, using whitespace as a primary design tool to evoke a sense of focus and maturity.

## Colors
This system utilizes a "Print-First" palette. The background is a warm, tactile white (#F7F7F3) that reduces eye strain compared to pure white and mimics high-quality paper stock. 

- **Monochromatic Core**: 95% of the interface relies on the Near-Black (#111111) for text and borders, ensuring maximum legibility and authority.
- **Electric Blue (#4D7CFE)**: Used exclusively for primary interactive states, links, and active indicators.
- **Acid Lime (#C8F31D)**: A high-energy "utility" highlight. Used for hover states on large type or background fills for small tags/labels.
- **Soft Coral (#FF6B5E)**: Reserved for unique visual accents, error states, or breaking the rhythm of the layout.
- **Logic**: Use solid fills only. Gradients are strictly prohibited to maintain the editorial integrity.

## Typography
Typography is the core visual identity. The system uses **Geist** for its technical precision and neo-grotesk roots. 

- **Display Rules**: Large headlines should be treated as graphic elements. They can be partially clipped by the viewport or container edges to create a sense of scale. Use tight tracking and leading for headlines to create dense "blocks" of text.
- **Body Text**: Maintain generous line-heights to ensure readability against the warm background.
- **Metadata**: Small, uppercase labels provide a rhythmic "cadence" across the page, acting as structural anchors for sections.

## Layout & Spacing
The layout follows a strict 12-column editorial grid. 

- **Asymmetry**: Avoid centering content. Align key text to the first 4 columns, leaving the right side for imagery or metadata, or vice-versa.
- **Whitespace**: Use "Stack" spacing to create distinct thematic breaks. A gap of `stack-xl` (128px) between major sections is encouraged to maintain a premium feel.
- **Mobile**: On mobile, collapse the 12-column grid into a 4-column layout with 1rem margins. Reduce the size of `display-xl` significantly to ensure at least 2 characters fit the width.

## Elevation & Depth
This design system is strictly flat. Depth is communicated through **layering and borders**, never through shadows or blurs.

- **Tonal Tiers**: Secondary information sits on containers with a 1px solid border (#111111 at 15% opacity).
- **Physicality**: Elements do not "float." They are either nested within a container or sit directly on the "paper" (background). 
- **Z-Index**: Use Z-index only for intentional overlapping of typography and images to create an experimental, "pasted" look.

## Shapes
The shape language is architectural and sharp. 

- **Corners**: 0px radius is the default for all major components (cards, buttons, sections).
- **Subtle Softness**: A 4px (`rounded-sm`) radius may be used sparingly for small interactive elements like input fields or tags to provide a hint of modern software affordance, but never exceed this.
- **Prohibition**: No pill shapes, circles (except for small status dots), or organic "blobs" are permitted.

## Components
- **Buttons**:
  - *Primary*: Solid #111111 background, white text, 0px radius. On hover, the background shifts to #4D7CFE.
  - *Secondary*: 1px solid #111111 border, no fill. On hover, fills with #C8F31D.
- **Tags**: Rectangular boxes with 1px border. No rounding. Metadata font style.
- **Input Fields**: Bottom-border only (1px #111111) to mimic a physical form. Active state shifts the border color to #4D7CFE.
- **Cards**: Large, borderless areas defined by whitespace or a very subtle 1px #111111 (10% opacity) top-border only. 
- **Lists**: Use hairline dividers (1px) between items. Use an arrow icon (Lucide "Arrow-Up-Right") that translates 2px on hover.
- **Icons**: 2px stroke width, sharp joins. Icons should be functional indicators (e.g., external link, download, code) rather than decorative.