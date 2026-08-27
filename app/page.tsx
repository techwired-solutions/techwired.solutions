import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Capabilities } from "@/components/sections/Capabilities";
import { Ventures } from "@/components/sections/Ventures";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Capabilities />
        <Ventures />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
