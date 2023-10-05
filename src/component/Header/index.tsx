import { BiLogOut } from "react-icons/bi";

function Header() {
  return(
    <header className="header-container">
      <h1 className="header-title">Wallet Web</h1>
      <button className="header-button">
        <BiLogOut />
        SAIR
      </button>
    </header>
  );
}

export default Header;