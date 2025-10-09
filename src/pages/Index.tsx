import Navigation from "@/components/Navigation";
import HeroPreview from "@/components/HeroPreview";
import AboutPreview from "@/components/AboutPreview";
import EventsPreview from "@/components/EventsPreview";
import WorkshopsPreview from "@/components/WorkshopsPreview";
import CoursesPreview from "@/components/CoursesPreview";
import TeamPreview from "@/components/TeamPreview";
import Resources from "@/components/Resources";
import Partners from "@/components/Partners";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroPreview />
      <AboutPreview />
      <EventsPreview />
      <WorkshopsPreview />
      <CoursesPreview />
      <TeamPreview />
      <Resources />
      <Partners />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
