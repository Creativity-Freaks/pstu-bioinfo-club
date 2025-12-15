import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import advisor1 from "@/assets/advisor/advisor1.jpeg";
import advisor2 from "@/assets/advisor/advisor2.jpeg";

type Advisor = {
  name: string;
  title: string;
  department: string;
  office?: string;
  phone?: string;
  email?: string;
  photo?: string;
};

const advisors: Advisor[] = [
  {
    name: "Dr. Md. Mahmudul Hassan",
    title: "Chief Advisor",
    department:
      "Department of Genetics and Plant Breeding, Faculty of Agriculture",
    office:
      "PSTU, Dumki, Patuakhali-8602",
    phone: "+8801707006769",
    email: "mhassan@pstu.ac.bd",
    photo: advisor2,
  },
  {
    name: "Dr. Md. Rajib Sharker",
    title: "Professor",
    department:
      "Department of Fisheries Biology and Genetics, Faculty of Fisheries",
    office:
      "PSTU, Dumki, Patuakhali-8602",
    phone: "01726227578",
    email: "mrsharker@pstu.ac.bd",
    photo: advisor1,
  },
];

const Advisors = () => {
  return (
    <section className="py-20 bg-background" id="advisors">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Advisors</h2>
          <p className="text-lg text-muted-foreground">
            Expert guidance from our distinguished faculty members
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {advisors.map((advisor, index) => (
            <Card
              key={advisor.email ?? index}
              className="bg-gradient-card border-0 shadow-elegant hover:shadow-glow transition-all duration-500 animate-fade-in group hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden bg-card shadow-lg group-hover:shadow-glow transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
                    {advisor.photo ? (
                      <img src={advisor.photo} alt={advisor.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-4xl font-bold text-foreground">
                        {advisor.name.split(' ')[1]?.[0] || advisor.name[0]}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{advisor.name}</h3>
                  <p className="text-primary font-medium text-lg mb-1">{advisor.title}</p>
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advisors;
