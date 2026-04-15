import { useState, useEffect, useRef, useCallback } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ChevronLeft, ChevronRight, X, Code } from "lucide-react";
import { projects } from "@/lib/data";

const getImages = (project) =>
  project.images || (project.image ? [project.image] : []);

const ImageCarousel = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);
  const hasMultiple = images.length > 1;

  const advanceNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const resetTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (hasMultiple && !isPaused) {
      intervalRef.current = setInterval(advanceNext, 4000);
    }
  }, [hasMultiple, isPaused, advanceNext]);

  // Auto-advance effect
  useEffect(() => {
    resetTimer();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [resetTimer]);

  const goTo = (index) => {
    setCurrentIndex(index);
    resetTimer();
  };
  const goPrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    resetTimer();
  };
  const goNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    resetTimer();
  };

  const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext(e);
      else goPrev(e);
    }
    setTouchStart(null);
  };

  return (
    <div
      className="relative group aspect-video bg-card-hover rounded-lg overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${alt} - image ${currentIndex + 1}`}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>

        {hasMultiple && (
          <>
            {/* Arrows */}
            <button
              onClick={goPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background/90 text-foreground rounded-full p-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/70 hover:bg-background/90 text-foreground rounded-full p-1.5 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    goTo(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? "w-4 bg-foreground"
                      : "w-1.5 bg-foreground/50 hover:bg-foreground/75"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
    </div>
  );
};

const ProjectCard = ({ project, index, onClick }) => {
  const isEven = index % 2 === 1;
  const images = getImages(project);

  return (
    <motion.article
      variants={fadeInUp}
      className="bg-card hover:bg-card-hover rounded-2xl p-6 md:p-8 transition-colors duration-300 cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image area */}
        <div
          className={`overflow-hidden rounded-lg ${isEven ? "md:order-2" : ""}`}
        >
          <motion.div
            className="rounded-lg w-full"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {images.length > 0 ? (
              <ImageCarousel images={images} alt={project.name} />
            ) : (
              <div className="bg-card-hover rounded-lg aspect-video w-full flex items-center justify-center">
                <Code size={40} className="text-muted-foreground/30" />
              </div>
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
          <div
            className="flex flex-wrap gap-3 pt-2"
            onClick={(e) => e.stopPropagation()}
          >
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

const CompactProjectCard = ({ project, onClick }) => {
  const images = getImages(project);

  return (
    <div
      className="bg-card hover:bg-card-hover rounded-xl p-5 transition-colors duration-300 cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="overflow-hidden rounded-lg mb-4">
        {images.length > 0 ? (
          <img
            src={images[0]}
            alt={project.name}
            className="w-full aspect-video object-cover rounded-lg"
          />
        ) : (
          <div className="w-full aspect-video rounded-lg bg-card-hover flex items-center justify-center">
            <Code size={32} className="text-muted-foreground/30" />
          </div>
        )}
      </div>
      <h3 className="font-serif font-bold text-lg text-foreground mb-2">
        {project.name}
      </h3>
      <p className="text-muted-foreground font-sans text-sm leading-relaxed line-clamp-2 mb-3">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-4">
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
      <div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-sans border border-border rounded-full px-3 py-1.5 text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            GitHub
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-sans border border-border rounded-full px-3 py-1.5 text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
          >
            Live Demo
            <ArrowUpRight size={12} />
          </a>
        )}
      </div>
    </div>
  );
};

const ProjectsModal = ({ isOpen, onClose, onProjectClick }) => {
  useEffect(() => {
    if (!isOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-5xl mx-auto px-4 md:px-6 py-16">
              {/* Header */}
              <div className="flex items-center justify-between mb-10">
                <h2 className="font-serif font-bold text-2xl md:text-3xl uppercase text-foreground">
                  All Projects
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors duration-300"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((project, i) => (
                  <CompactProjectCard
                    key={project.name}
                    project={project}
                    onClick={() => {
                      onProjectClick(i);
                      onClose();
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ProjectDetailModal = ({ projectIndex, onClose, onNavigate }) => {
  const isOpen = projectIndex !== null;
  const project = isOpen ? projects[projectIndex] : null;

  useEffect(() => {
    if (!isOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && projectIndex > 0)
        onNavigate(projectIndex - 1);
      if (e.key === "ArrowRight" && projectIndex < projects.length - 1)
        onNavigate(projectIndex + 1);
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", handleKey);
    };
  }, [isOpen, projectIndex, onClose, onNavigate]);

  const images = project ? getImages(project) : [];

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
              {/* Top bar: nav + close */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      projectIndex > 0 && onNavigate(projectIndex - 1)
                    }
                    disabled={projectIndex === 0}
                    className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Previous project"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="text-muted-foreground text-sm font-sans">
                    {projectIndex + 1} / {projects.length}
                  </span>
                  <button
                    onClick={() =>
                      projectIndex < projects.length - 1 &&
                      onNavigate(projectIndex + 1)
                    }
                    disabled={projectIndex === projects.length - 1}
                    className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Next project"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors duration-300"
                  aria-label="Close project details"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Image carousel — large */}
              {images.length > 0 && (
                <div className="mb-8">
                  <ImageCarousel images={images} alt={project.name} />
                </div>
              )}

              {/* Project info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left: title + links */}
                <div className="md:col-span-1 flex flex-col gap-4">
                  <h2 className="font-serif font-bold text-3xl md:text-4xl text-foreground">
                    {project.name}
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-sans border border-border rounded-full px-5 py-2.5 text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                      >
                        GitHub
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-sans border border-border rounded-full px-5 py-2.5 text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                      >
                        Live Demo
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Right: description + tags */}
                <div className="md:col-span-2 flex flex-col gap-5">
                  <p className="text-muted-foreground font-sans text-base md:text-lg leading-relaxed">
                    {project.description}
                  </p>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-muted-foreground font-sans mb-2 block">
                      Technologies
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-foreground border-border text-sm px-3 py-1"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Projects = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [detailIndex, setDetailIndex] = useState(null);

  return (
    <>
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

          {/* Project cards — show first 3 */}
          <div className="flex flex-col gap-8 md:gap-10">
            {projects.slice(0, 3).map((project, i) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={i}
                onClick={() => setDetailIndex(i)}
              />
            ))}
          </div>

          {/* View All button — only when more than 3 projects */}
          {projects.length > 3 && (
            <motion.div variants={fadeInUp} className="mt-10 text-center">
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 font-sans text-sm uppercase tracking-wider border border-foreground rounded-full px-8 py-3 text-foreground hover:bg-foreground hover:text-background transition-all duration-300"
              >
                View All Projects
                <ArrowUpRight size={16} />
              </button>
            </motion.div>
          )}
        </div>
      </motion.section>

      <ProjectsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onProjectClick={(i) => setDetailIndex(i)}
      />
      <ProjectDetailModal
        projectIndex={detailIndex}
        onClose={() => setDetailIndex(null)}
        onNavigate={(i) => setDetailIndex(i)}
      />
    </>
  );
};

export default Projects;
