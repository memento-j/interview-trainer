export default function Hero() {
    return(
        <section className="relative bg-gradient-to-b from-zinc-100 to-white dark:from-zinc-900 dark:to-black">
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-400/10 dark:bg-teal-500/7 rounded-full blur-[120px]" />
            </div>
            {/* Intro sections */}
            <div className="relative flex flex-col items-center text-center px-6 sm:px-12 lg:px-24 pt-32 pb-24">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-teal-600 to-teal-400 dark:from-teal-400 dark:to-teal-200 bg-clip-text text-transparent">
                Master Your Interviews with AI
                </h1>
                <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 mb-10 max-w-2xl leading-relaxed">
                Practice role-specific questions, get instant feedback, and boost your confidence.  
                PrepMate AI makes interview prep smarter and faster.
                </p>

                <div className="flex gap-4 flex-wrap justify-center">
                <a
                    href="#get-started"
                    className="px-6 py-3 rounded-xl bg-teal-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-transform"
                >
                    Get Started
                </a>
                <a
                    href="#features"
                    className="px-6 py-3 rounded-xl border border-teal-600 text-teal-600 dark:text-teal-400 font-semibold hover:bg-teal-50 dark:hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-transform"
                >
                    Learn More
                </a>
                </div>
            </div>
            {/* Overview Section */}
            <div id="features" className="relative py-34 bg-zinc-100 dark:bg-zinc-900">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    {/* Section heading */}
                    <div className="text-center max-w-4xl mx-auto mb-16">
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white mb-6">
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
                            <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-300 text-2xl shadow-md">
                            🎯
                            </div>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
                            Targeted Practice
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            Focus on questions specific to your role or industry to maximize your preparation.
                            </p>
                        </div>

                        {/* Feature card */}
                        <div className="p-8 rounded-2xl bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-300 text-white text-2xl shadow-md">
                            💡
                            </div>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
                            Instant Feedback
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            AI highlights strengths and weaknesses in your answers so you can improve quickly.
                            </p>
                        </div>

                        {/* Feature card */}
                        <div className="p-8 rounded-2xl bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-300 text-white text-2xl shadow-md">
                            📊
                            </div>
                            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
                            Track Progress
                            </h3>
                            <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                            Monitor your past sessions, compare performance, and stay motivated as you improve.
                            </p>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-16">
                    <a
                        href="#get-started"
                        className="inline-block px-8 py-4 bg-teal-600 text-white text-lg font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-transform"
                    >
                        Start Practicing
                    </a>
                    </div>
                </div>
            </div>
        </section>
    );
}