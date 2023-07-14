import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="center">
      <ul>
        <li className="pages">
          <Link to="/">Inicio</Link>
        </li>
        <li className="pages">
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
