export default function Hero() {
    return(
        <section className="h-[110vh] bg-zinc-50 dark:bg-zinc-900 flex flex-col ">
            {/* Overview */}
            <div className="flex flex-col justify-center items-center text-center flex-1 px-6 sm:px-12 lg:px-24">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6">
                    Master Your Interviews with AI
                </h1>
                <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 mb-8 max-w-2xl">
                    Practice role-specific questions, get instant feedback, and boost your confidence. PrepMate AI makes interview prep smarter and faster.
                </p>
                <div className="flex gap-4 flex-wrap justify-center">
                    <a href="#get-started" className="px-6 py-3 rounded-md bg-teal-600 text-white font-semibold hover:bg-teal-700 transition">
                    Get Started
                    </a>
                    <a href="#features" className="px-6 py-3 rounded-md border border-teal-600 text-teal-600 font-semibold hover:bg-teal-50 dark:hover:bg-zinc-800 transition">
                    Learn More
                    </a>
                </div>
            </div>
  
  
            {/* How it works */}
            <div className="py-32 bg-zinc-100 dark:bg-zinc-800">
                <div className="max-w-6xl mx-auto px-6 sm:px-12 flex flex-col lg:flex-row items-center gap-16">
                    {/* Left: Illustration / Mockup */}
                    <div className="flex-1 flex justify-center">
                        <div className="w-full max-w-md h-96 bg-teal-100 dark:bg-teal-900 rounded-2xl shadow-lg flex items-center justify-center text-teal-600 text-6xl font-bold">
                            💻
                        </div>
                    </div>

                    {/* Right: Feature Highlights */}
                    <div className="flex-1 flex flex-col gap-10">
                        <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                            Practice, Get Feedback, Improve
                        </h2>
                        <p className="text-lg text-zinc-700 dark:text-zinc-300 mb-6 max-w-lg">
                            Our AI-powered interview trainer helps you tackle real interview questions, receive instant feedback, and track your improvement over time.
                        </p>

                        <div className="grid gap-6">
                            <div className="flex gap-4 items-start">
                                <div className="text-teal-600 text-3xl">🎯</div>
                                <div>
                                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Targeted Practice</h3>
                                    <p className="text-zinc-600 dark:text-zinc-300">
                                    Focus on questions specific to your role or industry to maximize your preparation.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                                <div className="text-teal-600 text-3xl">💡</div>
                                <div>
                                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Instant Feedback</h3>
                                    <p className="text-zinc-600 dark:text-zinc-300">
                                    AI highlights strengths and weaknesses in your answers so you can improve quickly.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 items-start">
                            <div className="text-teal-600 text-3xl">📊</div>
                                <div>
                                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">Track Progress</h3>
                                    <p className="text-zinc-600 dark:text-zinc-300">
                                    Monitor your past sessions, compare your performance, and stay motivated as you improve.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <a
                        href="#get-started"
                        className="mt-8 inline-block px-6 py-3 bg-teal-600 text-white font-semibold text-lg rounded-xl hover:bg-teal-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                        >
                            Start Practicing
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}