import AppDemo from "@/components/AppDemo";
import AppOverview from "@/components/AppOverview";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";


export default function HomePage() {
  return (
    <div>
        <Hero/>
        <AppOverview/>
        <AppDemo/>
        <Footer/>
    </div>
  );
}
