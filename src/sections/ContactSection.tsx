import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    details: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Headline
      gsap.fromTo(
        headlineRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      // Form
      gsap.fromTo(
        formRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
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

      // Footer
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            end: 'top 80%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', company: '', email: '', phone: '', details: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative bg-industrial-light min-h-screen"
    >
      <div className="px-[6vw] py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Text */}
          <div ref={headlineRef}>
            <h2
              className="font-display font-bold text-industrial-black uppercase tracking-tight leading-[0.95] mb-6"
              style={{ fontSize: 'clamp(40px, 5vw, 72px)' }}
            >
              Let's
              <br />
              Build
            </h2>
            <p className="text-industrial-dark-gray text-lg leading-relaxed max-w-md mb-10">
              Tell us what you're moving, building, or paving. We'll reply within
              one business day.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-industrial-black/5 rounded-lg">
                  <Mail className="text-industrial-red" size={20} />
                </div>
                <span className="text-industrial-dark-gray">
                  hello@urbanenterprises.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-industrial-black/5 rounded-lg">
                  <Phone className="text-industrial-red" size={20} />
                </div>
                <span className="text-industrial-dark-gray">
                  +1 (800) 555-0199
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-industrial-black/5 rounded-lg">
                  <MapPin className="text-industrial-red" size={20} />
                </div>
                <span className="text-industrial-dark-gray">
                  4500 Industrial Parkway, Building 7
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10">
              <p className="text-sm text-industrial-dark-gray mb-3">
                Prefer to call?
              </p>
              <a
                href="tel:+18005550199"
                className="inline-flex items-center gap-2 text-industrial-red font-medium hover:underline"
              >
                +1 (800) 555-0199
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100"
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Send className="text-green-600" size={28} />
                </div>
                <h3 className="font-display font-bold text-2xl text-industrial-black mb-2">
                  Inquiry Sent!
                </h3>
                <p className="text-industrial-dark-gray">
                  We'll get back to you within one business day.
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-industrial-black mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-industrial-black mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="Your company"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-industrial-black mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-industrial-black mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="(555) 000-0000"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-industrial-black mb-2">
                    Project Details
                  </label>
                  <textarea
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows={4}
                    className="form-input resize-none"
                    placeholder="Tell us about your project, timeline, and equipment needs..."
                  />
                </div>

                <button type="submit" className="btn-primary w-full gap-2">
                  Send inquiry
                  <Send size={18} />
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      {/* Footer */}
      <div
        ref={footerRef}
        className="border-t border-gray-200 px-[6vw] py-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-industrial-dark-gray">
            © Urban Enterprises. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button className="text-sm text-industrial-dark-gray hover:text-industrial-black transition-colors">
              Privacy
            </button>
            <button className="text-sm text-industrial-dark-gray hover:text-industrial-black transition-colors">
              Terms
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
