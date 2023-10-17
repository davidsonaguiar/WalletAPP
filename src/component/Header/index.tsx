import { BiLogOut } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  function exit() {
    sessionStorage.removeItem("token");
    navigate("/login");
  }

  return(
    <header className="header-container">
      <h1 className="header-title">Wallet Web</h1>
      <nav className="header-nav">
        <ul className="header-list-link">
          <li>
            <Link to="/" className="header-button">Home</Link>
          </li>
          <li>
            <Link to="/summary" className="header-button">Resumo</Link>
          </li>
          <li>
            <Link to="/metas" className="header-button">Metas</Link>
          </li>
        </ul>
      </nav>
      <button className="header-button" onClick={exit}>
        <BiLogOut />
        SAIR
      </button>
    </header>
  );
}

export default Header;