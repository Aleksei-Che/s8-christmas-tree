import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderButtons from "./buttons/HeaderButtons";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-sky-800 text-white py-4 px-6 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Кнопка гамбургера */}
        <div className="flex-shrink-0">
          {!menuOpen && (
            <button
              className="lg:hidden text-white hover:text-gray-300 focus:outline-none"
              onClick={() => setMenuOpen(true)}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Ссылки навигации */}
        <div className="flex-1">
          <ul
            className={`${
              menuOpen ? "block" : "hidden"
            } lg:flex lg:space-x-6 lg:justify-center lg:items-center w-full lg:w-auto mt-4 lg:mt-0`}
          >
            <li>
              <Link to="/" className="block px-3 py-2 hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link to="/mapa" className="block px-3 py-2 hover:text-gray-300">
                Mapa
              </Link>
            </li>
            <li>
              <Link
                to="/fullcalendar"
                className="block px-3 py-2 hover:text-gray-300"
              >
                FullCalendar
              </Link>
            </li>
            <li>
              <Link
                to="/grafics"
                className="block px-3 py-2 hover:text-gray-300"
              >
                Gràfics
              </Link>
            </li>

            {/* Горизонтальная линия и кнопки Header */}
            {menuOpen && (
              <>
                <hr className="my-4 border-gray-500" />
                <div className="flex flex-col space-y-2">
                  <HeaderButtons />
                </div>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
