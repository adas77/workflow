import { type InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = ({ label, ...props }: Props) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer gap-2">
        {label && <span className="label-text">{label}</span>}
        <input type="checkbox" className="checkbox" {...props} />
      </label>
    </div>
  );
};

export default Checkbox;
