import AppOverview from "@/components/AppOverview";
import FeedbackDemo from "@/components/FeedbackDemo";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";


export default function HomePage() {
  return (
    <div>
        <Hero/>
        <FeedbackDemo/>
        <AppOverview/>
        <Footer/>
    </div>
  );
}
