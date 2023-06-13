import signupicon from "../media/icons/sign-up.png";
import { useFormik } from "formik";
import joi from "joi";
import formikValidateUsingJoi from "../utils/formikvalidateusingjoi";
import FormInput from "./forminput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./context/auth.context";
import { Link } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, logIn, user } = useAuth();
  const [error, setError] = useState("");

  const schema = {
    firstName: joi.string().min(2).max(256).required(),
    lastName: joi.string().min(2).max(256).required(),
    email: joi
      .string()
      .min(2)
      .max(256)
      .required()
      .email({ tlds: { allow: false } })
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i),
    password: joi
      .string()
      .min(6)
      .max(256)
      .required()
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d{4,})(?=.*[^A-Za-z0-9]).{8,}$/)
      .messages({
        "string.pattern.base": `Password must contain one upper and lower case letters,at least 4 numbers and one special character `,
      }),
    rePassword: joi
      .string()
      .valid(joi.ref("password"))
      .min(6)
      .max(256)
      .required()
      .messages({ "any.only": "passwords must match" }),
  };

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      rePassword: "",
    },
    validate: formikValidateUsingJoi(schema),
    onSubmit: async (values) => {
      try {
        const { rePassword, ...rest } = values;
        await createUser({ ...rest, admin: false });
        await logIn({ email: values.email, password: values.password });
        toast("you have successfully created a user! 😎");
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
          {" "}
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
            <div className="row mt-4">
              <form
                onSubmit={form.handleSubmit}
                className="mt-2 p-5 form-floating form d-grid gap-3 col-lg-5 mx-auto col-sm-8"
              >
                <img
                  className="mx-auto"
                  src={signupicon}
                  alt="sign up logo"
                  width={"120px"}
                  height={"120px"}
                />

                {error && (
                  <div className="alert-danger alert text-center">{error}</div>
                )}
                <FormInput
                  name={"firstName"}
                  type="name"
                  label={"First Name"}
                  error={form.touched.name && form.errors.name}
                  {...form.getFieldProps("firstName")}
                />
                <FormInput
                  name={"lastName"}
                  type="name"
                  label={"Last Name"}
                  error={form.touched.name && form.errors.name}
                  {...form.getFieldProps("lastName")}
                />

                <FormInput
                  name={"email"}
                  type="email"
                  label={"Email Address"}
                  error={form.touched.email && form.errors.email}
                  {...form.getFieldProps("email")}
                ></FormInput>
                <div className="input-wrapper">
                  <FormInput
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label={"password"}
                    error={form.touched.password && form.errors.password}
                    {...form.getFieldProps("password")}
                  />
                  {!form.touched.password ? null : (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {!showPassword ? (
                        <i className="bi bi-eye-slash"></i>
                      ) : (
                        <i className="bi bi-eye"></i>
                      )}
                    </button>
                  )}
                </div>
                <FormInput
                  name="rePassword"
                  type="password"
                  label={"confirm password"}
                  error={form.touched.rePassword && form.errors.rePassword}
                  {...form.getFieldProps("rePassword")}
                />

                <button
                  className=" btn btn-lg text-light btn-outline-secondary"
                  type="submit"
                >
                  Sign Up
                </button>
                <span className=" text-light">already have an account?</span>
                <button
                  onClick={() => navigate("/signin")}
                  className="btn btn-lg "
                >
                  <span className="text-light btn btn-outline-secondary">
                    Sign in here
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SignUp;
