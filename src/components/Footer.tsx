import { Mail, MapPin, Phone } from "lucide-react";
import { Image } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center mb-8">
          <img 
            src="/lovable-uploads/def14331-0192-4cb4-8bb0-eac6fa62eba2.png" 
            alt="СНО РГУ СоцТех Logo" 
            className="h-16 mb-4"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contacts Section - Left Side */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
              <Phone className="h-5 w-5 text-accent" />
              Контакты
            </h3>
            <div className="space-y-2 text-foreground">
              <p>
                <span className="font-medium">Председатель:</span> Коблов Никита Дмитриевич
                <br />
                <a href="tel:+79774708293" className="hover:text-accent transition-colors">
                  +7 977-470-82-93
                </a>
              </p>
              <p>
                <span className="font-medium">Заместитель:</span> Сорокин Егор Геннадьевич
                <br />
                <a href="tel:+79096242127" className="hover:text-accent transition-colors">
                  +7 909-624-21-27
                </a>
              </p>
              <p>
                <span className="font-medium">Секретарь:</span> Файзулина Лилия Рифкатовна
                <br />
                <a href="tel:+79275515464" className="hover:text-accent transition-colors">
                  +7 927-551-54-64
                </a>
              </p>
            </div>
          </div>

          {/* About Section - Right Side */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-foreground">О нас</h3>
            <p className="text-foreground text-sm">
              СНО (Студенческое Научное Общество) — амбассадор РГУ «Соцтех», объединяющий студентов, 
              увлечённых наукой и карьерным ростом. Наши участники регулярно представляют свои проекты 
              на ведущих конкурсах и конференциях, а также успешно публикуют научные статьи. 
              Мы помогаем каждому студенту в сопровождении научных исследований и их реализации.
            </p>
          </div>
        </div>

        {/* Address and Copyright Section - Bottom Center */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-foreground">
              <Mail className="h-5 w-5 text-accent" />
              <a href="mailto:snorgust@mail.ru" className="hover:text-accent transition-colors">
                snorgust@mail.ru
              </a>
            </div>
            <div className="flex items-center justify-center gap-2 text-foreground">
              <MapPin className="h-5 w-5 text-accent" />
              г. Москва, ул. Лосиноостровская, 49
            </div>
            <div className="space-y-2">
              <p className="text-sm text-foreground">
                Студенческое Научное Общество Российского государственного университета социальных технологий
                («СНО РГУ СоцТех»)
              </p>
              <p className="text-sm text-foreground">
                © 2025. Все права защищены.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};