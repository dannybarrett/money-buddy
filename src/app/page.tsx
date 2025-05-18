import Features from "./Features";
import GetStarted from "./GetStarted";
import Hero from "./Hero";
import MainLayout from "./MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <Features />
      <GetStarted />
    </MainLayout>
  );
}
