import { useEffect, useState } from "react";
import {
  AddressForm,
  OrderSummary,
  TextAccordian,
  Payment,
  InfoForm,
} from "../components";
import { useAppContext } from "../context/appContext";
import useForm from "../hooks/useForm";
import validateForm from "../utils/validateForm";
import axios from "axios";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Checkout = () => {
  const { handleStateChange, loading, user, logoutUser } = useAppContext();

  const [shippingInfo, setShippingInfo] = useState("");
  const [clientOrder, setClientOrder] = useState("");

  const [formValues, setFormValues] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    tel: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      handleStateChange({ name: "loading", value: "info" });
      async function getUserInfo() {
        try {
          const { data } = await axios(`/api/v1/users/${user.userId}`);
          const { firstName, lastName, email, address } = data.user;
          setFormValues({ ...address, firstName, lastName, email });
          handleStateChange({ name: "loading", value: false });
        } catch (error) {
          handleStateChange({ name: "loading", value: false });
          logoutUser();
        }
      }
      getUserInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    handleStateChange({ name: "shippingInfo", value: null });
    setClientOrder("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = (values) => {
    setShippingInfo(values);
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validateForm,
    formValues,
    [formValues]
  );

  return (
    <Wrapper>
      <div className="order-overview-container">
        <h2>Order Summary</h2>
        <OrderSummary clientOrder={clientOrder} values={values} />
      </div>
      {!shippingInfo ? (
        <div className="checkout-info">
          <h2>Checkout</h2>
          <div className="order-summary-accordian">
            <TextAccordian
              title="Order Summary"
              body={<OrderSummary clientOrder={clientOrder} values={values} />}
              id={uuidv4()}
            />
          </div>
          <form className="form" onSubmit={handleSubmit} noValidate>
            <h3>Contact Info</h3>
            <div className="form-center">
              <InfoForm
                values={values}
                errors={errors}
                onChange={handleChange}
              />
            </div>
            <h3>Shipping Address</h3>
            <div className="form-center">
              <AddressForm
                values={values}
                errors={errors}
                onChange={handleChange}
              />
            </div>
            <button
              className="submit-btn payment-btn"
              type="submit"
              disabled={loading}
            >
              {loading ? "Please Wait..." : "continue to payment"}
            </button>
          </form>
        </div>
      ) : (
        <Payment
          handleClientOrder={setClientOrder}
          clientOrder={clientOrder}
          shippingInfo={shippingInfo}
        />
      )}
    </Wrapper>
  );
};

export default Checkout;

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  margin: var(--appWidth);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
  .order-overview-container {
    padding-right: 8%;
    border-right: 1px solid var(--tertiaryColor);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    h2 {
      font-size: 2.6rem;
      margin-bottom: 2rem;
    }
    @media (max-width: 900px) {
      display: none;
    }
  }

  .checkout-info {
    display: flex;
    flex-direction: column;
    margin-left: 5%;
    margin-bottom: 5rem;
    @media (max-width: 900px) {
      margin: 0;
    }

    h2 {
      margin: 2rem 0 1rem 0;
      font-size: 7rem;
      @media (max-width: 550px) {
        font-size: 5rem;
      }
      @media (max-width: 4000px) {
        font-size: 4rem;
      }
    }
    h3 {
      font-size: 2rem;
      margin: 2rem 0 1rem 0;
    }

    .order-summary-accordian {
      @media (min-width: 901px) {
        display: none;
      }
    }

    .payment-btn {
      margin-top: 3rem;
      margin-left: auto;
      display: flex;
    }
  }
`;
