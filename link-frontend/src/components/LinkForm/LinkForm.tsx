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
        className="link-input"
        placeholder="Enter your URL here"
        required
      />
      <button type="submit" className="shorten-button">
        Shorten
      </button>
    </form>
  );
};

export default LinkForm;
