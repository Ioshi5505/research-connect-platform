import { UserRoleManagement } from "@/components/UserRoleManagement";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const UserManagement = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <UserRoleManagement />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserManagement;