import { Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Address Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-accent" />
              Адрес
            </h3>
            <p className="text-muted-foreground">
              г. Москва, ул. Лосиноостровская, 49
            </p>
          </div>

          {/* Contacts Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Phone className="h-5 w-5 text-accent" />
              Контакты
            </h3>
            <div className="space-y-2 text-muted-foreground">
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
            <div className="mt-4">
              <a 
                href="mailto:snorgust@mail.ru" 
                className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
              >
                <Mail className="h-4 w-4" />
                snorgust@mail.ru
              </a>
            </div>
          </div>

          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">О нас</h3>
            <p className="text-muted-foreground text-sm">
              СНО (Студенческое Научное Общество) — амбассадор РГУ «Соцтех», объединяющий студентов, 
              увлечённых наукой и карьерным ростом. Наши участники регулярно представляют свои проекты 
              на ведущих конкурсах и конференциях, а также успешно публикуют научные статьи. 
              Мы помогаем каждому студенту в сопровождении научных исследований и их реализации.
            </p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-8 border-t border-border">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Студенческое Научное Общество Российского государственного университета социальных технологий
              («СНО РГУ СоцТех»)
            </p>
            <p className="text-sm text-muted-foreground">
              © 2025. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};