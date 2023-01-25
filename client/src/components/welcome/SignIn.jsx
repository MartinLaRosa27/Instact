import React, { useState } from "react";
import { SignInForm } from "./SignInForm";

export const SignIn = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="welcome-no-count">
      <p>
        You do not have an account?{" "}
        <strong onClick={() => setModalShow(true)}>Sign In</strong>
      </p>

      <SignInForm show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
};
