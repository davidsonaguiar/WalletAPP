import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  function exit() {
    sessionStorage.removeItem("token");
    navigate("/login");
  }

  return(
    <header className="header-container">
      <h1 className="header-title">Wallet Web</h1>
      <button className="header-button" onClick={exit}>
        <BiLogOut />
        SAIR
      </button>
    </header>
  );
}

export default Header;