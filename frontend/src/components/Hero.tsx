import { Link } from "react-router";
import { motion } from "framer-motion";

export default function Hero() {
    return(
        <section className="relative bg-gradient-to-br from-zinc-300 to-white dark:from-zinc-800 dark:to-black">
            {/* Hero Section */}
            <div className="relative flex min-h-screen xl:pb-0 gap-12 md:gap-16 flex-col items-center text-center px-6 sm:px-12 lg:px-24 m-auto pt-24 lg:pt-40 xl:pt-48">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring" }}
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring" }}
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
                            text-zinc-100 font-semibold shadow-sm dark:shadow-white/3
                            hover:from-teal-500 hover:to-teal-300
                            dark:hover:shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/about"
                        className="px-6 py-3 text-2xl sm:text-3xl md:text-4xl 
                            rounded-xl border border-teal-600 text-teal-600 dark:text-teal-400 
                            font-semibold hover:bg-teal-50 dark:hover:bg-zinc-800 shadow-sm dark:shadow-white/7 
                            dark:hover:shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
                    >
                        Learn More
                    </Link>
                </div>
                <div className="grid align-content grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mt-0 lg:mt-8 pb-18">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.10, type: "spring" }}
                    >
                        <p className="text-zinc-800 dark:text-zinc-400  md:text-xl opacity-80 hover:opacity-100 hover:scale-102 duration-150">✔️ No signup required</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.175, type: "spring" }}
                    >
                        <p className="text-zinc-800 dark:text-zinc-400 md:text-xl opacity-80 hover:opacity-100 hover:scale-102 duration-150">✔️ Completely free to use</p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25, type: "spring" }}
                    >
                        <p className="text-zinc-800 dark:text-zinc-400 md:text-lg opacity-80 hover:opacity-100 hover:scale-102 duration-150">✔️ Practice from anywhere</p>
                    </motion.div>                 
                </div>
            </div>
        </section>
    );
}