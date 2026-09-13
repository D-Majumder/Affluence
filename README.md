# Affluence: An Interactive Financial Journey

A scroll-driven, narrative-style landing page built with React.

## Overview

Affluence is a narrative-driven landing page where the story of wealth and growth unfolds as the user scrolls — a continuous scroll animates a coin's journey across the page, symbolizing financial growth.

## Features

- **Scroll-driven coin animation** — a coin travels across the page as the user scrolls.
- **Interactive scrollytelling** — each section animates as it enters view, from hero intro to contact.
- **Dynamic background motion** — parallax shifts respond to mouse movement.
- **3D-style team cards** — flipping cards powered by React state and CSS transforms.
- **Expandable service cards** — click to reveal detailed information via React hooks.
- **Animated timeline** — the "About Us" section reveals company milestones with fade-in/slide-up animations.
- **Fully responsive** — adaptive layout and animation scaling across devices.

## Tech stack

- React 19
- Tailwind CSS
- Vite

## Setup

```bash
git clone https://github.com/D-Majumder/Affluence.git
cd Affluence
npm install
npm run dev
```

## Customization Tips

- **Adjust animations**: tweak scroll thresholds and animation speeds in the main `useEffect` logic.
- **Theme**: modify `tailwind.config.js` for your project's color palette and typography.
- **Content**: add or remove "journey stages" in the scroll timeline to fit your own story.

### Example React snippet

Core scroll-tracking logic:

```jsx
useEffect(() => {
  const handleScroll = () => {
    const scrollY = window.scrollY;
    const scrollPercent = scrollY / (document.body.scrollHeight - window.innerHeight);
    setCoinPosition(scrollPercent * 100);
    setRotation(scrollPercent * 360);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

## License

No license file is currently present in this repository. Without one, all rights to the code are reserved by the author by default.

## Author

<p align="center">
  <a href="mailto:dhrubamajumder@proton.me" target="_blank">
    <img src="https://img.shields.io/badge/Email-Dhruba%20Majumder-blue?logo=gmail" alt="Email Badge">
  </a>
  <a href="https://www.linkedin.com/in/iamdhrubamajumder/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-Dhruba%20Majumder-blue?logo=linkedin" alt="LinkedIn Badge">
  </a>
  <a href="https://github.com/D-Majumder" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-D--Majumder-black?logo=github" alt="GitHub Badge">
  </a>
</p>
