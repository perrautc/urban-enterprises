import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import ServiceSection from './sections/ServiceSection';
import TestimonialSection from './sections/TestimonialSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

// Service section data
const serviceSections = [
  {
    id: 'heavy-lifting',
    image: '/crane_lifting.jpg',
    imageAlt: 'Crane lifting steel beams at night',
    microLabel: 'Lifting',
    headlineLine1: 'Heavy',
    headlineLine2: 'Lifting',
    body: 'From steel erection to modular installs, we plan the lift, supply the crane, and keep the schedule.',
    cardTitle: 'Certified operators',
    cardBullets: 'Rigging plans • Lift supervision • 24/7 standby',
    alignment: 'left' as const,
    zIndex: 20,
  },
  {
    id: 'site-prep',
    image: '/excavator_night.jpg',
    imageAlt: 'Excavator working at night',
    headlineLine1: 'Site',
    headlineLine2: 'Prep',
    body: 'Clear, dig, and grade—fast. We bring machines and crews that keep upstream work on track.',
    cardTitle: 'Cut & fill',
    cardBullets: 'Trenching • Grading pad • Dewatering support',
    alignment: 'right' as const,
    zIndex: 30,
  },
  {
    id: 'precision',
    image: '/grader_night.jpg',
    imageAlt: 'Motor grader at night',
    headlineLine1: 'Precision',
    headlineLine2: 'Grading',
    body: 'Tight tolerances, clean drainage, and a surface built to spec—so the next crew can start strong.',
    cardTitle: 'Surface control',
    cardBullets: 'Slope control • Compaction specs • Paving-ready finish',
    alignment: 'left' as const,
    zIndex: 40,
  },
  {
    id: 'supply-chain',
    image: '/warehouse_night.jpg',
    imageAlt: 'Warehouse at night with forklift',
    headlineLine1: 'Supply',
    headlineLine2: 'Chain',
    body: 'One order, one timeline, one point of contact. We source, stage, and deliver so your site never waits.',
    cardTitle: 'Materials + logistics',
    cardBullets: 'Steel • Concrete • Interior/exterior finishes',
    alignment: 'right' as const,
    zIndex: 50,
  },
  {
    id: 'fleet',
    image: '/bulldozer_fleet.jpg',
    imageAlt: 'Bulldozer fleet at night',
    headlineLine1: 'The',
    headlineLine2: 'Fleet',
    body: 'Modern machines, maintained daily, dispatched when you need them—by the day, week, or phase.',
    cardTitle: 'Ready to deploy',
    cardBullets: 'Crawler & wheeled dozers • Excavators • Graders • Cranes',
    alignment: 'left' as const,
    zIndex: 60,
  },
  {
    id: 'safety',
    image: '/equipment_detail.jpg',
    imageAlt: 'Heavy equipment detail at night',
    headlineLine1: 'Safety',
    headlineLine2: 'Quality',
    body: 'Certified crews, documented maintenance, and a safety plan that travels with every machine.',
    cardTitle: 'Compliance',
    cardBullets: 'Pre-shift inspections • JHA documentation • Insurance verification',
    alignment: 'right' as const,
    zIndex: 70,
  },
];

function App() {
  // Global scroll snap for pinned sections
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with small buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="relative">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Service Sections */}
        {serviceSections.map((section) => (
          <ServiceSection key={section.id} {...section} />
        ))}

        {/* Testimonial Section (flowing) */}
        <TestimonialSection />

        {/* Contact Section (flowing) */}
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
