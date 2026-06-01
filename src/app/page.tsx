import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import Experience from "@/components/home/Experience";
import Hero from "@/components/home/Hero";
import Projects from "@/components/home/Projects";
import ScrollAnimationProvider from "@/components/animation/ScrollAnimationProvider";
import Skills from "@/components/home/Skills";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import BootWrapper from "@/components/terminal/BootWrapper";

export default function Home() {
  return (
    <BootWrapper>
      <Navbar />
      <ScrollAnimationProvider>
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
      </ScrollAnimationProvider>
      <Footer />
    </BootWrapper>
  );
}
