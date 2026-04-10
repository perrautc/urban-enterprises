import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Background fade in
      loadTl.fromTo(
        bgRef.current,
        { opacity: 0, scale: 1.1 },
        { opacity: 1, scale: 1, duration: 1.2 }
      );

      // Headline words stagger
      const headlineWords = headlineRef.current?.querySelectorAll('.word');
      if (headlineWords) {
        loadTl.fromTo(
          headlineWords,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 },
          '-=0.8'
        );
      }

      // Subheadline
      loadTl.fromTo(
        subheadlineRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.4'
      );

      // CTAs
      loadTl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.3'
      );

      // Info card
      loadTl.fromTo(
        cardRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([headlineRef.current, subheadlineRef.current, ctaRef.current, cardRef.current], {
              opacity: 1,
              x: 0,
              y: 0,
            });
            gsap.set(bgRef.current, { scale: 1, y: 0 });
          },
        },
      });

      // ENTRANCE (0-30%): Hold - already visible from load animation
      // SETTLE (30-70%): Static
      // EXIT (70-100%): Elements exit

      // Headline exits left
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      // Subheadline exits left
      scrollTl.fromTo(
        subheadlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-14vw', opacity: 0, ease: 'power2.in' },
        0.72
      );

      // CTAs exit left
      scrollTl.fromTo(
        ctaRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.74
      );

      // Card exits right
      scrollTl.fromTo(
        cardRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.70
      );

      // Background scales and shifts
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, y: 0 },
        { scale: 1.06, y: '-2vh', ease: 'none' },
        0.70
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToServices = () => {
    const element = document.getElementById('heavy-lifting');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned z-10"
    >
      {/* Background Image */}
      <img
        ref={bgRef}
        src="/hero_highway.jpg"
        alt="Highway construction at night"
        className="section-background"
      />

      {/* Vignette Overlay */}
      <div className="vignette" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-[6vw]">
        {/* Headline Block */}
        <div className="max-w-[62vw]">
          <div ref={headlineRef}>
            <h1 className="font-display font-bold text-white uppercase tracking-tight leading-[0.95]"
                style={{ fontSize: 'clamp(36px, 5vw, 72px)' }}>
              <span className="word inline-block">One</span>{' '}
              <span className="word inline-block">Partner.</span>{' '}
              <span className="word inline-block">Every</span>{' '}
              <span className="word inline-block">Phase.</span>
            </h1>
          </div>

          <p
            ref={subheadlineRef}
            className="mt-6 text-white/80 max-w-[500px] leading-relaxed"
            style={{ fontSize: 'clamp(14px, 1.2vw, 18px)' }}
          >
            Commercial supply chain + heavy equipment rental for infrastructure teams.
          </p>

          <div ref={ctaRef} className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary gap-2"
            >
              Get a quote
              <ArrowRight size={18} />
            </button>
            <button
              onClick={scrollToServices}
              className="btn-secondary gap-2"
            >
              View fleet
              <ChevronDown size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div
        ref={cardRef}
        className="absolute right-[6vw] bottom-[10vh] w-[90vw] max-w-[380px] info-card"
      >
        <div className="accent-rule mb-4" />
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-industrial-gray mb-2">
          Logistics
        </p>
        <h3 className="font-display font-semibold text-white text-xl mb-2">
          24/7 dispatch
        </h3>
        <p className="text-white/70 text-sm leading-relaxed">
          Nationwide logistics network. On-time delivery, on-site support.
        </p>
      </div>
    </section>
  );
}
