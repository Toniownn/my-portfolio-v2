import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { skills } from "@/lib/data";

const Skills = () => {
  return (
    <motion.section
      id="skills"
      className="py-12 md:py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
          <span className="text-xs uppercase tracking-wider text-muted font-sans font-medium shrink-0">
            MY OTHER EXPERTIES
          </span>

          <motion.div
            className="flex flex-wrap gap-3"
            variants={staggerContainer}
          >
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                variants={fadeInUp}
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-sans font-bold cursor-default"
                style={{ backgroundColor: skill.color }}
                title={skill.name}
              >
                {skill.letter}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
