import { ModeProvider } from "@/components/hero/ModeContext";
import { HeroStage } from "@/components/hero/HeroStage";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { HeroIntro } from "@/components/sections/HeroIntro";
import { Marquee } from "@/components/sections/Marquee";
import { Statement } from "@/components/sections/Statement";
import { Products } from "@/components/sections/Products";
import { Approach } from "@/components/sections/Approach";
import { Work } from "@/components/sections/Work";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <ModeProvider>
      <span id="top" aria-hidden="true" />
      <HeroStage />
      <Nav />
      <main className="relative z-10">
        <HeroIntro />
        <Marquee />
        <Statement>We build the products we wish already existed.</Statement>
        <Products />
        <Statement tone="cream">
          Software we&apos;re proud to keep our name on.
        </Statement>
        <Approach />
        <Work />
        <Contact />
      </main>
      <Footer />
    </ModeProvider>
  );
}
