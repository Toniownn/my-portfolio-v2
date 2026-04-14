import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { experiences, stats, pullQuote } from "@/lib/data";

const AnimatedNumber = ({ value }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const numericPart = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      animate(motionVal, numericPart, {
        duration: 1.8,
        ease: "easeOut",
      });
    }
  }, [isInView, motionVal, numericPart]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (ref.current) {
        ref.current.textContent = `${v}${suffix}`;
      }
    });
    return unsubscribe;
  }, [rounded, suffix]);

  return <span ref={ref}>0{suffix}</span>;
};

const Journey = () => {
  return (
    <motion.section
      id="journey"
      className="py-28 md:py-36 border-t border-border"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Part A: Pull Quote + Stats */}
        <motion.div variants={fadeInUp} className="text-center mb-20">
          <blockquote className="font-serif font-bold italic text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight max-w-4xl mx-auto">
            &ldquo;{pullQuote}&rdquo;
          </blockquote>

          {/* Accent line */}
          <div className="border-b border-foreground/20 w-16 mx-auto my-10" />

          {/* Stats row */}
          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeInUp} className="text-center">
                <span className="font-serif font-bold text-4xl md:text-5xl text-foreground block">
                  <AnimatedNumber value={stat.number} />
                </span>
                <span className="text-xs uppercase tracking-widest text-muted mt-2 block">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Part B: Experience Timeline */}
        <motion.div variants={staggerContainer} className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 md:left-[7.5rem] top-0 bottom-0 w-px bg-border" />

          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.role + exp.company}
              variants={fadeInUp}
              className={`relative flex flex-col md:flex-row gap-4 md:gap-10 ${
                idx !== experiences.length - 1 ? "pb-12 md:pb-16" : ""
              }`}
            >
              {/* Dot */}
              <div className="absolute left-3 md:left-[7.5rem] top-1.5 w-2.5 h-2.5 -translate-x-1/2 rounded-full bg-foreground ring-4 ring-background z-10" />

              {/* Date — left of line on md+ */}
              <div className="pl-8 md:pl-0 md:w-24 md:text-right md:pt-0 shrink-0">
                <span className="text-xs text-muted font-mono tracking-wide">
                  {exp.year}
                </span>
              </div>

              {/* Content — right of line */}
              <div className="pl-8 md:pl-12 flex-1">
                <h3 className="font-serif font-bold text-xl text-foreground leading-tight">
                  {exp.role}
                </h3>
                <p className="text-sm text-muted mt-0.5">{exp.company}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-3 py-1 rounded-full border border-border text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bullets */}
                <ul className="mt-4 space-y-2.5">
                  {exp.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted leading-relaxed flex gap-2"
                    >
                      <span className="text-foreground/40 mt-1 shrink-0">•</span>
                      <span dangerouslySetInnerHTML={{ __html: bullet }} />
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Journey;
