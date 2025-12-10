import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Mail, Phone, Github, Facebook, Linkedin, ArrowUp } from "lucide-react";

const actions = [
  { icon: MessageSquare, label: "Chat", href: "#contact" },
  { icon: Mail, label: "Email", href: "mailto:info@bioinfo.pstu.edu" },
  { icon: Phone, label: "Call", href: "tel:+8801000000000" },
  { icon: Github, label: "GitHub", href: "https://github.com/Creativity-Freaks/pstu-bioinfo-club" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

const FloatingActions = () => {
  const [showActions, setShowActions] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      setShowActions(y > 200);
      setShowScrollTop(y > 400);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div
        className={
          "fixed right-4 md:right-6 top-1/4 z-50 flex flex-col gap-3 transition-opacity duration-300" +
          (showActions ? " opacity-100 pointer-events-auto" : " opacity-0 pointer-events-none")
        }
      >
        {actions.map(({ icon: Icon, label, href }, i) => (
          <a
            key={i}
            href={href}
            aria-label={label}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            <Button
              variant="secondary"
              className="rounded-full w-12 h-12 p-0 shadow-elegant hover:shadow-glow bg-card text-foreground hover:scale-105 transition-transform"
            >
              <Icon className="w-5 h-5" />
            </Button>
          </a>
        ))}
      </div>

      <div
        className={
          "fixed right-4 md:right-6 bottom-6 z-50 transition-opacity duration-300" +
          (showScrollTop ? " opacity-100 pointer-events-auto" : " opacity-0 pointer-events-none")
        }
      >
        <Button
          onClick={scrollToTop}
          className="rounded-full w-12 h-12 p-0 bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-elegant hover:shadow-glow hover:scale-105 transition-transform"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </div>
    </>
  );
};

export default FloatingActions;
