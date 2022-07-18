import { useState } from "react";
import useForm from "../hooks/useForm";
import validateForm from "../utils/validateForm";
import { FormRow, Alert, Loading } from ".";
import { useAppContext } from "../context/appContext";
import styled from "styled-components";

const Password = () => {
  const { updateUserPassword, loading, showAlert } = useAppContext();

  const [formValues, setFormValues] = useState({
    oldPassword: "",
    password: "",
    password2: "",
  });

  const submitForm = (values) => {
    updateUserPassword({
      oldPassword: values.oldPassword,
      newPassword: values.password,
    });
    setFormValues({
      oldPassword: "",
      password: "",
      password2: "",
    });
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validateForm,
    formValues,
    [formValues]
  );

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>password</h3>
        {showAlert === "password" && <Alert />}
        <div className="form-center">
          <FormRow
            type="password"
            labelText="current password"
            name="oldPassword"
            value={values.oldPassword}
            handleChange={handleChange}
            error={errors.oldPassword}
            disabled={loading}
          />
          <FormRow
            type="password"
            labelText="new password"
            name="password"
            value={values.password}
            handleChange={handleChange}
            error={errors.password}
            disabled={loading}
          />
          <FormRow
            type="password"
            labelText="re-enter new password"
            name="password2"
            value={values.password2}
            handleChange={handleChange}
            error={errors.password2}
            disabled={loading}
          />
        </div>
        {loading === "password" && (
          <div className="form-loading">
            <Loading text="updating password" />
          </div>
        )}
        <button
          className="submit-btn"
          type="submit"
          disabled={
            loading ||
            (!values.oldPassword && !values.password && !values.password2)
          }
        >
          {loading === "password" ? "Please Wait..." : "update password"}
        </button>
      </form>
    </Wrapper>
  );
};

export default Password;

const Wrapper = styled.section`
  display: flex;
  width: 100%;
  padding: 50px 0;
  background: var(--white);

  h3 {
    font-size: 2rem;
    margin: 3rem 0 2rem 0;
  }

  button {
    margin-top: 3rem;
  }

  div:nth-child(2) {
    grid-column: 1;
  }

  .form-loading {
  }
`;
