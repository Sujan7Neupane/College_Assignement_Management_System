import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-center" />
      <Header />

      <main className="flex-1 px-8 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default App;
