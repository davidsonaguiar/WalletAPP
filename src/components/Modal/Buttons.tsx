import { ReactNode } from "react"

interface ButtonsProps {
  children: ReactNode | ReactNode[];
}

function Buttons({ children }: ButtonsProps) {
  return(
    <div className="modal-buttons">
      { children }
    </div>
  );
}

export default Buttons;