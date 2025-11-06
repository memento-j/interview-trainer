import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FileQuestionMark } from "lucide-react";

interface FAQ {
    question: string;
    answer: string;
}

const faqs: FAQ[] = [
    {
        question: "Can I provide any feedback or suggestions?",
        answer: "Yes! I am always open to feedback and ideas. Your suggestions help me improve the AI and user experience. Reach out to practimate.ai@gmail.com (:"
    },
    {
        question: "Is my data private?",
        answer: "Your data is stored securely in our database and is only accessible to you through your account. I don't share or sell your information, and AI analysis happens safely on our servers."
    },
    {
        question: "How is my information stored?",
        answer: "All user data is stored securely in our Supabase database with authentication and row-level security. Sensitive information is encrypted in transit (HTTPS)."
    },
    {
        question: "Does the AI keep my responses?",
        answer: "No. The AI analyzes your answers in real-time and returns structured feedback immediately. The raw text of your responses is stored only if you are signed in, but you can delete this anytime you'd like."
    },
    {
        question: "What does the AI feedback include?",
        answer: "The AI provides score on clarity, confidence, relevance, and highlights strengths/weaknesses while providing suggestions."
    },
    {
        question: "Can I re-practice old questions?",
        answer: "As long as you did practice session while signed in to an account, yes! You can revisit past sessions, see which questions you struggled with, and choose to re-practice them using the Question Re-Practicer feature."
    },
    {
        question: "Will new questions be added over time?",
        answer: "Yes. I will regularly update the preloaded question bank and AI generation models to reflect the latest interview trends and roles."
    },
];

export default function FAQPage() {
    return (
        <div className="min-h-screen py-20 bg-gradient-to-br from-zinc-100 to-white dark:from-zinc-900 dark:to-zinc-950">
            <div className="flex flex-col justify-center mx-auto max-w-2xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl">
                <h1 className="text-2xl md:text-4xl font-[500] text-center mb-10 pb-2 bg-gradient-to-tr from-teal-600 to-teal-400 bg-clip-text text-transparent">
                    Frequently Asked Questions
                </h1>
                <Accordion type="multiple" className="w-full">
                    {faqs.map((faq: FAQ, index: number) => (
                        <motion.div
                            key={index}
                            className="rounded-2xl py-3 px-2 mb-2"
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.06, type: "spring" }}
                        >
                            <AccordionItem
                                value={index.toString()}
                                className="border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 bg-white dark:bg-zinc-900"
                            >
                                <AccordionTrigger className="text-lg md:text-xl font-semibold py-4 px-5 hover:text-teal-400 dark:hover:text-teal-500 transition-colors duration-250">
                                    <div className="flex items-center gap-3">
                                        <FileQuestionMark className="text-teal-400 dark:text-teal-500"/>
                                        {faq.question}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-zinc-600 dark:text-zinc-300 px-6 pb-5 text-sm md:text-lg leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        </motion.div>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}