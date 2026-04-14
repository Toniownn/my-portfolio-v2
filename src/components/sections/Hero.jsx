import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import { heroLabels } from "@/lib/data";
import heroImage from "@/assets/images/me.png";

const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-[100svh]"
      style={{ backgroundColor: "var(--hero-bg)" }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative w-full h-[100svh]"
      >
        {/* ── Hero Image ── */}
        <motion.div
          variants={fadeUp}
          className="absolute z-10 left-1/2 -translate-x-1/2 w-[55%] sm:w-[38%] md:w-[28%] lg:w-[20%] top-[22%] sm:top-[26%] md:top-[32%] lg:top-[38%] bottom-[10%] sm:bottom-[8%] md:bottom-0"
          style={{
            maxWidth: 320,
            maskImage: `
              linear-gradient(to bottom, transparent 5%, black 22%, black 92%, transparent 100%),
              linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)
            `,
            maskComposite: "intersect",
            WebkitMaskImage: `
              linear-gradient(to bottom, transparent 5%, black 22%, black 92%, transparent 100%),
              linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)
            `,
            WebkitMaskComposite: "destination-in",
          }}
        >
          <img
            src={heroImage}
            alt="Carl Anthony Dayoc"
            className="w-full h-full object-cover object-top block"
          />
        </motion.div>

        {/* ── Name + Subtitle (z-20) ── */}
        <motion.div
          variants={fade}
          className="absolute inset-x-0 z-20 pointer-events-none flex flex-col items-center text-center px-4"
          style={{ top: "clamp(8%, 10vw, 12%)" }}
        >
          <h1
            className="font-condensed font-extralight uppercase hero-heading"
            style={{
              fontSize: "clamp(2.8rem, 8vw, 8rem)",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
            }}
          >
            <span className="block">CARL ANTHONY</span>
            <span className="block">DAYOC</span>
          </h1>

          <span
            className="font-condensed font-extralight uppercase hero-heading mt-2"
            style={{
              fontSize: "clamp(1.4rem, 3.5vw, 3.2rem)",
              lineHeight: 1,
              letterSpacing: "0.04em",
            }}
          >
            {heroLabels.subtitle}
          </span>
        </motion.div>

        {/* ── Corner & Edge Labels (z-30) ── */}
        <div className="absolute inset-0 z-30 max-w-[1400px] mx-auto px-6 md:px-10">
          {/* Top-left: (FULL-STACK) */}
          <motion.span
            variants={fade}
            className="absolute top-[10%] left-6 md:left-10 font-editorial text-[11px] md:text-[13px] tracking-[0.15em] uppercase hero-label hidden sm:inline"
          >
            {heroLabels.topLeft}
          </motion.span>

          {/* Top-right: (AVAILABLE FOR HIRE) */}
          <motion.span
            variants={fade}
            className="absolute top-[10%] right-6 md:right-10 font-editorial text-[13px] tracking-[0.15em] uppercase hero-label hidden sm:inline"
          >
            {heroLabels.topRight}
          </motion.span>

          {/* Center-right: tagline */}
          <motion.div
            variants={fade}
            className="absolute right-6 md:right-10 text-right hidden md:block font-editorial text-[15px] italic tracking-[0.05em] hero-label-strong leading-relaxed"
            style={{ top: "38%" }}
          >
            {heroLabels.centerRight.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </motion.div>

          {/* Bottom-left: description */}
          <motion.div
            variants={fade}
            className="absolute bottom-[12%] left-6 md:left-10 max-w-[320px] hidden md:block font-editorial text-[13px] italic tracking-[0.05em] hero-label leading-[1.7]"
          >
            {heroLabels.bottomLeft.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </motion.div>

          {/* Bottom-right: stack + CTA */}
          <motion.div
            variants={fade}
            className="absolute bottom-[10%] right-6 md:right-10 hidden md:flex flex-col items-end gap-5"
          >
            <div className="text-right leading-[1.9]">
              <div className="font-editorial text-[12px] tracking-[0.18em] uppercase hero-label-muted mb-1">
                {heroLabels.stackLabel}
              </div>
              {heroLabels.stackItems.map((item) => (
                <div
                  key={item}
                  className="font-editorial text-[12px] tracking-[0.12em] uppercase hero-label-strong"
                >
                  {item}
                </div>
              ))}
            </div>

            {/* CTA pill button */}
            <a
              href={heroLabels.cta.href}
              className="hero-cta flex items-center gap-3 rounded-full pl-5 pr-1.5 py-1.5 group transition-all duration-300"
            >
              <span className="font-editorial text-[12px] tracking-[0.15em] uppercase hero-label-strong group-hover:opacity-100 transition-colors">
                {heroLabels.cta.text}
              </span>
              <span className="hero-cta-icon w-8 h-8 rounded-full flex items-center justify-center transition-all">
                <ArrowDownRight size={14} />
              </span>
            </a>
          </motion.div>

          {/* Mobile CTA — centered bottom, above image */}
          <motion.div
            variants={fade}
            className="absolute bottom-[3%] left-0 right-0 z-40 flex justify-center md:hidden"
          >
            <a
              href={heroLabels.cta.href}
              className="hero-cta flex items-center gap-3 rounded-full pl-5 pr-1.5 py-1.5 group transition-all duration-300"
            >
              <span className="font-editorial text-[12px] tracking-[0.15em] uppercase hero-label-strong group-hover:opacity-100 transition-colors">
                {heroLabels.cta.text}
              </span>
              <span className="hero-cta-icon w-8 h-8 rounded-full flex items-center justify-center transition-all">
                <ArrowDownRight size={14} />
              </span>
            </a>
          </motion.div>

          {/* Scroll indicator — subtle, bottom-left */}
          <motion.div
            variants={fade}
            className="absolute bottom-[4%] left-6 md:left-10 hidden md:flex flex-col items-center gap-2"
          >
            <span className="font-editorial text-[10px] tracking-[0.2em] uppercase hero-label-muted">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="1" height="36" viewBox="0 0 1 36" className="hero-label-muted">
                <line x1="0.5" y1="0" x2="0.5" y2="36" stroke="currentColor" strokeWidth="1" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
