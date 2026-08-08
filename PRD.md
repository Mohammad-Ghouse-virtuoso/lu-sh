##From chatGPT:

Absolutely, Samrat. Now that the assets are ready, I'd give Cursor a **proper implementation PRD**, not a vague "make it look like Zareqia" prompt. The interaction is the product here, not just the page.

Below is deliberately written so you can **copy-paste the entire thing into Cursor**.

---

# PRD — Interactive Wedding Invitation

## 1. Project Overview

Build a premium, mobile-first **interactive digital wedding invitation** for:

**Groom:** Shaik Mohammad Lukhman-E-Hayath
**Bride:** Shaik Shaheen Banu

The experience should feel like **opening an ornate physical wedding invitation**, translated into a modern interactive website.

The visual direction is:

* Royal
* Elegant
* Deep burgundy / maroon
* Antique gold
* Ivory
* Floral
* Islamic / traditional ornamentation
* Cinematic
* Premium, but not tacky
* Romantic without becoming overly feminine
* Mobile-first

Reference inspiration:

`https://zareqia.com/invite/demo?template=royal-elegance`

Do **not** copy Zareqia's design. Use it only as inspiration for the concept of an interactive invitation.

---

# 2. Core Concept

The website should not feel like a normal scrolling webpage.

It should feel like a **digital stage / invitation ceremony**.

The intended user journey is:

```text
Landing Screen
      ↓
TAP TO OPEN
      ↓
Curtains Open
      ↓
Wedding Invitation Revealed
      ↓
Names / Blessing
      ↓
Scratch Card
      ↓
Wedding Date Revealed
      ↓
Countdown
      ↓
Wedding Details
      ↓
Venue
      ↓
Closing / Blessing
```

The experience should be elegant and restrained.

Do not over-animate everything.

---

# 3. Important Constraint

This is a **personal wedding invitation**.

Do NOT introduce:

* Grohike branding
* SaaS/product branding
* RSVP system
* WhatsApp CTA
* Add to Calendar
* Login
* Registration
* Admin dashboard
* Payment
* User accounts
* Unnecessary forms
* Blog
* Contact page
* Generic website sections

This is one beautiful invitation, not a wedding-management platform.

---

# 4. Wedding Information

Use the following information accurately.

### Groom

**Shaik Mohammad Lukhman-E-Hayath**

### Bride

**Shaik Shaheen Banu**

### Groom's Parents

**Mr. & Mrs. Shaik Shaiksha Vali**

### Groom's Grandparents

**Grand S/o Mr. & Mrs. (Late) Shaik Masthan Vali Sahab, Gulapalyam**

### Bride's Grandparent Information

**Grand D/o. Naziruddin Saheb, Benchikottal, Guntakal**

### Date

**31 August 2026**

### Day

**Monday**

### Time

**1:00 PM**

### Islamic Date

**17th Rabi-ul-Awwal, 1448 Hijri**

### Event

**Dawat-e-Valima**

### Venue

**Mastan Vali Function Hall**

**Bellary Road, Petrol Bunk (Backside), Guntakal**

### Opening Blessing

Use:

**In the name of "ALLAH"
the most Beneficent & Merciful**

And the supplied Arabic Bismillah calligraphy asset.

### Blessing Line

**UNDER THE BLESSINGS OF AQTAAB-E-VELLORE
BUJURGAAN-E-DEEN**

---

# 5. Design System

## Primary Colors

Use approximately:

```text
Deep Burgundy   #240D0D
Dark Maroon     #3A1116
Wine            #541B25
Antique Gold    #C9A45C
Champagne Gold  #E5D0A0
Ivory           #F3E8D0
Dark Text       #321515
```

Do not use bright yellow gold.

Gold should feel:

* antique
* metallic
* muted
* luxurious

The overall page should feel like **dark burgundy velvet + antique gold + aged ivory paper**.

---

# 6. Typography

Use an elegant serif system.

Recommended:

* Cormorant Garamond
* Playfair Display
* Cinzel
* EB Garamond

Use a script/calligraphic font only sparingly.

The names should be the strongest typographic element.

Avoid excessive font combinations.

Maximum:

```text
1 primary serif
1 secondary serif
1 optional script
```

The Arabic Bismillah should use the provided image/SVG asset rather than attempting to recreate the calligraphy with a normal font.

---

# 7. Asset Architecture

All supplied assets should be stored and organized approximately like:

```text
/public/wedding/

  /curtains
    left-curtain.png
    right-curtain.png

  /flowers
    rose-01.png
    rose-02.png
    rose-03.png
    floral-corner-tl.png
    floral-corner-tr.png
    floral-corner-bl.png
    floral-corner-br.png
    botanical-vine.png
    leaves.png

  /calligraphy
    bismillah.png

  /ornaments
    divider.png
    islamic-ornament.png
    gold-corner.png
    arch.png

  /textures
    burgundy-background.jpg
    paper-texture.jpg
    gold-foil.png
    gold-dust.png

  /seals
    wax-seal.png
```

Adapt filenames to the actual supplied assets.

Do not assume these exact filenames exist.

First inspect the provided assets and map them appropriately.

---

# 8. Landing Screen / Curtain Scene

This is the most important part of the experience.

The first screen should feel like a **closed royal theatre curtain**.

### Initial state

Full-screen mobile composition:

```text
┌────────────────────────┐
│                        │
│      BISMILLAH         │
│                        │
│                        │
│       SHAHEEN          │
│          &             │
│       LUKHMAN          │
│                        │
│                        │
│     TAP TO OPEN        │
│                        │
└────────────────────────┘
```

But the exact composition should be determined visually.

The curtain should cover the left and right edges/sides of the screen.

Use the supplied curtain assets as independent layers.

---

# 9. Curtain Interaction

When the user taps:

**TAP TO OPEN**

animate:

### Left curtain

Moves toward:

```text
translateX(-100%)
```

### Right curtain

Moves toward:

```text
translateX(100%)
```

The movement should feel like real fabric.

Use:

* Framer Motion
* spring/easing
* opacity
* subtle scale
* slight delay between layers

Do NOT simply instantly hide the curtains.

Suggested duration:

```text
1.2–1.8 seconds
```

The curtain should remain visible enough during the animation to create a sense of reveal.

---

# 10. Floral Animation

The roses and flowers should NOT be static decorations.

Use the supplied individual flower assets as separate layers.

Possible animations:

### Floating

Very subtle:

```text
translateY(-4px → 4px)
```

### Rotation

Very subtle:

```text
rotate(-2deg → 2deg)
```

### Opacity

Very slight breathing effect.

### Parallax

On desktop, flowers may react subtly to mouse movement.

On mobile, use very subtle touch/device movement only if it does not cause performance issues.

Do not make flowers constantly bounce.

The animation should feel like:

**living decorative elements**, not UI widgets.

---

# 11. Post-Curtain Reveal

Once the curtains open:

Reveal the main invitation with:

```text
opacity: 0 → 1
scale: 0.97 → 1
```

Duration:

```text
700–1000ms
```

The Bismillah and names should appear sequentially.

Suggested sequence:

```text
Bismillah
      ↓
Blessing
      ↓
Parents
      ↓
Groom
      ↓
&
      ↓
Bride
```

Use staggered animation.

Keep it elegant.

---

# 12. Main Hero

The hero should contain:

### Bismillah

Use provided calligraphy asset.

### Blessing

```text
In the name of "ALLAH"
the most Beneficent & Merciful
```

### Blessing heading

```text
UNDER THE BLESSINGS OF AQTAAB-E-VELLORE
BUJURGAAN-E-DEEN
```

### Parents

```text
Mr. & Mrs. Shaik Shaiksha Vali
```

### Invitation text

Something similar to:

```text
With joyful hearts, we request the honour
of your presence and blessings at the
wedding ceremony of our beloved son
```

### Couple

```text
Shaik Mohammad Lukhman-E-Hayath

&

Shaik Shaheen Banu
```

The couple's names should visually dominate.

---

# 13. Scratch Card Interaction

This is the second major interaction.

Do NOT immediately display the date.

Instead create a beautiful **ivory/gold scratch card**.

Example:

```text
┌─────────────────────────┐
│                         │
│     A SPECIAL DATE      │
│       AWAITS...         │
│                         │
│      SCRATCH HERE       │
│                         │
│     [ GOLD SURFACE ]    │
│                         │
└─────────────────────────┘
```

The user should physically scratch the surface using:

* touch
* mouse

Use HTML Canvas for the scratch layer.

The scratch surface should look like:

* brushed antique gold
* subtle texture
* ornamental border

Underneath:

```text
WEDDING DATE

31 AUGUST 2026

MONDAY | 1:00 PM
```

---

# 14. Scratch Mechanics

Implement:

```text
Canvas overlay
      ↓
pointerdown
pointermove
pointerup
      ↓
erase circular area
```

Support:

* touch
* mouse
* stylus

Scratch brush should be approximately:

```text
30–50px
```

depending on screen size.

Once approximately **45–55%** of the surface has been scratched:

Automatically reveal the card.

Use:

```text
fade
scale
gold particles
```

Optional subtle sound, but it must not autoplay.

---

# 15. Wedding Date Reveal

After scratching:

Display prominently:

```text
31 AUGUST 2026
```

Then:

```text
MONDAY
1:00 PM
```

Then:

```text
Dawat-e-Valima
```

Use an elegant gold divider.

---

# 16. Countdown Timer

Below the date reveal:

```text
COUNTING DOWN TO THE CELEBRATION
```

Then:

```text
DD     HH     MM     SS

22     14     37     12
DAYS  HOURS  MINUTES SECONDS
```

The countdown must be **real-time**.

Target:

```text
31 August 2026
1:00 PM
```

Important:

Do NOT hardcode the remaining countdown number.

Calculate it dynamically using JavaScript.

Use the user's local timezone or explicitly configure the event timezone as:

```text
Asia/Kolkata
```

The timer should automatically update every second.

After the event time passes, display:

```text
THE CELEBRATION HAS BEGUN
```

instead of negative numbers.

---

# 17. Event Details

After the hero/date reveal:

Create an elegant invitation-details section.

### Event

```text
DAWAT-E-VALIMA
```

### Date

```text
31 AUGUST 2026
```

### Time

```text
1:00 PM
```

### Islamic Date

```text
17th Rabi-ul-Awwal, 1448 Hijri
```

Use decorative separators and floral elements.

---

# 18. Venue Section

Display:

```text
MASTAN VALI FUNCTION HALL

Bellary Road,
Petrol Bunk (Backside),
Guntakal
```

Use a decorative location icon or gold ornament.

There is **no requirement for an embedded map**.

If adding a venue interaction, only use a simple:

```text
VIEW LOCATION
```

button that opens the relevant Google Maps URL.

Do not build a map interface.

---

# 19. Floral Composition

Use flowers throughout the page, but strategically.

### Hero

Large floral corners.

### Scratch Card

Small flowers / petals.

### Countdown

Small botanical ornaments.

### Venue

Subtle floral framing.

### Footer

Large elegant floral composition.

Avoid repeating the same exact image in obvious locations.

Use:

* scale
* rotation
* mirroring
* cropping

to create variation.

---

# 20. Petal / Particle Effect

After the curtains open, optionally trigger a **very subtle falling petal effect**.

Rules:

* 10–20 petals maximum
* slow movement
* low opacity
* random rotation
* random horizontal movement
* disappear after ~5 seconds

Do not continuously spawn hundreds of particles.

Performance > decorative chaos.

---

# 21. Scroll Experience

The website should be a **single-page experience**.

No routing required.

Sections:

```text
Opening
↓
Hero
↓
Date Reveal
↓
Countdown
↓
Event Details
↓
Venue
↓
Closing
```

Scrolling should feel smooth.

Use subtle reveal animations when sections enter the viewport.

Use:

```text
IntersectionObserver
```

or Framer Motion viewport animations.

---

# 22. Closing Section

End with something simple and emotional.

For example:

```text
WITH BEST COMPLIMENTS FROM

ALL RELATIVES & FRIENDS
```

Then:

```text
Shaik Mohammad Lukhman-E-Hayath
&
Shaik Shaheen Banu
```

with the final floral composition.

No CTA.

No RSVP.

No WhatsApp.

No social links.

No unnecessary footer.

Just the invitation.

---

# 23. Responsive Design

Primary target:

### Mobile

```text
320px
375px
390px
412px
```

The design should be optimized for a WhatsApp-shared mobile link.

Desktop should still look beautiful but is secondary.

Test:

```text
iPhone
Android
Chrome
Safari
Desktop Chrome
```

Avoid:

* horizontal scrolling
* overflowing flowers
* text clipping
* curtain layers covering important content
* excessive viewport-height locking

---

# 24. Performance

This is important because the site will likely be opened through WhatsApp on mobile networks.

Implement:

* WebP/AVIF where possible
* compressed PNGs
* lazy loading for gallery/decorative images
* preload only critical hero assets
* avoid huge background videos
* avoid excessive particle effects
* optimize animations with transform/opacity
* avoid layout-triggering animations

The opening experience should load quickly.

---

# 25. Accessibility

Maintain:

* readable contrast
* proper semantic HTML
* button labels
* keyboard-accessible `Tap to Open`
* `aria-label` for interactive controls
* reduced-motion support

If:

```css
prefers-reduced-motion: reduce
```

is enabled, simplify animations.

---

# 26. Technical Stack

Use:

```text
Next.js
TypeScript
Tailwind CSS
Framer Motion
```

Use Canvas for:

```text
Scratch Card
```

No backend required.

No database required.

No authentication.

No CMS.

No admin panel.

This should remain a lightweight static application.

---

# 27. URL / Deployment

Deploy on Vercel.

Use a clean URL.

Preferred:

```text
https://invite.<domain>/<slug>
```

or simply:

```text
https://<domain>/<slug>
```

If using a temporary Vercel URL:

```text
https://shaheen-lukhman-wedding.vercel.app
```

The final URL should be easy to copy and share through WhatsApp.

---

# 28. SEO / Sharing Metadata

Although this is primarily a private invitation, configure:

### Title

```text
Shaik Mohammad Lukhman-E-Hayath & Shaik Shaheen Banu | Wedding Invitation
```

### Description

```text
You are warmly invited to celebrate the Dawat-e-Valima of Shaik Mohammad Lukhman-E-Hayath & Shaik Shaheen Banu on 31 August 2026.
```

### OG Image

Use a dedicated invitation preview image.

When the URL is shared through WhatsApp, it should display a beautiful wedding preview rather than a generic Vercel card.

---

# 29. Audio

Optional.

If implemented:

* Do NOT autoplay sound without user interaction.
* Start audio only after `TAP TO OPEN`.
* Provide a tiny mute/unmute control.
* Keep it visually unobtrusive.
* If no suitable audio asset is available, omit audio entirely.

The invitation must remain beautiful without sound.

---

# 30. Animation Philosophy

The guiding rule:

> **Every animation should feel like part of a physical invitation.**

Good:

* curtains opening
* flowers gently swaying
* gold shimmer
* scratch reveal
* petals falling
* elegant text fade
* paper/card reveal
* subtle parallax

Bad:

* bouncing buttons
* spinning roses
* excessive particles
* aggressive zooms
* constant motion
* flashy transitions
* excessive glassmorphism
* generic SaaS animations

Think:

**royal invitation + cinematic opening sequence**

not:

**React animation showcase.**

---

# 31. Critical Interaction Sequence

The final experience should roughly feel like this:

```text
                    OPEN SITE
                       │
                       ▼
             ┌──────────────────┐
             │  CLOSED CURTAIN  │
             │                  │
             │    BISMILLAH     │
             │                  │
             │ SHAHEEN & LUKHMAN│
             │                  │
             │   TAP TO OPEN    │
             └──────────────────┘
                       │
                       ▼
                CURTAINS OPEN
                       │
                       ▼
             FLOWERS COME ALIVE
                       │
                       ▼
               HERO REVEALED
                       │
                       ▼
              COUPLE'S NAMES
                       │
                       ▼
             ┌──────────────────┐
             │  SCRATCH CARD    │
             │                  │
             │ SCRATCH TO REVEAL│
             └──────────────────┘
                       │
                       ▼
             31 AUGUST 2026
                1:00 PM
                       │
                       ▼
                 COUNTDOWN
                       │
                       ▼
               DAWAT-E-VALIMA
                       │
                       ▼
                   VENUE
                       │
                       ▼
              CLOSING MESSAGE
```

---

# 32. Definition of Done

The project is complete when:

* [ ] Mobile-first invitation works beautifully
* [ ] Curtain opening animation works
* [ ] Flowers have subtle independent animation
* [ ] Bismillah asset is correctly positioned
* [ ] Couple names are prominent
* [ ] Scratch card works on touch
* [ ] Scratch card works with mouse
* [ ] Date is hidden before scratching
* [ ] Date reveals after sufficient scratching
* [ ] Countdown updates every second
* [ ] Countdown targets 31 August 2026, 1:00 PM IST
* [ ] Countdown handles event completion
* [ ] Venue details are accurate
* [ ] No RSVP
* [ ] No WhatsApp CTA
* [ ] No Add to Calendar
* [ ] No Grohike branding
* [ ] No unnecessary forms
* [ ] No backend required
* [ ] Responsive at 320px+
* [ ] No horizontal overflow
* [ ] Images optimized
* [ ] Open Graph preview configured
* [ ] Vercel deployment works
* [ ] URL is shareable through WhatsApp
* [ ] Reduced-motion accessibility is handled
* [ ] Overall experience feels premium and cohesive

---

## Final design principle

**Do not treat this as a webpage containing wedding information.**

Treat it as a **digital wedding invitation that happens to be interactive**.

The first 5–10 seconds matter most:

> **Tap → Curtains open → Flowers breathe → Names appear → Scratch → Date reveals → Countdown begins.**

Everything after that should become quieter and easier to read.

That contrast is what will make it feel expensive. The temptation will be to keep adding effects because we now possess the technological ability to make a rose rotate in 3D. Resist the ancient human urge.
