<h1 align="center" id="title" style="display:flex;align-items:center;justify-content:center;gap:12px;">
 💰 <span style="font-weight:700;">Affluence: An Interactive Financial Journey</span> 💰
</h1>

<p align="center">
  <i>“A dynamic, scroll-driven financial experience — where storytelling meets interactivity.”</i>
</p>

<p align="center">
  <img src="https://static.theprint.in/wp-content/uploads/2020/10/BSE-building-scaled-e1602154957594.jpg" alt="Affluence Preview" style="max-width:100%;height:auto;border-radius:12px;box-shadow:0 0 15px rgba(0,0,0,0.25);">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-Dynamic_UI-61DAFB?logo=react" alt="React Badge">
  <img src="https://img.shields.io/badge/TailwindCSS-Design-blueviolet?logo=tailwindcss" alt="Tailwind Badge">
  <img src="https://img.shields.io/badge/Three.js-3D_Elements-black?logo=three.js" alt="Three.js Badge">
  <img src="https://img.shields.io/badge/Vite-Build_Tool-purple?logo=vite" alt="Vite Badge">
  <img src="https://img.shields.io/badge/License-MIT-lightgrey" alt="License Badge">
</p>

---

<div align="center">
  <img src="https://img.shields.io/badge/⚙️_Built_with_React_&_Three.js_-_Interactive_and_Modern-black?style=for-the-badge" alt="Modern Stack Badge">
</div>

---

## 🪄 Overview

**Affluence: An Interactive Financial Journey** redefines how users experience financial websites.
It’s not just a landing page — it’s a **narrative-driven digital experience**, where the story of wealth and growth unfolds as users scroll.

> ✨ *A continuous scroll transforms a coin’s journey from a pile to a wallet — symbolizing prosperity through interaction.*

---

## 🚀 Features

💰 **Scroll-Driven Coin Animation**
A smooth, physics-inspired coin travels across the page as users scroll, symbolizing financial growth.

🪙 **Interactive Scrollytelling**
Each section animates dynamically — from hero intro to contact finale — creating a seamless narrative flow.

🖱️ **Dynamic Background Motion**
Subtle parallax shifts respond to mouse movements, adding depth and immersion.

👥 **3D Team Cards**
Team members appear in flipping 3D cards, powered by React state and CSS transforms.

💼 **Expandable Service Cards**
Click to reveal detailed information using React hooks for smooth expand/collapse transitions.

📈 **Animated Timeline**
The “About Us” section unfolds a timeline of company milestones with fade-in and slide-up reveals.

📱 **Fully Responsive**
Optimized for all devices with adaptive layout and animation scaling.

---

## 🧰 Tech Stack

| Technology | Purpose |
|-------------|----------|
| ⚛️ **React** | Core UI framework |
| 🌀 **Tailwind CSS** | Styling and responsive utilities |
| 🌌 **Three.js** | Hero section 3D visuals |
| ⚙️ **JavaScript (ES6+)** | Logic, animation control, and interactivity |
| ⚡ **Vite** | Fast build and development environment |

---

## 🧑‍💻 Core Functionality

### 🪙 The Coin’s Journey
- Coin visibility begins after the hero section.
- Its position and rotation are tied to scroll percentage.
- As the user approaches the contact section, the coin seamlessly animates into a wallet icon.

### 🖱️ Interactive UI
- Scroll observers trigger smooth fade-ins and slide-ups for content blocks.
- React state manages expanding service cards and flipping team cards.

### 🌌 Dynamic Background
- The background subtly moves according to mouse coordinates, creating a premium sense of motion and depth.

---

## 🚀 Getting Started

1.  **Clone the Repository**
    ```bash
    git clone [https://github.com/yourusername/affluence.git](https://github.com/yourusername/affluence.git)
    cd affluence
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run the Development Server**
    ```bash
    npm run dev
    ```

4.  **Build for Production**
    ```bash
    npm run build
    ```

---

## 🧩 Customization Tips

- **Adjust Animations**: Tweak scroll thresholds and animation speeds in the main `useEffect` logic.
- **Theme**: Modify `tailwind.config.js` for your project's color palette and typography.
- **3D Model**: Replace the hero elements with your own brand-specific Three.js model.
- **Content**: Add or remove "journey stages" in the scroll timeline to fit your brand story.

---

### 🧠 Example React Snippet
Here's a look at the core scroll-tracking logic:

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

---

## 📜 License

This project is released under the **MIT License** — free to use, modify, and share.  
See the `LICENSE.md` file for details.

---

## 👤 Author

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

<p align="center">
  💰 <i>“Design finance like a journey — not a transaction.”</i> 💰
</p>

<div align="center">
  <img src="https://img.shields.io/badge/🚀_Crafted_with_React_Tailwind_Three.js_-_Elegant_and_Modern-black?style=for-the-badge" alt="Pure Tech Badge">
</div>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=00BFA6&height=100&section=footer&text=Experience%20Your%20Financial%20Journey%20with%20Affluence&fontSize=22&fontColor=ffffff&animation=fadeIn" />
</p>
