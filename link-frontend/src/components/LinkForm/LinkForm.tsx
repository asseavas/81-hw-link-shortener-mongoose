import React, { useState } from 'react';
import './linkForm.css';

interface Props {
  onSubmit: (data: { originalUrl: string }) => void;
}

const LinkForm: React.FC<Props> = ({ onSubmit }) => {
  const [state, setState] = useState({ originalUrl: '' });

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ ...state });
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <form onSubmit={submitFormHandler} className="link-form">
      <input
        type="text"
        name="originalUrl"
        value={state.originalUrl}
        onChange={inputChangeHandler}
        placeholder="Enter your URL"
        className="link-input"
        required
      />
      <button type="submit" className="link-button">
        Shorten
      </button>
    </form>
  );
};

export default LinkForm;
