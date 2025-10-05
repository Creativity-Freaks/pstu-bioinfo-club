import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">BC</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Bioinformatics Club</h1>
              <p className="text-xs text-muted-foreground">PSTU</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
            {isHomePage ? (
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-gradient-primary hover:opacity-90"
              >
                Join Us
              </Button>
            ) : (
              <Link to="/#contact">
                <Button className="bg-gradient-primary hover:opacity-90">
                  Join Us
                </Button>
              </Link>
            )}
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
          <div className="md:hidden py-4 bg-card rounded-lg mt-2 shadow-xl">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-3 text-foreground hover:bg-muted transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 pt-2">
              {isHomePage ? (
                <Button
                  onClick={() => {
                    scrollToSection("contact");
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-primary hover:opacity-90"
                >
                  Join Us
                </Button>
              ) : (
                <Link to="/#contact">
                  <Button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full bg-gradient-primary hover:opacity-90"
                  >
                    Join Us
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
