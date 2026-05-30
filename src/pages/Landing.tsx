import Header from "../components/landing/Header"
import Hero from "../components/landing/Hero"
import Stats from "../components/landing/Stats"
import Features from "../components/landing/Features"
import Pricing from "../components/landing/Pricing"
import Banner from "../components/landing/Banner"

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Pricing />
        <Banner />
      </main>
    </div>
  );
}