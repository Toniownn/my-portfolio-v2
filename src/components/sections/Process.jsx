import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { process } from "@/lib/data";

const Process = () => {
  return (
    <motion.section
      id="process"
      className="py-28 md:py-36 border-t border-border"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.h2
          variants={fadeInUp}
          className="font-serif font-bold text-4xl md:text-5xl uppercase text-foreground mb-16"
        >
          My Process
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {process.map((step) => (
            <motion.div key={step.number} variants={fadeInUp}>
              <span className="text-6xl md:text-7xl font-serif font-bold text-foreground/10 block mb-4">
                {step.number}
              </span>
              <h3 className="font-serif font-bold text-xl text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Process;
