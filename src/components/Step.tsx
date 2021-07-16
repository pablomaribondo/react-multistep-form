import { FC, FormEvent, MouseEvent, ReactNode } from 'react';

import Input from './Input';
import Select from './Select';
import FileInput from './FileInput';

interface FormDataContent {
  [key: string]: {
    value?: string;
    required?: boolean;
    type?: string;
    placeholder?: string;
    email?: boolean;
    minLength?: number;
    fileValue?: FileList;
    choices?: { label: string; value: string }[];
    file?: boolean;
    fileName?: string;
    allowedTypes?: string[];
    maxFileSize?: number;
  };
}

interface StepProps {
  data: FormDataContent;
  onChange: (
    stepKey: string,
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onFileChange: (name: string, step: string, file?: FileList) => void;
  onStepChange: (values: FormDataContent, event: MouseEvent) => void;
  errors: {
    [key: string]: string;
  };
  stepKey: string;
  step: number;
  onPrevStep: (step: number) => void;
}

const Step: FC<StepProps> = ({
  data,
  onChange,
  onFileChange,
  onStepChange,
  errors,
  stepKey,
  step,
  onPrevStep
}) => {
  const output = Object.entries(data).reduce(
    (accumulator, [elementKey, element]) => {
      if (element && element.type && element.type.split(':')[0] === 'input') {
        const component = (
          <Input
            key={elementKey}
            placeholder={element.placeholder || ''}
            name={elementKey}
            value={element.value || ''}
            error={errors[elementKey]}
            type={element.type.split(':')[1]}
            onChange={event => onChange(stepKey, event)}
          />
        );

        accumulator.push(component);
      } else if (element.type === 'select') {
        const component = (
          <Select
            key={elementKey}
            name={elementKey}
            value={element.value || ''}
            error={errors[elementKey]}
            choices={element.choices || []}
            onChange={event => onChange(stepKey, event)}
          />
        );

        accumulator.push(component);
      } else if (element.type === 'file') {
        const component = (
          <FileInput
            key={elementKey}
            error={errors[elementKey]}
            name={elementKey}
            stepKey={stepKey}
            fileName={element.fileName || ''}
            onChange={onFileChange}
          />
        );

        accumulator.push(component);
      }

      return accumulator;
    },
    [] as ReactNode[]
  );

  return (
    <>
      {output}
      {step > 1 && (
        <button
          type="button"
          className="button is-warning mr-2"
          onClick={() => onPrevStep(step - 1)}
        >
          Go back
        </button>
      )}
      <button
        type="button"
        className="button is-link"
        onClick={event => onStepChange(data, event)}
      >
        Next
      </button>
    </>
  );
};

export default Step;
