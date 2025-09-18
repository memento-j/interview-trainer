import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";


export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-300 dark:bg-zinc-800">
        <NavBar/>
        <Hero/>
    </div>
  );
}
