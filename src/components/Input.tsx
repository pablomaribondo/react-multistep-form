import { FC, FormEvent } from 'react';

interface InputProps extends HTMLInputElement {
  error: string;
  onChange: (event: FormEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
  type = 'text',
  placeholder,
  name,
  value,
  onChange,
  error
}) => {
  return (
    <div className="mb-5">
      <input
        className={error ? 'input is-danger' : 'input'}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        autoComplete="off"
        onChange={onChange}
      />
      {error && <div className="has-text-danger-dark">{error}</div>}
    </div>
  );
};

export default Input;
