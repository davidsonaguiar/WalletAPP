import Container from "./Container";
import Fields from "./Fields";
import Buttons from "./Buttons";
// function Modal({ visible = false, id, addAccount}: ModalAccountProps) {

  // const [ name, setName ] = useState("");

  // function handleInputName(event: ChangeEvent<HTMLInputElement>) {
  //   setName(event.target.value);
  // }

  // return(
  //   <div className={`modal-background ${!visible ? "hidden": ""}`}>
  //     <div className="modal-container">
  //       <div className="modal-fields">

  //       </div>
  //       <div className="modal-buttons">
  //         <button className="modal-header-button confirm" onClick={() => addAccount(name, id)}>
  //           <AiOutlineSave />
  //           Salvar
  //         </button>
  //         <button className="modal-header-button default">
  //           <AiOutlineClose />
  //           Cancelar
  //         </button>
  //       </div>
  //       <div className="login-border-bottom"></div>
  //     </div>
  //   </div>
  // );
// }

const Modal = {
  Container,
  Fields,
  Buttons,
}

export default Modal;