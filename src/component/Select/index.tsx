import { ChangeEvent } from "react";

interface SelectProps {
  id: string;
  label: string;
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
  const optionsList = options.map((option) => (
    <option key={option} value={option}>
      {option}
    </option>
  ));

  return (
    <>
      <label htmlFor={id} className="modal-fields-label">
        {label}
      </label>
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={handleChange}
        className="modal-fields-input"
      >
        <option value="" disabled selected={true}>
          Selecione uma Opcão
        </option>
        {optionsList}
      </select>
    </>
  );
}

export default Select;
