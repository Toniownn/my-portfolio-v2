import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/data";

const ProjectCard = ({ project, index }) => {
  const isEven = index % 2 === 1;

  return (
    <motion.article
      variants={fadeInUp}
      className="bg-card hover:bg-card-hover rounded-2xl p-6 md:p-8 transition-colors duration-300"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image area */}
        <div
          className={`overflow-hidden rounded-lg ${isEven ? "md:order-2" : ""}`}
        >
          <motion.div
            className="bg-card-hover rounded-lg aspect-video w-full"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {project.image && (
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover rounded-lg"
              />
            )}
          </motion.div>
        </div>

        {/* Text area */}
        <div
          className={`flex flex-col justify-center gap-4 ${isEven ? "md:order-1" : ""}`}
        >
          <h3 className="font-serif font-bold text-2xl text-foreground">
            {project.name}
          </h3>
          <p className="text-muted-foreground font-sans text-base leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-muted-foreground border-border text-xs"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-sans border border-border rounded-full px-4 py-2 text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
              >
                GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-sans border border-border rounded-full px-4 py-2 text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
              >
                Live Demo
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const Projects = () => {
  return (
    <motion.section
      id="projects"
      className="py-28 md:py-36 border-t border-border"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div variants={fadeInUp} className="mb-12 md:mb-16">
          <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl uppercase text-foreground">
            Featured Projects
          </h2>
          <hr className="border-border mt-6" />
        </motion.div>

        {/* Project cards */}
        <div className="flex flex-col gap-8 md:gap-10">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
