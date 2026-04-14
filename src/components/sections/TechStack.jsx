import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { skills } from "@/lib/data";
import {
  SiReact, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss,
  SiNodedotjs, SiExpress, SiSpringboot,
  SiFlutter, SiDart,
  SiMongodb, SiMysql, SiPostgresql,
  SiJavascript, SiTypescript,
  SiGit, SiGithub, SiFigma,
} from "react-icons/si";

const iconMap = {
  SiReact, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss,
  SiNodedotjs, SiExpress, SiSpringboot,
  SiFlutter, SiDart,
  SiMongodb, SiMysql, SiPostgresql,
  SiJavascript, SiTypescript,
  SiGit, SiGithub, SiFigma,
};

const SkillItem = ({ skill }) => {
  const Icon = iconMap[skill.icon];
  return (
    <div
      className="flex flex-col items-center gap-2 px-6 md:px-8 shrink-0 cursor-default"
      title={skill.name}
    >
      {Icon && <Icon size={32} style={{ color: skill.color }} />}
      <span className="text-muted-foreground font-sans text-xs whitespace-nowrap">
        {skill.name}
      </span>
    </div>
  );
};

const TechStack = () => {
  return (
    <motion.section
      id="skills"
      className="py-12 md:py-16 border-t border-b border-border"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
    >
      <p className="text-center font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
        Technologies
      </p>

      <div className="overflow-hidden scrollbar-hide">
        <div className="marquee-track">
          {/* First copy */}
          {skills.map((skill) => (
            <SkillItem key={`a-${skill.name}`} skill={skill} />
          ))}
          {/* Duplicate for seamless loop */}
          {skills.map((skill) => (
            <SkillItem key={`b-${skill.name}`} skill={skill} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default TechStack;
