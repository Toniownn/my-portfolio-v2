import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/data";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    emailjs
      .send(
        "service_mo88jdb",
        "template_jemri4l",
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "sz4YUbEzRDcgIzbfX"
      )
      .then(
        () => {
          setSuccess(true);
          setFormData({ name: "", email: "", subject: "", message: "" });
          setLoading(false);
        },
        () => {
          setSuccess(false);
          setLoading(false);
        }
      );
  };

  return (
    <motion.section
      id="contact"
      className="py-28 md:py-36 border-t border-border"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Full-width dramatic heading */}
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <h2 className="font-serif font-bold italic text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-foreground leading-tight">
            LET&apos;S WORK TOGETHER
          </h2>
          <div className="border-b border-foreground/20 w-24 mx-auto my-8" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — email + socials */}
          <motion.div variants={fadeInUp}>
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-muted hover:text-foreground transition-colors duration-300 text-lg block mb-8"
            >
              {siteConfig.email}
            </a>
            <div className="flex gap-6">
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors duration-300 p-2"
                aria-label="GitHub"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors duration-300 p-2"
                aria-label="LinkedIn"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href={siteConfig.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-foreground transition-colors duration-300 p-2"
                aria-label="Twitter"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Right — contact form */}
          <motion.form
            variants={fadeInUp}
            className="flex flex-col gap-5"
            onSubmit={handleSubmit}
          >
            <Input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-card border-border text-foreground placeholder:text-muted/60 rounded-md h-12"
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="bg-card border-border text-foreground placeholder:text-muted/60 rounded-md h-12"
            />
            <Input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="bg-card border-border text-foreground placeholder:text-muted/60 rounded-md h-12"
            />
            <Textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="bg-card border-border text-foreground placeholder:text-muted/60 rounded-md resize-none"
            />
            <Button
              type="submit"
              disabled={loading}
              className="bg-foreground text-background hover:bg-foreground/80 rounded-md uppercase tracking-wider text-sm transition-all duration-300 px-8 py-6 self-start disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </Button>

            {success === true && (
              <p className="text-green-500 text-sm">Message sent successfully!</p>
            )}
            {success === false && (
              <p className="text-red-500 text-sm">Failed to send. Please try again.</p>
            )}
          </motion.form>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
