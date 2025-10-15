export default function Footer() {
    return (
      <footer className="w-full bg-zinc-100 dark:bg-[#0F0F11]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Border Line */}
          <div className="border-t dark:border-zinc-800 mb-6"></div>
          <div className="flex justify-between">
            {/* Copyright messaage */}
            <p className="text-sm text-zinc-400 mt-2 sm:mt-3">
              © {new Date().getFullYear()} Practimate. All rights reserved.
            </p>
            {/* Socials links */}
            <div className="flex flex-row gap-5">
              <a href="https://github.com/memento-j/interview-trainer" target="_blank">
                  <img className="bg-zinc-400 dark:bg-zinc-950 hover:scale-105 size-8 sm:size-10 rounded-xl p-1.5 mr-1 transition-transform duration-150" src="/icons/github-mark-white.svg"/>
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
}