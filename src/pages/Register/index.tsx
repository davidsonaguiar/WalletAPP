import { useState, FormEvent, ChangeEvent } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const initialState = { name: "", login: "", password: "" };

function Register() {

  const [ auth, setAuth ] = useState<typeof initialState>(initialState);
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

  
    const responseRegister = await api.post("/auth/register",{ 
      name: auth.name, 
      login: auth.login, 
      password: auth.password
    });

    if(responseRegister.status === 201) {

      const responseLogin = await api.post("/auth/login", { 
        login: auth.login, 
        password: auth.password 
      });

      if(responseLogin.status === 200) {
        const dataLogin = await responseLogin.data;
        sessionStorage.setItem("token", dataLogin);
        navigate("/");
      } else {
        console.log("Error durante login");
      }

    } else {
      console.log("Error de register: " + responseRegister.status);
    }
  }


  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = event.target.value;
    setAuth(prev => ({...prev, [name]: value}));
  }

  return(
    <div className="login-container">
      <h1 className="login-title">Wallet Web</h1>
      <form action="" className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="name" className="login-form-label">NAME</label>
        <input type="text" name="name" id="name" className="login-form-input" onChange={handleChange}/>
        <label htmlFor="login" className="login-form-label">LOGIN</label>
        <input type="text" name="login" id="login" className="login-form-input" onChange={handleChange}/>
        <label htmlFor="password" className="login-form-label">PASSWORD</label>
        <input type="password" name="password" id="password" className="login-form-input" onChange={handleChange}/>
        <button type="submit" className="login-form-button">ENTRAR</button>
      </form>
      <span className="login-or">OU</span>
      <button className="login-button-register" type="button">REGISTRE-SE</button>
      <div className="login-border-bottom"></div>
    </div>
  );
}

export default Register