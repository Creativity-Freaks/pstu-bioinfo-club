import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, AlertCircle } from "lucide-react";
import FloatingActions from "@/components/FloatingActions";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted to-background relative overflow-hidden">
      <FloatingActions />
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/5 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-secondary/5 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="text-center px-4 relative z-10 animate-fade-in">
        <AlertCircle className="w-24 h-24 mx-auto mb-6 text-primary/50 animate-float" />
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-primary mb-4 animate-glow">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off into the digital wilderness.
        </p>
        <Link to="/">
          <Button size="lg" className="bg-gradient-primary hover:scale-110 transition-all duration-300 shadow-elegant hover:shadow-glow group">
            <Home className="w-5 h-5 mr-2 group-hover:animate-float" />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
