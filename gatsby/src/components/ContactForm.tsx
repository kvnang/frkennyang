import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styled from 'styled-components';
import FormSubmitButton from './FormSubmitButton';
import { SnackbarContext } from './SnackbarContext';

const FormStyles = styled.div`
  margin-top: 3.5rem;

  input,
  textarea {
    /* background: transparent;
    border: 1px solid var(--white);
    padding: 0.75rem 1.25rem;
    color: var(--white);
    width: 100%; */

    /* &::placeholder {
      opacity: 1;
      color: var(--white);
      transition: var(--transition);
    }

    &:focus {
      &::placeholder {
        opacity: 0.5;
      }
    } */
  }

  /* textarea {
    resize: vertical;
    height: 9rem;
  } */

  button[type='submit'] {
    margin-left: auto;
    display: block;
  }
`;

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [formMessage, setFormMessage] = useState<FormMessageTypes>({
    status: 'success',
    message: '',
    open: false,
  });

  // Set or Unset form message
  function handleResponse(response: Response) {
    if (response.ok) {
      setFormMessage({
        status: 'success',
        message: `Thank you, your message has been sent! I'll get back to you as soon as possible.`,
        open: true,
      });
      reset(); // Clear form on success
    } else {
      setFormMessage({
        status: 'error',
        message: `Sorry, there's an error in sending your message. Please try again later.`,
        open: true,
      });
    }
  }

  // Netlify Forms Functions

  // Encode data
  function encode(data: Inputs) {
    return Object.keys(data)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(data[key] || '')}`
      )
      .join('&');
  }

  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    console.log(data);
    setLoading(true);

    const formData = encode(data);

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    })
      .then((response) => handleResponse(response))
      .catch((error) => console.error(error))
      .then(() => setLoading(false));
  };

  const { addSnackbar, removeSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    if (formMessage.open) {
      // if (formMessage.status === 'error') {
      addSnackbar(formMessage.message, formMessage.status);
      // }
    } else {
      removeSnackbar();
    }
  }, [formMessage, addSnackbar, removeSnackbar]);

  return (
    <FormStyles>
      <form action="/" onSubmit={handleSubmit(onSubmit)} data-netlify="true">
        <input type="hidden" value="Contact" {...register('form-name')} />
        <div className="form-fields">
          <div className="form-field half">
            <label htmlFor="name">
              <span className="visually-hidden">Name</span>
              <input
                type="text"
                id="name"
                placeholder="Name"
                aria-invalid={!!errors.name}
                {...register('name')}
              />
            </label>
          </div>
          <div className="form-field half">
            <label htmlFor="email">
              <span className="visually-hidden">Email</span>
              <input
                type="email"
                id="email"
                placeholder="Email *"
                required
                aria-invalid={!!errors.email}
                {...register('email', { required: true })}
              />
            </label>
          </div>
          <div className="form-field">
            <label htmlFor="message">
              <span className="visually-hidden">Message</span>
              <textarea
                id="message"
                placeholder="Message *"
                required
                aria-invalid={!!errors.message}
                {...register('message', { required: true })}
              />
            </label>
          </div>
          <div className="form-field submit">
            <FormSubmitButton loading={loading} title="Send" />
          </div>
        </div>
      </form>
    </FormStyles>
  );
}
