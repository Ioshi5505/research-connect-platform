export const AboutSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">О нас</h2>
        <div className="prose lg:prose-xl mx-auto">
          <p className="text-gray-600">
            СНО (Студенческое Научное Общество) — амбассадор РГУ «Соцтех», объединяющий студентов, 
            увлечённых наукой и карьерным ростом. Наши участники регулярно представляют свои проекты 
            на ведущих конкурсах и конференциях, а также успешно публикуют научные статьи. 
            Мы помогаем каждому студенту в сопровождении научных исследований и их реализации.
          </p>
          <p className="text-primary font-bold text-center mt-6">
            СНО — твой билет в мир науки и карьерного успеха!
          </p>
        </div>
      </div>
    </section>
  );
};