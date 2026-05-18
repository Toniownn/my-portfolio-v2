import { useState, useEffect, useRef, useCallback } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { ArrowUpRight, ChevronLeft, ChevronRight, X, Code } from "lucide-react";
import { projects } from "@/lib/data";

const getImages = (project) =>
  project.images || (project.image ? [project.image] : []);

const pad2 = (n) => String(n).padStart(2, "0");

const slugDomain = (project) => {
  if (project.domain) return project.domain;
  const slug = project.name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return `${slug}.app`;
};

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
      className="relative group aspect-video bg-card-hover overflow-hidden"
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

const InlineLinks = ({ project, size = "sm" }) => {
  const isSm = size === "sm";
  return (
    <div
      className={`flex items-center ${
        isSm ? "gap-7" : "gap-8"
      } font-editorial uppercase ${
        isSm ? "text-[11px] tracking-[0.22em]" : "text-xs tracking-[0.22em]"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-foreground hover:opacity-60 transition-opacity duration-300"
        >
          Live <ArrowUpRight size={isSm ? 12 : 14} />
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-foreground hover:opacity-60 transition-opacity duration-300"
        >
          GitHub <ArrowUpRight size={isSm ? 12 : 14} />
        </a>
      )}
    </div>
  );
};

const TagPills = ({ tags, className = "" }) => (
  <div className={`flex flex-wrap gap-2 ${className}`}>
    {tags.map((tag) => (
      <span
        key={tag}
        className="text-[11px] tracking-wide px-3 py-1 border border-border rounded-full text-muted-foreground font-sans"
      >
        {tag}
      </span>
    ))}
  </div>
);

const BrowserPreview = ({ project }) => {
  const primaryTag = project.tags?.[0] || "Web";
  const year = project.year || "2025";
  const domain = slugDomain(project);
  const images = getImages(project);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group/preview relative rounded-xl overflow-hidden bg-card border border-border shadow-sm aspect-[4/3] flex flex-col"
    >
      {/* Top chrome — traffic lights + url */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border/60 shrink-0 relative z-10">
        <span
          aria-hidden="true"
          className="w-2.5 h-2.5 rounded-full bg-foreground/20"
        />
        <span
          aria-hidden="true"
          className="w-2.5 h-2.5 rounded-full bg-foreground/20"
        />
        <span
          aria-hidden="true"
          className="w-2.5 h-2.5 rounded-full bg-foreground/20"
        />
        <span className="ml-3 font-mono text-[10px] text-muted-foreground/80 tracking-wider truncate">
          {domain}
        </span>
      </div>

      {/* Image area */}
      <div className="relative flex-1 overflow-hidden bg-card-hover">
        {images.length > 0 ? (
          <img
            src={images[0]}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover/preview:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Code size={40} className="text-muted-foreground/30" />
          </div>
        )}

        {/* Bottom strip — preview meta over a soft gradient */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 px-4 pt-10 pb-3 bg-gradient-to-t from-background/85 via-background/35 to-transparent flex items-center justify-between text-[10px] tracking-[0.22em] uppercase text-foreground/85 font-editorial">
          <span>Preview · {primaryTag}</span>
          <span>{year}</span>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCard = ({ project, index, onClick }) => {
  const isEven = index % 2 === 1;
  const indexLabel = pad2(index + 1);
  const year = project.year || "2025";
  const category = project.category || "Personal";

  return (
    <motion.article
      variants={fadeInUp}
      className="group cursor-pointer"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* Preview frame */}
        <div className={isEven ? "md:order-2" : ""}>
          <BrowserPreview project={project} indexLabel={indexLabel} />
        </div>

        {/* Text */}
        <div className={isEven ? "md:order-1" : ""}>
          <span className="font-editorial text-[11px] md:text-xs tracking-[0.22em] uppercase text-muted-foreground block mb-5">
            Project {indexLabel} / {year} · {category}
          </span>

          <h3 className="font-serif italic font-bold text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.05] mb-5">
            {project.name}
            <span className="not-italic text-foreground">.</span>
          </h3>

          <p className="text-muted-foreground font-sans text-sm md:text-base leading-relaxed mb-7 max-w-md line-clamp-3">
            {project.description}
          </p>

          <TagPills tags={project.tags} className="mb-7" />

          <InlineLinks project={project} size="sm" />
        </div>
      </div>
    </motion.article>
  );
};

const CompactProjectCard = ({ project, index, onClick }) => {
  const indexLabel = pad2(index + 1);
  const year = project.year || "2025";
  const category = project.category || "Personal";

  return (
    <div
      className="group cursor-pointer"
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
      <div className="mb-5">
        <BrowserPreview project={project} indexLabel={indexLabel} />
      </div>

      <span className="font-editorial text-[11px] tracking-[0.22em] uppercase text-muted-foreground block mb-3">
        Project {indexLabel} / {year} · {category}
      </span>
      <h3 className="font-serif italic font-bold text-2xl md:text-3xl leading-tight text-foreground mb-3 group-hover:text-foreground/80 transition-colors duration-300">
        {project.name}
        <span className="not-italic text-foreground">.</span>
      </h3>
      <p className="text-muted-foreground font-sans text-sm leading-relaxed line-clamp-2 mb-4">
        {project.description}
      </p>
      <TagPills tags={project.tags} className="mb-5" />
      <InlineLinks project={project} size="sm" />
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
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
              {/* Editorial modal header — mirrors main section */}
              <div className="mb-14 md:mb-20">
                <div className="flex items-start justify-between mb-6">
                  <span className="font-editorial italic text-xs md:text-sm tracking-[0.22em] uppercase text-muted-foreground">
                    (The Archive)
                  </span>
                  <button
                    onClick={onClose}
                    className="group/close inline-flex items-center gap-2 font-editorial text-xs md:text-sm uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition-colors duration-300"
                    aria-label="Close modal"
                  >
                    <span>Close</span>
                    <X
                      size={14}
                      className="transition-transform duration-300 group-hover/close:rotate-90"
                    />
                  </button>
                </div>

                <h2 className="font-serif font-bold uppercase text-foreground leading-[1.02] text-4xl md:text-6xl lg:text-7xl">
                  All <span className="italic font-light">Projects</span>
                </h2>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                  <div
                    className="hidden md:block md:col-span-6 lg:col-span-7 h-px bg-border"
                    aria-hidden="true"
                  />
                  <p className="md:col-span-6 lg:col-span-5 text-muted-foreground font-sans text-sm md:text-base leading-relaxed max-w-md md:ml-auto md:text-right">
                    Every build, from first React experiment to recent
                    full-stack work — {pad2(projects.length)} projects in total.
                  </p>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-14 gap-y-20">
                {projects.map((project, i) => (
                  <CompactProjectCard
                    key={project.name}
                    project={project}
                    index={i}
                    onClick={() => {
                      onProjectClick(i);
                      onClose();
                    }}
                  />
                ))}
              </div>

              {/* Editorial closer */}
              <div className="mt-24 md:mt-32 pt-10 border-t border-border flex items-center justify-between">
                <span className="font-editorial italic text-xs md:text-sm tracking-[0.22em] uppercase text-muted-foreground">
                  (End of Archive — {pad2(projects.length)} / {pad2(projects.length)})
                </span>
                <button
                  onClick={onClose}
                  className="group/back inline-flex items-center gap-2 font-editorial text-xs md:text-sm uppercase tracking-[0.22em] text-foreground border-b border-foreground/40 pb-1 hover:border-foreground transition-colors duration-300"
                >
                  <ChevronLeft
                    size={14}
                    className="transition-transform duration-300 group-hover/back:-translate-x-0.5"
                  />
                  Back to Featured
                </button>
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
  const year = project?.year || "2025";
  const category = project?.category || "Personal";

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
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
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
                  <span className="font-editorial italic text-xs tracking-[0.22em] uppercase text-muted-foreground">
                    ({pad2(projectIndex + 1)} / {pad2(projects.length)})
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

              {/* Title block */}
              <div className="mb-10">
                <span className="font-editorial text-[11px] md:text-xs tracking-[0.22em] uppercase text-muted-foreground block mb-4">
                  Project {pad2(projectIndex + 1)} / {year} · {category}
                </span>
                <h2 className="font-serif italic font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-foreground">
                  {project.name}
                  <span className="not-italic text-foreground">.</span>
                </h2>
              </div>

              {/* Carousel */}
              {images.length > 0 && (
                <div className="mb-12 rounded-xl overflow-hidden border border-border">
                  <ImageCarousel images={images} alt={project.name} />
                </div>
              )}

              {/* Project info */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                <div className="md:col-span-4 flex flex-col gap-8">
                  <div>
                    <span className="font-editorial italic text-[11px] tracking-[0.22em] uppercase text-muted-foreground block mb-3">
                      (Technologies)
                    </span>
                    <TagPills tags={project.tags} />
                  </div>

                  <div>
                    <span className="font-editorial italic text-[11px] tracking-[0.22em] uppercase text-muted-foreground block mb-3">
                      (Links)
                    </span>
                    <InlineLinks project={project} size="md" />
                  </div>
                </div>

                <div className="md:col-span-8">
                  <span className="font-editorial italic text-[11px] tracking-[0.22em] uppercase text-muted-foreground block mb-3">
                    (Overview)
                  </span>
                  <p className="text-foreground/85 font-sans text-base md:text-lg leading-relaxed">
                    {project.description}
                  </p>
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
  const featured = projects.slice(0, 3);

  return (
    <>
      <motion.section
        id="projects"
        className="relative py-28 md:py-36 border-t border-border overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          {/* Editorial section header */}
          <motion.div variants={fadeInUp} className="mb-16 md:mb-24">
            <div className="flex items-start justify-between mb-6">
              <span className="font-editorial italic text-xs md:text-sm tracking-[0.22em] uppercase text-muted-foreground">
                (Selected Work)
              </span>
              <span className="font-editorial italic text-xs md:text-sm tracking-[0.22em] uppercase text-muted-foreground">
                ({pad2(featured.length)} / {pad2(projects.length)})
              </span>
            </div>

            <h2 className="font-serif font-bold uppercase text-foreground leading-[1.02] text-4xl md:text-6xl lg:text-7xl">
              Featured <span className="italic font-light">Projects</span>
            </h2>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
              <div
                className="hidden md:block md:col-span-6 lg:col-span-7 h-px bg-border"
                aria-hidden="true"
              />
              <p className="md:col-span-6 lg:col-span-5 text-muted-foreground font-sans text-sm md:text-base leading-relaxed max-w-md md:ml-auto md:text-right">
                A curated selection of recent builds — from polished UI
                experiments to full-stack production applications.
              </p>
            </div>
          </motion.div>

          {/* Project cards — browser-frame previews, alternating */}
          <div className="flex flex-col gap-20 md:gap-28">
            {featured.map((project, i) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={i}
                onClick={() => setDetailIndex(i)}
              />
            ))}
          </div>

          {/* View all — editorial link style */}
          {projects.length > featured.length && (
            <motion.div
              variants={fadeInUp}
              className="mt-24 md:mt-32 pt-10 border-t border-border flex flex-col md:flex-row md:items-end md:justify-between gap-6"
            >
              <div>
                <span className="font-editorial italic text-xs tracking-[0.22em] uppercase text-muted-foreground block mb-3">
                  (The Archive)
                </span>
                <p className="font-serif italic text-2xl md:text-3xl text-foreground leading-tight max-w-md">
                  Explore the full collection of {pad2(projects.length)}{" "}
                  projects.
                </p>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-3 font-editorial text-sm uppercase tracking-[0.22em] text-foreground border-b border-foreground/40 pb-2 hover:border-foreground transition-colors duration-300 self-start md:self-end"
              >
                View All Projects
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
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
