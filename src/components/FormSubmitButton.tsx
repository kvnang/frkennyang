import React from 'react';

interface Props {
  loading: boolean;
  title?: string;
  icon?: React.ReactChild;
}

export default function FormSubmitButton({ loading, title, icon }: Props) {
  return (
    <button
      type="submit"
      className="button form-submit-button"
      disabled={loading}
      style={{
        position: 'relative',
      }}
    >
      <span>{title || 'Send'}</span>
      {icon && <span className="icon">{icon}</span>}
      {loading && (
        <div
          className="form-submit-button__loader"
          style={{ height: '2rem', width: '2rem' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <path d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50" />
          </svg>
        </div>
      )}
    </button>
  );
}
