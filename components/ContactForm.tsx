"use client";

import * as React from "react";
import FormSubmitButton from "./FormSubmitButton";
import { toast } from "react-hot-toast";
import { Turnstile } from "./Turnstile";

export default function ContactForm() {
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    const endpoint = form.action;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formObject as Record<string, string>),
    });

    if (response.ok) {
      toast.success(
        `Thank you, your message has been sent! I'll get back to you as soon as possible.`,
      );
      form.reset();
    } else {
      toast.error(
        `Sorry, there's an error in sending your message. Please try again later.`,
      );
    }

    setLoading(false);
  };

  return (
    <div>
      <form
        action="/api/submit"
        onSubmit={onSubmit}
        method="POST"
        name="contact"
      >
        <input type="hidden" value="contact" name="form-name" />
        <div className="form-fields">
          <div className="form-field half">
            <label htmlFor="name">
              <span className="sr-only">Name</span>
              <input
                type="text"
                id="name"
                autoComplete="name"
                placeholder="Name"
                // aria-invalid={!!errors.name}
                name="name"
              />
            </label>
          </div>
          <div className="form-field half">
            <label htmlFor="email">
              <span className="sr-only">Email</span>
              <input
                type="email"
                id="email"
                placeholder="Email *"
                autoComplete="email"
                required
                // aria-invalid={!!errors.email}
                name="email"
              />
            </label>
          </div>
          <div className="form-field">
            <label htmlFor="message">
              <span className="sr-only">Message</span>
              <textarea
                id="message"
                placeholder="Message *"
                required
                // aria-invalid={!!errors.message}
                name="message"
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
                name="title"
              />
            </label>
          </div>
          <div className="form-field">
            <div className="flex flex-wrap justify-between items-start -m-2">
              <div className="p-2">
                <Turnstile loading={loading} />
              </div>
              <div className="p-2 ml-auto">
                <FormSubmitButton loading={loading} title="Send" />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
