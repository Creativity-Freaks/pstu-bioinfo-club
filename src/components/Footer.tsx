import { useEffect, useState } from "react";
import { Facebook, Mail, MapPin, Dna, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setShowScrollTop(y > 400);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer className="bg-gradient-card border-t border-border py-12 relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4 group">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-card flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                <img src="/public/BIOINFORMATICS CLUB.png" alt="Bioinformatics Club Logo" className="w-8 h-8 object-contain" />
              </div>
              <div>
                <h3 className="font-bold group-hover:text-primary transition-colors">Bioinformatics Club</h3>
                <p className="text-sm text-muted-foreground">PSTU</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Empowering students to explore the fascinating world of bioinformatics through 
              education, collaboration, and innovation.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</a>
              </li>
              <li>
                <a href="/events" className="text-sm text-muted-foreground hover:text-primary transition-colors">Events</a>
              </li>
              <li>
                <a href="/team" className="text-sm text-muted-foreground hover:text-primary transition-colors">Team</a>
              </li>
              <li>
                <a href="/gallery" className="text-sm text-muted-foreground hover:text-primary transition-colors">Gallery</a>
              </li>
              <li>
                <a href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Programs</h4>
            <ul className="space-y-2">
              <li>
                <a href="/courses" className="text-sm text-muted-foreground hover:text-primary transition-colors">Courses</a>
              </li>
              <li>
                <a href="/mentorship" className="text-sm text-muted-foreground hover:text-primary transition-colors">Mentorship</a>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.querySelector('#resources');
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Resources
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.querySelector('#faq');
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">About</h4>
            <ul className="space-y-2">
              <li>
                <a href="/founding" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Story</a>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.querySelector('#contact');
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
            <div className="mt-6 space-y-3">
              <div className="flex items-start space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors group cursor-pointer">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:animate-float" />
                <span>PSTU, Dumki, Patuakhali</span>
              </div>
              <div className="flex items-start space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors group cursor-pointer">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 group-hover:animate-float" />
                <span>bioinfoclub@pstu.ac.bd</span>
              </div>
              <a
                href="https://www.facebook.com/profile.php?id=61577988400909"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-all duration-300 group"
              >
                <Facebook className="w-4 h-4 group-hover:scale-125 transition-transform" />
                <span>Follow us on Facebook</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="mx-auto flex flex-wrap items-center justify-center gap-3 text-center text-sm text-muted-foreground">
            <span>All rights reserved © {currentYear} Bioinformatics Club PSTU.</span>
            <span className="hidden md:inline">•</span>
            <span className="md:hidden">|</span>
            <span className="inline-flex items-center gap-2">
              <span className="uppercase tracking-wider text-primary/80">Designed & Developed by</span>
              <a
                href="https://cftechlab.hcsarker.me"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-gradient-primary text-primary-foreground font-semibold hover:opacity-90 transition-transform"
              >
                <span className="leading-none">CF TechLab</span>
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* Scroll to Top handled by FloatingActions; footer button removed to avoid duplication */}
    </footer>
  );
};

export default Footer;
