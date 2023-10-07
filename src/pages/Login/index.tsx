import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

const initialState = { login: "", password: ""};

function Login() {

  const [ auth, setAuth ] = useState<typeof initialState>(initialState);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { login, password } = auth;
    const response = await api.post("/auth/login", { login, password });
    if(response.status === 200) {
      const data = await response.data;
      sessionStorage.setItem("token", data);
      navigate("/");
    } else {
      console.log("Error de login: " + response.status);
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;
    setAuth(prev => ({...prev, [name]: value}));
  }

  return(
    <>
      <div className="login-container">
        <h1 className="login-title">Wallet Web</h1>
        <form action="" className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="login" className="login-form-label">LOGIN</label>
          <input type="text" name="login" id="login" className="login-form-input" onChange={handleChange}/>
          <label htmlFor="password" className="login-form-label">PASSWORD</label>
          <input type="password" name="password" id="password" className="login-form-input" onChange={handleChange}/>
          <button type="submit" className="login-form-button">ENTRAR</button>
        </form>
        <span className="login-or">OU</span>
        <button className="login-button-register" type="button" onClick={() => navigate("/register")}>REGISTRE-SE</button>
        <div className="login-border-bottom"></div>
      </div>
    </>
  );
}

export default Login;