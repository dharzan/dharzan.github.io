import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectSection";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#121212] ">
      <div className="container mx-auto px-12 py-4">
        <HeroSection />
        <ProjectsSection/>
      </div>
    </main>
  );
}
