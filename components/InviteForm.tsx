"use client";

import React, { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SnackbarContext } from "./SnackbarContext";
import FormSubmitButton from "./FormSubmitButton";
import countries from "@/utils/countries";
import { FormMessageTypes } from "@/types";
import { timeZones } from "@/utils/timeZones";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

interface Inputs {
  [key: string]: any;
  "form-name": string;
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

const defaultTimeZone = "Europe/Rome";

const defaultValues = {
  "form-name": "invite",
  date: "",
  alternateDate: "",
  startTime: "",
  endTime: "",
  timeZone: "",
  organization: "",
  contactName: "",
  email: "",
  phone: "",
  eventLocation: "online",
  venue: "",
  venueCapacity: "",
  addressStreet: "",
  addressStreet2: "",
  addressCity: "",
  addressState: "",
  addressZip: "",
  addressCountry: "Indonesia",
  airport: "",
  attendance: "",
  age: "",
  diocese: "",
  topic: "",
  eventType: "",
  hasSpokenBefore: "no",
  details: "",
  title: "", // Honeypot
};

function formatTZ(str: string) {
  return str.replace(/_/g, " ").replace(/\//g, " / ");
}

function validateDate(value: string) {
  if (!value) {
    return true;
  }

  const todayDate = new Date();
  const date = new Date(`${value}T00:00:00`);
  return todayDate.getTime() < date.getTime()
    ? true
    : "Please select a future date";
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
    setValue,
  } = useForm({ defaultValues });

  const [formMessage, setFormMessage] = useState<FormMessageTypes>({
    status: "success",
    message: "",
    open: false,
  });

  const eventLocation = watch("eventLocation");
  const selectedTimeZone = watch("timeZone");

  // Set or Unset form message
  function handleResponse(response: Response) {
    if (response.ok) {
      setFormMessage({
        status: "success",
        message: `Thank you. Your message has been sent. We will respond to your message as soon as possible.`,
        open: true,
      });
      reset(); // Clear form on success
    } else {
      setFormMessage({
        status: "error",
        message: `Sorry, there's an error in sending your message. Please try again later.`,
        open: true,
      });
    }
  }

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setLoading(true);

    const endpoint = `/api/submit`;

    fetch(endpoint, {
      method: "POST",
      // headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => handleResponse(response))
      .catch((error) => console.error(error))
      .then(() => setLoading(false));
  };

  const { addSnackbar, removeSnackbar } = useContext(SnackbarContext);

  useEffect(() => {
    if (formMessage.open) {
      if (formMessage.status === "error") {
        addSnackbar(formMessage.message, formMessage.status);
      }
    } else {
      removeSnackbar();
    }
  }, [formMessage, addSnackbar, removeSnackbar]);

  useEffect(() => {
    setValue(
      "timeZone",
      Intl.DateTimeFormat().resolvedOptions().timeZone || defaultTimeZone
    );
  }, []);

  const validateIfInPersonEvent = (value: any) => {
    if (!value && getValues("eventLocation") !== "online") {
      return "Required when Type of Event is not Online";
    }
    return true;
  };

  return (
    <div className="flex pt-6 mt-10 border-t border-gray md:border md:p-6 lg:p-10 lg:-mx-10">
      {(formMessage.open && formMessage.status === "success" && (
        <div className="prose">
          <h3>Thank You!</h3>
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
        >
          <input type="hidden" value="invite" {...register("form-name")} />
          <div className="form-fields">
            <div className="form-field heading">
              <h2 className="h3 text-md font-semibold">Event Date</h2>
            </div>
            <div className="form-field half">
              <label htmlFor="date">
                <div className="mb-1">
                  <span>
                    Date <abbr title="required">*</abbr>
                  </span>
                </div>
                <input
                  type="date"
                  id="date"
                  // min={minDateYMD}
                  required
                  aria-invalid={!!errors.date}
                  {...register("date", {
                    required: true,
                    validate: {
                      minDate: (value) => validateDate(value),
                    },
                  })}
                />
                {errors?.date?.type === "minDate" && (
                  <p className="form-error" role="alert">
                    {errors.date.message}
                  </p>
                )}
              </label>
            </div>
            <div className="form-field half">
              <label htmlFor="alternate-date">
                <div className="mb-1">
                  <span>Potential Alternate Date</span>
                </div>
                <input
                  type="date"
                  id="alternate-date"
                  // min={minDateYMD}
                  aria-invalid={!!errors.alternateDate}
                  {...register("alternateDate", {
                    validate: {
                      minDate: (value) => validateDate(value),
                    },
                  })}
                />
              </label>
              {errors?.alternateDate?.type === "minDate" && (
                <p className="form-error" role="alert">
                  {errors.alternateDate.message}
                </p>
              )}
            </div>
            <div className="form-field half">
              <label htmlFor="start-time">
                <div className="mb-1">
                  <span>
                    Start Time <abbr title="required">*</abbr>
                  </span>
                </div>
                <input
                  type="time"
                  id="start-time"
                  required
                  placeholder="Start Time"
                  aria-invalid={!!errors.startTime}
                  {...register("startTime", { required: true })}
                />
              </label>
            </div>
            <div className="form-field half">
              <label htmlFor="end-time">
                <div className="mb-1">
                  <span>
                    End Time <abbr title="required">*</abbr>
                  </span>
                </div>
                <input
                  type="time"
                  id="end-time"
                  required
                  placeholder="End Time"
                  aria-invalid={!!errors.endTime}
                  {...register("endTime", { required: true })}
                />
              </label>
            </div>
            <div className="form-field">
              <div className="form-description small text-right">
                Date & Time are shown in{" "}
                <span className="inline-block">
                  <label
                    className="relative inline-flex items-center group"
                    htmlFor="timeZone"
                  >
                    <select
                      id="timeZone"
                      className="inline-block bg-none !p-0 absolute top-0 left-0 w-full h-full opacity-0 overflow-hidden whitespace-nowrap shadow-none peer"
                      {...register("timeZone", { required: true })}
                    >
                      {timeZones.map((tz) => (
                        <option key={tz} value={tz}>
                          {formatTZ(tz)}
                        </option>
                      ))}
                    </select>
                    <span className="py-1 pr-5 pl-2 font-semibold transition-colors peer-focus:bg-dark-gray group-hover:bg-dark-gray">
                      {formatTZ(selectedTimeZone)}
                    </span>
                    <div className="absolute h-4 w-4 right-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
                      <ChevronDownIcon className="h-3 w-3" />
                    </div>
                  </label>{" "}
                  timezone.
                </span>
              </div>
            </div>
            <div className="form-field heading">
              <h2 className="h3 text-md font-semibold">Contact Information</h2>
            </div>
            <div className="form-field half">
              <label htmlFor="organization">
                <div className="mb-1">
                  <span>
                    Organization <abbr title="required">*</abbr>
                  </span>
                </div>
                <input
                  type="text"
                  id="organization"
                  placeholder="Your Organization"
                  autoComplete="organization"
                  required
                  aria-invalid={!!errors.organization}
                  {...register("organization", { required: true })}
                />
              </label>
            </div>
            <div className="form-field half">
              <label htmlFor="name">
                <div className="mb-1">
                  <span>
                    Contact Name <abbr title="required">*</abbr>
                  </span>
                </div>
                <input
                  type="text"
                  id="name"
                  placeholder="Full Name"
                  autoComplete="name"
                  required
                  aria-invalid={!!errors.contactName}
                  {...register("contactName", { required: true })}
                />
              </label>
            </div>
            <div className="form-field half">
              <label htmlFor="email">
                <div className="mb-1">
                  <span>
                    Email <abbr title="required">*</abbr>
                  </span>
                </div>
                <input
                  type="email"
                  id="email"
                  placeholder="email@example.com"
                  autoComplete="email"
                  required
                  aria-invalid={!!errors.email}
                  {...register("email", { required: true })}
                />
              </label>
            </div>
            <div className="form-field half">
              <label htmlFor="phone">
                <div className="mb-1">
                  <span>
                    Phone (WhatsApp) <abbr title="required">*</abbr>
                  </span>
                </div>
                <input
                  type="tel"
                  id="phone"
                  placeholder="000-000-0000"
                  autoComplete="tel"
                  required
                  aria-invalid={!!errors.phone}
                  {...register("phone", { required: true })}
                />
              </label>
            </div>
            <div className="form-field heading">
              <h2 className="h3 text-md font-semibold">Event Details</h2>
            </div>
            <div className="form-field">
              <fieldset
                className="radio-group"
                aria-invalid={!!errors.eventLocation}
              >
                <legend className="radio-group__label sr-only">
                  Type of Event
                </legend>
                <div className="radio-group__radio">
                  <label htmlFor="event-location-online">
                    <input
                      type="radio"
                      id="event-location-online"
                      value="online"
                      required
                      {...register("eventLocation", {
                        required: true,
                      })}
                    />
                    <span>Online Event</span>
                  </label>
                  <label htmlFor="event-location-in-person">
                    <input
                      type="radio"
                      id="event-location-in-person"
                      value="in-person"
                      required
                      {...register("eventLocation", {
                        required: true,
                      })}
                    />
                    <span>In-Person Event</span>
                  </label>
                </div>
              </fieldset>
            </div>
            {eventLocation !== "online" && (
              <>
                <div className="form-field half">
                  <label htmlFor="venue">
                    <div className="mb-1">
                      <span>
                        Venue <abbr title="required">*</abbr>
                      </span>
                    </div>
                    <input
                      type="text"
                      id="venue"
                      placeholder="Venue"
                      required
                      aria-invalid={!!errors.venue}
                      {...register("venue", {
                        validate: {
                          required: (value) => validateIfInPersonEvent(value),
                        },
                      })}
                    />
                  </label>
                </div>
                <div className="form-field half">
                  <label htmlFor="venue-capacity">
                    <div className="mb-1">
                      <span>Venue Capacity</span>
                    </div>
                    <input
                      type="number"
                      id="venue-capacity"
                      placeholder="Venue Capacity"
                      aria-invalid={!!errors.venueCapacity}
                      {...register("venueCapacity")}
                    />
                  </label>
                </div>
                <div className="form-field">
                  <label htmlFor="venue-address-street">
                    <div className="mb-1">
                      <span>Venue Address</span>
                    </div>
                    <input
                      type="text"
                      id="venue-address-street"
                      placeholder="Street *"
                      required
                      aria-invalid={!!errors.addressStreet}
                      {...register("addressStreet", {
                        validate: {
                          required: (value) => validateIfInPersonEvent(value),
                        },
                      })}
                    />
                  </label>
                </div>
                <div className="form-field">
                  <label htmlFor="venue-address-street-2">
                    <span className="sr-only">
                      Venue Address (Street Line 2)
                    </span>
                    <input
                      type="text"
                      id="venue-address-street-2"
                      placeholder="Street Line 2"
                      aria-invalid={!!errors.addressStreet2}
                      {...register("addressStreet2")}
                    />
                  </label>
                </div>
                <div className="form-field half">
                  <label htmlFor="venue-address-city">
                    <span className="sr-only">City</span>
                    <input
                      type="text"
                      id="venue-address-city"
                      placeholder="City *"
                      required
                      aria-invalid={!!errors.addressCity}
                      {...register("addressCity")}
                    />
                  </label>
                </div>
                <div className="form-field half">
                  <label htmlFor="venue-address-state">
                    <span className="sr-only">Venue State / Province</span>
                    <input
                      type="text"
                      id="venue-address-state"
                      placeholder="State / Province *"
                      required
                      aria-invalid={!!errors.addressState}
                      {...register("addressState", {
                        validate: {
                          required: (value) => validateIfInPersonEvent(value),
                        },
                      })}
                    />
                  </label>
                </div>
                <div className="form-field half">
                  <label htmlFor="venue-address-zip">
                    <span className="sr-only">Venue ZIP / Postal Code</span>
                    <input
                      type="text"
                      id="venue-address-zip"
                      placeholder="ZIP / Postal Code *"
                      required
                      aria-invalid={!!errors.addressZip}
                      {...register("addressZip", {
                        validate: {
                          required: (value) => validateIfInPersonEvent(value),
                        },
                      })}
                    />
                  </label>
                </div>
                <div className="form-field half">
                  <label htmlFor="venue-address-country">
                    <span className="sr-only">Venue Country</span>
                    <div className="select-wrapper">
                      <select
                        id="venue-address-country"
                        required
                        aria-invalid={!!errors.addressCountry}
                        {...register("addressCountry", {
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
                <div className="form-field half">
                  <label htmlFor="venue-address-airport">
                    <span className="sr-only">Venue Nearest Major Airport</span>
                    <input
                      type="text"
                      id="venue-address-airport"
                      placeholder="Nearest Major Airport *"
                      required
                      aria-invalid={!!errors.airport}
                      {...register("airport", {
                        validate: {
                          required: (value) => validateIfInPersonEvent(value),
                        },
                      })}
                    />
                  </label>
                </div>
                <div className="form-field" />
              </>
            )}
            <div className="form-field half">
              <label htmlFor="attendance">
                <div className="mb-1">
                  <span>
                    Expected Attendance (Persons){" "}
                    <abbr title="required">*</abbr>
                  </span>
                </div>
                <div className="select-wrapper">
                  <select
                    id="attendance"
                    required
                    aria-invalid={!!errors.attendance}
                    {...register("attendance", { required: true })}
                  >
                    <option value="" disabled>
                      Select range
                    </option>
                    <option value="1-20">1-20</option>
                    <option value="21-50">21-50</option>
                    <option value="51-100">51-100</option>
                    <option value="101-300">101-300</option>
                    <option value="301-500">301-500</option>
                    <option value="501-1000">501-1000</option>
                    <option value="> 1000">&gt; 1000</option>
                  </select>
                </div>
              </label>
            </div>
            <div className="form-field half">
              <label htmlFor="age">
                <div className="mb-1">
                  <span>
                    Average Age of Participants <abbr title="required">*</abbr>
                  </span>
                </div>
                <div className="select-wrapper">
                  <select
                    id="age"
                    required
                    aria-invalid={!!errors.age}
                    {...register("age", { required: true })}
                  >
                    <option value="" disabled>
                      Select range
                    </option>
                    <option value="1-12">1-12</option>
                    <option value="13-18">13-18</option>
                    <option value="19-22">19-22</option>
                    <option value="23-30">23-30</option>
                    <option value="31-50">31-50</option>
                    <option value="51-70">51-70</option>
                    <option value="> 70">&gt; 70</option>
                  </select>
                </div>
              </label>
            </div>
            <div className="form-field half">
              <label htmlFor="diocese">
                <div className="mb-1">
                  <span>
                    Diocese <abbr title="required">*</abbr>
                  </span>
                </div>
                <input
                  type="text"
                  id="diocese"
                  placeholder="Diocese"
                  required
                  aria-invalid={!!errors.diocese}
                  {...register("diocese", { required: true })}
                />
              </label>
            </div>
            <div className="form-field" />
            <div className="form-field">
              <label htmlFor="topic">
                <div className="mb-1">
                  <span>
                    Topic Requested <abbr title="required">*</abbr>
                  </span>
                </div>
                <textarea
                  id="topic"
                  placeholder="Specify the requested topic as best as you can; e.g. “Friendship according to the Bible,” instead of just “Friendship”"
                  required
                  aria-invalid={!!errors.topic}
                  {...register("topic", { required: true })}
                />
              </label>
              <p
                className="form-description small"
                style={{ textAlign: "right" }}
              >
                To see Fr. Kenny’s past teaching topics, see{" "}
                <a
                  href="/cv/#speaking-topics"
                  style={{ display: "inline-block" }}
                  target="_blank"
                >
                  Curriculum Vitae
                </a>
                .
              </p>
            </div>
            <div className="form-field half">
              <label htmlFor="event-type">
                <div className="mb-1">
                  <span>
                    Event Type <abbr title="required">*</abbr>
                  </span>
                </div>
                <div className="select-wrapper">
                  <select
                    id="event-type"
                    required
                    aria-invalid={!!errors.eventType}
                    {...register("eventType", { required: true })}
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
                  <label htmlFor="has-spoken-before-yes">
                    <input
                      type="radio"
                      id="has-spoken-before-yes"
                      value="yes"
                      required
                      {...register("hasSpokenBefore", {
                        required: true,
                      })}
                    />
                    <span>Yes</span>
                  </label>
                  <label htmlFor="has-spoken-before-no">
                    <input
                      type="radio"
                      id="has-spoken-before-no"
                      value="no"
                      required
                      {...register("hasSpokenBefore", {
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
                <div className="mb-1">
                  <span>Other Details</span>
                </div>
                <textarea
                  id="details"
                  placeholder="Tell us about your event."
                  aria-invalid={!!errors.details}
                  {...register("details")}
                />
              </label>
            </div>
            <div style={{ display: "none" }}>
              <label htmlFor="title">
                Don’t fill this out if you’re human:{" "}
                <input
                  type="text"
                  autoComplete="false"
                  tabIndex={-1}
                  {...register("title")}
                />
              </label>
            </div>
            <div className="form-field submit">
              <FormSubmitButton loading={loading} title="Submit Request" />
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
