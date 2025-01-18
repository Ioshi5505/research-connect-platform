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
                  src="/lovable-uploads/011f6b43-8922-4796-aa49-d4e6d274d35d.png" 
                  alt="Коблов Никита Дмитриевич" 
                  className="w-48 h-48 mx-auto mb-4 rounded-lg object-cover"
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

            <Card className="bg-card">
              <CardHeader>
                <img 
                  src="/lovable-uploads/d109f474-0f6a-4e2d-9036-242a74fdcd9a.png" 
                  alt="Сорокин Егор Геннадьевич" 
                  className="w-48 h-48 mx-auto mb-4 rounded-lg object-cover"
                />
                <h2 className="text-xl font-bold text-center text-foreground">
                  Сорокин Егор Геннадьевич
                </h2>
                <p className="text-muted-foreground text-center">
                  Заместитель председателя СНО
                </p>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 border-primary pl-4 italic text-foreground">
                  "Настоящий программист видит возможности там, где другие видят ограничения."
                </blockquote>
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <img 
                  src="/lovable-uploads/6cbabdb7-f8c2-4e11-88bd-9d9f4ad26642.png" 
                  alt="Пищулин Владислав Викторович" 
                  className="w-48 h-48 mx-auto mb-4 rounded-lg object-cover"
                />
                <h2 className="text-xl font-bold text-center text-foreground">
                  Пищулин Владислав Викторович
                </h2>
                <p className="text-muted-foreground text-center">
                  Представитель ФПиП
                </p>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 border-primary pl-4 italic text-foreground">
                  "У каждого человека есть желания, которые он не сообщает другим, и желания, в которых он не сознаётся даже себе самому"
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