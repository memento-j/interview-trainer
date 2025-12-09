import { motion } from "framer-motion";
import { X, Check, Clock, DollarSign, Brain, Target, Users, Zap, ArrowRight } from "lucide-react";

interface ComparisonItem {
    feature: string;
    traditional: string;
    practimate: string;
    icon: React.ReactNode;
}

const comparisons: ComparisonItem[] = [
    {
        feature: "Cost",
        traditional: "$50-200 per session",
        practimate: "Completely free",
        icon: <DollarSign className="w-5 h-5" />
    },
    {
        feature: "Availability",
        traditional: "Schedule in advance",
        practimate: "Practice anytime, 24/7",
        icon: <Clock className="w-5 h-5" />
    },
    {
        feature: "Feedback Speed",
        traditional: "Days to receive notes",
        practimate: "Instant AI analysis",
        icon: <Zap className="w-5 h-5" />
    },
    {
        feature: "Personalization",
        traditional: "Generic questions",
        practimate: "Role-specific practice",
        icon: <Target className="w-5 h-5" />
    },
    {
        feature: "Practice Volume",
        traditional: "Limited by budget",
        practimate: "Unlimited sessions",
        icon: <Users className="w-5 h-5" />
    },
    {
        feature: "Progress Tracking",
        traditional: "Manual note-taking",
        practimate: "Automatic insights",
        icon: <Brain className="w-5 h-5" />
    }
];

export default function ComparisonSection() {
    return (
        <section className="py-28 bg-zinc-50 dark:bg-[#0F0F11]/50 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 sm:px-12">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-teal-600 dark:text-teal-400 bg-teal-100 dark:bg-teal-900/30 rounded-full"
                    >
                        Why Choose Us
                    </motion.span>
                    <h2 className="text-4xl sm:text-5xl font-[500] text-zinc-900 dark:text-white mb-6">
                        The{" "}
                        <span className="bg-gradient-to-r from-teal-500 to-teal-400 bg-clip-text text-transparent">
                            Smarter
                        </span>
                        {" "}Way to Prepare
                    </h2>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        See how PractiMate stacks up against traditional interview coaching methods.
                    </p>
                </motion.div>

                {/* Comparison Cards */}
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                    {/* Traditional Method Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="h-full p-8 rounded-2xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
                            {/* Header */}
                            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                                <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-zinc-500" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                                        Traditional Prep
                                    </h3>
                                    <p className="text-sm text-zinc-500 dark:text-zinc-500">
                                        Coaches & mock interviews
                                    </p>
                                </div>
                            </div>

                            {/* Features List */}
                            <ul className="space-y-5">
                                {comparisons.map((item, index) => (
                                    <motion.li
                                        key={item.feature}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                                            <X className="w-4 h-4 text-red-500" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-zinc-700 dark:text-zinc-300">
                                                {item.feature}
                                            </p>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-500">
                                                {item.traditional}
                                            </p>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* PractiMate Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        {/* Highlight Border */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-400 p-[2px]">
                            <div className="h-full w-full rounded-2xl bg-white dark:bg-zinc-900" />
                        </div>
                        
                        <div className="relative h-full p-8 rounded-2xl">
                            {/* Popular Badge */}
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                <span className="px-4 py-1 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full shadow-lg shadow-teal-500/25">
                                    Recommended
                                </span>
                            </div>

                            {/* Header */}
                            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-teal-400 flex items-center justify-center">
                                    <Zap className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                                        PractiMate AI
                                    </h3>
                                    <p className="text-sm text-teal-600 dark:text-teal-400 font-medium">
                                        Smart interview training
                                    </p>
                                </div>
                            </div>

                            {/* Features List */}
                            <ul className="space-y-5">
                                {comparisons.map((item, index) => (
                                    <motion.li
                                        key={item.feature}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
                                            <Check className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-zinc-700 dark:text-zinc-300">
                                                {item.feature}
                                            </p>
                                            <p className="text-sm text-teal-600 dark:text-teal-400 font-medium">
                                                {item.practimate}
                                            </p>
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
                >
                    {[
                        { value: "100%", label: "Free Forever" },
                        { value: "24/7", label: "Availability" },
                        { value: "<1m", label: "Feedback Time" },
                        { value: "∞", label: "Practice Sessions" }
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                            viewport={{ once: true }}
                            className="text-center p-6 rounded-xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800"
                        >
                            <p className="text-3xl font-bold bg-gradient-to-r from-teal-500 to-teal-400 bg-clip-text text-transparent">
                                {stat.value}
                            </p>
                            <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-zinc-500 dark:text-zinc-500 mb-4">
                        Ready to ace your next interview?
                    </p>
                    <motion.a
                        href="/practice"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-400 hover:from-teal-600 hover:to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-teal-500/25 transition-all"
                    >
                        Start Practicing Now
                        <ArrowRight className="w-5 h-5" />
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}