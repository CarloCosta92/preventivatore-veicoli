import { House, UserCog } from "lucide-react";
import { NavLink } from "react-router-dom";
import { R_HOME, R_USER } from "../data/Path";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  return (
    <>
      <header className="bg-gray-900 text-white p-5 flex justify-between">
        <div>
          <h2 className="font-extrabold">
            <NavLink to={R_HOME}>{t("header.title")}</NavLink>
          </h2>
        </div>
        <nav>
          <ul className="flex gap-5">
            <li>
              <NavLink to={R_HOME}>
                <House />
              </NavLink>
            </li>
            <li>
              <NavLink to={R_USER}>
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
