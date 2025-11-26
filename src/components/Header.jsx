import { HEADER } from "../data/Data";

const Header = () => {
  return (
    <>
      <header className="bg-blue-500 text-white p-4 text-center">
        <h2>{HEADER.title}</h2>
      </header>
    </>
  );
};

export default Header;
