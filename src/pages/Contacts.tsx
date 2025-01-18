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
          
          {/* Contact Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Контактная информация</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2 text-foreground">Председатель:</h3>
                  <p className="text-foreground">Коблов Никита Дмитриевич</p>
                  <a href="tel:+79774708293" className="text-accent hover:text-accent/80 transition-colors">
                    +7 977-470-82-93
                  </a>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2 text-foreground">Заместитель:</h3>
                  <p className="text-foreground">Сорокин Егор Геннадьевич</p>
                  <a href="tel:+79096242127" className="text-accent hover:text-accent/80 transition-colors">
                    +7 909-624-21-27
                  </a>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2 text-foreground">Секретарь:</h3>
                  <p className="text-foreground">Файзулина Лилия Рифкатовна</p>
                  <a href="tel:+79275515464" className="text-accent hover:text-accent/80 transition-colors">
                    +7 927-551-54-64
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Адрес и связь</h2>
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

          {/* Council Members Section */}
          <h2 className="text-2xl font-semibold mb-8 text-center text-foreground">Управляющий совет</h2>
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

export default Contacts;