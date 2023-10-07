import { ChangeEvent } from "react";

interface InputProps {
  label: string;
  id: string;
  value: string;
  type?: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ id, type = "text", value, label, handleChange }: InputProps) {

  return(
    <>
      <label htmlFor={id} className="modal-fields-label">
        { label }
      </label>
      <input 
        type={type}
        id={id} 
        className="modal-fields-input" 
        value={value}
        onChange={handleChange}
      />  
    </>
  );
}

export default Input;