import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode[] | ReactNode;
}

function Container({ children }: ContainerProps ) {
  return(
    <div className="section-header-container">
      { children }
    </div>
  );
}

export default Container;