import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DefaultLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 justify-center p-6">
          <Outlet />
        </main>

        <Footer />
      </div>

      <div className="sfondo"></div>
    </>
  );
};

export default DefaultLayout;
