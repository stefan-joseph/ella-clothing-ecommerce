import { useAppContext } from "../context/appContext";
import styled from "styled-components";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Success = () => {
  const { transitionRouter, handleStateChange } = useAppContext();

  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("redirect_status") === "succeeded") {
      handleStateChange({ name: "shoppingCart", value: [] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <Wrapper>
      <p>Success! Payment received. We'll ship your order right away!</p>
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

export default Success;
