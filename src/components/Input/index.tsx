import { ChangeEvent, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  value: string;
  type?: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Input({ id, type = "text", value, label, handleChange, ...rest }: InputProps) {

  return(
    <>
      <label htmlFor={id} className="modal-fields-label">
        { label }
      </label>
      <input 
        {...rest}
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