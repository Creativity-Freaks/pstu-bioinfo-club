import { Card, CardContent } from "@/components/ui/card";
import { Facebook, Linkedin, Mail } from "lucide-react";

const Team = () => {
  const executiveCommittee = [
    {
      name: "Student President",
      role: "President",
      department: "Biotechnology",
      bio: "Leading the club's vision and coordinating all activities"
    },
    {
      name: "Vice President",
      role: "Vice President",
      department: "Computer Science",
      bio: "Managing technical workshops and project development"
    },
    {
      name: "General Secretary",
      role: "General Secretary",
      department: "Biochemistry",
      bio: "Organizing events and maintaining club records"
    },
    {
      name: "Treasurer",
      role: "Treasurer",
      department: "Microbiology",
      bio: "Managing club finances and sponsorships"
    }
  ];

  const advisors = [
    {
      name: "Dr. Faculty Advisor",
      title: "Associate Professor",
      department: "Department of Biotechnology"
    },
    {
      name: "Dr. Technical Advisor",
      title: "Assistant Professor",
      department: "Department of Computer Science"
    }
  ];

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
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-primary flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary-foreground">
                      {advisor.name.split(' ')[1][0]}
                    </span>
                  </div>
                  <h4 className="text-2xl font-bold mb-2">{advisor.name}</h4>
                  <p className="text-primary font-medium mb-1">{advisor.title}</p>
                  <p className="text-muted-foreground">{advisor.department}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Executive Committee */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-8">Executive Committee</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {executiveCommittee.map((member, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {member.name.split(' ')[0][0]}{member.name.split(' ')[1]?.[0] || ''}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-3">{member.department}</p>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  <div className="flex justify-center space-x-3">
                    <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                      <Facebook className="w-4 h-4 text-primary" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                      <Linkedin className="w-4 h-4 text-primary" />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                      <Mail className="w-4 h-4 text-primary" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
