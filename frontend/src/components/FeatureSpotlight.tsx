import { motion } from "framer-motion";
import { useRef } from "react";
import { Sparkles, MessageSquare, BarChart3, RefreshCw, ArrowRight, AlertCircle, Flame, Lightbulb } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

// Demo data for feedback cards
const demoTones = ["professional", "collaborative", "confident", "proactive"];

const demoStrengths = [
    "Clear example of embracing a new system and guiding others through transition.",
    "Shows initiative by volunteering to learn and creating an onboarding guide."
];

const demoSuggestions = [
    "Tie the outcome to goals of the role you're interviewing for.",
    "Include specific metrics to quantify impact (e.g., X projects, Y% faster)."
];

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
    bgColor: string;
}

const features: Feature[] = [
    {
        icon: <MessageSquare className="w-5 h-5" />,
        title: "Interactive Question Practice",
        description: "Answer curated interview questions with real-time feedback",
        color: "text-blue-500",
        bgColor: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
        icon: <BarChart3 className="w-5 h-5" />,
        title: "Detailed Analytics",
        description: "Track improvement across multiple dimensions",
        color: "text-purple-500",
        bgColor: "bg-purple-100 dark:bg-purple-900/30"
    },
    {
        icon: <RefreshCw className="w-5 h-5" />,
        title: "Customized Practice Sets",
        description: "Choose topics you want to improve and drill them efficiently",
        color: "text-orange-500",
        bgColor: "bg-orange-100 dark:bg-orange-900/30"
    }
];

export default function FeatureSpotlight() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { theme } = useTheme();

    return (
        <section 
            ref={containerRef}
            className="relative py-32 bg-gradient-to-b from-zinc-100 to-white dark:from-[#0F0F11] dark:to-[#0a0a0b] overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-12">
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                    >
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-medium text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/30 rounded-full"
                        >
                            <Sparkles className="w-4 h-4" />
                            AI-Powered Feedback
                        </motion.span>

                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-[500] text-zinc-900 dark:text-white mb-6 leading-tight">
                            Feedback That{" "}
                            <span className="relative">
                                <span className="bg-gradient-to-r from-teal-500 to-teal-400 bg-clip-text text-transparent">
                                    Actually Helps
                                </span>
                            </span>
                            {" "}You Grow
                        </h2>

                        <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-10 leading-relaxed max-w-lg">
                            Our AI doesn't just tell you what's wrong — it explains why and shows you how to improve. Get actionable insights that make every practice session count.
                        </p>

                        {/* Feature Pills */}
                        <div className="space-y-4 mb-10">
                            {features.map((feature) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    viewport={{ once: true }}
                                    whileHover={{ 
                                        x: 10,
                                        boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.1)",
                                        borderColor: "rgba(20, 184, 166, 0.5)",
                                        transition: { duration: 0.3 }
                                    }}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800"
                                    style={{ transition: "none" }}
                                >
                                    <div className={`w-10 h-10 rounded-lg ${feature.bgColor} flex items-center justify-center ${feature.color}`}>
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-zinc-900 dark:text-white">
                                            {feature.title}
                                        </p>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-500">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.a
                            href="/practice"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold hover:gap-4 transition-all"
                        >
                            Experience it yourself
                            <ArrowRight className="w-5 h-5" />
                        </motion.a>
                    </motion.div>

                    {/* Right Content - Feedback Demo with Floating Cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Desktop Layout - Image with floating cards */}
                        <div className="hidden lg:block relative">
                            {/* Main Feedback Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="relative z-0 flex justify-center"
                            >
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-zinc-300/50 dark:shadow-black/50 border border-zinc-200 dark:border-zinc-800">
                                    {theme === "light" ? (
                                        <img 
                                            src="feedbackdemolight.png" 
                                            alt="Feedback demo"
                                            className="rounded-2xl max-w-md"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <img 
                                            src="feedbackdemo.png" 
                                            alt="Feedback demo"
                                            className="rounded-2xl max-w-md"
                                            loading="lazy"
                                        />
                                    )}
                                    {/* Subtle gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none rounded-2xl" />
                                </div>
                            </motion.div>

                            {/* Floating Tone Card - Top Left */}
                            <motion.div
                                initial={{ opacity: 0, y: 50, x: -20 }}
                                whileInView={{ opacity: 1, y: 0, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                                viewport={{ once: true }}
                                className="absolute -top-6 -left-8 bg-gradient-to-br from-white/98 to-zinc-100/98 dark:from-zinc-900/98 dark:to-zinc-800/98 p-4 rounded-2xl shadow-xl border border-zinc-200/50 dark:border-zinc-700/50 max-w-[180px] z-10 backdrop-blur-sm"
                            >
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <AlertCircle className="w-4 h-4 text-blue-500" />
                                    <p className="font-semibold text-base text-zinc-900 dark:text-white">Tone</p>
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                    {demoTones.map((t: string, i: number) => (
                                        <span 
                                            key={i} 
                                            className="inline-flex px-2 py-0.5 text-xs rounded-full border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Floating Strengths Card - Bottom Left */}
                            <motion.div
                                initial={{ opacity: 0, y: 50, x: -20 }}
                                whileInView={{ opacity: 1, y: 0, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
                                viewport={{ once: true }}
                                className="absolute -bottom-8 -left-12 bg-gradient-to-br from-white/98 to-zinc-100/98 dark:from-zinc-900/98 dark:to-zinc-800/98 p-4 rounded-2xl shadow-xl border border-zinc-200/50 dark:border-zinc-700/50 max-w-[240px] z-10 backdrop-blur-sm"
                            >
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <Flame className="w-5 h-5 text-green-500" />
                                    <p className="font-semibold text-base text-zinc-900 dark:text-white">Strengths</p>
                                </div>
                                <ul className="space-y-2">
                                    {demoStrengths.slice(0, 2).map((s: string, i: number) => (
                                        <li 
                                            key={i}
                                            className="text-green-700 dark:text-green-200 bg-green-100/60 dark:bg-green-900/40 rounded-lg px-2.5 py-1.5"
                                        >
                                            <span className="text-xs leading-relaxed">{s}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Floating Suggestions Card - Right Side */}
                            <motion.div
                                initial={{ opacity: 0, y: 50, x: 20 }}
                                whileInView={{ opacity: 1, y: 0, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
                                viewport={{ once: true }}
                                className="absolute top-1/2 -translate-y-1/2 -right-10 bg-gradient-to-bl from-white/98 to-zinc-100/98 dark:from-zinc-900/98 dark:to-zinc-800/98 p-4 rounded-2xl shadow-xl border border-zinc-200/50 dark:border-zinc-700/50 max-w-[220px] z-10 backdrop-blur-sm"
                            >
                                <div className="flex items-center justify-center gap-2 mb-3">
                                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                                    <p className="font-semibold text-base text-zinc-900 dark:text-white">Suggestions</p>
                                </div>
                                <ul className="space-y-2">
                                    {demoSuggestions.map((s: string, i: number) => (
                                        <li 
                                            key={i}
                                            className="text-yellow-700 dark:text-yellow-200 bg-yellow-100/60 dark:bg-yellow-900/40 rounded-lg px-2.5 py-1.5"
                                        >
                                            <span className="text-xs leading-relaxed">{s}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Floating Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 1, type: "spring" }}
                                viewport={{ once: true }}
                                className="absolute -top-4 right-8 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500 to-teal-400 text-white text-sm font-semibold shadow-lg shadow-teal-500/25 z-30"
                            >
                                Real-time Analysis ⚡
                            </motion.div>
                        </div>

                        {/* Mobile/Tablet Layout - Stacked cards */}
                        <div className="lg:hidden space-y-6">
                            {/* Main Feedback Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                viewport={{ once: true }}
                                className="relative flex justify-center"
                            >
                                <div className="relative rounded-2xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800">
                                    {theme === "light" ? (
                                        <img 
                                            src="feedbackdemolight.png" 
                                            alt="Feedback demo"
                                            className="rounded-2xl w-full max-w-sm"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <img 
                                            src="feedbackdemo.png" 
                                            alt="Feedback demo"
                                            className="rounded-2xl w-full max-w-sm"
                                            loading="lazy"
                                        />
                                    )}
                                </div>
                                {/* Badge on mobile */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                                    viewport={{ once: true }}
                                    className="absolute -top-3 right-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-semibold shadow-lg shadow-teal-500/25"
                                >
                                    Real-time ⚡
                                </motion.div>
                            </motion.div>

                            {/* Mobile Cards Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Tone Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    viewport={{ once: true }}
                                    className="bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-800 p-4 rounded-xl shadow-md border border-zinc-200/50 dark:border-zinc-700/50"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <AlertCircle className="w-4 h-4 text-blue-500" />
                                        <p className="font-semibold text-sm text-zinc-900 dark:text-white">Tone</p>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {demoTones.map((t: string, i: number) => (
                                            <span 
                                                key={i} 
                                                className="inline-flex px-2 py-0.5 text-xs rounded-full border border-zinc-300 dark:border-zinc-600 text-zinc-600 dark:text-zinc-400"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Strengths Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    className="bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-800 p-4 rounded-xl shadow-md border border-zinc-200/50 dark:border-zinc-700/50"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <Flame className="w-4 h-4 text-green-500" />
                                        <p className="font-semibold text-sm text-zinc-900 dark:text-white">Strengths</p>
                                    </div>
                                    <ul className="space-y-1.5">
                                        {demoStrengths.slice(0, 1).map((s: string, i: number) => (
                                            <li 
                                                key={i}
                                                className="text-green-700 dark:text-green-300 bg-green-100/60 dark:bg-green-900/40 rounded-lg px-2.5 py-1.5"
                                            >
                                                <span className="text-xs">{s}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>

                                {/* Suggestions Card - Full width on mobile */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    viewport={{ once: true }}
                                    className="sm:col-span-2 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-800 p-4 rounded-xl shadow-md border border-zinc-200/50 dark:border-zinc-700/50"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <Lightbulb className="w-4 h-4 text-yellow-500" />
                                        <p className="font-semibold text-sm text-zinc-900 dark:text-white">Suggestions</p>
                                    </div>
                                    <ul className="space-y-1.5">
                                        {demoSuggestions.map((s: string, i: number) => (
                                            <li 
                                                key={i}
                                                className="text-yellow-700 dark:text-yellow-300 bg-yellow-100/60 dark:bg-yellow-900/40 rounded-lg px-2.5 py-1.5"
                                            >
                                                <span className="text-xs">{s}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}