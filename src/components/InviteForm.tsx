import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
// import DatePicker from 'react-datepicker';
// import DayPickerInput from 'react-day-picker/DayPickerInput';
// import { Helmet } from 'react-helmet';
import { Link } from 'gatsby';
import { SnackbarContext } from './SnackbarContext';
import { breakpoints } from '../styles/breakpoints';
import FormSubmitButton from './FormSubmitButton';
import countries from '../utils/countries';
import { FormMessageTypes } from '../types';

interface Inputs {
  [key: string]: any;
  'form-name': string;
  date: string;
  alternateDate?: string;
  startTime: string;
  endTime: string;
  organization: string;
  contactName: string;
  email: string;
  phone: string;
  eventLocation: string;
  venue: string;
  venueCapacity: string;
  addressStreet: string;
  addressStreet2: string;
  addressState: string;
  addressZip: string;
  addressCountry: string;
  airport: string;
  attendance: number;
  diocese: string;
  topic: string;
  eventType: string;
  hasSpokenBefore: string;
  details?: string;
  title?: string; // Honeypot
}

const defaultValues = {
  'form-name': 'invite',
  date: '',
  alternateDate: '',
  startTime: '',
  endTime: '',
  organization: '',
  contactName: '',
  email: '',
  phone: '',
  eventLocation: 'online',
  venue: '',
  venueCapacity: '',
  addressStreet: '',
  addressStreet2: '',
  addressState: '',
  addressZip: '',
  addressCountry: 'Indonesia',
  airport: '',
  attendance: '',
  diocese: '',
  topic: '',
  eventType: '',
  hasSpokenBefore: 'no',
  details: '',
  title: '', // Honeypot
};

const FormStyles = styled.div`
  /* background-color: var(--dark-grey); */
  /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.32); */
  display: flex;
  padding: 1.5rem 0 0;
  margin: 2.5rem 0 0;
  border-top: 1px solid var(--grey);

  @media ${breakpoints.tablet} {
    border: 1px solid var(--grey);
    padding: 1.5rem;
    margin: 2.5rem 0 0;
  }

  @media ${breakpoints.laptop} {
    padding: 2.5rem;
    margin: 2.5rem -2.5rem 0;
  }
`;

export default function InviteForm() {
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

  // Netlify Forms Functions

  // Encode data

  // IF the form does NOT contain File upload
  function encode(data: Inputs) {
    function encodeObject(
      object: { [key: string]: any },
      parentKey: string
    ): string {
      return Object.keys(object)
        .map((key) => {
          if (object[key] && typeof object[key] === 'object') {
            return encodeObject(data[key], `${parentKey}[${key}]`);
          }
          return `${`${encodeURIComponent(parentKey)}[${encodeURIComponent(
            key
          )}]`}=${encodeURIComponent(object[key] || '')}`;
        })
        .join('&');
    }

    return Object.keys(data)
      .map((key) => {
        if (data[key] && typeof data[key] === 'object') {
          return encodeObject(data[key], key);
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(
          data[key] || ''
        )}`;
      })
      .join('&');
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
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

  // Get min data
  const daysFromToday = 30;
  const minDate = new Date(
    new Date().getTime() + daysFromToday * 24 * 60 * 60 * 1000
  );
  const dd = String(minDate.getDate()).padStart(2, '0');
  const mm = String(minDate.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = minDate.getFullYear();
  const minDateYMD = `${yyyy}-${mm}-${dd}`;

  return (
    <FormStyles>
      {(formMessage.open && formMessage.status === 'success' && (
        <div>
          <h2 className="h3">Thank You!</h2>
          <p>
            Your invitation has been sent. I will get back to you as soon as
            possible.
          </p>
        </div>
      )) || (
        <form
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
          name="invite"
          netlify-honeypot="title"
          data-netlify="true"
        >
          <input type="hidden" value="invite" {...register('form-name')} />
          <div className="form-fields">
            <div className="form-field heading">
              <h2 className="h3">Event Date</h2>
              <p className="small">
                Note: You will only be able to propose dates beyond 60 days from
                today.
              </p>
            </div>
            <div className="form-field half">
              <label htmlFor="date">
                <span>Date *</span>
                <input
                  type="date"
                  id="alternate-date"
                  min={minDateYMD}
                  required
                  aria-invalid={!!errors.date}
                  {...register('date', { required: true })}
                />
              </label>
            </div>
            <div className="form-field half">
              <label htmlFor="alternate-date">
                <span>Potential Alternate Date</span>
                <input
                  type="date"
                  id="alternate-date"
                  min={minDateYMD}
                  aria-invalid={!!errors.date}
                  {...register('alternateDate')}
                />
              </label>
            </div>
            <div className="form-field half">
              <label htmlFor="start-time">
                <span>Start Time *</span>
                <input
                  type="time"
                  id="start-time"
                  required
                  placeholder="Start Time"
                  aria-invalid={!!errors.startTime}
                  {...register('startTime', { required: true })}
                />
              </label>
            </div>
            <div className="form-field half">
              <label htmlFor="end-time">
                <span>End Time *</span>
                <input
                  type="time"
                  id="end-time"
                  required
                  placeholder="End Time"
                  aria-invalid={!!errors.endTime}
                  {...register('endTime', { required: true })}
                />
              </label>
            </div>
            <div className="form-field heading">
              <h2 className="h3">Contact Information</h2>
            </div>
            <div className="form-field half">
              <label htmlFor="organization">
                <span>Organization *</span>
                <input
                  type="text"
                  id="organization"
                  placeholder="Your Organization"
                  autoComplete="organization"
                  required
                  aria-invalid={!!errors.organization}
                  {...register('organization', { required: true })}
                />
              </label>
            </div>
            <div className="form-field half">
              <label htmlFor="name">
                <span>Contact Name *</span>
                <input
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  autoComplete="name"
                  required
                  aria-invalid={!!errors.contactName}
                  {...register('contactName', { required: true })}
                />
              </label>
            </div>
            <div className="form-field half">
              <label htmlFor="email">
                <span>Email *</span>
                <input
                  type="email"
                  id="email"
                  placeholder="email@example.com"
                  aria-invalid={!!errors.email}
                  {...register('email', { required: true })}
                />
              </label>
            </div>
            <div className="form-field half">
              <label htmlFor="phone">
                <span>Phone (WhatsApp) *</span>
                <input
                  type="tel"
                  id="phone"
                  placeholder="000-000-0000"
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  {...register('phone', { required: true })}
                />
              </label>
            </div>
            <div className="form-field heading">
              <h2 className="h3">Event Details</h2>
            </div>
            <div className="form-field">
              <fieldset
                className="radio-group"
                aria-invalid={!!errors.eventLocation}
              >
                <legend className="radio-group__label visually-hidden">
                  Type of Event
                </legend>
                <div className="radio-group__radio">
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label>
                    <input
                      type="radio"
                      id="event-location"
                      value="online"
                      required
                      {...register('eventLocation', {
                        required: true,
                      })}
                    />
                    <span>Online Event</span>
                  </label>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label>
                    <input
                      type="radio"
                      id="event-location"
                      value="in-person"
                      required
                      {...register('eventLocation', {
                        required: true,
                      })}
                    />
                    <span>In-Person Event</span>
                  </label>
                </div>
              </fieldset>
            </div>
            <div
              className="form-field half"
              style={{
                display: eventLocation === 'online' ? 'none' : '',
              }}
            >
              <label htmlFor="venue">
                <span>Venue *</span>
                <input
                  type="text"
                  id="venue"
                  placeholder="Venue"
                  aria-invalid={!!errors.venue}
                  {...register('venue', {
                    validate: {
                      required: (value) => validateIfInPersonEvent(value),
                    },
                  })}
                />
              </label>
            </div>
            <div
              className="form-field half"
              style={{
                display: eventLocation === 'online' ? 'none' : '',
              }}
            >
              <label htmlFor="venue-capacity">
                <span>Venue Capacity</span>
                <input
                  type="number"
                  id="venue-capacity"
                  placeholder="Venue Capacity"
                  aria-invalid={!!errors.venueCapacity}
                  {...register('venueCapacity')}
                />
              </label>
            </div>
            <div
              className="form-field"
              style={{
                display: eventLocation === 'online' ? 'none' : '',
              }}
            >
              <label htmlFor="venue-address-street">
                <span>Venue Address</span>
                <input
                  type="text"
                  id="venue-address-street"
                  placeholder="Street *"
                  aria-invalid={!!errors.addressStreet}
                  {...register('addressStreet', {
                    validate: {
                      required: (value) => validateIfInPersonEvent(value),
                    },
                  })}
                />
              </label>
            </div>
            <div
              className="form-field"
              style={{
                display: eventLocation === 'online' ? 'none' : '',
              }}
            >
              <label htmlFor="venue-address-street-2">
                <span className="visually-hidden">
                  Venue Address (Street Line 2)
                </span>
                <input
                  type="text"
                  id="venue-address-street-2"
                  placeholder="Street Line 2"
                  aria-invalid={!!errors.addressStreet2}
                  {...register('addressStreet2')}
                />
              </label>
            </div>
            <div
              className="form-field half"
              style={{
                display: eventLocation === 'online' ? 'none' : '',
              }}
            >
              <label htmlFor="venue-address-state">
                <span className="visually-hidden">Venue State / Province</span>
                <input
                  type="text"
                  id="venue-address-state"
                  placeholder="State / Province *"
                  aria-invalid={!!errors.addressState}
                  {...register('addressState', {
                    validate: {
                      required: (value) => validateIfInPersonEvent(value),
                    },
                  })}
                />
              </label>
            </div>
            <div
              className="form-field half"
              style={{
                display: eventLocation === 'online' ? 'none' : '',
              }}
            >
              <label htmlFor="venue-address-zip">
                <span className="visually-hidden">Venue ZIP / Postal Code</span>
                <input
                  type="text"
                  id="venue-address-zip"
                  placeholder="ZIP / Postal Code *"
                  aria-invalid={!!errors.addressZip}
                  {...register('addressZip', {
                    validate: {
                      required: (value) => validateIfInPersonEvent(value),
                    },
                  })}
                />
              </label>
            </div>
            <div
              className="form-field half"
              style={{
                display: eventLocation === 'online' ? 'none' : '',
              }}
            >
              {/* Using htmlFor for some reason causes Netlify to not recognize the "State" label, which makes it messy */}
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>
                <span className="visually-hidden">Venue Country</span>
                <div className="select-wrapper">
                  <select
                    // id="venue-address-country"
                    aria-invalid={!!errors.addressCountry}
                    {...register('addressCountry', {
                      validate: {
                        required: (value) => validateIfInPersonEvent(value),
                      },
                    })}
                  >
                    {Object.values(countries).map((country) => (
                      <option value={country.name} key={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </label>
            </div>
            <div
              className="form-field half"
              style={{
                display: eventLocation === 'online' ? 'none' : '',
              }}
            >
              <label htmlFor="venue-address-airport">
                <span className="visually-hidden">
                  Venue Nearest Major Airport
                </span>
                <input
                  type="text"
                  id="venue-address-airport"
                  placeholder="Nearest Major Airport *"
                  aria-invalid={!!errors.airport}
                  {...register('airport', {
                    validate: {
                      required: (value) => validateIfInPersonEvent(value),
                    },
                  })}
                />
              </label>
            </div>

            <div className="form-field half">
              <label htmlFor="attendance">
                <span>Expected Attendance (Persons) *</span>
                <input
                  type="number"
                  id="attendance"
                  placeholder="# of Persons"
                  min="1"
                  required
                  aria-invalid={!!errors.attendance}
                  {...register('attendance', { required: true })}
                />
              </label>
            </div>
            <div className="form-field half">
              <label htmlFor="diocese">
                <span>Diocese *</span>
                <input
                  type="text"
                  id="diocese"
                  placeholder="Diocese"
                  required
                  aria-invalid={!!errors.diocese}
                  {...register('diocese', { required: true })}
                />
              </label>
            </div>

            <div className="form-field">
              <label htmlFor="topic">
                <span>Topic Requested *</span>
                <textarea
                  id="topic"
                  placeholder="Specify the requested topic as best as you can; e.g. “Friendship according to the Bible,” instead of just “Friendship”"
                  required
                  aria-invalid={!!errors.topic}
                  {...register('topic', { required: true })}
                />
              </label>
              <p
                className="form-description small"
                style={{ textAlign: 'right' }}
              >
                To see Fr. Kenny's past teaching topics, see{' '}
                <Link to="/cv/#speaking-topics">Curriculum Vitae</Link>
              </p>
            </div>
            <div className="form-field half">
              {/* Using htmlFor for some reason causes Netlify to not recognize the "State" label, which makes it messy */}
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>
                <span>Event Type *</span>
                <div className="select-wrapper">
                  <select
                    // id="event-type"
                    required
                    aria-invalid={!!errors.eventType}
                    {...register('eventType', { required: true })}
                  >
                    <option value="" disabled>
                      Select Event Type
                    </option>
                    <option value="Talk / Presentation">
                      Talk / Presentation
                    </option>
                    <option value="Sermon">Sermon</option>
                    <option value="Interview">Interview</option>
                    <option value="QA Session">Q&A Session</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Fundraising">Fundraising</option>
                    <option value="Talkshow">Talkshow</option>
                    <option value="Round Table">Round Table</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </label>
            </div>
            <div className="form-field">
              <fieldset
                className="radio-group"
                aria-invalid={!!errors.hasSpokenBefore}
              >
                <legend className="radio-group__label">
                  Has Fr. Kenny spoken at your event/parish before?
                </legend>
                <div className="radio-group__radio">
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label>
                    <input
                      type="radio"
                      id="has-spoken-before"
                      value="yes"
                      {...register('hasSpokenBefore', {
                        required: true,
                      })}
                    />
                    <span>Yes</span>
                  </label>
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label>
                    <input
                      type="radio"
                      id="has-spoken-before"
                      value="no"
                      {...register('hasSpokenBefore', {
                        required: true,
                      })}
                    />
                    <span>No</span>
                  </label>
                </div>
              </fieldset>
            </div>
            <div className="form-field">
              <label htmlFor="details">
                <span>Other Details</span>
                <textarea
                  id="details"
                  placeholder="Tell us about your event."
                  aria-invalid={!!errors.details}
                  {...register('details')}
                />
              </label>
            </div>
            <div style={{ display: 'none' }}>
              <label htmlFor="title">
                Don’t fill this out if you’re human:{' '}
                <input
                  type="text"
                  autoComplete="false"
                  tabIndex={-1}
                  {...register('title')}
                />
              </label>
            </div>
            <div className="form-field submit">
              <FormSubmitButton loading={loading} title="Submit Request" />
            </div>
          </div>
        </form>
      )}
    </FormStyles>
  );
}
