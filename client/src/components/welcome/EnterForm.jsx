import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { userAuthentication } from "../../../redux/slices/userSlice";
import { useRouter } from "next/router";

export const EnterForm = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("The email direction is required.")
        .email("Invalid email."),
      password: Yup.string().required("The password is required."),
    }),
    onSubmit: async (FormData) => {
      FormData.email = FormData.email.toLowerCase();
      FormData.email = FormData.email.trim();
      if (await userAuthentication(FormData)) {
        router.push("/");
        formik.handleReset();
      }
    },
  });

  return (
    <div className="welcome-form">
      <h1 className="text-center">Instact</h1>
      <form onSubmit={formik.handleSubmit} method="POST">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary text-center"
          disabled={
            formik.errors.password ||
            formik.errors.email ||
            formik.values.email.length === 0 ||
            formik.values.password.length === 0
          }
        >
          Enter
        </button>
      </form>
    </div>
  );
};
