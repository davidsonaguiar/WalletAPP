import { Outlet } from "react-router-dom";
import Header from "./component/Header";

function App() {
  return(
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;