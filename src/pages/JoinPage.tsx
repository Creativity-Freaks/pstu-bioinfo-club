import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserPlus } from "lucide-react";

const JoinPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    department: "",
    year: "",
    phone: "",
    bio: "",
    skills: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("memberships").insert({
      name: formData.name,
      email: formData.email,
      student_id: formData.studentId,
      department: formData.department,
      year: formData.year,
      phone: formData.phone,
      bio: formData.bio,
      skills: formData.skills,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Application submitted", description: "We will get back to you soon." });
    setFormData({ name: "", email: "", studentId: "", department: "", year: "", phone: "", bio: "", skills: "" });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <FloatingActions />

      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-elegant">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Join PSTU Bioinformatics Club</CardTitle>
                    <p className="text-sm text-muted-foreground">Fill out the form to apply for membership.</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="studentId">Student ID *</Label>
                      <Input id="studentId" required value={formData.studentId} onChange={(e) => setFormData({ ...formData, studentId: e.target.value })} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Department *</Label>
                      <Select value={formData.department} onValueChange={(v) => setFormData({ ...formData, department: v })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="biotechnology">Biotechnology</SelectItem>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="biochemistry">Biochemistry</SelectItem>
                          <SelectItem value="microbiology">Microbiology</SelectItem>
                          <SelectItem value="genetics">Genetics</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Academic Year *</Label>
                      <Select value={formData.year} onValueChange={(v) => setFormData({ ...formData, year: v })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1st">1st Year</SelectItem>
                          <SelectItem value="2nd">2nd Year</SelectItem>
                          <SelectItem value="3rd">3rd Year</SelectItem>
                          <SelectItem value="4th">4th Year</SelectItem>
                          <SelectItem value="masters">Masters</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bio">Why do you want to join? *</Label>
                    <Textarea id="bio" required value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} className="min-h-[100px]" />
                  </div>
                  <div>
                    <Label htmlFor="skills">Your Skills (Optional)</Label>
                    <Textarea id="skills" value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} className="min-h-[80px]" />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-primary" disabled={loading}>
                    {loading ? "Submitting..." : "Submit Application"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JoinPage;
