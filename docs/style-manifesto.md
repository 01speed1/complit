# COMPLIT: STYLE MANIFESTO — Terminal Chic

## Definition

Terminal Chic Tech is the fusion of raw terminal aesthetics with premium, atmospheric cyberpunk design. Every element must feel like operating a living system, not browsing a conventional app.

## Foundation

### Dark Mode Only
- Primary backgrounds: `#0a0a0a`, `#0d0d0d`, `#121212`
- No light mode. The Operator works in the dark.

### Typography
- **Primary:** Monospace fonts (JetBrains Mono, Fira Code, IBM Plex Mono)
- Text renders as system output, not marketing copy
- Hierarchy through weight, size, and glow intensity — not font variety

### Color Palette — THE OPERATOR

Derived from the Operator character reference. Each color has a strict functional role — nothing is decorative.

| Role | Name | Hex | Usage |
|------|------|-----|-------|
| Base Dark | Tactical Black | `#1a1a1e` | Backgrounds, panels, cards |
| Base Light | Tech White | `#d4d4dc` | Primary text, key UI elements |
| Mid Tone | Gunmetal | `#3a3a44` | Borders, separators, secondary text |
| Node Accent | Toxic Lime | `#c8ff00` | Nodes, charge bars, node-related interactions |
| Subsystem Accent | Signal Cyan | `#00e5ff` | Subsystems, subsystem borders, subsystem health indicators |
| Protocol Accent | Ember Red | `#cc1a1a` | Protocols, protocol status, protocol deadlines, entropy/decay |
| Subtle Detail | Dark Olive | `#2a2e1a` | Shadows on green, muted lime in unlit zones |
| Subtle Detail | Dark Teal | `#1a2e2e` | Shadows on cyan, muted cyan in unlit zones |

### Entity Color Coding

Each entity type owns a color. This creates instant visual parsing across the entire UI.

| Entity | Color | Glow | Border | Text accent |
|--------|-------|------|--------|-------------|
| **Nodes** | Toxic Lime `#c8ff00` | Lime glow | Lime border | Lime labels |
| **Subsystems** | Signal Cyan `#00e5ff` | Cyan glow | Cyan border | Cyan labels |
| **Protocols** | Ember Red `#cc1a1a` | Red glow | Red border | Red labels |

- Entity color applies to: sphere border, glow, connection lines, related cards, status indicators
- When entities interact (e.g., a Protocol inside a Node), the Protocol card uses Ember Red within the Node's Lime-bordered context
- General UI elements (buttons, inputs, navigation) default to Tech White / Gunmetal

## The Operator Avatar

The center of the Node Map is the **Operator** — the user's digital representation within the system.

- Rendered as a **special sphere**, visually distinct from regular Nodes (larger, unique glow, inner energy animation)
- Features **two black eyes** — minimal, iconic, not cartoonish. The Operator watches the system
- The sphere radiates a subtle multi-color glow based on overall system health (Lime when healthy, shifts toward Red as entropy rises)
- Connection lines radiate outward from the Operator to all active Nodes
- The Operator is NOT a Node — it is the consciousness that commands the grid

## Entity Spheres

Nodes, Subsystems, and other map entities are rendered as **3D spheres**, not flat circles.

- Spheres must convey depth: radial gradient, inner light source, subtle specular highlight
- Each sphere glows with its entity color (Lime for Nodes, Cyan for Subsystems)
- Sphere surface should feel like contained energy — not solid plastic
- On hover: sphere brightens, glow intensifies, slight scale pulse
- On decay/neglect: sphere dims, surface noise appears, glow flickers
- Spheres connect to each other and to the Operator via circuit-line traces in the entity's color

## UI Elements

### Inputs & Forms
- Fields resemble terminal prompts: `> _` with blinking cursor
- No rounded pill shapes — sharp or slightly rounded corners (2-4px max)
- Borders: thin (`1px`), subtle, defined — like circuit traces

### Buttons & Actions
- Labels use operative language: `EXECUTE`, `DEPLOY`, `INITIALIZE`, not "Save" or "Submit"
- Primary actions glow on hover — the system responds to the Operator
- Destructive actions pulse with warning colors

### Data Display
- Tables and lists presented as system readouts
- Progress indicators are charge bars, not generic progress bars
- Status uses iconography: glowing dots, signal indicators, not colored badges
- **Bloomberg density**: Maximize information per pixel. Panels should feel data-rich — multiple metrics visible at once, compact spacing, no wasted whitespace
- Side panels, status bars, and secondary readouts should always be populated with relevant system data (charge levels, stability %, protocol deadlines, streak counters)
- Think: mission control dashboard, not a landing page

### Cards & Containers
- Thin border frames, not heavy shadows
- Subtle background differentiation (`#0f0f0f` vs `#141414`)
- Optional scan line or grid texture overlays at very low opacity
- Card borders inherit the **entity color** of their content (Lime border for Node cards, Cyan for Subsystem cards, Ember for Protocol cards)
- Cards are compact — tight padding, small text, dense layout. No oversized cards with excessive whitespace

## Feedback & Animation

### Healthy State
- Soft neon glow on active elements
- Smooth, confident transitions (200-300ms ease)
- Subtle particle effects on major actions (node completion, level up)

### Degraded State (Low Stability / Entropy)
- Chromatic aberration on text and borders
- Flickering elements (CSS animation, intermittent opacity)
- Static noise overlays on neglected components
- Text glitch effects (random character swap animation)

### Interaction Feedback
- Completing a Protocol = launch sequence, not a checkbox tick
- Node reaching 100% = system upgrade cinematic
- Typing effects for system messages and notifications
- Haptic-style micro-animations on click (scale pulse, flash)

## Visual Metaphors

- **Circuit boards:** Connection lines between Nodes and Subsystems
- **Data streams:** Flowing particles representing Charge transfer
- **Signal strength:** Subsystem health shown as signal bars or waveforms
- **Rust/Corrosion:** Visual decay on neglected elements (desaturation, noise)

## References

- **Ingress (Niantic):** Node maps, XM energy flow, portal aesthetics
- **TRON (franchise):** The core inspiration. Complit exists as a hidden alternate world that runs beneath reality — an inner digital grid the Operator navigates to affect the real world. Light trails, grid landscapes, minimal neon on black
- **Mr. Robot:** Terminal interfaces, hacker UI realism
- **Cyberpunk 2077:** Glitch effects, data overlay HUDs
- **Bloomberg Terminal:** Dense data display, functional beauty

## Anti-Patterns (What Complit is NOT)

- Not a generic dark theme with blue accents
- Not glassmorphism or neumorphism
- Not rounded, soft, or "friendly" — it is sharp, precise, operative
- Not cluttered — dense when needed, minimal when not
- Not skeuomorphic — inspired by terminals, not imitating them literally
- Not flat circles — entities are spheres with depth and energy
- Not sparse — every panel should earn its space with data density
- Not mono-color — three entity colors (Lime, Cyan, Ember) create instant visual hierarchy
