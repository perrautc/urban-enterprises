import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceSectionProps {
  id: string;
  image: string;
  imageAlt: string;
  microLabel?: string;
  headlineLine1: string;
  headlineLine2: string;
  body: string;
  cardTitle: string;
  cardBullets: string;
  alignment: 'left' | 'right';
  zIndex: number;
}

export default function ServiceSection({
  id,
  image,
  imageAlt,
  microLabel,
  headlineLine1,
  headlineLine2,
  body,
  cardTitle,
  cardBullets,
  alignment,
  zIndex,
}: ServiceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLImageElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.5,
        },
      });

      // ENTRANCE (0-30%)
      // Background enters
      const bgStartX = alignment === 'left' ? '4vw' : '-4vw';
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1.08, x: bgStartX },
        { scale: 1, x: 0, ease: 'none' },
        0
      );

      // Micro label
      if (labelRef.current) {
        scrollTl.fromTo(
          labelRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, ease: 'power2.out' },
          0.05
        );
      }

      // Headline enters from side
      const headlineStartX = alignment === 'left' ? '-40vw' : '40vw';
      scrollTl.fromTo(
        headlineRef.current,
        { x: headlineStartX, opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.08
      );

      // Body enters
      scrollTl.fromTo(
        bodyRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.14
      );

      // Card enters from opposite side
      const cardStartX = alignment === 'left' ? '50vw' : '-50vw';
      scrollTl.fromTo(
        cardRef.current,
        { x: cardStartX, opacity: 0 },
        { x: 0, opacity: 1, ease: 'power2.out' },
        0.10
      );

      // Red rule scale
      scrollTl.fromTo(
        ruleRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'power2.out' },
        0.18
      );

      // SETTLE (30-70%): Hold positions

      // EXIT (70-100%)
      // Headline exits
      const headlineExitX = alignment === 'left' ? '-10vw' : '10vw';
      const headlineExitY = alignment === 'left' ? '-10vh' : '0';
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, y: 0, opacity: 1 },
        { x: headlineExitX, y: headlineExitY, opacity: 0, ease: 'power2.in' },
        0.70
      );

      // Body exits
      scrollTl.fromTo(
        bodyRef.current,
        { x: 0, opacity: 1 },
        { x: headlineExitX, opacity: 0, ease: 'power2.in' },
        0.72
      );

      // Card exits
      const cardExitX = alignment === 'left' ? '10vw' : '-10vw';
      const cardExitY = alignment === 'left' ? '10vh' : '10vh';
      scrollTl.fromTo(
        cardRef.current,
        { x: 0, y: 0, opacity: 1 },
        { x: cardExitX, y: cardExitY, opacity: 0, ease: 'power2.in' },
        0.70
      );

      // Background exits
      const bgExitX = alignment === 'left' ? '-2vw' : '2vw';
      scrollTl.fromTo(
        bgRef.current,
        { scale: 1, x: 0 },
        { scale: 1.04, x: bgExitX, ease: 'none' },
        0.70
      );

      if (labelRef.current) {
        scrollTl.fromTo(
          labelRef.current,
          { opacity: 1 },
          { opacity: 0, ease: 'power2.in' },
          0.70
        );
      }
    }, section);

    return () => ctx.revert();
  }, [alignment]);

  const isLeft = alignment === 'left';

  return (
    <section
      ref={sectionRef}
      id={id}
      className="section-pinned"
      style={{ zIndex }}
    >
      {/* Background Image */}
      <img
        ref={bgRef}
        src={image}
        alt={imageAlt}
        className="section-background"
      />

      {/* Vignette Overlay */}
      <div className="vignette" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-[6vw]">
        {/* Micro Label */}
        {microLabel && (
          <p
            ref={labelRef}
            className={`font-mono text-xs uppercase tracking-[0.14em] text-industrial-gray mb-4 ${
              isLeft ? '' : 'text-right ml-auto'
            }`}
            style={{ marginTop: '-20vh' }}
          >
            {microLabel}
          </p>
        )}

        {/* Headline Block */}
        <div
          ref={headlineRef}
          className={`${isLeft ? '' : 'ml-auto text-right'} max-w-[70vw]`}
        >
          <h2
            className="font-display font-bold text-white uppercase tracking-tight leading-[0.95]"
            style={{ fontSize: 'clamp(40px, 6vw, 96px)' }}
          >
            {headlineLine1}
            <br />
            {headlineLine2}
          </h2>
        </div>

        {/* Body */}
        <p
          ref={bodyRef}
          className={`mt-8 text-white/80 max-w-[400px] leading-relaxed ${
            isLeft ? '' : 'ml-auto text-right'
          }`}
          style={{ fontSize: 'clamp(14px, 1.2vw, 18px)' }}
        >
          {body}
        </p>
      </div>

      {/* Info Card */}
      <div
        ref={cardRef}
        className={`absolute ${
          isLeft ? 'right-[6vw]' : 'left-[6vw]'
        } bottom-[10vh] w-[90vw] max-w-[380px] info-card`}
      >
        <div ref={ruleRef} className="accent-rule mb-4 origin-left" />
        <h3 className="font-display font-semibold text-white text-lg mb-2">
          {cardTitle}
        </h3>
        <p className="text-white/70 text-sm leading-relaxed">
          {cardBullets}
        </p>
      </div>
    </section>
  );
}
