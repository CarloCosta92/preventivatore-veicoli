import { FOOTER } from "../data/Data";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-gray-300 py-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm">
            <h3 className="text-white text-lg font-semibold">{FOOTER.title}</h3>
            <p className="text-gray-400">{FOOTER.description}</p>
          </div>

          <ul className="text-sm text-gray-400 flex flex-col md:flex-row gap-2 md:gap-6">
            <li>{FOOTER.email}</li>
            <li>{FOOTER.assistance}</li>
          </ul>
        </div>

        <div className="text-center text-gray-500 text-xs mt-6 border-t border-gray-700 pt-4">
          {FOOTER.rights}
        </div>
      </footer>
    </>
  );
};

export default Footer;
