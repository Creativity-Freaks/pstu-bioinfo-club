import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      question: "Who can join the PSTU Bioinformatics Club?",
      answer: "Any PSTU student who is passionate about bioinformatics, computational biology, or related fields can join. We welcome students from all departments, whether you're from biotechnology, computer science, or any other field with an interest in bioinformatics."
    },
    {
      question: "Do I need programming experience to join?",
      answer: "Not at all! While programming skills are helpful, they're not required. We offer beginner-friendly workshops and resources to help you learn. Many of our members started with no coding experience and have become proficient through our training programs."
    },
    {
      question: "What activities does the club organize?",
      answer: "We organize regular workshops on bioinformatics tools, programming languages (Python, R), data analysis, machine learning applications, and more. We also host seminars, hackathons, research project collaborations, and networking events with industry professionals."
    },
    {
      question: "Is there a membership fee?",
      answer: "No, membership is completely free! We believe in making bioinformatics education accessible to all students. However, some special workshops or certification courses may have nominal fees to cover materials and certification costs."
    },
    {
      question: "How can I attend the workshops?",
      answer: "Once you become a member, you'll receive notifications about all upcoming workshops via email and our Facebook group. Most workshops are held on campus, and we also organize online sessions for greater accessibility."
    },
    {
      question: "Can I contribute to research projects?",
      answer: "Absolutely! We encourage active participation in research projects. Whether you're a beginner or advanced student, we have projects suited to different skill levels. You'll work alongside peers and faculty advisors on real-world bioinformatics challenges."
    },
    {
      question: "How do I stay updated with club activities?",
      answer: "After joining, you'll be added to our communication channels including our Facebook group, email list, and WhatsApp group. We regularly post updates about upcoming events, workshops, and opportunities."
    },
    {
      question: "Can I hold a leadership position in the club?",
      answer: "Yes! We hold elections annually for the executive committee positions. Active members who demonstrate dedication and leadership skills are encouraged to apply. It's a great way to develop organizational and leadership abilities."
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex justify-center mb-4">
            <HelpCircle className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers! Find everything you need to know about joining and participating.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-gradient-card rounded-lg px-6 border border-border hover:border-primary/50 shadow-sm hover:shadow-elegant transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <AccordionTrigger className="text-left hover:no-underline hover:text-primary transition-colors">
                  <span className="font-semibold text-lg">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pt-2 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
