import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-serif font-bold text-primary">СНО РГУСоцтех</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/news" className="text-gray-700 hover:text-primary">Новости</Link>
            <Link to="/events" className="text-gray-700 hover:text-primary">Мероприятия</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};