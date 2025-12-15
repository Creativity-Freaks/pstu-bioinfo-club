import Navigation from "@/components/Navigation";
import HeroPreview from "@/components/HeroPreview";
import AboutPreview from "@/components/AboutPreview";
import EventsPreview from "@/components/EventsPreview";
import CoursesPreview from "@/components/CoursesPreview";
import TeamPreview from "@/components/TeamPreview";
import Testimonials from "@/components/Testimonials";
import Advisors from "@/components/Advisors";
import Resources from "@/components/Resources";
import Partners from "@/components/Partners";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <FloatingActions />
      <HeroPreview />
      <AboutPreview />
      <EventsPreview />
      <CoursesPreview />
      <Advisors />
      <TeamPreview />
      <Testimonials />
      <Resources />
      <Partners />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
