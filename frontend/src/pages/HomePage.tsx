import FeatureSpotlight from "@/components/FeatureSpotlight";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ScrollToTop from "@/components/ScrollToTop";
import ComparisonSection from "@/components/Comparison";


export default function HomePage() {
  return (
    <div>
        <ScrollToTop/>
        <Hero/>
        <FeatureSpotlight/>
        <ComparisonSection/>
        <Footer/>
    </div>
  );
}