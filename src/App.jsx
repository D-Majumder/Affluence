import React, { useState, useEffect, useRef, Suspense } from 'react';

// === 3D Animation Setup (using a CDN for three.js) ===
// This component will dynamically load the three.js library
const ThreeScriptLoader = ({ onReady }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    script.onload = () => {
      console.log('three.js loaded');
      onReady();
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [onReady]);
  return null;
};

// === Enhanced Helper Components ===
const useAnimateOnScroll = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);
  return [ref, isVisible];
};

// === Theme & Styling ===
const GlobalStyles = () => (
  <style>
    {`
      /* Font Import */
      @import url('https://fonts.googleapis.com/css2?family=Lora:wght@700&family=Nunito+Sans:wght@400;600&display=swap');
      /* Base Styling - Royal Peacock Theme */
      body {
        --color-primary: #004d40; /* Deep Teal */
        --color-secondary: #d4af37; /* Rich Gold */
        --color-accent: #c2185b; /* Ruby Magenta */
        --color-background: #fdfaf6; /* Soft Cream */
        --color-text: #424242; /* Warm Dark Gray */
      }
      /* Keyframe Animations */
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideUpFadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes backgroundPulse { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
       @keyframes subtle-pan {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

      /* Animation Utility Classes */
      .animate-on-scroll { opacity: 0; transition: opacity 0.8s ease-out, transform 0.8s ease-out; }
      .is-visible { opacity: 1; transform: translateY(0) !important; }
      .delay-1 { transition-delay: 0.1s; } .delay-2 { transition-delay: 0.2s; } .delay-3 { transition-delay: 0.3s; }
      .shimmer-button { position: relative; overflow: hidden; }
      .shimmer-button::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(100deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 80%); transform: translateX(-100%); transition: transform 0.6s ease; }
      .shimmer-button:hover::after { animation: shimmer 1.5s infinite linear; }
      
      /* Horizontal Scroll Loop */
      .scroll-loop { display: flex; width: 200%; animation: scroll 30s linear infinite; }
      .scroll-loop > div { width: 50%; }

      /* Themed Backgrounds */
      .currency-pattern-bg {
        background-color: var(--color-background);
        background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23004d40' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      }
      .hero-background {
          background: linear-gradient(270deg, var(--color-background), #ffffff, #fffaf0);
          background-size: 600% 600%;
          animation: subtle-pan 16s ease infinite;
      }
    `}
  </style>
);

// === SVG Icons & Graphics with an Indian touch ===
const LogoIcon = (props) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
    </svg>
);

// === Layout Components ===
const NavItem = ({ name, currentPage, setCurrentPage }) => {
    const isActive = currentPage === name;
    return (
        <a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(name); }}
           className={`relative py-2 transition duration-300 cursor-pointer text-base ${isActive ? "font-bold text-[var(--color-primary)]" : "text-[var(--color-text)] hover:text-[var(--color-primary)]"}`}>
            {name}
            {isActive && (<span className="absolute -bottom-1 left-0 w-full h-1 bg-[var(--color-secondary)] rounded-full transform transition-transform duration-500 scale-x-100 origin-left"></span>)}
        </a>
    );
};

function Navbar({ currentPage, setCurrentPage }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    return (
        <nav className="flex justify-between items-center px-4 sm:px-6 md:px-12 py-4 bg-white/80 backdrop-blur-md shadow-lg sticky w-full top-0 z-50">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage("Home")}>
                <LogoIcon className="text-[var(--color-primary)]" />
                <h1 style={{ fontFamily: "'Lora', serif" }} className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-primary)]">Affluence</h1>
            </div>
            <div className="hidden md:flex gap-10 font-medium font-['Nunito_Sans']">
                {["Home", "About", "Services", "Team", "Contact"].map((name) => (<NavItem key={name} name={name} currentPage={currentPage} setCurrentPage={setCurrentPage} />))}
            </div>
            <button className="md:hidden text-[var(--color-primary)]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
            {isMobileMenuOpen && (
                 <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden flex flex-col items-center py-4 animate-fadeIn">
                    {["Home", "About", "Services", "Team", "Contact"].map((name) => (
                        <a key={name} href="#" onClick={(e) => { e.preventDefault(); setCurrentPage(name); setIsMobileMenuOpen(false); }}
                           className="w-full text-center py-3 text-[var(--color-text)] hover:bg-[var(--color-background)] transition duration-200">{name}</a>
                    ))}
                </div>
            )}
        </nav>
    );
}

function Footer() {
    return (
        <footer className="bg-[var(--color-primary)] text-white py-8 text-center">
            <p className="font-['Nunito_Sans'] text-sm sm:text-base">© {new Date().getFullYear()} Affluence. The Art of Wealth Management. Crafted in India.</p>
        </footer>
    );
}

// === 3D Hero Scene ===
const Hero3DScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!window.THREE) return; // Don't run if three.js isn't loaded

    const THREE = window.THREE;
    const currentMount = mountRef.current;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, currentMount.clientWidth / currentMount.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Crystal Geometry
    const geometry = new THREE.IcosahedronGeometry(1.5, 0);
    const material = new THREE.MeshStandardMaterial({
        color: 0x004d40, // Deep Teal
        metalness: 0.3,
        roughness: 0.1,
        transparent: true,
        opacity: 0.8,
    });
    const crystal = new THREE.Mesh(geometry, material);
    scene.add(crystal);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xd4af37, 1, 100); // Rich Gold Light
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;

    // Handle Resize
    const handleResize = () => {
        camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    const animate = function () {
        requestAnimationFrame(animate);
        crystal.rotation.x += 0.002;
        crystal.rotation.y += 0.003;
        renderer.render(scene, camera);
    };
    animate();

    return () => {
        window.removeEventListener('resize', handleResize);
        currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0 opacity-20 md:opacity-30" />;
};


// === Animated Page Components ===
function Home() {
    const [threeReady, setThreeReady] = useState(false);
    return (
        <>
            <ThreeScriptLoader onReady={() => setThreeReady(true)} />
            <div className="text-center min-h-[90vh] flex flex-col justify-center items-center p-4 relative overflow-hidden hero-background">
                {threeReady && <Hero3DScene />}
                <div className="z-10 animate-on-scroll is-visible" style={{animation: 'slideUpFadeIn 1s ease-out'}}>
                    <h2 style={{ fontFamily: "'Lora', serif" }} className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-[var(--color-primary)] max-w-4xl mx-auto">
                        Crafting Legacies, One Investment at a Time.
                    </h2>
                    <p style={{ fontFamily: "'Nunito Sans', sans-serif" }} className="text-base sm:text-lg md:text-xl text-[var(--color-text)] max-w-2xl mx-auto mb-10">
                        Experience the confluence of ancient wisdom and modern financial strategy. Welcome to wealth management, reimagined.
                    </p>
                    <button className="mt-8 px-10 py-4 bg-[var(--color-accent)] text-white font-bold rounded-full hover:bg-pink-800 transition duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 shimmer-button">
                        Begin Your Journey
                    </button>
                </div>
            </div>
        </>
    );
}

function Section({ children }) {
    const [ref, isVisible] = useAnimateOnScroll({ threshold: 0.1 });
    return (<div ref={ref} className={`animate-on-scroll ${isVisible ? 'is-visible' : ''}`} style={{ transform: 'translateY(50px)' }}>{children}</div>);
}

function About() {
    // Data for timeline
    const timelineEvents = [
        { year: "2010", title: "Foundation Laid", text: "Affluence was founded with a singular vision: to blend ethical principles with robust financial strategies." },
        { year: "2015", title: "Growth & Expansion", text: "Expanded our services, introducing Mutual Fund Maitri and Suraksha Kavach to a growing client base." },
        { year: "2020", title: "Digital Innovation", text: "Launched our proprietary data-driven analysis tools, setting a new standard for portfolio management." },
        { year: "Today", title: "A Trusted Name", text: "Recognized as a leader in creating sustainable wealth, serving clients across the globe." },
    ];
    return (
        <div className="py-20 sm:py-28 px-4 sm:px-6 max-w-5xl mx-auto text-[var(--color-text)] leading-relaxed font-['Nunito_Sans']">
            <Section>
                <h2 style={{ fontFamily: "'Lora', serif" }} className="text-3xl sm:text-4xl font-bold text-center text-[var(--color-primary)] mb-8 border-b-2 border-[var(--color-secondary)] pb-4">Our Philosophy: A Tapestry of Trust</h2>
                <p className="mb-12 text-center text-base sm:text-lg">
                    At <strong>Affluence</strong>, we weave together the threads of heritage, integrity, and data-driven discipline. Our approach is a commitment to not just grow your wealth, but to fortify it with ethical principles for generations to come.
                </p>
            </Section>
            
            {/* Timeline Section */}
            <div className="relative mt-16">
                 {/* The vertical line */}
                <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-teal-100"></div>
                {timelineEvents.map((event, index) => {
                    const [ref, isVisible] = useAnimateOnScroll({ threshold: 0.5 });
                    const isEven = index % 2 === 0;
                    return (
                        <div ref={ref} key={index} className={`relative mb-12 flex items-center w-full animate-on-scroll ${isVisible ? 'is-visible' : ''} ${isEven ? 'justify-start' : 'justify-end'}`}>
                            <div className={`w-1/2 px-4 ${isEven ? 'text-right' : 'text-left'}`}>
                                <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)]" style={{fontFamily: "'Lora', serif"}}>{event.year} - {event.title}</h3>
                                <p className="text-sm sm:text-base mt-2">{event.text}</p>
                            </div>
                             {/* The circle on the line */}
                            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[var(--color-secondary)] rounded-full border-4 border-white"></div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}


function Services() {
    const [expandedCard, setExpandedCard] = useState(null);
    const services = [
        { title: "Portfolio Parampara", desc: "Legacy-focused equity management.", details: "Our flagship service combines deep market research with long-term value investing principles. We construct bespoke portfolios designed to weather market cycles and deliver consistent, sustainable growth for future generations.", icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18.7 8a6 6 0 0 0-8.4 0L4 18"/><path d="M12.5 13.4a2 2 0 0 0 2.8 0L18 10"/></svg> },
        { title: "Mutual Fund Maitri", desc: "Friendly, goal-oriented fund guidance.", details: "Navigating the vast world of mutual funds can be daunting. Our experts curate a selection of high-performing funds aligned with your specific life goals, from education planning to retirement, ensuring a diversified and resilient investment journey.", icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
        { title: "Anka Shastra", desc: "Financial harmony via numerology.", details: "A unique blend of ancient wisdom and modern finance. This service explores market timings and investment psychology through the lens of numerological patterns, offering a holistic and unconventional edge to your financial strategy.", icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.3 6.7a2 2 0 0 0-2.6 0L12 9.4l-2.7-2.7a2 2 0 0 0-2.6 0L2 11.4V16h4.6l2.7-2.7a2 2 0 0 0 0-2.6L7 8.4l2.7-2.7a2 2 0 0 1 2.6 0L15 8.4l2.7 2.7a2 2 0 0 0 2.6 0L22 10.4V6h-4.6Z"/></svg> },
        { title: "Suraksha Kavach", desc: "A shield for your financial legacy.", details: "Wealth preservation is as crucial as wealth creation. We provide comprehensive advisory on insurance, estate planning, and risk management to build an impenetrable shield around your assets, ensuring your legacy is protected.", icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
    ];
    return (
        <div className="py-20 sm:py-28 px-4 sm:px-6 text-center">
            <Section>
                <h2 style={{ fontFamily: "'Lora', serif" }} className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-16">Our Seva (Services)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {services.map((s, i) => (
                        <div key={i} className={`p-6 bg-white shadow-xl rounded-2xl border-t-4 border-[var(--color-secondary)] transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer`} onClick={() => setExpandedCard(expandedCard === i ? null : i)}>
                            <div className="flex justify-center mb-5 text-[var(--color-accent)]">{s.icon}</div>
                            <h4 className="text-lg sm:text-xl font-bold text-[var(--color-primary)] mb-2 font-['Nunito_Sans']">{s.title}</h4>
                            <p className="text-[var(--color-text)] text-sm font-['Nunito_Sans'] mb-4">{s.desc}</p>
                            <div style={{maxHeight: expandedCard === i ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.7s ease-in-out'}}>
                                <p className="text-sm text-left border-t pt-4 mt-4">{s.details}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
}

function Team() {
    const [flippedCard, setFlippedCard] = useState(null);
    const team = [
        { name: "Prasun Kumar Pal", role: "Founder & Chief Strategist", details: "With over two decades of experience, Prasun is the visionary behind Affluence, guiding our core investment philosophy with discipline and foresight." },
        { name: "Radha P. Goswami", role: "Head of Research & Analysis", details: "Radha leads our analytics wing, transforming complex data into actionable insights that form the bedrock of our financial strategies." },
        { name: "Anirban Shah", role: "Client Wealth Ambassador", details: "Anirban is the bridge between our clients and their financial goals, ensuring a seamless and personalized wealth management experience." },
    ];
    return (
        <div className="py-20 sm:py-28 px-4 sm:px-6 text-center">
            <Section>
                 <h2 style={{ fontFamily: "'Lora', serif" }} className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-16">Our Guiding Hands</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto" style={{perspective: '1000px'}}>
                    {team.map((member, i) => (
                        <div key={i} className="cursor-pointer" onClick={() => setFlippedCard(flippedCard === i ? null : i)}>
                            <div className="relative w-full h-64 transition-transform duration-700" style={{transformStyle: 'preserve-3d', transform: flippedCard === i ? 'rotateY(180deg)' : 'rotateY(0deg)'}}>
                                {/* Front of Card */}
                                <div className="absolute w-full h-full bg-white rounded-lg shadow-xl p-8 border border-gray-100 flex flex-col justify-center items-center" style={{backfaceVisibility: 'hidden'}}>
                                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[var(--color-background)] to-yellow-100 rounded-full flex items-center justify-center mb-4 ring-4 ring-white shadow-inner">
                                        <span className="text-[var(--color-primary)] text-4xl font-bold" style={{ fontFamily: "'Lora', serif" }}>{member.name.split(' ').map(n => n[0]).join('')}</span>
                                    </div>
                                    <h4 style={{ fontFamily: "'Lora', serif" }} className="font-bold text-xl sm:text-2xl text-[var(--color-primary)] mt-4">{member.name}</h4>
                                    <p className="text-[var(--color-accent)] font-medium text-sm mt-1 font-['Nunito_Sans']">{member.role}</p>
                                </div>
                                {/* Back of Card */}
                                <div className="absolute w-full h-full bg-[var(--color-primary)] text-white rounded-lg shadow-xl p-8 flex flex-col justify-center" style={{backfaceVisibility: 'hidden', transform: 'rotateY(180deg)'}}>
                                    <p className="font-['Nunito_Sans'] text-sm sm:text-base">{member.details}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
}

function Contact() {
    return (
        <div className="py-20 sm:py-28 px-4 sm:px-6 text-center overflow-hidden">
            <Section>
                 <h2 style={{ fontFamily: "'Lora', serif" }} className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-6">Connect With Us</h2>
                <div className="p-8 sm:p-10 bg-white rounded-xl shadow-2xl border max-w-2xl mx-auto">
                    <p className="text-base sm:text-lg mb-4 text-[var(--color-text)] font-['Nunito_Sans']">Let's begin a conversation about your financial future.</p>
                    <p className="font-semibold text-[var(--color-primary)] text-lg sm:text-xl mb-6 font-['Nunito_Sans']">
                        <a href="mailto:info@affluence.com" className="hover:underline">info@affluence.com</a>
                    </p>
                </div>
            </Section>
             {/* Infinite Scroll Loop */}
            <div className="mt-20 relative w-full overflow-hidden">
                <div className="scroll-loop">
                    <div className="flex justify-around items-center text-gray-400">
                        <span>Integrity</span> <span>•</span> <span>Discipline</span> <span>•</span> <span>Transparency</span> <span>•</span> <span>Growth</span>
                    </div>
                     <div className="flex justify-around items-center text-gray-400">
                        <span>Integrity</span> <span>•</span> <span>Discipline</span> <span>•</span> <span>Transparency</span> <span>•</span> <span>Growth</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// === Main Application ===
export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const renderPage = () => {
    switch (currentPage) {
      case "Home": return <Home />;
      case "About": return <About />;
      case "Services": return <Services />;
      case "Team": return <Team />;
      case "Contact": return <Contact />;
      default: return <Home />;
    }
  };
  return (
    <div className="min-h-screen flex flex-col currency-pattern-bg">
      <GlobalStyles />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

