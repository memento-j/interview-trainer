import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "Is my data private?",
    answer:
      "Yes. Your recordings, answers, and feedback are private and only visible to you. We never share or sell your interview data. Any AI analysis is done securely through our backend and not stored permanently."
  },
  {
    question: "How is my information stored?",
    answer:
      "All user data is stored securely in our Supabase database with authentication and row-level security. Sensitive information is encrypted both in transit (HTTPS) and at rest."
  },
  {
    question: "Does the AI keep my responses?",
    answer:
      "No. The AI analyzes your answers in real-time and returns structured feedback immediately. The raw text of your responses is stored only if you choose to save your session for review later."
  },
  {
    question: "Can I delete my account and data?",
    answer:
      "Yes. You can permanently delete your account and all associated sessions, answers, and feedback from your account settings page."
  },
  {
    question: "What does the AI feedback include?",
    answer:
      "The AI provides feedback on clarity, confidence, and relevance, and highlights strengths and weaknesses. It’s designed to be constructive and tailored to your goals."
  },
  {
    question: "Can I re-practice old questions?",
    answer:
      "Yes! You can revisit past sessions, see which questions you struggled with, and choose to re-practice them using the Question Re-Practicer feature."
  },
  {
    question: "Will new questions be added over time?",
    answer:
      "Yes. We regularly update the preloaded question bank and AI generation models to reflect the latest interview trends and roles."
  },
];

export default function FAQPage() {

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-zinc-100 to-white dark:from-zinc-900 dark:to-zinc-950">
      <div className="flex flex-col justify-center mx-auto max-w-2xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
        <h1 className="text-2xl md:text-4xl font-[500] text-center mb-12">Frequently Asked Questions</h1>
        <Accordion
          type="single"
          collapsible
          className="w-full"
        >
          {faqs.map((faq: FAQ, index:number) => (
            <motion.div
              key={index}
              className="border border-zinc-300 dark:border-zinc-800 shadow-xl rounded-2xl py-3 px-2 mb-2"
              initial={{ opacity: 0, y: 25   }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06, type: "spring" }}
            >
              <AccordionItem value={index.toString()} className="mb-1" key={index}>
                <AccordionTrigger className="text-lg md:text-2xl py-4 px-3">{faq.question}</AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4 text-balance">
                  <p className="px-3 text-sm md:text-lg ">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
