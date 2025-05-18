import CTA from "./CTA";
import Features from "./Features";
import GetStarted from "./GetStarted";
import Hero from "./Hero";
import MainLayout from "./MainLayout";
import Pricing from "./Pricing";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <Features />
      <GetStarted />
      <Pricing />
      <CTA />
    </MainLayout>
  );
}
