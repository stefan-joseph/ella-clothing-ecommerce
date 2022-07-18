import { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import useForm from "../hooks/useForm";
import validateForm from "../utils/validateForm";
import styled from "styled-components";
import axios from "axios";
import { Loading, Alert, InfoForm } from ".";

const Info = () => {
  const {
    user,
    logoutUser,
    showAlert,
    updateUser,
    loading,
    handleStateChange,
  } = useAppContext();

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    handleStateChange({ name: "loading", value: "info" });
    const getUserInfo = async () => {
      try {
        const { data } = await axios(`/api/v1/users/${user.userId}`);
        const { firstName, lastName, email } = data.user;
        setFormValues({ firstName, lastName, email });
        handleStateChange({ name: "loading", value: false });
      } catch (error) {
        handleStateChange({ name: "loading", value: false });
        logoutUser();
      }
    };
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const submitForm = async (values) => {
    updateUser(values);
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
        <h3>info</h3>
        {showAlert === "info" && <Alert />}
        <div className="form-center">
          <InfoForm values={values} errors={errors} onChange={handleChange} />
        </div>
        {loading === "info" && (
          <div className="form-loading">
            <Loading text="updating info" />
          </div>
        )}
        <button
          className="submit-btn"
          type="submit"
          disabled={loading || formValues === values}
        >
          {loading === "info" ? "please wait..." : "save changes"}
        </button>
      </form>
    </Wrapper>
  );
};

export default Info;

const Wrapper = styled.section`
  display: flex;
  width: 100%;
  background: var(--white);

  h3 {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .status {
    margin-bottom: 1.5rem;
  }

  button {
    margin-top: 3rem;
  }
`;
