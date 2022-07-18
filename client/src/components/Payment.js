import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import { OrderSummary, CheckoutForm, TextAccordian } from ".";
import { v4 as uuidv4 } from "uuid";

const stripePromise = loadStripe(
  "pk_test_51KmN0GL0YOg0YkrybjYaVJ36vvsKZrw8oMmoVF5lxmrxwDLhcRXMMpH92n7Zzd7TsaWyAzi6ju3VIK1IPfKTR9bU00tJCqoYai"
);

const Payment = ({ handleClientOrder, clientOrder, shippingInfo }) => {
  const { shoppingCart, user, loading, handleStateChange } = useAppContext();

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    handleStateChange({ name: "loading", value: "payment" });
    const getPaymentIntent = async () => {
      try {
        let response;
        if (user) {
          const { data } = await axios.post("/api/v1/orders", {
            shoppingCart,
            shippingInfo,
          });
          response = data;
        } else {
          const { data } = await axios.post("/api/v1/orders/sessionOrder", {
            shoppingCart,
            shippingInfo,
          });
          response = data;
        }
        setClientSecret(response.clientSecret);
        handleClientOrder(response.order);
      } catch (error) {
        console.log(error);
      }
    };
    getPaymentIntent();
    handleStateChange({ name: "loading", value: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shippingInfo]);

  const appearance = {
    theme: "flat",
    variables: {
      fontFamily: ' "Gill Sans", sans-serif',
      fontLineHeight: "1.5",
      borderRadius: "10px",
      colorBackground: "#F6F8FA",
      colorPrimaryText: "#262626",
    },
    rules: {
      ".Block": {
        backgroundColor: "var(--colorBackground)",
        boxShadow: "none",
        padding: "12px",
      },
      ".Input": {
        padding: "12px",
      },
      ".Input:disabled, .Input--invalid:disabled": {
        color: "lightgray",
      },
      ".Tab": {
        padding: "10px 12px 8px 12px",
        border: "none",
      },
      ".Tab:hover": {
        border: "none",
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
      },
      ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
        border: "none",
        backgroundColor: "#fff",
        boxShadow:
          "0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
      },
      ".Label": {
        fontWeight: "500",
      },
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <Wrapper>
      <h2>Payment</h2>
      {clientSecret && !loading && (
        <div className="checkout-form">
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm total={(clientOrder.total / 100).toFixed(2)} />
          </Elements>
        </div>
      )}
      {clientOrder && (
        <div className="order-summary-accordian">
          <TextAccordian
            title="Order Summary"
            body={
              <OrderSummary
                clientOrder={clientOrder}
                finalOrder={clientOrder ? true : false}
              />
            }
            id={uuidv4()}
          />
        </div>
      )}
    </Wrapper>
  );
};

export default Payment;

const Wrapper = styled.div`
  margin-left: 5%;
  > * {
    margin-bottom: 1rem;
  }
  p {
    font-size: 1.2rem;
  }
  h2 {
    margin-top: 1rem;
    font-size: 7rem;
  }

  .total {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .order-summary-accordian {
    @media (min-width: 901px) {
      display: none;
    }
  }
`;
