import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#121314] text-gray-300 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm">
          <h3 className="text-white text-lg font-semibold">
            {t("footer.title")}
          </h3>
          <p className="text-gray-400">{t("footer.description")}</p>
        </div>

        <ul className="text-sm text-gray-400 flex flex-col md:flex-row gap-2 md:gap-6">
          <li>{t("footer.email")}</li>
          <li>{t("footer.assistance")}</li>
        </ul>
      </div>

      <div className="text-center text-gray-500 text-xs mt-6 border-t border-gray-700 pt-4">
        {t("footer.rights")}
      </div>
    </footer>
  );
};

export default Footer;
