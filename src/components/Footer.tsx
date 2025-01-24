import { Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-8 mb-4">
            <a href="https://rgust.ru/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
              <img 
                src="/lovable-uploads/e0d0e47d-0405-42cb-92cd-e526e1216b72.png" 
                alt="РГУ СоцТех Логотип" 
                className="h-16"
              />
            </a>
            <img 
              src="/lovable-uploads/caf81f94-e38f-40c4-bd66-2cfbd94613f3.png" 
              alt="СНО Логотип" 
              className="h-16"
            />
          </div>
          <div className="flex gap-4 items-center">
            <a 
              href="https://rgust.ru/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent transition-colors"
            >
              Официальный сайт
            </a>
            <span className="text-foreground">•</span>
            <a 
              href="https://t.me/SNORgust" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent transition-colors"
            >
              Телеграм СНО
            </a>
            <span className="text-foreground">•</span>
            <a 
              href="https://t.me/rgusocteh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-foreground hover:text-accent transition-colors"
            >
              Телеграм РГУ
            </a>
          </div>
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
