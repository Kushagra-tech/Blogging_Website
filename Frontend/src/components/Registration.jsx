import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SignupSchema } from "../schemas";

let initialValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};
const Registration = () => {
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState({});
  const [validationError, setValidationError] = useState("");

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignupSchema,
      onSubmit: async (values) => {
        try {
          const response = await fetch("/api/v1/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          if (!response.ok) {
            const result = await response.json();
            setValidationError(result.error);
            throw new Error("Network response was not ok");
          }
          setResponseData(response);
          setTimeout(() => {
            navigate("/login");
          }, 1000);
        } catch (error) {
          console.log(error.message);
        }
      },
    });

  return (
    <div className="bg-gray-100 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-white shadow-md rounded-md p-6">
          <h2 className="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up for an account
          </h2>
          <p className="text-sm text-gray-500 text-center">
            Already have an account?
            <Link
              to="/login"
              className="font-semibold text-red-700 hover:text-red-800"
            >
              Log in
            </Link>
          </p>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-red-700">
                Username :
              </label>
              <div className="mt-1">
                <input
                  name="name"
                  type="text"
                  required
                  value={values.name}
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-800 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.name && touched.name ? (
                <p className="form-error text-red-700">{errors.name}</p>
              ) : null}
            </div>
            <div>
              <label className="block text-sm font-medium text-red-700">
                Email :
              </label>
              <div className="mt-1">
                <input
                  name="email"
                  type="email"
                  required
                  value={values.email}
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.email && touched.email ? (
                <p className="form-error text-red-700">{errors.email}</p>
              ) : null}
            </div>

            <div>
              <label className="block text-sm font-medium text-red-700">
                Password :
              </label>
              <div className="mt-1">
                <input
                  name="password"
                  type="password"
                  required
                  value={values.password}
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              {errors.password && touched.password ? (
                <p className="form-error text-red-700">{errors.password}</p>
              ) : null}
            </div>
            <div>
              <label className="block text-sm font-medium text-red-700">
                Confirm Password :
              </label>
              <div className="mt-1">
                <input
                  name="confirm_password"
                  type="password"
                  required
                  value={values.confirm_password}
                  className="px-2 py-3 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:outline-none focus:ring-sky-500 sm:text-sm"
                  onChange={handleChange}
                />
              </div>
            </div>
            {errors.confirm_password && touched.confirm_password ? (
              <p className="form-error text-red-700">
                {errors.confirm_password}
              </p>
            ) : null}
            <button
              type="submit"
              className="flex w-full justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
            >
              {responseData.ok
                ? "User Registered Successfully ✅"
                : "Register Account"}
            </button>
            <div className="text-red-700">{validationError}</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registration;
