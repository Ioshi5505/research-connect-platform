import { NewsSection } from "@/components/NewsSection";
import { Navbar } from "@/components/Navbar";

const News = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <NewsSection />
    </div>
  );
};

export default News;