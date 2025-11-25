import { Link } from "react-router";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { Check } from "lucide-react";
//not mine ^ 
import { Particles } from "./ui/particles";
import { useTheme } from "@/contexts/ThemeContext";

export default function Hero() {
    //text generate effect from accerncity ui component https://ui.aceternity.com/components/text-generate-effect
    const [scope, animate] = useAnimate();
    const { theme } = useTheme();
    const heroText = "Workinggggg Interview Trainer to Help You Land the Job You Deserve."
    const gradientWords = ["AI", "Interview", "Trainer"];
    let wordsArray = heroText.split(" ");

    useEffect(() => {
        animate(
            "span",
            {
                opacity: 1,
                filter: "blur(0px)",
            },
            {
                duration: 0.5,
                delay: stagger(0.07),
            }
        );
    }, [scope.current]);

    const renderHeroWords = () => {
        return (
            <motion.div ref={scope} className="max-w-[1500px]">
                {wordsArray.map((word: string, idx: number) => {
                    const isGradientWord  = gradientWords.includes(word);
                    return (
                            <motion.span
                                key={word + idx}
                                className={isGradientWord ? `opacity-0 text-5xl sm:text-6xl md:text-7xl xl:text-8xl max-w-[1600px] font-[500] bg-gradient-to-b from-teal-500 to-teal-400/75 dark:from-teal-400 dark:to-teal-200 bg-clip-text text-transparent` 
                                    : `opacity-0 text-5xl sm:text-6xl md:text-7xl xl:text-8xl max-w-[1600px] font-[500]`}
                                style={{
                                    filter: "blur(15px)",
                                }}
                            >
                                {word}{" "}
                            </motion.span>
                    );
                })}
            </motion.div>
        );
    };

    return(
        <section className="relative bg-gradient-to-br from-zinc-200 to-white dark:from-zinc-800 dark:to-black">
            {/* Hero Section */}
            <Particles
                className="absolute inset-0 z-0"
                quantity={200}
                ease={200}
                color={theme === "dark" ? "#80CBC4" : "#022f2e"}
                refresh={false}
            />
            <div className="relative flex min-h-[92vh] gap-6 px-3 pt-6 md:gap-16 flex-col items-center justify-center text-center ">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ease: "anticipate", duration: 1}}
                >
                    {renderHeroWords()}
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1}}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.5}}
                >
                    <p className="text-lg sm:text-2xl lg:text-xl xl:text-2xl !text-zinc-500 dark:text-zinc-950 md:mb-6 mt-2 max-w-4xl leading-relaxed">
                        Practice role-specific questions, get instant feedback, repractice challenging questions, and boost your confidence.  
                        <br/>
                        <span className="bg-gradient-to-b from-teal-500 to-teal-400/75 bg-clip-text text-transparent font-[500]">PractiMate AI</span> makes interview prep smarter and faster.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1}}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                    className="flex gap-4 md:gap-8 flex-wrap justify-center"
                >
                    <Link
                        to="/practice"
                        className="px-6 py-3 text-2xl sm:text-3xl md:text-4xl rounded-xl 
                            bg-gradient-to-tr from-teal-500 to-teal-400/75 
                            text-zinc-100 font-semibold shadow-sm dark:shadow-white/3
                            hover:from-teal-500 hover:to-teal-300
                            dark:hover:shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
                    >
                        Get Started
                    </Link>
                    <Link
                        to="/faq"
                        className="px-6 py-3 text-2xl sm:text-3xl md:text-4xl 
                            rounded-xl border border-teal-600 text-teal-600 dark:text-teal-400 
                            font-semibold hover:bg-teal-50 dark:hover:bg-zinc-800 shadow-sm dark:shadow-white/7 
                            dark:hover:shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
                    >
                        Learn More
                    </Link>
                </motion.div>
                <div className="grid align-content grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-0 lg:mt-8 pb-18">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: 1,
                            type: "spring",
                            stiffness: 80,
                            damping: 18,
                        }}
                    >
                        <div className="flex flex-row gap-3 hover:scale-105 duration-150">
                            <Check className="text-teal-500 mt-0.5"/>
                            <p className="text-zinc-800 dark:text-zinc-400  md:text-xl opacity-80 hover:opacity-100"> No signup required</p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: 1.175,
                            type: "spring",
                            stiffness: 80,
                            damping: 18,
                        }}
                    >
                        <div className="flex flex-row gap-3 hover:scale-105 duration-150">
                            <Check className="text-teal-500 mt-0.5"/>
                            <p className="text-zinc-800 dark:text-zinc-400 md:text-xl opacity-80 hover:opacity-100">Completely free to use</p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            delay: 1.25,
                            type: "spring",
                            stiffness: 80,
                            damping: 18,
                        }}
                    >
                        <div className="flex flex-row gap-3 hover:scale-105 duration-150">
                            <Check className="text-teal-500 mt-0.5"/>
                            <p className="text-zinc-800 dark:text-zinc-400 md:text-xl opacity-80 hover:opacity-100">Practice from anywhere</p>
                        </div>
                    </motion.div>                 
                </div>
            </div>
        </section>
    );
}