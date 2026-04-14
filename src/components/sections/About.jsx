import { motion } from "framer-motion";
import { fadeInUp, fadeInLeft, fadeInRight } from "@/lib/animations";
import { siteConfig } from "@/lib/data";

const About = () => {
  return (
    <motion.section
      id="about"
      className="py-28 md:py-36 lg:py-44 border-t border-border"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row lg:items-start gap-16 lg:gap-24">
          {/* Left column — Editorial heading + accent line */}
          <motion.div className="lg:w-[55%] shrink-0" variants={fadeInLeft}>
            <h2 className="font-serif font-bold italic text-3xl md:text-4xl lg:text-5xl uppercase leading-[1.25] text-foreground tracking-wide">
              {siteConfig.heroHeadline}
            </h2>

            {/* Thin horizontal accent line */}
            <div
              className="mt-8 w-16 border-b border-foreground/20"
              aria-hidden="true"
            />
          </motion.div>

          {/* Right column — Description + Button */}
          <motion.div
            className="lg:w-[45%] flex flex-col justify-start lg:pt-2"
            variants={fadeInRight}
          >
            <p className="text-muted text-base leading-relaxed mb-10 max-w-md">
              {siteConfig.description}
            </p>
            <div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center uppercase tracking-wider text-sm border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 px-8 py-3"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default About;
