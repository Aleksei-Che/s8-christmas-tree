import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
    return (
        <nav className="bg-sky-800 text-white py-4 px-6">
      <ul className="flex space-x-6 justify-center">
        <li>
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
        </li>
        <li>
          <Link to="/mapa" className="hover:text-gray-300">
            Mapa
          </Link>
        </li>
        <li>
          <Link to="/fullcalendar" className="hover:text-gray-300">
            FullCalendar
          </Link>
        </li>
        <li>
          <Link to="/grafics" className="hover:text-gray-300">
            Gràfics
          </Link>
        </li>
      </ul>
    </nav>
    )
}
export default Navbar;
