import Header from "../components/landing/Header"
import Hero from "../components/landing/Hero"
import Stats from "../components/landing/Stats"

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Stats />
      </main>
    </div>
  );
}