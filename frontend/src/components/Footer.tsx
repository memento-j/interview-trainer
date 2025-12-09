import { motion } from "framer-motion";
import { Github, Mail, Sparkles, CheckCircle2, MessageSquare } from "lucide-react";
import { Link } from "react-router";

interface FooterLink {
    label: string;
    href: string;
}

interface SocialLink {
    icon: React.ReactNode;
    href: string;
    label: string;
}

const productLinks: FooterLink[] = [
    { label: "Practice", href: "/practice" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "FAQ", href: "/faq" },
];

const socialLinks: SocialLink[] = [
    { 
        icon: <Github className="w-5 h-5" />, 
        href: "https://github.com/memento-j/interview-trainer", 
        label: "GitHub" 
    },
    { 
        icon: <Mail className="w-5 h-5" />, 
        href: "mailto:practimate.ai@gmail.com", 
        label: "Email" 
    },
];

export default function Footer() {
    return (
        <footer className="relative w-full bg-zinc-100 dark:bg-[#0F0F11] overflow-hidden">
            {/* Subtle gradient accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
            
            <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
                    {/* Brand Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="lg:col-span-1"
                    >
                        <div className="flex">
                            <div className="relative inline-flex items-center justify-center mb-5">
                                <MessageSquare className="w-8 h-8 text-teal-400 dark:text-teal-500" />
                                <CheckCircle2 className="w-4 h-4 text-teal-400 dark:text-teal-500 absolute bottom-0 right-0 bg-white dark:bg-zinc-900 rounded-full" />
                            </div>
                            <p className="ml-1 text-xl font-semibold text-zinc-900 dark:text-white">
                                PractiMate
                            </p>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 max-w-xs">
                            Your AI-powered interview trainer. Practice smarter, get instant feedback, and land your dream job.
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:bg-teal-500 hover:text-white dark:hover:bg-teal-500 transition-colors"
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Product Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
                            Product
                        </h3>
                        <ul className="space-y-3">
                            {productLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                    {/*CTA Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white uppercase tracking-wider mb-4">
                            Ready to Start?
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                            Jump into your first practice session — no signup required.
                        </p>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Link
                                to="/practice"
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-white text-sm font-semibold rounded-xl shadow-md shadow-teal-500/20 transition-all"
                            >
                                Start Practicing
                                <Sparkles className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        {/* Copyright */}
                        <p className="text-sm text-zinc-500 dark:text-zinc-500 order-2 sm:order-1">
                            © {new Date().getFullYear()} Practimate. All rights reserved.
                        </p>
                        
                        {/* Made with love */}
                        <p className="text-sm text-zinc-500 dark:text-zinc-500 flex items-center gap-1.5 order-1 sm:order-2">
                            Made for job seekers everywhere by someone who understands the job hunt struggle.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}