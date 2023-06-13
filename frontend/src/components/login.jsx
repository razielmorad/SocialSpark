import signinicon from "../media/icons/sign-in.png";
import { useFormik } from "formik";
import joi from "joi";
import formikValidateUsingJoi from "../utils/formikvalidateusingjoi";
import FormInput from "./forminput";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { useAuth } from "./context/auth.context";
import { Link } from "react-router-dom";

const LogIn = () => {
  const [error, setError] = useState("");
  const { logIn: logInUser, user } = useAuth();
  const navigate = useNavigate();

  const schema = {
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
    password: joi.string().min(2).max(256).required(),
  };

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: formikValidateUsingJoi(schema),
    onSubmit: async (values) => {
      try {
        await logInUser({ email: values.email, password: values.password });
        toast.success("you're logged in! have fun 😌");
        navigate("/");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });
  return (
    <>
      <div className="bg-dark">
        <div className="container">
          <div className="d-flex flex-column">
            <header className="mb-auto text-center">
              <div>
                <nav className="nav  justify-content-between float-md-end">
                  <Link
                    to={"/ulHome"}
                    className="nav-link fw-bold py-1 px-0 mx-3 text-black"
                  >
                    Home
                  </Link>
                  <Link
                    to={"/ulAbout"}
                    className="nav-link fw-bold py-1 px-0 mx-3 text-black"
                  >
                    About
                  </Link>
                  <Link
                    to={"/signup"}
                    className="nav-link fw-bold py-1 px-0 mx-3 text-black"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to={"/signin"}
                    className="nav-link fw-bold py-1 px-0 mx-3 text-black"
                  >
                    Sign In
                  </Link>
                </nav>
              </div>
            </header>
            <form
              style={{ marginBottom: "150px" }}
              onSubmit={form.handleSubmit}
              className="mt-2  p-5 form-floating form d-grid gap-3 col-lg-5 mx-auto col-sm-8"
            >
              <img
                className="mx-auto"
                src={signinicon}
                alt="sign in"
                width={"120px"}
                height={"130px"}
              />
              <h1 className="visually-hidden h3 mb-3 fw-normal">
                Please sign in
              </h1>
              {error && (
                <div className="alert-danger alert text-center">{error}</div>
              )}

              <FormInput
                name={"email"}
                type="email"
                label={"email"}
                error={form.touched.email && form.errors.email}
                {...form.getFieldProps("email")}
              />

              <FormInput
                name="password"
                type="password"
                label={"password"}
                error={form.touched.password && form.errors.password}
                {...form.getFieldProps("password")}
              />
              <button
                className=" btn btn-lg text-light btn-outline-secondary"
                type="submit"
              >
                Sign in
              </button>
              <span className="text-light">don't have an account?</span>
              <button
                onClick={() => navigate("/signup")}
                className="btn btn-lg "
              >
                <span className="text-light btn btn-outline-secondary">
                  sign up here
                </span>
              </button>
              <p className="mt-5 mb-3 text-muted">©Raziel Morad</p>
            </form>{" "}
          </div>
        </div>
      </div>
    </>
  );
};
export default LogIn;
