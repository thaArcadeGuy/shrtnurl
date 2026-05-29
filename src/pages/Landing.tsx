import Header from "../components/landing/Header"
import Hero from "../components/landing/Hero"

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
      </main>
    </div>
  );
}