import { useState, useEffect } from "react";
import { Alert, AddressForm, Loading } from ".";
import { useAppContext } from "../context/appContext";
import useForm from "../hooks/useForm";
import validateForm from "../utils/validateForm";
import styled from "styled-components";
import axios from "axios";

const AddressTab = () => {
  const {
    user,
    logoutUser,
    showAlert,
    updateUserAddress,
    loading,
    handleStateChange,
    forceRefresh,
  } = useAppContext();

  const [formValues, setFormValues] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    tel: "",
  });

  useEffect(() => {
    handleStateChange({ name: "loading", value: "address" });
    const getUserAddress = async () => {
      try {
        const { data } = await axios(`/api/v1/users/${user.userId}`);
        const { address } = data.user;
        setFormValues(address);
        handleStateChange({ name: "loading", value: false });
      } catch (error) {
        logoutUser();
        handleStateChange({ name: "loading", value: false });
      }
    };
    getUserAddress();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceRefresh]);

  const submitForm = (values) => {
    updateUserAddress(values);
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validateForm,
    formValues,
    [formValues]
  );

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit} noValidate>
        {showAlert === "address" && <Alert />}
        <div className="form-center">
          <AddressForm
            values={values}
            errors={errors}
            onChange={handleChange}
          />
        </div>
        {loading === "address" && (
          <div className="form-loading">
            <Loading text="one moment, please" />
          </div>
        )}
        <button
          className="submit-btn"
          type="submit"
          disabled={loading || formValues === values}
        >
          {loading ? "Please Wait..." : "update address"}
        </button>
      </form>
    </Wrapper>
  );
};

export default AddressTab;

const Wrapper = styled.section`
  display: flex;
  width: 100%;
  background: var(--white);

  h3 {
    font-size: 3rem;
    margin-top: 3rem;
  }

  button {
    margin-top: 3rem;
  }

  .form-center {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    @media (max-width: 500px) {
      grid-template-columns: 1fr;
    }
  }
  .form-center button {
    align-self: end;
    height: 35px;
  }
  .payment-btn {
    margin-left: auto;
  }
`;
