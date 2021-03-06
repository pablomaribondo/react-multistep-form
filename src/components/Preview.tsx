import { FC } from 'react';

interface PreviewProps {
  data: {
    label: string;
    value: string | undefined;
    image?: boolean;
  }[];
  onPrevStep: () => void;
}

const Preview: FC<PreviewProps> = ({ data, onPrevStep }) => {
  return (
    <div className="panel is-primary">
      <p className="panel-heading">Your data</p>
      <div className="panel-block is-block">
        <ul className="py-5">
          {data.map(input => (
            <li key={input.label} className="py-2">
              {input.image ? (
                <>
                  <strong>{input.label}</strong>{' '}
                  <img src={input.value} alt="" style={{ maxWidth: '100px' }} />
                </>
              ) : (
                <>
                  <strong>{input.label}</strong> {input.value}
                </>
              )}
            </li>
          ))}
        </ul>
        <div>
          <button
            type="button"
            className="button is-warning mr-2"
            onClick={onPrevStep}
          >
            Go back
          </button>
          <button type="submit" className="button is-primary">
            Submit form
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preview;
