import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Dna } from "lucide-react";
import siteLogo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import MembershipForm from "@/components/MembershipForm";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMembershipFormOpen, setIsMembershipFormOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Courses", href: "/courses" },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
    { label: "Gallery", href: "/gallery" },
    { label: "Blog", href: "/blog" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const isHomePage = location.pathname === "/";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-elegant border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-card flex items-center justify-center shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-110">
              <img src={siteLogo} alt="Bioinformatics Club Logo" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">Bioinformatics Club</h1>
              <p className="text-xs text-muted-foreground">PSTU</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={(e) => {
                  if (location.pathname === item.href) {
                    e.preventDefault();
                    // Force a hard refresh when clicking the current tab
                    window.location.reload();
                  }
                }}
                className="text-foreground hover:text-primary transition-all duration-300 font-medium relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
            <Button
              onClick={() => setIsMembershipFormOpen(true)}
              className="bg-gradient-primary hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-glow"
            >
              Join Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 bg-card/95 backdrop-blur-lg rounded-lg mt-2 shadow-elegant border border-border animate-fade-in">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={(e) => {
                  if (location.pathname === item.href) {
                    e.preventDefault();
                    window.location.reload();
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-3 text-foreground hover:bg-muted hover:text-primary transition-all duration-300 rounded-lg mx-2"
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              <Button
                onClick={() => {
                  setIsMembershipFormOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-primary hover:opacity-90 hover:scale-105 transition-all duration-300"
              >
                Join Us
              </Button>
            </div>
          </div>
        )}
      </div>

      <MembershipForm 
        open={isMembershipFormOpen} 
        onOpenChange={setIsMembershipFormOpen} 
      />
    </nav>
  );
};

export default Navigation;
