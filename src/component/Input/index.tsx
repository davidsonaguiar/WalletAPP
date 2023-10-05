import { ChangeEvent } from "react";

interface InputProps {
  label: string;
  id: string;
  value: string;
  handleChange: (value: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ id, value, label, handleChange }: InputProps) {

  return(
    <>
      <label htmlFor={id} className="modal-fields-label">
        { label }
      </label>
      <input 
        type="text" 
        id={id} 
        className="modal-fields-input" 
        value={value}
        onChange={handleChange}
      />  
    </>
  );
}

export default Input;