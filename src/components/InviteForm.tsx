import React, { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
// import DatePicker from 'react-datepicker';
// import DayPickerInput from 'react-day-picker/DayPickerInput';
import { SnackbarContext } from './SnackbarContext';
import FormSubmitButton from './FormSubmitButton';
import countries from '../utils/countries';
import { FormMessageTypes } from '../types';
import { timeZones } from '../utils/timeZones';

interface Inputs {
  [key: string]: any;
  'form-name': string;
  date: string;
  alternateDate?: string;
  startTime: string;
  endTime: string;
  timeZone: string;
  organization: string;
  contactName: string;
  email: string;
  phone: string;
  eventLocation: string;
  venue: string;
  venueCapacity: string;
  addressStreet: string;
  addressStreet2: string;
  addressCity: string;
  addressState: string;
  addressZip: string;
  addressCountry: string;
  airport: string;
  attendance: string;
  age: string;
  diocese: string;
  topic: string;
  eventType: string;
  hasSpokenBefore: string;
  details?: string;
  title?: string; // Honeypot
}

const defaultTimeZone = 'Europe/Rome';

const defaultValues = {
  'form-name': 'invite',
  date: '',
  alternateDate: '',
  startTime: '',
  endTime: '',
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || defaultTimeZone,
  organization: '',
  contactName: '',
  email: '',
  phone: '',
  eventLocation: 'online',
  venue: '',
  venueCapacity: '',
  addressStreet: '',
  addressStreet2: '',
  addressCity: '',
  addressState: '',
  addressZip: '',
  addressCountry: 'Indonesia',
  airport: '',
  attendance: '',
  age: '',
  diocese: '',
  topic: '',
  eventType: '',
  hasSpokenBefore: 'no',
  details: '',
  title: '', // Honeypot
};

function formatTZ(str: string) {
  return str.replace(/_/g, ' ').replace(/\//g, ' / ');
}

function validateDate(value: string) {
  if (!value) {
    return true;
  }

  const todayDate = new Date();
  const date = new Date(`${value}T00:00:00`);
  return todayDate.getTime() < date.getTime()
    ? true
    : 'Please select a future date';
}

export default function InviteForm() {
  // React hook form
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
    getValues,
  } = useForm({ defaultValues });

  const [formMessage, setFormMessage] = useState<FormMessageTypes>({
    status: 'success',
    message: '',
    open: false,
  });

  const eventLocation = watch('eventLocation');
  const selectedTimeZone = watch('timeZone');

  // Set or Unset form message
  function handleResponse(response: Response) {
    if (response.ok) {
      setFormMessage({
        status: 'success',
        message: `Thank you. Your message has been sent. We will respond to your message as soon as possible.`,
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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);

    const endpoint = `/api/submit`;

    fetch(endpoint, {
      method: 'POST',
      // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => handleResponse(response))
      .catch((error) => console.error(error))
      .then(() => setLoading(false));
  };

  const { addSnackbar, removeSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    if (formMessage.open) {
      if (formMessage.status === 'error') {
        addSnackbar(formMessage.message, formMessage.status);
      }
    } else {
      removeSnackbar();
    }
  }, [formMessage, addSnackbar, removeSnackbar]);

  const validateIfInPersonEvent = (value: any) => {
    if (!value && getValues('eventLocation') !== 'online') {
      return 'Required when Type of Event is not Online';
    }
    return true;
  };

  return (
    <div className="invite-form">
      {(formMessage.open && formMessage.status === 'success' && (
        <div>
          <h2 className="h3">Thank You!</h2>
          <p>
            Your invitation has been sent. Fr. Kenny will get back to you as
            soon as possible.
          </p>
        </div>
      )) || (
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
          name="invite"
          netlify-honeypot="title"
          data-netlify="true"
        />
      )}
    </div>
  );
}
