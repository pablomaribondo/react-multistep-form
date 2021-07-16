import { FC, FormEvent, useRef } from 'react';

interface FileInputProps {
  name: string;
  error: string;
  onChange: (name: string, stepKey: string, file?: FileList) => void;
  stepKey: string;
  fileName: string;
}

const FileInput: FC<FileInputProps> = ({
  name,
  stepKey,
  fileName,
  error,
  onChange
}) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const openFilePickerHandler = () => {
    fileInput.current?.click();
  };

  const fileChangeHandler = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      onChange(name, stepKey, event.currentTarget.files);
    } else {
      onChange(name, stepKey);
    }
  };

  return (
    <div className="mb-5">
      <input
        ref={fileInput}
        type="file"
        name={name}
        className="is-hidden"
        onChange={fileChangeHandler}
      />
      <div className="is-flex" style={{ alignItems: 'center' }}>
        <button
          type="button"
          className="button is-info mr-3"
          onClick={openFilePickerHandler}
        >
          Choose file
        </button>
        <p className="is-flex" style={{ alignItems: 'center' }}>
          {fileName}
          {fileName !== 'No file chosen' && (
            <button
              type="button"
              className="delete is-small ml-2"
              onClick={() => onChange(name, stepKey)}
            />
          )}
        </p>
      </div>
      {error && <div className="has-text-danger-dark">{error}</div>}
    </div>
  );
};

export default FileInput;
