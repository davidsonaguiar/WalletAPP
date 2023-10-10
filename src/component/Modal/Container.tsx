import { ReactNode, FormEvent } from 'react';

interface ContainerProps {
  visible: boolean;
  method: "post" | "put" | "delete" | "get";
  handleSubmit: (event: FormEvent) => void;
  children: ReactNode[];
}

function Container({ visible, children, method, handleSubmit }: ContainerProps) {
  return(
    <div className={`modal-background ${!visible ? "hidden": ""}`}>
      <form className="modal-container" onSubmit={handleSubmit} method={method}>
        { children }
        <div className="login-border-bottom"></div>
      </form>
    </div>
  );
}

export default Container;