import Hero from "@/components/blocks/Hero";
import Marquee from "@/components/blocks/Marquee";
import PinnedHeadline from "@/components/blocks/PinnedHeadline";
import ProjectGrid from "@/components/blocks/ProjectGrid";
import About from "@/components/blocks/About";
import Contact from "@/components/blocks/Contact";

export default function Page() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 tracking-tight dark:bg-neutral-950 dark:text-neutral-100">
      <Hero />
      <Marquee />
      <PinnedHeadline />
      <ProjectGrid />
      <About />
      <Contact />
    </div>
  );
}
