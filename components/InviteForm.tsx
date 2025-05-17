"use client";

import * as React from "react";
import FormSubmitButton from "./FormSubmitButton";
import countries from "@/utils/countries";
import { timeZones } from "@/utils/timeZones";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { Turnstile } from "./Turnstile";

type ErrorsType = Record<string, { type: string; message: string }>;

const defaultTimeZone = "Europe/Rome";

function formatTZ(str: string) {
  return str.replace(/_/g, " ").replace(/\//g, " / ");
}

function validateDate(value: string) {
  if (!value) {
    return true;
  }

  const todayDate = new Date();
  const date = new Date(`${value}T00:00:00`);
  return todayDate.getTime() < date.getTime() ? true : false;
}

export default function InviteForm() {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [errors, setErrors] = React.useState<ErrorsType>({});

  const timeZoneSelectRef = React.useRef<HTMLSelectElement>(null);
  const [selectedTimeZone, setSelectedTimeZone] =
    React.useState(defaultTimeZone);

  const [selectedEventLocation, setSelectedEventLocation] = React.useState<
    string | null
  >(null);

  const validate = (formObject: Record<string, string>) => {
    // Loop through the form object
    const errors: ErrorsType = {};

    for (const key in formObject) {
      // Validate date
      if (key === "date" || key === "alternateDate") {
        const value = formObject[key];
        const isValid = validateDate(value);
        if (!isValid) {
          errors[key] = {
            type: "manual",
            message: "Please select a future date",
          };
        }
      }
    }

    return errors;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();

    const endpoint = form.action;
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    setLoading(true);

    const validationErrors = validate(formObject as Record<string, string>);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      // Focus on the first error
      const firstError = Object.keys(validationErrors)[0];
      const firstErrorElement = document.querySelector(
        `[name="${firstError}"]`
      );
      if (firstErrorElement) {
        (firstErrorElement as HTMLElement).focus();
      }
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formObject as Record<string, string>),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        setSuccess(false);
        toast.error(
          `Sorry, there's an error in sending your message. Please try again later.`
        );
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  React.useEffect(() => {
    if (timeZoneSelectRef.current) {
      const userTimeZone =
        Intl.DateTimeFormat().resolvedOptions().timeZone || defaultTimeZone;
      timeZoneSelectRef.current.value = userTimeZone;
      setSelectedTimeZone(userTimeZone);
    }
  }, []);

  return (
    <div className="flex pt-6 mt-10 border-t border-gray md:border md:p-6 lg:p-10 lg:-mx-10">
      {(success && (
        <div className="prose">
          <h3>Thank You!</h3>
          <p>
            Your invitation has been sent. Fr. Kenny will get back to you as
            soon as possible.
          </p>
        </div>
      )) || (
        <form
          action="/api/submit"
          onSubmit={onSubmit}
          method="POST"
          name="invite"
        >
          <input type="hidden" value="invite" name="form-name" />
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
                  required
                  name="date"
                  aria-invalid={!!errors.date}
                />
                {!!errors?.date && (
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
                  aria-invalid={!!errors.alternateDate}
                  name="alternateDate"
                />
              </label>
              {!!errors?.alternateDate && (
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
                  name="startTime"
                  aria-invalid={!!errors.startTime}
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
                  name="endTime"
                  aria-invalid={!!errors.endTime}
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
                      ref={timeZoneSelectRef}
                      id="timeZone"
                      className="inline-block bg-none p-0! absolute top-0 left-0 w-full h-full opacity-0 overflow-hidden whitespace-nowrap shadow-none peer"
                      name="timeZone"
                      required
                      onChange={(e) => setSelectedTimeZone(e.target.value)}
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
                  name="organization"
                  aria-invalid={!!errors.organization}
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
                  name="contactName"
                  aria-invalid={!!errors.contactName}
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
                  name="email"
                  aria-invalid={!!errors.email}
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
                  name="phone"
                  aria-invalid={!!errors.phone}
                />
              </label>
            </div>
            <div className="form-field heading">
              <h2 className="h3 text-md font-semibold">Event Details</h2>
            </div>
            <div className="form-field">
              <fieldset className="radio-group">
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
                      name="eventLocation"
                      onChange={(e) => setSelectedEventLocation(e.target.value)}
                    />
                    <span>Online Event</span>
                  </label>
                  <label htmlFor="event-location-in-person">
                    <input
                      type="radio"
                      id="event-location-in-person"
                      value="in-person"
                      required
                      name="eventLocation"
                      onChange={(e) => setSelectedEventLocation(e.target.value)}
                    />
                    <span>In-Person Event</span>
                  </label>
                </div>
              </fieldset>
            </div>
            {selectedEventLocation !== "online" && (
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
                      aria-invalid={!!errors.venue}
                      name="venue"
                      required
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
                      name="venueCapacity"
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
                      aria-invalid={!!errors.addressStreet}
                      required
                      name="addressStreet"
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
                      name="addressStreet2"
                      aria-invalid={!!errors.addressStreet2}
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
                      name="addressCity"
                      aria-invalid={!!errors.addressCity}
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
                      name="addressState"
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
                      name="addressZip"
                      aria-invalid={!!errors.addressZip}
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
                        name="addressCountry"
                        defaultValue={"Indonesia"}
                        aria-invalid={!!errors.addressCountry}
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
                      name="airport"
                      aria-invalid={!!errors.airport}
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
                    name="attendance"
                    aria-invalid={!!errors.attendance}
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
                    name="age"
                    aria-invalid={!!errors.age}
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
                  name="diocese"
                  aria-invalid={!!errors.diocese}
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
                  name="topic"
                  aria-invalid={!!errors.topic}
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
                    name="eventType"
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
                      name="hasSpokenBefore"
                    />
                    <span>Yes</span>
                  </label>
                  <label htmlFor="has-spoken-before-no">
                    <input
                      type="radio"
                      id="has-spoken-before-no"
                      value="no"
                      required
                      name="hasSpokenBefore"
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
                  name="details"
                  aria-invalid={!!errors.details}
                />
              </label>
            </div>
            <div className="form-field">
              <div className="flex flex-wrap justify-between -m-2">
                <div className="p-2">
                  <Turnstile loading={loading} />
                </div>
                <div className="p-2 ml-auto">
                  <FormSubmitButton loading={loading} title="Submit Request" />
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
