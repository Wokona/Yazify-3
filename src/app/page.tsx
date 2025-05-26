import Header from "@/components/layout/header";
import HeroSection from "@/components/landing/hero-section";
import FeaturesSection from "@/components/landing/features-section";
import PhoneMockupSection from "@/components/landing/phone-mockup-section";
import Footer from "@/components/layout/footer";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <PhoneMockupSection />
      </main>
      <Footer />
    </div>
  );
}
