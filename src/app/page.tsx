import Features from "./Features";
import Hero from "./Hero";
import MainLayout from "./MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <Features />
    </MainLayout>
  );
}
