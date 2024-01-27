import { ReactNode } from "react";

interface FieldsProps {
  children: ReactNode[] | ReactNode;
}

function Fields({ children }: FieldsProps) {
  return(
    <div className="modal-fields">
      { children }
    </div>
  );
}

export default Fields;