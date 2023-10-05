import { ReactNode } from "react";

interface ContainerProps {
  visible: boolean;
  children: ReactNode[];
}

function Container({ visible, children }: ContainerProps) {
  return(
    <div className={`modal-background ${!visible ? "hidden": ""}`}>
      <div className="modal-container">
        { children }
        <div className="login-border-bottom"></div>
      </div>
    </div>
  );
}

export default Container;