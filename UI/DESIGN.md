# Design System Strategy: The Digital Temple

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Temple."** 

This is not a standard e-commerce interface; it is a ritualistic experience. We are moving away from the "grid-of-items" mentality and toward an editorial, high-end sanctuary. The design breaks the traditional template look through **intentional asymmetry**, where large-scale typography interacts with overflowing imagery and "floating" sacred geometry. We use white space—specifically the `24 (8.5rem)` and `20 (7rem)` spacing tokens—not just as a gap, but as a "breath" between the mundane and the divine.

## 2. Color & Atmosphere
The palette is rooted in the earth and the altar, utilizing high-contrast tonal shifts to create depth rather than structural lines.

*   **Primary (#7a0009 - Deep Vermillion):** This is the lifeblood of the system. Use it for call-to-action elements, primary headings, and critical focus points.
*   **Secondary (#735c00 - Sacred Gold):** Use this for secondary actions and iconography. It represents the divine light and should feel rare and intentional.
*   **Background (#fef9eb - Aged Parchment):** The canvas. It provides a warm, tactile foundation that feels more organic than pure white.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to define sections. Boundaries must be established through background color shifts. 
*   A section using `surface_container_low` (#f8f3e5) should sit directly against the `surface` (#fef9eb) background. 
*   The transition of color is the "edge." This creates a seamless, high-end editorial feel.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of fine handmade paper.
*   **Base:** `surface` (#fef9eb)
*   **Floating Elements:** `surface_container_lowest` (#ffffff) for a bright, lifted effect.
*   **Inset Sections:** `surface_container_high` (#ede8da) for content that needs to feel grounded or "pressed" into the page.

### The "Glass & Gradient" Rule
To elevate the experience, use **Glassmorphism** for navigation bars or floating modal overlays. Combine `surface_bright` at 70% opacity with a `backdrop-blur(12px)`. For main CTAs, use a subtle radial gradient transitioning from `primary` (#7a0009) to `primary_container` (#9e1b1b) to give buttons a three-dimensional "soul."

## 3. Typography
Typography is the primary vehicle for the brand’s Sanskrit-inspired elegance.

*   **Display & Headlines (Newsreader):** The serif choice mirrors the horizontal emphasis of Sanskrit script. Use `display-lg` (3.5rem) for hero statements with tight letter spacing (-0.02em) to emphasize the structural elegance.
*   **Titles & Body (Be Vietnam Pro):** A clean, modern sans-serif that remains organic. It provides the necessary legibility for garment descriptions and ritual instructions.
*   **The Hierarchy:** Use `headline-lg` (2rem) for section titles, always paired with a `label-md` (0.75rem) in all-caps with increased letter spacing (+0.1em) to act as a "pre-header" or "kicker."

## 4. Elevation & Depth
We eschew traditional drop shadows for **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by "stacking" surface tiers. Place a `surface_container_lowest` card on a `surface_container_low` section. This creates a soft, natural lift without the "dirty" look of grey shadows.
*   **Ambient Shadows:** If a floating effect is required (e.g., a "Quick Buy" drawer), use an extra-diffused shadow: `box-shadow: 0 20px 50px rgba(89, 65, 62, 0.06);`. The shadow color is a tinted version of `on_surface_variant`, mimicking natural light on parchment.
*   **The "Ghost Border" Fallback:** For accessibility in forms, use the `outline_variant` token at 15% opacity. Never use 100% opaque borders.
*   **Sacred Geometry Textures:** Use subtle SVG patterns of mandalas or temple carvings as background masks on `surface_container_highest` sections, using the `outline_variant` color at 5% opacity.

## 5. Components

### Buttons
*   **Primary:** Rounded `full` (9999px) or `xl` (1.5rem). Background is a gradient of `primary` to `primary_container`. Text is `on_primary` (#ffffff).
*   **Secondary:** Rounded `full`. Background is `secondary_fixed` (#ffe088) with `on_secondary_fixed` (#241a00) text.
*   **States:** On hover, apply a subtle inner glow (`box-shadow: inset 0 0 10px rgba(255,255,255,0.2)`).

### Input Fields
*   **Styling:** Forgo the 4-sided box. Use a soft-pill shape (`rounded-xl`) with `surface_container_highest` background. 
*   **Labels:** Use `label-md` floating above the field in `on_surface_variant`. 
*   **Error State:** Use `error` (#ba1a1a) for the text and a subtle `error_container` (#ffdad6) glow around the field.

### Cards & Ritual Lists
*   **Rule:** Forbid the use of divider lines. 
*   **Implementation:** Separate list items using the `spacing-5` (1.7rem) token. Use a `surface_container_low` background for the entire list block, and use `surface_container_lowest` for individual cards to create "lift" via color alone.

### Custom Component: The Ritual Carousel
A high-end variation of the standard slider. Images should have `rounded-lg` (1rem) corners. The active item should be slightly larger and centered, while inactive items use `surface_dim` as an overlay to focus the user’s gaze on the "divine" center.

## 6. Do's and Don'ts

### Do:
*   **Embrace Asymmetry:** Place a `display-lg` heading off-center to interact with a product image.
*   **Use Generous Padding:** When in doubt, increase the padding. The brand must feel "unhurried."
*   **Layer Textures:** Overlay subtle temple carving motifs behind high-level headings.

### Don't:
*   **No Pure Black:** Never use `#000000`. Use `on_surface` (#1d1c13) for text.
*   **No Sharp Corners:** Avoid the `none` or `sm` roundness tokens unless for technical metadata.
*   **No Grid-Rigidity:** Avoid filling every column. Let images "bleed" off the edge of the screen or sit in isolation to create an editorial look.
*   **No High-Contrast Borders:** If you feel the need to draw a line, use a background color shift instead.