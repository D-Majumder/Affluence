// Crafted with care by Dhruba Majumder
import React, { useState, useEffect, useRef } from 'react';

// === Helper Hooks ===
// A clever hook for triggering animations on scroll. A Dhruba special.
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
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
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
      
      /* Base Styling */
      html {
        scroll-behavior: smooth;
      }
      body {
        --color-primary: #004d40; /* Deep Teal */
        --color-secondary: #d4af37; /* Rich Gold */
        --color-accent: #c2185b; /* Ruby Magenta */
        --color-background: #fdfaf6; /* Soft Cream */
        --color-text: #424242; /* Warm Dark Gray */
      }
      /* Keyframe Animations */
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      @keyframes slideUpFadeIn { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
      @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
      @keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

      /* Animation Utility Classes */
      .animate-on-scroll { opacity: 0; transition: opacity 1s cubic-bezier(0.25, 1, 0.5, 1), transform 1s cubic-bezier(0.25, 1, 0.5, 1); }
      .is-visible { opacity: 1; transform: translateY(0) !important; }
      .shimmer-button { position: relative; overflow: hidden; }
      .shimmer-button::after { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(100deg, rgba(255,255,255,0) 20%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 80%); transform: translateX(-100%); transition: transform 0.6s ease; }
      .shimmer-button:hover::after { animation: shimmer 1.5s infinite linear; }
      
      /* Horizontal Scroll Loop */
      .scroll-loop { display: flex; width: 200%; animation: scroll 30s linear infinite; }
      .scroll-loop > div { width: 50%; }

      /* Interactive Themed Background */
      .currency-pattern-bg {
        background-color: var(--color-background);
        background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23004d40' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        transition: background-position 0.5s ease-out;
      }
    `}
  </style>
);

// === SVG Icons ===
const LogoIcon = (props) => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="2" fill="currentColor"/>
    </svg>
);

const LinkedInIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

const WalletIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M20 12V8H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4Z"/>
        <path d="M4 6v12a2 2 0 0 0 2 2h14v-4"/>
        <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4Z"/>
    </svg>
);


// === Interactive Scroll-Driven Coin Animation ===
// The coin's narrative journey, envisioned by Dhruba.
const Coin = ({ style = {} }) => (
    <div style={style}>
        <svg width="40" height="40" viewBox="0 0 100 100" className="drop-shadow-lg">
            <defs>
                <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" style={{stopColor: 'rgb(255,235,159)', stopOpacity:1}} />
                    <stop offset="100%" style={{stopColor: 'rgb(212,175,55)', stopOpacity:1}} />
                </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#grad1)" />
            <circle cx="50" cy="50" r="44" fill="transparent" stroke="#b8860b" strokeWidth="2" />
            <circle cx="50" cy="50" r="38" fill="transparent" stroke="#daa520" strokeWidth="1" />
            <g transform="translate(35, 30) scale(1.5)">
               <path d="M10 0 L12 2 L8 2 Z" fill="#a0522d" />
               <path d="M6 3 H14 V5 H6 Z" fill="#a0522d" />
               <path d="M7 6 H13 V12 C 13 14, 11 15, 10 15 C 9 15, 7 14, 7 12 Z" fill="#d2691e"/>
               <circle cx="10" cy="9" r="3" fill="#f4a460" />
            </g>
        </svg>
    </div>
);

const CoinJourneyAnimation = ({ homeSectionRef, contactSectionRef }) => {
    const [state, setState] = useState({
        left: '5%',
        rotate: 0,
        opacity: 0,
        bottom: '1rem',
        transform: 'translateX(-50%)'
    });

    useEffect(() => {
        const handleScroll = () => {
            if (!homeSectionRef.current || !contactSectionRef.current) return;
            
            const scrollY = window.scrollY;
            const homeRect = homeSectionRef.current.getBoundingClientRect();
            
            // Before the journey starts
            if (homeRect.bottom > window.innerHeight) {
                setState(s => ({ ...s, opacity: 0 }));
                return;
            }

            // The journey has started
            const startScroll = homeSectionRef.current.offsetTop + homeSectionRef.current.offsetHeight - window.innerHeight;
            // Extend rolling until the wallet is about to appear
            const endScroll = contactSectionRef.current.offsetTop - window.innerHeight;
            const journeyDistance = endScroll - startScroll;
            const currentJourneyScroll = scrollY - startScroll;
            const journeyProgress = Math.max(0, Math.min(1, currentJourneyScroll / journeyDistance));

            let left = 5 + (journeyProgress * 80);
            const rotate = journeyProgress * 360 * 15; // Increased rotation for more spin
            let bottom = '1rem';
            let opacity = 1;
            let scale = 1;

            // Approaching the wallet
            if (journeyProgress >= 1) {
                const walletProgress = Math.max(0, (scrollY - endScroll) / (window.innerHeight * 0.5));
                left = 85 + (walletProgress * 5);
                bottom = `${1 + walletProgress * 5}rem`;
                opacity = 1 - walletProgress;
                scale = 1 - walletProgress;
            }

            setState({ 
                left: `${left}%`, 
                rotate, 
                opacity, 
                bottom, 
                transform: `translateX(-50%) scale(${scale})` 
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [homeSectionRef, contactSectionRef]);

    return (
        <div className="fixed bottom-0 left-0 w-full h-16 pointer-events-none z-40 hidden md:block">
            <div 
                className="absolute" 
                style={{ 
                    left: state.left, 
                    bottom: state.bottom, 
                    opacity: state.opacity,
                    transform: state.transform,
                    // Using transition for smoother visual updates between scroll events
                    transition: 'opacity 0.2s linear, transform 0.2s linear, left 0.1s linear'
                }}
            >
                <div style={{ transform: `rotate(${state.rotate}deg)` }}>
                   <Coin />
                </div>
            </div>
             <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>
    );
};


// === Layout Components ===
function Navbar({ onNavigate, activeSection }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navItems = ["Home", "About", "Services", "Team", "Contact"];

    return (
        <nav className="flex justify-between items-center px-4 sm:px-6 md:px-12 py-4 bg-white/80 backdrop-blur-md shadow-lg sticky w-full top-0 z-50">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
                <LogoIcon className="text-[var(--color-primary)]" />
                <h1 style={{ fontFamily: "'Lora', serif" }} className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--color-primary)]">Affluence</h1>
            </div>
            <div className="hidden md:flex gap-10 font-medium font-['Nunito_Sans']">
                {navItems.map((name) => (
                    <a key={name} href={`#${name.toLowerCase()}`} onClick={(e) => { e.preventDefault(); onNavigate(name.toLowerCase()); }}
                       className={`relative py-2 transition duration-300 cursor-pointer text-base ${activeSection === name.toLowerCase() ? "font-bold text-[var(--color-primary)]" : "text-[var(--color-text)] hover:text-[var(--color-primary)]"}`}>
                        {name}
                        {activeSection === name.toLowerCase() && (<span className="absolute -bottom-1 left-0 w-full h-1 bg-[var(--color-secondary)] rounded-full"></span>)}
                    </a>
                ))}
            </div>
            <button className="md:hidden text-[var(--color-primary)]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
            {isMobileMenuOpen && (
                 <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden flex flex-col items-center py-4 animate-fadeIn">
                    {navItems.map((name) => (
                        <a key={name} href={`#${name.toLowerCase()}`} onClick={(e) => { e.preventDefault(); onNavigate(name.toLowerCase()); setIsMobileMenuOpen(false); }}
                           className="w-full text-center py-3 text-[var(--color-text)] hover:bg-[var(--color-background)] transition duration-200">{name}</a>
                    ))}
                </div>
            )}
        </nav>
    );
}

function Footer() {
  return (
    // A personal signature from Dhruba at the end of the journey.
    <footer className="bg-[var(--color-primary)] text-white py-8 text-center font-['Nunito_Sans']">
      <a href="https://www.linkedin.com/in/iamdhrubamajumder/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-bold underline hover:text-[var(--color-secondary)] transition-colors">
        <span>Crafted by Dhruba Majumder</span>
        <LinkedInIcon />
      </a>
      <p className="text-sm mt-2 opacity-80">© {new Date().getFullYear()} Affluence. The Art of Wealth Management.</p>
    </footer>
  );
}

// === Section Components ===

function Section({ children, id, setRef }) {
    const [ref, isVisible] = useAnimateOnScroll({ threshold: 0.1 });
    const combinedRef = (node) => {
        ref.current = node;
        if(setRef) setRef(node);
    };

    return (
        <section ref={combinedRef} id={id} className={`py-20 sm:py-28 px-4 sm:px-6 animate-on-scroll ${isVisible ? 'is-visible' : ''}`} style={{ transform: 'translateY(50px)' }}>
            {children}
        </section>
    );
}

function HomeSection({ onNavigate, setRef }) {
    return (
        <section ref={setRef} id="home" className="text-center min-h-[90vh] flex flex-col justify-center items-center p-4 relative overflow-hidden">
            <div className="z-10" style={{ animation: 'slideUpFadeIn 1s ease-out forwards' }}>
                <h2 style={{ fontFamily: "'Lora', serif" }} className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-[var(--color-primary)] max-w-4xl mx-auto">
                    Crafting Legacies, One Investment at a Time.
                </h2>
                <p style={{ fontFamily: "'Nunito Sans', sans-serif" }} className="text-base sm:text-lg md:text-xl text-[var(--color-text)] max-w-2xl mx-auto mb-10">
                    Experience the confluence of ancient wisdom and modern financial strategy. Welcome to wealth management, reimagined.
                </p>
                <button onClick={() => onNavigate('services')} className="mt-8 px-10 py-4 bg-[var(--color-accent)] text-white font-bold rounded-full hover:bg-pink-800 transition duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 shimmer-button">
                    Begin Your Journey
                </button>
            </div>
            {/* Coin Pile, designed by Dhruba */}
             <div className="absolute bottom-4 left-4 w-24 h-24 hidden md:block">
                <Coin style={{ position: 'absolute', bottom: '0px', left: '10px', transform: 'rotate(-15deg)' }} />
                <Coin style={{ position: 'absolute', bottom: '5px', left: '25px', transform: 'rotate(10deg)' }} />
                <Coin style={{ position: 'absolute', bottom: '0px', left: '40px', transform: 'rotate(25deg)' }} />
            </div>
        </section>
    );
}

function AboutSection({ setRef }) {
    const timelineEvents = [
        { year: "2010", title: "Foundation Laid", text: "Affluence was founded with a singular vision: to blend ethical principles with robust financial strategies." },
        { year: "2015", title: "Growth & Expansion", text: "Expanded our services, introducing Mutual Fund Maitri and Suraksha Kavach to a growing client base." },
        { year: "2020", "title": "Digital Innovation", text: "Launched our proprietary data-driven analysis tools, setting a new standard for portfolio management." },
        { year: "Today", title: "A Trusted Name", text: "Recognized as a leader in creating sustainable wealth, serving clients across the globe." },
    ];
    return (
        <Section id="about" setRef={setRef}>
            <div className="max-w-5xl mx-auto text-[var(--color-text)] leading-relaxed font-['Nunito_Sans']">
                <h2 style={{ fontFamily: "'Lora', serif" }} className="text-3xl sm:text-4xl font-bold text-center text-[var(--color-primary)] mb-8 border-b-2 border-[var(--color-secondary)] pb-4">Our Philosophy: A Tapestry of Trust</h2>
                <p className="mb-12 text-center text-base sm:text-lg">
                    At <strong>Affluence</strong>, we weave together the threads of heritage, integrity, and data-driven discipline.
                </p>
                <div className="relative mt-16">
                    <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-teal-100"></div>
                    {timelineEvents.map((event, index) => {
                        const [ref, isVisible] = useAnimateOnScroll({ threshold: 0.5 });
                        const isEven = index % 2 === 0;
                        return (
                            <div ref={ref} key={index} className={`relative mb-12 flex items-center w-full animate-on-scroll ${isVisible ? 'is-visible' : ''} ${isEven ? 'justify-start' : 'justify-end'}`}>
                                <div className={`w-1/2 px-4 ${isEven ? 'text-right' : 'text-left'}`}>
                                    <h3 className="text-xl sm:text-2xl font-bold text-[var(--color-primary)]" style={{ fontFamily: "'Lora', serif" }}>{event.year} - {event.title}</h3>
                                    <p className="text-sm sm:text-base mt-2">{event.text}</p>
                                </div>
                                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[var(--color-secondary)] rounded-full border-4 border-white"></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
}

function ServicesSection({ setRef }) {
    const [expandedCard, setExpandedCard] = useState(null);
    const services = [
        { title: "Portfolio Parampara", desc: "Legacy-focused equity management.", details: "Our flagship service combines deep market research with long-term value investing principles. We construct bespoke portfolios designed to weather market cycles and deliver consistent, sustainable growth for future generations.", icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18.7 8a6 6 0 0 0-8.4 0L4 18"/><path d="M12.5 13.4a2 2 0 0 0 2.8 0L18 10"/></svg> },
        { title: "Mutual Fund Maitri", desc: "Friendly, goal-oriented fund guidance.", details: "Navigating the vast world of mutual funds can be daunting. Our experts curate a selection of high-performing funds aligned with your specific life goals, ensuring a diversified and resilient investment journey.", icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
        { title: "Anka Shastra", desc: "Financial harmony via numerology.", details: "A unique blend of ancient wisdom and modern finance. This service explores market timings and investment psychology through the lens of numerological patterns, offering a holistic and unconventional edge.", icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.3 6.7a2 2 0 0 0-2.6 0L12 9.4l-2.7-2.7a2 2 0 0 0-2.6 0L2 11.4V16h4.6l2.7-2.7a2 2 0 0 0 0-2.6L7 8.4l2.7-2.7a2 2 0 0 1 2.6 0L15 8.4l2.7 2.7a2 2 0 0 0 2.6 0L22 10.4V6h-4.6Z"/></svg> },
        { title: "Suraksha Kavach", desc: "A shield for your financial legacy.", details: "Wealth preservation is as crucial as wealth creation. We provide comprehensive advisory on insurance, estate planning, and risk management to build an impenetrable shield around your assets.", icon: <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
    ];
    return (
        <Section id="services" setRef={setRef}>
            <div className="text-center">
                <h2 style={{ fontFamily: "'Lora', serif" }} className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-16">Our Seva (Services)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {services.map((s, i) => (
                        <div key={i} className={`p-6 bg-white shadow-xl rounded-2xl border-t-4 border-[var(--color-secondary)] transition-all duration-700 ease-in-out hover:shadow-2xl hover:-translate-y-2 cursor-pointer`} onClick={() => setExpandedCard(expandedCard === i ? null : i)}>
                            <div className="flex justify-center mb-5 text-[var(--color-accent)]">{s.icon}</div>
                            <h4 className="text-lg sm:text-xl font-bold text-[var(--color-primary)] mb-2 font-['Nunito_Sans']">{s.title}</h4>
                            <p className="text-[var(--color-text)] text-sm font-['Nunito_Sans'] mb-4">{s.desc}</p>
                            <div style={{ maxHeight: expandedCard === i ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.7s ease-in-out' }}>
                                <p className="text-sm text-left border-t pt-4 mt-4">{s.details}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}

function TeamSection({ setRef }) {
    // Team section flip-card magic, courtesy of Dhruba.
    const [flippedCard, setFlippedCard] = useState(null);
    const team = [
        { name: "Prasun Kumar Pal", role: "Founder & Chief Strategist", details: "With over two decades of experience, Prasun is the visionary behind Affluence, guiding our core investment philosophy with discipline and foresight." },
        { name: "Radha P. Goswami", role: "Head of Research & Analysis", details: "Radha leads our analytics wing, transforming complex data into actionable insights that form the bedrock of our financial strategies." },
        { name: "Anirban Shah", role: "Client Wealth Ambassador", details: "Anirban is the bridge between our clients and their financial goals, ensuring a seamless and personalized wealth management experience." },
    ];
    return (
        <Section id="team" setRef={setRef}>
            <div className="text-center">
                <h2 style={{ fontFamily: "'Lora', serif" }} className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-16">Our Guiding Hands</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto" style={{ perspective: '1000px' }}>
                    {team.map((member, i) => (
                        <div key={i} className="cursor-pointer" onClick={() => setFlippedCard(flippedCard === i ? null : i)}>
                            <div className="relative w-full h-64 transition-transform duration-700" style={{ transformStyle: 'preserve-3d', transform: flippedCard === i ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                                <div className="absolute w-full h-full bg-white rounded-lg shadow-xl p-8 border border-gray-100 flex flex-col justify-center items-center" style={{ backfaceVisibility: 'hidden' }}>
                                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[var(--color-background)] to-yellow-100 rounded-full flex items-center justify-center mb-4 ring-4 ring-white shadow-inner">
                                        <span className="text-[var(--color-primary)] text-4xl font-bold" style={{ fontFamily: "'Lora', serif" }}>{member.name.split(' ').map(n => n[0]).join('')}</span>
                                    </div>
                                    <h4 style={{ fontFamily: "'Lora', serif" }} className="font-bold text-xl sm:text-2xl text-[var(--color-primary)] mt-4">{member.name}</h4>
                                    <p className="text-[var(--color-accent)] font-medium text-sm mt-1 font-['Nunito_Sans']">{member.role}</p>
                                </div>
                                <div className="absolute w-full h-full bg-[var(--color-primary)] text-white rounded-lg shadow-xl p-8 flex flex-col justify-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                                    <p className="font-['Nunito_Sans'] text-sm sm:text-base">{member.details}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}

function ContactSection({ setRef }) {
    return (
        <Section id="contact" setRef={setRef}>
            <div className="text-center overflow-hidden">
                <h2 style={{ fontFamily: "'Lora', serif" }} className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] mb-6">Connect With Us</h2>
                <div className="p-8 sm:p-10 bg-white rounded-xl shadow-2xl border max-w-2xl mx-auto">
                    <p className="text-base sm:text-lg mb-4 text-[var(--color-text)] font-['Nunito_Sans']">Let's begin a conversation about your financial future.</p>
                    <p className="font-semibold text-[var(--color-primary)] text-lg sm:text-xl mb-6 font-['Nunito_Sans']">
                        <a href="mailto:info@affluence.com" className="hover:underline">info@affluence.com</a>
                    </p>
                </div>
                {/* Wallet Icon for the grand finale */}
                <div className="relative mt-16 w-full flex justify-end pr-10">
                    <WalletIcon className="text-[var(--color-primary)] opacity-80"/>
                </div>
                <div className="mt-4 relative w-full overflow-hidden">
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
        </Section>
    );
}

// === Main Application ===
// This entire digital experience was architected by Dhruba.
export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = useRef({});
  const homeSectionRef = useRef(null);
  const contactSectionRef = useRef(null);

  const handleNavigate = (sectionId) => {
    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        const x = (clientX / innerWidth) * 20 - 10;
        const y = (clientY / innerHeight) * 20 - 10;
        document.body.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });
    
    const refs = sectionRefs.current;
    Object.values(refs).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(refs).forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col currency-pattern-bg">
      <GlobalStyles />
      <CoinJourneyAnimation homeSectionRef={homeSectionRef} contactSectionRef={contactSectionRef} />
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} />
      <main>
        <HomeSection onNavigate={handleNavigate} setRef={(el) => {sectionRefs.current.home = el; homeSectionRef.current = el;}} />
        <AboutSection setRef={(el) => sectionRefs.current.about = el} />
        <ServicesSection setRef={(el) => sectionRefs.current.services = el} />
        <TeamSection setRef={(el) => sectionRefs.current.team = el} />
        <ContactSection setRef={(el) => {sectionRefs.current.contact = el; contactSectionRef.current = el;}} />
      </main>
      <Footer />
    </div>
  );
}

