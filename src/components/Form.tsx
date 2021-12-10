import { FC, FormEvent, MouseEvent, useState } from 'react';

import Step from './Step';
import Preview from './Preview';
import validate from '../helpers/validate';

interface FormData {
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

const DEFAULT_DATA = {
  stepOne: {
    firstName: {
      value: '',
      required: true,
      type: 'input',
      placeholder: 'First name'
    },
    lastName: {
      value: '',
      required: true,
      type: 'input',
      placeholder: 'Last name'
    }
  },
  stepTwo: {
    email: {
      value: '',
      email: true,
      type: 'input',
      placeholder: 'Email'
    },
    password: {
      value: '',
      minLength: 6,
      type: 'input:password',
      placeholder: 'Password'
    }
  },
  stepThree: {
    gender: {
      value: '',
      required: true,
      type: 'select',
      choices: [
        { value: '', label: 'Choose gender' },
        { value: 'female', label: 'Female' },
        { value: 'male', label: 'Male' }
      ]
    },
    image: {
      required: true,
      file: true,
      fileName: 'No file chosen',
      type: 'file',
      allowedTypes: ['png', 'jpg', 'jpeg'],
      maxFileSize: 1024
    }
  }
};

const Form: FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] =
    useState<{ [key: string]: FormData }>(DEFAULT_DATA);
  const [errors, setErrors] = useState({});

  const changeHandler = (
    stepValue: string,
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    event.persist();

    const { name, value } = event.currentTarget;

    setFormData(prevState => ({
      ...prevState,
      [stepValue]: {
        ...prevState[stepValue],
        [name]: {
          ...prevState[stepValue][name],
          value
        }
      }
    }));
  };

  const fileChangeHandler = (
    name: string,
    stepValue: string,
    file?: FileList
  ) => {
    setFormData(prevState => ({
      ...prevState,
      [stepValue]: {
        ...prevState[stepValue],
        [name]: {
          ...prevState[stepValue][name],
          fileValue: file,
          fileName: file && file[0].name ? file[0].name : 'No file chosen'
        }
      }
    }));
  };

  const stepChangeHandler = (values: FormData, event: MouseEvent) => {
    event.preventDefault();

    const newErrors = validate(values);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0)
      setStep(prevState => prevState + 1);
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const file = formData.stepThree.image.fileValue
      ? formData.stepThree.image.fileValue[0]
      : '';

    const data = new FormData();
    data.append('firstName', formData.stepOne.firstName.value || '');
    data.append('lastName', formData.stepOne.lastName.value || '');
    data.append('email', formData.stepTwo.email.value || '');
    data.append('password', formData.stepTwo.password.value || '');
    data.append('gender', formData.stepThree.gender.value || '');
    data.append('image', file);

    console.log(data);
  };

  return (
    <form onSubmit={submitHandler}>
      <h1 className="is-size-2 has-text-centered mb-4">Create an account</h1>
      {step === 1 && (
        <Step
          data={formData.stepOne}
          errors={errors}
          stepKey="stepOne"
          step={1}
          onChange={changeHandler}
          onStepChange={stepChangeHandler}
          onFileChange={() => {}}
          onPrevStep={() => {}}
        />
      )}
      {step === 2 && (
        <Step
          data={formData.stepTwo}
          errors={errors}
          stepKey="stepTwo"
          step={2}
          onChange={changeHandler}
          onStepChange={stepChangeHandler}
          onPrevStep={stepState => setStep(stepState)}
          onFileChange={() => {}}
        />
      )}
      {step === 3 && (
        <Step
          data={formData.stepThree}
          errors={errors}
          stepKey="stepThree"
          step={3}
          onChange={changeHandler}
          onStepChange={stepChangeHandler}
          onFileChange={fileChangeHandler}
          onPrevStep={stepState => setStep(stepState)}
        />
      )}
      {step === 4 && (
        <Preview
          data={[
            {
              label: 'First name',
              value: formData.stepOne.firstName.value
            },
            {
              label: 'Last name',
              value: formData.stepOne.lastName.value
            },
            { label: 'Email', value: formData.stepTwo.email.value },
            {
              label: 'Password',
              value: formData.stepTwo.password.value
            },
            { label: 'Gender', value: formData.stepThree.gender.value },
            {
              label: 'Image',
              value:
                formData.stepThree.image.fileValue &&
                URL.createObjectURL(formData.stepThree.image.fileValue[0]),
              image: true
            }
          ]}
          onPrevStep={() => setStep(prevState => prevState - 1)}
        />
      )}
    </form>
  );
};

export default Form;
