import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import styled from "styled-components";

const PaymentSuccess = () => {
  const { transitionRouter, handleStateChange, user } = useAppContext();

  useEffect(() => {
    if (user) {
      localStorage.removeItem("shoppingCart");
    } else {
      sessionStorage.removeItem("shoppingCart");
    }
    return () => handleStateChange({ name: "shoppingCart", value: [] });
  }, []);

  return (
    <Wrapper>
      <p>
        Success! Payment received. We'll get working on your order right away!
      </p>
      <p>Thanks for shopping with us!</p>
      <button
        onClick={() => transitionRouter("/")}
        className="highlight-reverse"
      >
        Click here to return to the homepage.
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  font-size: 2rem;
  min-height: 110vh;
  margin: var(--appWidth);
  padding-top: var(--navbarHeight);
  > * {
    margin: 1rem 0;
  }
`;

export default PaymentSuccess;
