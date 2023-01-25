import React from "react";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import { useFormik } from "formik";
import { postUser } from "../../../redux/slices/userSlice";
import { useRouter } from "next/router";

export const SignInForm = (props) => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      fullName: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("The email direction is required.")
        .email("Invalid email.")
        .max(255, "The email only can have up 255 characters."),
      fullName: Yup.string()
        .required("The full name direction is required.")
        .max(255, "The full name only can have up 255 characters."),
      username: Yup.string()
        .required("The username direction is required.")
        .matches(/^\S*$/, "The username cannot have spaces")
        .max(255, "The username only can have up 255 characters."),
      password: Yup.string()
        .required("The password is required.")
        .min(8, "The password only can have between 8 and 25 characters.")
        .max(25, "The password only can have between 8 and 25 characters.")
        .matches(
          /^[0-9a-zA-Z]+$/,
          "The password can only contain lowercase letters, uppercase letters, and numbers."
        ),
    }),
    onSubmit: async (FormData) => {
      FormData.email = FormData.email.toLowerCase();
      FormData.email = FormData.email.trim();
      if (await postUser(FormData)) {
        router.push("/");
        formik.handleReset();
      }
    },
  });

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div id="sigin-form">
          <h1 className="text-center">Instact</h1>
          <h5 className="text-center">
            Sign up to see photos and videos from your friends.
          </h5>
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
              ></input>
              {formik.errors.email && formik.values.email.length !== 0 && (
                <small className="text-danger">{formik.errors.email}</small>
              )}
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                name="fullName"
                onChange={formik.handleChange}
                value={formik.values.fullName}
              />
              {formik.errors.fullName &&
                formik.values.fullName.length !== 0 && (
                  <small className="text-danger">
                    {formik.errors.fullName}
                  </small>
                )}
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
              {formik.errors.username &&
                formik.values.username.length !== 0 && (
                  <small className="text-danger">
                    {formik.errors.username}
                  </small>
                )}
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
              {formik.errors.password &&
                formik.values.password.length !== 0 && (
                  <small className="text-danger">
                    {formik.errors.password}
                  </small>
                )}
            </div>
            <button
              type="submit"
              className="btn btn-primary text-center"
              disabled={
                formik.errors.password ||
                formik.errors.email ||
                formik.errors.username ||
                formik.errors.fullName ||
                formik.values.fullName.length === 0 ||
                formik.values.email.length === 0 ||
                formik.values.password.length === 0 ||
                formik.values.username.length === 0
              }
            >
              Sign up
            </button>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};
