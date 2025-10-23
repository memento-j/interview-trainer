import { motion } from "framer-motion";
import { Link } from "react-router";

export default function AppOverview() {
    return(
        <div className="py-34 bg-zinc-100 dark:bg-[#0F0F11]">
            <div className="max-w-7xl mx-auto px-6 sm:px-12">
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
                    viewport={{ once: false, amount: 0.1 }}
                    className="text-center max-w-4xl mx-auto mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-[500] text-zinc-900 dark:text-white mb-6">
                        Practice, Get Feedback, and Improve
                    </h2>
                    <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        Our AI-powered interview trainer helps you tackle real interview questions, 
                        receive instant feedback, and track your improvement over time.
                    </p>
                </motion.div>
                {/* Features grid */}
                <div className="grid gap-10 md:grid-cols-2 ">
                    {/* Feature card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
                        viewport={{ once: false, amount: 0.2 }}
                        className="p-8 rounded-2xl bg-white dark:bg-zinc-800 dark:shadow-white/4 shadow-sm dark:hover:shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <div className="flex justify-center">
                            <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-200 text-2xl shadow-md">
                            🎯
                            </div>
                        </div>
                        <h3 className="text-xl text-center font-semibold text-zinc-900 dark:text-white mb-3">
                            Targeted Practice
                        </h3>
                        <p className="text-zinc-600 text-center dark:text-zinc-300 leading-relaxed">
                            Focus on questions specific to your role or industry to maximize your preparation.
                        </p>    
                    </motion.div>
                    {/* Feature card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.175, duration: 0.6, type: "spring" }}
                        viewport={{ once: false, amount: 0.2 }}
                        className="p-8 rounded-2xl bg-white dark:bg-zinc-800 shadow-sm dark:shadow-white/4 dark:hover:shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <div className="flex justify-center">
                            <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-300 text-white text-2xl shadow-md">
                            💡
                            </div>
                        </div>
                        <h3 className="text-xl text-center font-semibold text-zinc-900 dark:text-white mb-3">
                        Instant Feedback
                        </h3>
                        <p className="text-zinc-600 text-center dark:text-zinc-300 leading-relaxed">
                        AI highlights strengths and weaknesses in your answers so you can improve quickly.
                        </p>
                    </motion.div>
                    {/* Feature card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25, duration: 0.6, type: "spring" }}
                        viewport={{ once: false, amount: 0.2 }}
                        className="p-8 rounded-2xl bg-white dark:bg-zinc-800 dark:shadow-white/4 shadow-sm dark:hover:shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <div className="flex justify-center">
                            <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-300 text-white text-2xl shadow-md">
                            📊
                            </div>
                        </div>
                        <h3 className="text-xl text-center font-semibold text-zinc-900 dark:text-white mb-3">
                        Track Progress
                        </h3>
                        <p className="text-zinc-600 text-center dark:text-zinc-300 leading-relaxed">
                        Monitor your past sessions, compare performance, and stay motivated as you improve.
                        </p>
                    </motion.div>
                    {/* Feature card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.325, duration: 0.6, type: "spring" }}
                        viewport={{ once: false, amount: 0.2 }}
                        className="p-8 rounded-2xl bg-white dark:bg-zinc-800 dark:shadow-white/4 shadow-sm dark:hover:shadow-lg hover:shadow-xl transition-shadow"
                    >
                        <div className="flex justify-center">
                            <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-200 text-2xl shadow-md">
                                🔁
                            </div>
                        </div>
                        <h3 className="text-xl text-center font-semibold text-zinc-900 dark:text-white mb-3">
                            Revisit Missed Questions
                        </h3>
                        <p className="text-zinc-600 text-center dark:text-zinc-300 leading-relaxed">
                            Create an account to review and retry the questions that were challenging.
                        </p>
                    </motion.div>
                </div>
                {/* Call to action */}
                <div className="text-center mt-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
                        viewport={{ once: false, amount: 0.2 }}
                    >
                        <Link
                            to="/practice"
                            className="inline-block dark:shadow-white/8 px-8 py-4 bg-gradient-to-tr from-teal-600 to-teal-400 hover:from-teal-500 hover:to-teal-300 text-white text-lg font-semibold rounded-xl shadow-sm dark:hover:shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-transform"
                        >
                            Start Practicing
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}