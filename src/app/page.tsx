import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import BrandSection from "@/components/sections/BrandSection";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import { TracingBeam } from "@/components/ui/TracingBeam";

export default function Home() {
  return (
    <main className="relative bg-[#0a0a0c]">
      <Hero />
      <div className="relative -mt-1">
        <TracingBeam className="px-6">
          <About />
          <Projects />
          <Experience />
          <BrandSection />
          <Contact />
          <Footer />
        </TracingBeam>
      </div>
    </main>
  );
}
