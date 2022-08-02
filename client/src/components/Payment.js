import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import { PaymentForm, Loading } from ".";

const stripePromise = loadStripe(
  "pk_test_51KmN0GL0YOg0YkrybjYaVJ36vvsKZrw8oMmoVF5lxmrxwDLhcRXMMpH92n7Zzd7TsaWyAzi6ju3VIK1IPfKTR9bU00tJCqoYai"
);

const Payment = ({ onClientOrder, shippingInfo, onPaymentSuccess }) => {
  const { shoppingCart, user, loading, handleStateChange } = useAppContext();

  const [clientSecret, setClientSecret] = useState("");
  const [orderTotal, setOrderTotal] = useState("");

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
        onClientOrder(response.order);
        setOrderTotal(response.order.total);
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

  if (loading === "payment") {
    return (
      <Wrapper>
        <div className="loading-container">
          <Loading text="preparing secure payment form" />
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h3 className="secondary-title">Payment</h3>
      {clientSecret && !loading && (
        <div className="payment-form">
          <Elements options={options} stripe={stripePromise}>
            <PaymentForm
              total={(orderTotal / 100).toFixed(2)}
              onPaymentSuccess={onPaymentSuccess}
            />
          </Elements>
        </div>
      )}
    </Wrapper>
  );
};

export default Payment;

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  .loading-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
