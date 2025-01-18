import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Council = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8 text-center text-foreground">Управляющий совет</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-card">
              <CardHeader>
                <img 
                  src="/lovable-uploads/d457d329-afed-4a9d-b31e-49412a64a9c7.png" 
                  alt="СНО РГУ СоцТех Logo" 
                  className="w-32 h-32 mx-auto mb-4 rounded-full object-cover"
                />
                <h2 className="text-xl font-bold text-center text-foreground">
                  Коблов Никита Дмитриевич
                </h2>
                <p className="text-muted-foreground text-center">
                  Председатель СНО
                </p>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 border-primary pl-4 italic text-foreground">
                  "Программист тот, кто не видит предела в развитии!"
                </blockquote>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Council;