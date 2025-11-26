import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import MultiStepForm from "./pages/MultiStepForm";
import User from "./pages/User";
import DefaultLayout from "./layout/DefaultLayout";
import { R_HOME, R_QUOTATION, R_USER } from "./data/Path";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={R_HOME} element={<DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path={R_QUOTATION} element={<MultiStepForm />} />
            <Route path={R_USER} element={<User />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
