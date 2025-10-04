import { Facebook, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-lg font-bold text-white">BC</span>
              </div>
              <div>
                <h3 className="font-bold">Bioinformatics Club</h3>
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
              {["About", "Events", "Team", "Resources", "Contact"].map((link) => (
                <li key={link}>
                  <button
                    onClick={() => {
                      const element = document.querySelector(`#${link.toLowerCase()}`);
                      if (element) element.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>PSTU, Dumki, Patuakhali</span>
              </div>
              <div className="flex items-start space-x-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>bioinfoclub@pstu.ac.bd</span>
              </div>
              <a
                href="https://www.facebook.com/profile.php?id=61577988400909"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="w-4 h-4" />
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
    </footer>
  );
};

export default Footer;
