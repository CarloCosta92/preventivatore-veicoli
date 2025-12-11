import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MultiStepForm from "./pages/MultiStepForm";
import User from "./pages/User";
import DefaultLayout from "./layout/DefaultLayout";
import { R_HOME, R_QUOTATION, R_QUOTES, R_USER } from "./data/Path";
import { GlobalProvider } from "./context/GlobalContext";
import Quotes from "./pages/Quotes";

function App() {
  return (
    <>
    <GlobalProvider>
        <BrowserRouter>
        <Routes>
          <Route path={R_HOME} element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path={R_QUOTATION} element={<MultiStepForm />} />
            <Route path={R_USER} element={<User />} />
             <Route path={R_QUOTES} element={<Quotes/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
    </>
  );
}

export default App;
