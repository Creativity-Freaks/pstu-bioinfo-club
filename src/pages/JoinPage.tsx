import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserPlus } from "lucide-react";
import { uploadMembershipPhoto } from "@/lib/membershipPhoto";

const JoinPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string>("");
  const [selectedPhotoFile, setSelectedPhotoFile] = useState<File | null>(null);
  const selectedPhotoObjectUrlRef = useRef<string>("");

  const clearSelectedPhoto = () => {
    setSelectedPhotoFile(null);
    if (selectedPhotoObjectUrlRef.current) {
      try {
        URL.revokeObjectURL(selectedPhotoObjectUrlRef.current);
      } catch {
        // ignore
      }
      selectedPhotoObjectUrlRef.current = "";
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    department: "",
    year: "",
    phone: "",
    bio: "",
    skills: "",
    photoUrl: "",
  });

  const onPhotoChange = (file: File | undefined) => {
    if (!file) return;
    clearSelectedPhoto();
    setSelectedPhotoFile(file);
    if (typeof URL !== "undefined") {
      const objectUrl = URL.createObjectURL(file);
      selectedPhotoObjectUrlRef.current = objectUrl;
      setPhotoPreviewUrl(objectUrl);
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let uploadedPhotoUrl = formData.photoUrl;
    if (selectedPhotoFile) {
      try {
        setUploadingPhoto(true);
        const result = await uploadMembershipPhoto(selectedPhotoFile, { expiresIn: 3600 });
        uploadedPhotoUrl = result.storedValue;
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        setLoading(false);
        setUploadingPhoto(false);
        toast({ title: "Photo upload failed", description: msg, variant: "destructive" });
        return;
      } finally {
        setUploadingPhoto(false);
      }
    }

    const { error } = await supabase.from("memberships").insert({
      name: formData.name,
      email: formData.email,
      student_id: formData.studentId,
      department: formData.department,
      year: formData.year,
      phone: formData.phone,
      bio: formData.bio,
      skills: formData.skills,
      photo_url: uploadedPhotoUrl || null,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Submission failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Application submitted", description: "We will get back to you soon." });
    setFormData({ name: "", email: "", studentId: "", department: "", year: "", phone: "", bio: "", skills: "", photoUrl: "" });
    clearSelectedPhoto();
    setPhotoPreviewUrl("");
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
                          <SelectItem value="agriculture">Agriculture</SelectItem>
                          <SelectItem value="cs">Computer Science</SelectItem>
                          <SelectItem value="nfs">NFS</SelectItem>
                          <SelectItem value="ansvm">ANHVM</SelectItem>
                          <SelectItem value="genetics">Genetics</SelectItem>
                          <SelectItem value="eee">EEE</SelectItem>
                          <SelectItem value="esdm">ESDM</SelectItem>
                          <SelectItem value="lla">LLA</SelectItem>
                          <SelectItem value="bba">BBA</SelectItem>
                          <SelectItem value="fisheries">FISHERIES</SelectItem>
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
                    <Label htmlFor="photo">Profile Photo (Optional)</Label>
                    <div className="mt-2 flex flex-col gap-3">
                      <Input
                        id="photo"
                        type="file"
                        accept="image/*"
                        disabled={uploadingPhoto || loading}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          onPhotoChange(f);
                        }}
                      />
                      {uploadingPhoto && (
                        <p className="text-sm text-muted-foreground">Uploading photo...</p>
                      )}
                      {photoPreviewUrl && (
                        <div className="flex items-center gap-3">
                          <img src={photoPreviewUrl} alt="Selected profile" className="h-20 w-20 rounded-md object-cover border" />
                          <div className="text-sm text-muted-foreground">
                            {formData.photoUrl ? "Photo attached" : ""}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="skills">Your Skills (Optional)</Label>
                    <Textarea id="skills" value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} className="min-h-[80px]" />
                  </div>

                  <Button type="submit" className="w-full bg-gradient-primary" disabled={loading || uploadingPhoto}>
                    {loading ? "Submitting..." : uploadingPhoto ? "Uploading photo..." : "Submit Application"}
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
