import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { R_QUOTATION } from "../data/Path";

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-[70vh] flex flex-col justify-center max-w-5xl mx-auto px-4 space-y-32 text-default">
      {/* hero */}
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold">{t("hero.title")}</h1>
        <p className="text-muted max-w-xl mx-auto">{t("hero.description")}</p>

          <NavLink  className="bg-primary hover:bg-primary-hover text-white font-semibold px-6 py-3 rounded-lg" to={R_QUOTATION}>{t("hero.cta")}</NavLink>
      </div>

      {/*  istruzioni */}
      <div className="space-y-10">
        <h2 className="text-2xl font-semibold text-center">
          {t("instruction.title")}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-background-alt p-6 rounded-xl shadow-sm">
            <h3 className="font-bold mb-2">{t("instruction.step1.title")}</h3>
            <p className="text-muted text-sm">
              {t("instruction.step1.description")}
            </p>
          </div>

          <div className="bg-background-alt p-6 rounded-xl shadow-sm">
            <h3 className="font-bold mb-2">{t("instruction.step2.title")}</h3>
            <p className="text-muted text-sm">
              {t("instruction.step2.description")}
            </p>
          </div>

          <div className="bg-background-alt p-6 rounded-xl shadow-sm">
            <h3 className="font-bold mb-2">{t("instruction.step3.title")}</h3>
            <p className="text-muted text-sm">
              {t("instruction.step3.description")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
