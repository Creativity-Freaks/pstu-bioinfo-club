import { Facebook, Mail, MapPin, Dna, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-card border-t border-border py-12 relative">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4 group">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
                <Dna className="w-5 h-5 text-white animate-pulse" />
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
                <a href="/workshops" className="text-sm text-muted-foreground hover:text-primary transition-colors">Workshops</a>
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

        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Bioinformatics Club PSTU. All rights reserved.
          </p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gradient-primary shadow-elegant hover:shadow-glow hover:scale-110 transition-all duration-300 z-40"
        size="icon"
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </footer>
  );
};

export default Footer;
