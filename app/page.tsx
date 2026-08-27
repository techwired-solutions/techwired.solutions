import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Statement } from "@/components/sections/Statement";
import { Products } from "@/components/sections/Products";
import { Approach } from "@/components/sections/Approach";
import { Work } from "@/components/sections/Work";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <span id="top" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Products />
        <Statement>We build the products we wish already existed.</Statement>
        <Approach />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
