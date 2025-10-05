import Navigation from "@/components/Navigation";
import HeroPreview from "@/components/HeroPreview";
import AboutPreview from "@/components/AboutPreview";
import EventsPreview from "@/components/EventsPreview";
import TeamPreview from "@/components/TeamPreview";
import Resources from "@/components/Resources";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroPreview />
      <AboutPreview />
      <EventsPreview />
      <TeamPreview />
      <Resources />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
