import logo from "../assets/img/arbol.png";

const Header = () => {
  return (
    <header className="text-gray-300">
      <div className="py-4 px-6 flex relative">
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 items-center">
          <h1 className="text-6xl font-serif italic">Christmas Tree</h1>
          <p className="text-2xl font-serif mt-2">Dinos, qué hay en tu árbol de Navidad</p>
        </div>
        <div className="mx-auto">
          <img 
            src={logo} 
            alt="árbol de Navidad"
            className="h-48 w-auto" 
          />
        </div>
        <div className="absolute right-8 space-x-4">
          <button className="px-6 py-2 bg-rose-600 rounded hover:bg-rosef-500">Log In</button>
          <button className="px-6 py-2 bg-emerald-600 rounded hover:bg-emerald-500">Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
