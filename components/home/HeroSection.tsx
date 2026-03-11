'use client';

import './HeroSection.css';

export default function HeroSection() {
  return (
    <section className="hero-section relative w-full h-[70vh] md:h-[90vh] bg-[#F5EFE6] overflow-hidden">
      {/* Placeholder for background image - uncomment when image ready */}
      {/* <Image
        src="/hero-bg.jpg"
        alt="Handcrafted crochet products"
        fill
        className="object-cover"
        priority
      /> */}

      {/* Background placeholder */}
      <div className="absolute inset-0 bg-[#F5EFE6]" />

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center">
        <div className="hero-content max-w-2xl">
          {/* Label */}
          <p className="hero-label text-xs md:text-sm tracking-[0.2em] uppercase text-[#C4714A] mb-4 md:mb-6 font-['DM_Sans']">
            ✦ New Collection
          </p>

          {/* Headline */}
          <h1 className="hero-headline text-[32px] md:text-5xl lg:text-6xl font-['Playfair_Display'] italic text-[#2C2416] leading-tight mb-4 md:mb-6">
            Handcrafted with joy,<br />
            for every celebration
          </h1>

          {/* Subtext */}
          <p className="hero-subtext text-base md:text-lg text-[#6B5C4E] mb-8 md:mb-10 font-['DM_Sans'] max-w-md">
            Each Jashni piece is made by hand, with love and intention.
          </p>

          {/* CTA Buttons */}
          <div className="hero-buttons flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-3 md:px-10 md:py-4 bg-[#C4714A] text-white font-['DM_Sans'] text-sm md:text-base font-medium rounded-full hover:bg-[#9B4F2E] transition-colors duration-300">
              Shop Now
            </button>
            <button className="px-8 py-3 md:px-10 md:py-4 border-2 border-[#C4714A] text-[#C4714A] font-['DM_Sans'] text-sm md:text-base font-medium rounded-full hover:bg-[#C4714A] hover:text-white transition-colors duration-300">
              Our Story
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}