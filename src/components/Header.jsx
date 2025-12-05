import { House, UserCog } from "lucide-react";
import { NavLink } from "react-router-dom";
import { R_HOME, R_USER } from "../data/Path";
import { useTranslation } from "react-i18next";



const Header = () => {
  const { t } = useTranslation();
  return (
    <>
      <header className="bg-[#121314] text-white p-5 flex justify-between">
        <div>
          <h2 className="font-extrabold">
            <NavLink to={R_HOME}>{t("header.title")}</NavLink>
          </h2>
        </div>
        <nav>
          <ul className="flex gap-5 items-center">
            <li>
              <NavLink to={R_HOME} className="transition duration-300 hover:scale-125 transform block">
                <House />
              </NavLink>
            </li>
            <li>
              <NavLink to={R_USER} className="transition duration-300 hover:scale-125 transform block">
                <UserCog />
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
