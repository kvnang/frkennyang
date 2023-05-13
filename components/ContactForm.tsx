"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { type FormMessageTypes } from "@/types";
import FormSubmitButton from "./FormSubmitButton";
import { toast } from "react-hot-toast";

interface Inputs {
  [key: string]: string | undefined;
  "form-name": string;
  name?: string;
  email: string;
  message: string;
  title?: string; // Honeypot
}

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const [formMessage, setFormMessage] = useState<FormMessageTypes>({
    status: "success",
    message: "",
    open: false,
  });

  // Set or Unset form message
  function handleResponse(response: Response) {
    if (response.ok) {
      setFormMessage({
        status: "success",
        message: `Thank you, your message has been sent! I'll get back to you as soon as possible.`,
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

  useEffect(() => {
    if (formMessage.open) {
      if (formMessage.status === "success") {
        toast.success(formMessage.message || "Message sent!");
      }
      if (formMessage.status === "error") {
        toast.error(formMessage.message || "Error sending message!");
      }
    }
  }, [formMessage]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        name="contact"
        netlify-honeypot="title"
        data-netlify="true"
      >
        <input type="hidden" value="contact" {...register("form-name")} />
        <div className="form-fields">
          <div className="form-field half">
            <label htmlFor="name">
              <span className="sr-only">Name</span>
              <input
                type="text"
                id="name"
                autoComplete="name"
                placeholder="Name"
                aria-invalid={!!errors.name}
                {...register("name")}
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
                aria-invalid={!!errors.email}
                {...register("email", { required: true })}
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
                aria-invalid={!!errors.message}
                {...register("message", { required: true })}
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
          <div className="form-field submit flex justify-end">
            <FormSubmitButton loading={loading} title="Send" />
          </div>
        </div>
      </form>
    </div>
  );
}
