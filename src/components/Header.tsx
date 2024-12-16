import logo from "../assets/img/arbol.png";
import HeaderButtons from "./buttons/HeaderButtons";

const Header = () => {
  return (
    <header className="relative text-gray-300">
  <div className="py-4 px-6 flex flex-col sm:flex-row items-center justify-between relative">
    {/* Заголовок и текст */}
    <div className="absolute top-1/2 transform -translate-y-1/2 flex flex-col items-center sm:items-start text-center sm:text-left">
      <h1 className="text-4xl sm:text-6xl font-serif italic">Christmas Tree</h1>
      <p className="text-lg sm:text-2xl font-serif mt-2">
        Qué hay en tu árbol de Navidad?
      </p>
    </div>

    <div className="mx-auto sm:justify-center mt-8 sm:mt-0 flex-shrink-0">
  <img
    src={logo}
    alt="árbol de Navidad"
    className="h-20 sm:h-48 w-auto mt-4 sm:mt-0"
  />
</div>

    {/* Кнопки */}
    <div className="absolute top-2 right-2 hidden md:flex space-x-4">
      <HeaderButtons />
    </div>
  </div>
</header>

  );
};

export default Header;
