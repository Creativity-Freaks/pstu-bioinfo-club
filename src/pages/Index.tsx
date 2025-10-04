import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import Team from "@/components/Team";
import Resources from "@/components/Resources";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Events />
      <Team />
      <Resources />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
