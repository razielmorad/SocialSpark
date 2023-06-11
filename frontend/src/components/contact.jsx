import React from "react";
import joi from "joi";
import { useFormik } from "formik";
import formikValidateUsingJoi from "../utils/formikvalidateusingjoi";
import { sendContact } from "../services/useservices";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ContactPage = () => {
  const navigate = useNavigate();
  const schema = {
    name: joi.string().min(2).max(256).required(),
    email: joi
      .string()
      .min(2)
      .max(256)
      .required()
      .email({ tlds: { allow: false } })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i)
      .messages({
        "string.pattern.base": `please enter a valid email address`,
      }),
    message: joi.string().min(2).max(1024).required(),
  };
  const form = useFormik({
    validateOnBlur: false,
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validate: formikValidateUsingJoi(schema),
    onSubmit: async (values) => {
      try {
        await sendContact({
          ...values,
        });
        toast(
          "you have successfully sent a message! thank you for your input!"
        );
        navigate("/ulHome");
      } catch ({ response }) {
        if (response && response.status === 400) {
          console.log(response);
        }
      }
    },
  });

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-lg-6 mx-auto">
          <h1>Contact Us</h1>
          <p>
            Have any questions or feedback? Feel free to reach out to us using
            the form below, or contact us directly via email or phone.
          </p>
          <div className="mb-3">
            <h5>Contact Information:</h5>
            <p>Email: razielmorad96@gmail.com</p>
            <p>Phone: 053-722-7123</p>
          </div>

          <form onSubmit={form.handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Your Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                {...form.getFieldProps("name")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Your Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                {...form.getFieldProps("email")}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                className="form-control"
                id="message"
                rows="5"
                {...form.getFieldProps("message")}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
