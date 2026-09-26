import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Linkedin, Mail, Phone } from "lucide-react";
import { useSupabaseList } from "@/hooks/useSupabaseList";

const Team = () => {
  const { data: executiveCommittee = [] } = useSupabaseList<any>("team_members", { orderBy: "id", ascending: true });
  const advisors = executiveCommittee.filter((member: any) => ["advisor", "faculty", "chief advisor"].includes(String(member.role || member.title || "").toLowerCase()));
  const teamMembers = executiveCommittee.filter((member: any) => !advisors.includes(member));


  return (
    <section id="team" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-primary">Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Meet the passionate individuals driving our club forward
          </p>
        </div>

        {/* Faculty Advisors */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-8">Faculty Advisors</h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {advisors.map((advisor, index) => (
              <Card
                key={index}
                className="bg-gradient-card border-0 shadow-lg animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-card shadow-md">
                    {advisor.image_url ? (
                      <img src={advisor.image_url} alt={advisor.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-bold text-foreground">
                        {advisor.name.split(' ')[1]?.[0] || advisor.name[0]}
                      </span>
                    )}
                  </div>
                  <h4 className="text-2xl font-bold mb-2">{advisor.name}</h4>
                  <p className="text-primary font-medium mb-1">{advisor.title}</p>
                  <p className="text-muted-foreground">{advisor.department}</p>
                  {advisor.office && (
                    <p className="text-sm text-muted-foreground mt-2">{advisor.office}</p>
                  )}
                  <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
                    {advisor.phone && (
                      <span className="inline-flex items-center gap-1"><Phone className="w-4 h-4" /> {advisor.phone}</span>
                    )}
                    {advisor.email && (
                      <span className="inline-flex items-center gap-1"><Mail className="w-4 h-4" /> {advisor.email}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Executive Committee */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-8">Executive Committee</h3>
          {teamMembers.length === 0 ? <p className="text-center text-muted-foreground">No team members published yet.</p> : <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{teamMembers.map((member: any) => <Card key={member.id} className="border-0 shadow-lg"><CardContent className="p-6 text-center"><div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-card">{member.image_url ? <img src={member.image_url} alt={member.name} className="h-full w-full object-cover" /> : <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-primary">{String(member.name || "?").charAt(0)}</div>}</div><h4 className="font-semibold">{member.name}</h4><p className="mt-1 text-sm text-primary">{member.role}</p><p className="mt-2 text-sm text-muted-foreground">{member.department || member.bio}</p></CardContent></Card>)}</div>}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Want to join our team? We're always looking for passionate students!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Team;
