import { Link } from "react-router";
import { motion } from "framer-motion";

export default function Hero() {
    return(
        <section className="relative bg-gradient-to-br from-zinc-300 to-white dark:from-zinc-800 dark:to-black">
            {/* Hero Section */}
            <div className="relative flex min-h-screen xl:pb-0 gap-12 md:gap-16 flex-col items-center text-center px-6 sm:px-12 lg:px-24 m-auto pt-24 lg:pt-40 xl:pt-48">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.10 }}
                >
                    <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl max-w-[1600px] font-[500] text-zinc-700 dark:text-zinc-300">
                        Your&nbsp;  
                        <span className="tracking-tight mb-6 bg-gradient-to-b from-teal-600 to-teal-400 dark:from-teal-400 dark:to-teal-200 bg-clip-text text-transparent">
                            AI Interview Trainer 
                        </span> 
                        &nbsp;to Help You Land the Job You Deserve.
                    </h1>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.10 }}
                >
                    <p className="text-md sm:text-2xl lg:text-2xl xl:text-3xl text-zinc-700 dark:text-zinc-300 md:mb-6 mt-2 max-w-6xl leading-relaxed">
                        Practice role-specific questions, get instant feedback, and boost your confidence.  
                        PractiMate AI makes interview prep smarter and faster.
                    </p>
                </motion.div>
                <div className="flex gap-4 md:gap-8 flex-wrap justify-center mt-4">
                    <Link
                        to="/practice"
                        className="px-6 py-3 text-2xl sm:text-3xl md:text-4xl rounded-xl 
                            bg-gradient-to-tr from-teal-600 to-teal-400 
                            text-zinc-100 font-semibold shadow-lg 
                            hover:from-teal-500 hover:to-teal-300
                            hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/about"
                        className="px-6 py-3 text-2xl sm:text-3xl md:text-4xl 
                            rounded-xl border border-teal-600 text-teal-600 dark:text-teal-400 
                            font-semibold hover:bg-teal-50 dark:hover:bg-zinc-800 shadow-lg  
                            hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
                    >
                        Learn More
                    </Link>
                </div>
                <div className="grid align-content grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-0 lg:mt-8 pb-18">
                    <p className="text-zinc-800 dark:text-zinc-400  text-xl opacity-80 hover:opacity-100 hover:scale-102 duration-150">✔️ No signup required</p>
                    <p className="text-zinc-800 dark:text-zinc-400 text-xl opacity-80 hover:opacity-100 hover:scale-102 duration-150">✔️ Completely free to use</p>
                    <p className="text-zinc-800 dark:text-zinc-400 text-lg opacity-80 hover:opacity-100 hover:scale-102 duration-150">✔️ Practice from anywhere</p>
                </div>
            </div>
            {/* Overview Section */}
            <div id="features" className="relative py-34 bg-zinc-100 dark:bg-[#0F0F11]">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    {/* Section heading */}
                    <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="text-4xl sm:text-5xl font-[500] text-zinc-900 dark:text-white mb-6">
                        Practice, Get Feedback, and Improve
                    </h2>
                    <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        Our AI-powered interview trainer helps you tackle real interview questions, 
                        receive instant feedback, and track your improvement over time.
                    </p>
                    </div>
                    {/* Features grid */}
                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {/* Feature card */}
                        <div className="p-8 rounded-2xl bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex justify-center">
                                <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-300 text-2xl shadow-md">
                                🎯
                                </div>
                            </div>
                            <h3 className="text-xl text-center font-semibold text-zinc-900 dark:text-white mb-3">
                            Targeted Practice
                            </h3>
                            <p className="text-zinc-600 text-center dark:text-zinc-300 leading-relaxed">
                            Focus on questions specific to your role or industry to maximize your preparation.
                            </p>
                        </div>
                        {/* Feature card */}
                        <div className="p-8 rounded-2xl bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow">
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
                        </div>

                        {/* Feature card */}
                        <div className="p-8 rounded-2xl bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow">
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
                        </div>
                    </div>
                    {/* Call to action */}
                    <div className="text-center mt-16">
                        <Link
                            to="/practice"
                            className="inline-block px-8 py-4 bg-gradient-to-tr from-teal-600 to-teal-400 hover:from-teal-500 hover:to-teal-300 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-transform"
                        >
                            Start Practicing
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}