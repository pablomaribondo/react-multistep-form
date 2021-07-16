import { FC, FormEvent } from 'react';

type Option = {
  value: string;
  label: string;
};

interface SelectProps {
  name: string;
  value: string;
  onChange: (event: FormEvent<HTMLSelectElement>) => void;
  choices: Option[];
  error: string;
}

const Select: FC<SelectProps> = ({ name, value, onChange, choices, error }) => {
  return (
    <div className="mb-5">
      <div
        className={
          error ? 'select is-fullwidth is-danger' : 'select is-fullwidth'
        }
      >
        <select name={name} value={value} onChange={onChange}>
          {choices.map(choice => (
            <option key={choice.value} value={choice.value}>
              {choice.label}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="has-text-danger-dark">{error}</div>}
    </div>
  );
};

export default Select;
