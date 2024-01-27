import { ChangeEvent, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label?: string;
  value: string;
  options: string[];
  disabled?: boolean;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

function Select({
  id,
  label,
  value,
  options,
  disabled = false,
  handleChange,
}: SelectProps) {
  return (
    <div>
      {
        label &&
        <label htmlFor={id} className="modal-fields-label">
          {label}
        </label>
      }
      <select
        id={id}
        value={value}
        defaultValue=""
        disabled={disabled}
        onChange={handleChange}
        className="modal-fields-input"
      >
        <option value="" disabled>
          Selecione uma Opção
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
