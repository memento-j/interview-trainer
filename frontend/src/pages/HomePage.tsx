import AppOverview from "@/components/AppOverview";
import FeedbackDemo from "@/components/FeedbackDemo";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ScrollToTop from "@/components/ScrollToTop";


export default function HomePage() {
  return (
    <div>
        <ScrollToTop/>
        <Hero/>
        <FeedbackDemo/>
        <AppOverview/>
        <Footer/>
    </div>
  );
}
