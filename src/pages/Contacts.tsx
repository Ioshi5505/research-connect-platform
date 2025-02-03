import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Contacts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8 text-center text-foreground">Контакты</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
                <p className="text-muted-foreground text-center mb-2">
                  Председатель СНО
                </p>
                <div className="text-center">
                  <a href="tel:+79774708293" className="text-accent hover:text-accent/80 transition-colors">
                    +7 977-470-82-93
                  </a>
                </div>
              </CardHeader>
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
                <p className="text-muted-foreground text-center mb-2">
                  Заместитель председателя СНО
                </p>
                <div className="text-center">
                  <a href="tel:+79096242127" className="text-accent hover:text-accent/80 transition-colors">
                    +7 909-624-21-27
                  </a>
                </div>
              </CardHeader>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <img 
                  src="/lovable-uploads/fd241724-2563-4a94-8d6e-f2aa68e99bf7.png" 
                  alt="Файзулина Лилия Рифкатовна" 
                  className="w-48 h-48 mx-auto mb-4 rounded-lg object-cover"
                />
                <h2 className="text-xl font-bold text-center text-foreground">
                  Файзулина Лилия Рифкатовна
                </h2>
                <p className="text-muted-foreground text-center mb-2">
                  Секретарь СНО
                </p>
                <div className="text-center">
                  <a href="tel:+79275515464" className="text-accent hover:text-accent/80 transition-colors">
                    +7 927-551-54-64
                  </a>
                </div>
              </CardHeader>
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
                <p className="text-muted-foreground text-center mb-2">
                  Представитель ФПиП
                </p>
                <div className="text-center">
                  <a href="tel:+79042857485" className="text-accent hover:text-accent/80 transition-colors">
                    +7 904-285-74-85
                  </a>
                </div>
              </CardHeader>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Дополнительные контакты</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-foreground">
                <Mail className="h-5 w-5 text-accent" />
                <a href="mailto:snorgust@mail.ru" className="hover:text-accent transition-colors">
                  snorgust@mail.ru
                </a>
              </div>
              <div className="flex items-center gap-2 text-foreground">
                <MapPin className="h-5 w-5 text-accent" />
                <span>г. Москва, ул. Лосиноостровская, 49</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contacts;