import { useState, useEffect } from "react";
import { FormRow, Alert } from ".";
import { useAppContext } from "../context/appContext";
import useForm from "../hooks/useForm";
import validateForm from "../utils/validateForm";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const LoginForm = ({ modal }) => {
  const navigate = useNavigate();
  const [isMember, setIsMember] = useState(true);

  const {
    user,
    loading,
    registerUser,
    loginUser,
    closeLoginModal,
    showAlert,
    transitionRouter,
  } = useAppContext();

  // change to useSate??
  const formValues = isMember
    ? { email: "", password: "" }
    : { firstName: "", lastName: "", email: "", password: "", password2: "" };

  const submitForm = (values) => {
    const { firstName, lastName, email, password } = values;
    const currentUser = { firstName, lastName, email, password };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validateForm,
    formValues,
    [isMember]
  );

  useEffect(() => {
    if (user && !modal) {
      setTimeout(() => {
        transitionRouter("/");
      }, 3000);
    }
    if (user && modal) {
      setTimeout(() => {
        closeLoginModal();
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate, modal]);

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <h3>{isMember ? "Sign in" : "Register"}</h3>
        {showAlert === "login" ? <Alert /> : <div className="alert">■ ▢ ■</div>}
        {/* first name input */}
        {!isMember && (
          <FormRow
            type="text"
            name="firstName"
            labelText="first name"
            value={values.firstName || ""}
            handleChange={handleChange}
            error={errors.firstName}
            disabled={loading}
          />
        )}
        {/* last name input */}
        {!isMember && (
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            value={values.lastName || ""}
            handleChange={handleChange}
            error={errors.lastName}
            disabled={loading}
          />
        )}
        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
          error={errors.email}
          disabled={loading}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
          error={errors.password}
          disabled={loading}
        />
        {/* password2 input */}
        {!isMember && (
          <FormRow
            type="password"
            name="password2"
            labelText="re-enter password"
            value={values.password2 || ""}
            handleChange={handleChange}
            error={errors.password2}
            disabled={loading}
          />
        )}
        <button type="submit" className="submit-btn" disabled={loading}>
          {isMember ? "Sign In" : "Register"}
        </button>
        <p className="member-prompt">
          {isMember ? "Not a member yet?" : "Already a member?"}
          <button
            type="button"
            onClick={() => setIsMember(!isMember)}
            className="member-btn"
          >
            {isMember ? "Register" : "Sign In"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default LoginForm;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  .modal-text {
    margin-top: 2rem;
    font-size: 1.1rem;
    font-weight: bolder;
  }

  .form {
    max-width: 400px;
    display: grid;
    margin: var(--appWidth);
  }

  .member-btn {
    padding: 0 0.5rem;
    font-weight: 600;
  }

  .member-btn:hover {
    color: var(--tertiaryColor);
    letter-spacing: var(--letterSpacing);
  }

  h3 {
    text-align: center;
    font-size: 2rem;
  }

  .member-prompt {
    margin-top: 1rem;
    text-align: center;
  }

  .close-btn {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 3rem;
    font-weight: 100;
    transform: rotate(45deg);
  }
`;
