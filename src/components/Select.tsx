type Props = {
  label: string;
  options: string[];
  disabled?: boolean;
};

const Select = ({ label, options, disabled }: Props) => {
  return (
    <select
      className="select-bordered select w-full max-w-xs"
      disabled={disabled}
    >
      <option disabled selected>
        {label}
      </option>
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
};

export default Select;
