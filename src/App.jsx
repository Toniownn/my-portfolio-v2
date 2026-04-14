import { ThemeProvider } from "@/lib/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import TechStack from "@/components/sections/TechStack";
import Projects from "@/components/sections/Projects";
import Process from "@/components/sections/Process";
import Journey from "@/components/sections/Journey";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

function App() {
  return (
    <ThemeProvider>
      <main className="bg-background text-foreground min-h-screen overflow-x-hidden">
        <Navbar />
        <Hero />
        <About />
        <Services />
        <TechStack />
        <Projects />
        <Process />
        <Journey />
        <Contact />
        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default App;
