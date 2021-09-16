import React, { useContext, useEffect, useState } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from 'styled-components';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
// import DatePicker from 'react-datepicker';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { SnackbarContext } from '../components/SnackbarContext';
import DayPickerStyles from '../styles/DayPickerStyles';
// import 'react-datepicker/dist/react-datepicker.css';
// import 'react-day-picker/lib/style.css';

const BodyStyles = styled.section`
  padding-bottom: var(--section-padding);

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
  border: 1px solid var(--grey);
  /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.32); */
  padding: 2.5rem;
  margin: 2.5rem -2.5rem;
  display: flex;
`;

export default function AboutPage() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    watch,
    getValues,
  } = useForm();

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

  // IF the form contains File upload
  // function encode(data: Inputs) {
  //   const formData = new FormData();
  //   Object.keys(data).forEach((key) => {
  //     if (data[key] instanceof FileList) {
  //       for (const file of data[key]) {
  //         formData.append(key, file, file.name);
  //       }
  //     } else {
  //       formData.append(key, data[key]);
  //     }
  //   });
  //   return formData;
  // }

  console.log(watch('date'));

  const onSubmit: SubmitHandler<Inputs> = (data, e) => {
    console.log(data);
    // setLoading(true);

    // const formData = encode({
    //   'form-name': e?.target.getAttribute('name'),
    //   ...data,
    // });

    // fetch('/', {
    //   method: 'POST',
    //   // IF form contains file uploads, you should NOT use application/x-www-form-urlencoded -- commment this out
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: formData,
    // })
    //   .then((response) => handleResponse(response))
    //   .catch((error) => console.error(error))
    //   .then(() => setLoading(false));
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

  // Thank You Message
  if (formMessage.open && formMessage.status === 'success') {
    return (
      <>
        <h3 className="h4">Thank You</h3>
        <p>
          Your message has been sent. We will respond to your message as soon as
          possible.
        </p>
      </>
    );
  }

  return (
    <>
      <BodyStyles>
        <div className="container">
          <div className="row">
            <div className="col inner">
              <h1 className="h2">Invite Fr. Kenny to Speak</h1>
              <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
              <FormStyles>
                <form action="/" onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-fields">
                    <div className="form-field heading">
                      <h2 className="h3">Event Date</h2>
                    </div>
                    <div className="form-field half">
                      <label htmlFor="date">
                        <span>Proposed Event Date *</span>
                        <DayPickerStyles>
                          <Controller
                            name="date"
                            control={control}
                            render={({ field }) => (
                              <DayPickerInput
                                value={field.value}
                                onDayChange={(day) => {
                                  field.onChange(day);
                                }}
                                dayPickerProps={{
                                  showOutsideDays: true,
                                  fromMonth: new Date(),
                                  disabledDays: [
                                    // new Date(2017, 3, 2),
                                    {
                                      // from: new Date(2022, 3, 20),
                                      before: new Date(),
                                    },
                                  ],
                                }}
                              />
                            )}
                          />
                        </DayPickerStyles>
                      </label>
                    </div>
                    <div className="form-field half">
                      <label htmlFor="alternate-date">
                        <span>Potential Alternate Date</span>
                        <input
                          type="date"
                          id="alternate-date"
                          min={todayDate}
                          {...register('alternateDate')}
                        />
                      </label>
                    </div>
                    <div className="form-field heading">
                      <h2 className="h3">Contact Information</h2>
                    </div>
                    <div className="form-field half">
                      <label htmlFor="name">
                        <span>Organization *</span>
                        <input
                          type="text"
                          id="organization"
                          placeholder="Organization *"
                          required
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
                          placeholder="Contact Name *"
                          required
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
                          placeholder="Email *"
                          {...register('email', { required: true })}
                        />
                      </label>
                    </div>
                    <div className="form-field half">
                      <label htmlFor="phone">
                        <span>Phone *</span>
                        <input
                          type="tel"
                          id="phone"
                          placeholder="Phone *"
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
                        // aria-invalid={!!errors.experience}
                      >
                        <legend className="radio-group__label visually-hidden">
                          Type of Event
                        </legend>
                        <div className="radio-group__radio">
                          <label>
                            <input
                              type="radio"
                              id="event-location"
                              value="online"
                              {...register('eventLocation', { required: true })}
                            />
                            <span>Online Event</span>
                          </label>
                          <label>
                            <input
                              type="radio"
                              id="event-location"
                              value="physical"
                              {...register('eventLocation', { required: true })}
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
                              placeholder="Venue *"
                              required
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
                              {...register('venue')}
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
                              {...register('address[street]', {
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
                              {...register('address[street2]')}
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
                              {...register('address[state]', {
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
                              {...register('address[zip]', {
                                validate: {
                                  required: (value) =>
                                    validateIfPhysicalEvent(value),
                                },
                              })}
                            />
                          </label>
                        </div>
                        <div className="form-field half">
                          <label htmlFor="venue-address-country">
                            <span className="visually-hidden">
                              Venue Country
                            </span>
                            <input
                              type="text"
                              id="venue-address-country"
                              placeholder="Country"
                              {...register('address[country]', {
                                validate: {
                                  required: (value) =>
                                    validateIfPhysicalEvent(value),
                                },
                              })}
                            />
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
                              {...register('address[airport]', {
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
                          {...register('attendance')}
                        />
                      </label>
                    </div>
                    <div className="form-field half">
                      <label htmlFor="diocese">
                        <span>Diocese *</span>
                        <input
                          type="text"
                          id="diocese"
                          placeholder="Diocese *"
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
                          {...register('topic', { required: true })}
                        />
                      </label>
                    </div>
                    <div className="form-field half">
                      <label htmlFor="event-type">
                        <span>Event Type *</span>
                        <select
                          id="event-type"
                          {...register('eventType', { required: true })}
                        >
                          <option value="">---</option>
                          <option value="talk">Talk</option>
                          <option value="multi-speaker">Multi-Speaker</option>
                          <option value="international">International</option>
                          <option value="small-scale">Small Scale</option>
                          <option value="virtual">
                            Virtual Talk / Presentation
                          </option>
                          <option value="fundraising">Fundraising</option>
                          <option value="private">Private</option>
                          <option value="other">Other</option>
                        </select>
                      </label>
                    </div>
                    <div className="form-field">
                      <fieldset
                        className="radio-group"
                        // aria-invalid={!!errors.experience}
                      >
                        <legend className="radio-group__label">
                          Has Fr. Kenny spoken at your event/parish before?
                        </legend>
                        <div className="radio-group__radio">
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
                          {...register('details')}
                        />
                      </label>
                    </div>
                    <div className="form-field submit">
                      <button type="submit" className="button">
                        Submit Request
                      </button>
                    </div>
                  </div>
                </form>
              </FormStyles>
            </div>
          </div>
        </div>
      </BodyStyles>
    </>
  );
}
