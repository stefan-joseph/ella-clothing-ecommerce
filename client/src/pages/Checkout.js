import { useEffect, useState } from "react";
import {
  OrderSummary,
  TextAccordian,
  Payment,
  ProgressBar,
  BigLogo,
  CheckoutForm,
  PaymentSuccess,
} from "../components";
import { useAppContext } from "../context/appContext";
import useForm from "../hooks/useForm";
import validateForm from "../utils/validateForm";
import axios from "axios";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const Checkout = () => {
  const { handleStateChange, loading, user, logoutUser } = useAppContext();

  const [checkoutStep, setCheckoutStep] = useState("address");

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

  const submitForm = (values) => {
    setShippingInfo(values);
    setCheckoutStep("payment");
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validateForm,
    formValues,
    [formValues]
  );

  return (
    <Wrapper>
      <div className="order-summary-sidebar">
        <h2>Order Summary</h2>
        <OrderSummary clientOrder={clientOrder} values={values} />
      </div>
      <div className="checkout-container">
        <div className="logo-container">
          <BigLogo />
        </div>
        <ProgressBar
          currentStep={checkoutStep}
          steps={["cart", "address", "payment"]}
        />
        <h2 className="primary-title">Checkout</h2>
        <div className="order-summary-accordian">
          <TextAccordian
            title="Order Summary"
            body={<OrderSummary clientOrder={clientOrder} values={values} />}
            id={uuidv4()}
          />
        </div>
        {(() => {
          switch (checkoutStep) {
            case "address":
              return (
                <CheckoutForm
                  values={values}
                  errors={errors}
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                />
              );
            case "payment":
              return (
                <Payment
                  shippingInfo={shippingInfo}
                  onClientOrder={(order) => setClientOrder(order)}
                  onPaymentSuccess={() => setCheckoutStep("success")}
                />
              );
            case "success":
              return <PaymentSuccess />;
            default:
              return <CheckoutForm />;
          }
        })()}
      </div>
    </Wrapper>
  );
};

export default Checkout;

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }

  .order-summary-sidebar {
    border-right: 1px solid var(--tertiaryColor);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 0 8%;
    padding-top: 1rem;
    h2 {
      font-size: 2.6rem;
      margin-bottom: 2rem;
    }
    @media (max-width: 900px) {
      display: none;
    }
  }

  .checkout-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0 5%;
    > * {
      margin: 1rem 0;
    }
  }

  .logo-container {
    margin-bottom: 2rem;
  }

  .primary-title {
    font-size: 6rem;
    display: inline;
    padding: 0;
    margin: 0;
    @media (max-width: 550px) {
      font-size: 5rem;
    }
    @media (max-width: 400px) {
      font-size: 4rem;
    }
  }

  .secondary-title {
    font-size: 2rem;
    margin: 2rem 0 1rem 0;
  }

  .payment-btn {
    margin-top: 3rem;
    margin-left: auto;
    display: flex;
  }

  .order-summary-accordian {
    @media (min-width: 901px) {
      display: none;
    }
  }
`;
