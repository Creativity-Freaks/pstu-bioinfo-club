import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section id="contact" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions or want to join us? We'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card className="shadow-xl animate-fade-in">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <Input
                    placeholder="Your full name"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Student ID (Optional)</label>
                  <Input
                    placeholder="Your student ID"
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <Textarea
                    placeholder="Tell us about your interest in bioinformatics..."
                    className="w-full min-h-[120px]"
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-primary hover:opacity-90" size="lg">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-gradient-primary text-white border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-white/90">Patuakhali Science and Technology University</p>
                      <p className="text-white/90">Dumki, Patuakhali-8602, Bangladesh</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-white/90">bioinfoclub@pstu.ac.bd</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-white/90">+880 1XXX-XXXXXX</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
                <div className="space-y-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=61577988400909"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-4 p-4 rounded-lg bg-muted hover:bg-muted/70 transition-colors"
                  >
                    <Facebook className="w-6 h-6 text-primary" />
                    <span className="font-medium">Facebook Page</span>
                  </a>
                  <div className="bg-gradient-to-br from-accent/10 to-secondary/10 p-6 rounded-lg border border-accent/20">
                    <h4 className="font-bold mb-2">Office Hours</h4>
                    <p className="text-sm text-muted-foreground">Monday - Friday: 2:00 PM - 5:00 PM</p>
                    <p className="text-sm text-muted-foreground">Location: Biology Department, PSTU</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
