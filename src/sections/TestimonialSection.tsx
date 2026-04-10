import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Truck, Clock, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function TestimonialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const attributionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Label fade in
      gsap.fromTo(
        labelRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 55%',
            scrub: true,
          },
        }
      );

      // Quote reveal
      gsap.fromTo(
        quoteRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 45%',
            scrub: true,
          },
        }
      );

      // Attribution
      gsap.fromTo(
        attributionRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 45%',
            scrub: true,
          },
        }
      );

      // Stats stagger
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(
          statItems,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
              end: 'top 60%',
              scrub: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '12K+', label: 'Equipment moves coordinated', icon: Truck },
    { value: '98%', label: 'On-time delivery rate', icon: Clock },
    { value: '24/7', label: 'Dispatch & support', icon: Shield },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative bg-industrial-black py-24 md:py-32"
    >
      <div className="px-[6vw]">
        {/* Micro Label */}
        <p
          ref={labelRef}
          className="font-mono text-xs uppercase tracking-[0.14em] text-industrial-gray mb-8"
        >
          Testimonials
        </p>

        {/* Quote */}
        <div className="max-w-4xl">
          <Quote className="text-industrial-red mb-6" size={40} />
          <blockquote
            ref={quoteRef}
            className="font-display font-bold text-white leading-tight mb-8"
            style={{ fontSize: 'clamp(22px, 3.2vw, 42px)' }}
          >
            "Urban Enterprises kept our phased project on schedule—equipment arrived clean, crews were competent, and the supply chain never became a bottleneck."
          </blockquote>

          {/* Attribution */}
          <div ref={attributionRef} className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-industrial-red/20 flex items-center justify-center">
              <span className="font-display font-bold text-industrial-red">JV</span>
            </div>
            <div>
              <p className="font-medium text-white">Jordan V.</p>
              <p className="text-sm text-industrial-gray">
                Senior Project Manager, Tier-1 General Contractor
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-12 border-t border-white/10"
        >
          {stats.map((stat, index) => (
            <div key={index} className="stat-item flex items-start gap-4">
              <div className="p-3 bg-white/5 rounded-lg">
                <stat.icon className="text-industrial-red" size={24} />
              </div>
              <div>
                <p
                  className="font-display font-bold text-white"
                  style={{ fontSize: 'clamp(28px, 3vw, 40px)' }}
                >
                  {stat.value}
                </p>
                <p className="text-sm text-industrial-gray mt-1">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
