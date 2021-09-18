import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SubmitHandler, useForm } from 'react-hook-form';
// import DatePicker from 'react-datepicker';
// import DayPickerInput from 'react-day-picker/DayPickerInput';
import { SnackbarContext } from '../components/SnackbarContext';
import { breakpoints } from '../styles/breakpoints';
import FormSubmitButton from '../components/FormSubmitButton';
import countries from '../utils/countries';
import { FormMessageTypes } from '../types';
import SEO from '../components/Seo';
// import DayPickerStyles from '../styles/DayPickerStyles';
// import 'react-datepicker/dist/react-datepicker.css';
// import 'react-day-picker/lib/style.css';

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
  address: {
    street: string;
    street2: string;
    state: string;
    zip: string;
    country: string;
    airport: string;
  };
  attendance: number;
  diocese: string;
  topic: string;
  eventType: string;
  hasSpokenBefore: string;
  details?: string;
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
  address: {
    street: '',
    street2: '',
    state: '',
    zip: '',
    country: 'Indonesia',
    airport: '',
  },
  attendance: '',
  diocese: '',
  topic: '',
  eventType: '',
  hasSpokenBefore: 'no',
  details: '',
};

const BodyStyles = styled.main`
  .inner {
    --width-xs: 12;
    --width-md: 8;
    --offset-md: 2;
    --width-lg: 6;
    --offset-lg: 3;
  }

  .section-title {
    position: relative;
  }
`;

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

export default function InvitePage() {
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
    console.log(response);
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
    return Object.keys(data)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(data[key] || '')}`
      )
      .join('&');
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
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
      if (formMessage.status === 'error') {
        addSnackbar(formMessage.message, formMessage.status);
      }
    } else {
      removeSnackbar();
    }
  }, [formMessage, addSnackbar, removeSnackbar]);

  const validateIfPhysicalEvent = (value: any) => {
    if (!value && getValues('eventLocation') !== 'online') {
      return 'Required when Type of Event is not Online';
    }
    return true;
  };

  // Get today date
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();
  const todayDate = `${yyyy}-${mm}-${dd}`;

  return (
    <>
      <SEO title="Invite Fr. Kenny to Speak" />
      <BodyStyles>
        <section className="container page-p-t section-p-b">
          <div className="row">
            <div className="col inner">
              <h1 className="h2">Invite Fr. Kenny to Speak</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
              <FormStyles>
                {(formMessage.open && formMessage.status === 'success' && (
                  <div>
                    <h2 className="h3">Thank You!</h2>
                    <p>
                      Your invitation has been sent. I will get back to you as
                      soon as possible.
                    </p>
                  </div>
                )) || (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    method="POST"
                    name="invite"
                    data-netlify="true"
                  >
                    <input
                      type="hidden"
                      value="invite"
                      {...register('form-name')}
                    />
                    <div className="form-fields">
                      <div className="form-field heading">
                        <h2 className="h3">Event Date</h2>
                      </div>
                      <div className="form-field half">
                        <label htmlFor="date">
                          <span>Date *</span>
                          <input
                            type="date"
                            id="alternate-date"
                            min={todayDate}
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
                            min={todayDate}
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
                                value="physical"
                                required
                                {...register('eventLocation', {
                                  required: true,
                                })}
                              />
                              <span>Physical Event</span>
                            </label>
                          </div>
                        </fieldset>
                      </div>
                      {eventLocation !== 'online' && (
                        <>
                          <div className="form-field half">
                            <label htmlFor="venue">
                              <span>Venue *</span>
                              <input
                                type="text"
                                id="venue"
                                placeholder="Venue"
                                required
                                aria-invalid={!!errors.venue}
                                {...register('venue', {
                                  validate: {
                                    required: (value) =>
                                      validateIfPhysicalEvent(value),
                                  },
                                })}
                              />
                            </label>
                          </div>
                          <div className="form-field half">
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
                          <div className="form-field">
                            <label htmlFor="venue-address-street">
                              <span>Venue Address</span>
                              <input
                                type="text"
                                id="venue-address-street"
                                placeholder="Street *"
                                aria-invalid={!!errors.address?.street}
                                {...register('address.street', {
                                  validate: {
                                    required: (value) =>
                                      validateIfPhysicalEvent(value),
                                  },
                                })}
                              />
                            </label>
                          </div>
                          <div className="form-field">
                            <label htmlFor="venue-address-street-2">
                              <span className="visually-hidden">
                                Venue Address (Street Line 2)
                              </span>
                              <input
                                type="text"
                                id="venue-address-street-2"
                                placeholder="Street Line 2"
                                aria-invalid={!!errors.address?.street2}
                                {...register('address.street2')}
                              />
                            </label>
                          </div>
                          <div className="form-field half">
                            <label htmlFor="venue-address-state">
                              <span className="visually-hidden">
                                Venue State / Province
                              </span>
                              <input
                                type="text"
                                id="venue-address-state"
                                placeholder="State / Province"
                                aria-invalid={!!errors.address?.state}
                                {...register('address.state', {
                                  validate: {
                                    required: (value) =>
                                      validateIfPhysicalEvent(value),
                                  },
                                })}
                              />
                            </label>
                          </div>
                          <div className="form-field half">
                            <label htmlFor="venue-address-zip">
                              <span className="visually-hidden">
                                Venue ZIP / Postal Code
                              </span>
                              <input
                                type="text"
                                id="venue-address-zip"
                                placeholder="ZIP / Postal Code"
                                aria-invalid={!!errors.address?.zip}
                                {...register('address.zip', {
                                  validate: {
                                    required: (value) =>
                                      validateIfPhysicalEvent(value),
                                  },
                                })}
                              />
                            </label>
                          </div>
                          <div className="form-field half">
                            {/* Using htmlFor for some reason causes Netlify to not recognize the "State" label, which makes it messy */}
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                            <label>
                              <span className="visually-hidden">
                                Venue Country
                              </span>
                              <div className="select-wrapper">
                                <select
                                  // id="venue-address-country"
                                  aria-invalid={!!errors.address?.country}
                                  {...register('address.country', {
                                    validate: {
                                      required: (value) =>
                                        validateIfPhysicalEvent(value),
                                    },
                                  })}
                                >
                                  {Object.values(countries).map((country) => (
                                    <option
                                      value={country.name}
                                      key={country.code}
                                    >
                                      {country.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </label>
                          </div>
                          <div className="form-field half">
                            <label htmlFor="venue-address-airport">
                              <span className="visually-hidden">
                                Venue Nearest Major Airport
                              </span>
                              <input
                                type="text"
                                id="venue-address-airport"
                                placeholder="Nearest Major Airport"
                                aria-invalid={!!errors.address?.airport}
                                {...register('address.airport', {
                                  validate: {
                                    required: (value) =>
                                      validateIfPhysicalEvent(value),
                                  },
                                })}
                              />
                            </label>
                          </div>
                        </>
                      )}
                      <div className="form-field half">
                        <label htmlFor="attendance">
                          <span>Expected Attendance *</span>
                          <input
                            type="number"
                            id="attendance"
                            placeholder="Expected Attendance"
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
                              <option value="talk">Talk</option>
                              <option value="multi-speaker">
                                Multi-Speaker
                              </option>
                              <option value="international">
                                International
                              </option>
                              <option value="small-scale">Small Scale</option>
                              <option value="virtual">
                                Virtual Talk / Presentation
                              </option>
                              <option value="fundraising">Fundraising</option>
                              <option value="private">Private</option>
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
                      <div className="form-field submit">
                        <FormSubmitButton
                          loading={loading}
                          title="Submit Request"
                        />
                      </div>
                    </div>
                  </form>
                )}
              </FormStyles>
            </div>
          </div>
        </section>
      </BodyStyles>
    </>
  );
}
