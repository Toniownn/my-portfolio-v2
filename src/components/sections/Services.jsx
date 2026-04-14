import { motion } from "framer-motion";
import { Code, Palette, Smartphone, Globe } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { services } from "@/lib/data";

const iconMap = {
  Code,
  Palette,
  Smartphone,
  Globe,
};

const ServiceCard = ({ service }) => {
  const Icon = iconMap[service.icon] || Code;

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6 }}
      className="bg-card rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group"
    >
      {/* Icon area */}
      <div className="h-36 flex items-center justify-center bg-gradient-to-br from-card-hover/60 to-card">
        <div className="w-16 h-16 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon size={28} className="text-foreground/60 group-hover:text-foreground transition-colors duration-300" strokeWidth={1.5} />
        </div>
      </div>

      {/* Card content */}
      <div className="p-6">
        <span className="text-xs text-muted font-sans tracking-wider uppercase block mb-4">
          {service.number}
        </span>
        <h3 className="font-serif font-bold text-xl text-foreground mb-3">
          {service.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-6">
          {service.description}
        </p>
        <a
          href="#contact"
          className="text-sm uppercase tracking-wider text-foreground hover:text-muted transition-colors duration-300"
        >
          Learn More
        </a>
      </div>
    </motion.div>
  );
};

const Services = () => {
  return (
    <motion.section
      id="services"
      className="py-28 md:py-36 border-t border-border"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.h2
          variants={fadeInUp}
          className="font-serif font-bold text-4xl md:text-5xl uppercase text-foreground mb-12 md:mb-16"
        >
          Services
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.number} service={service} />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Services;
