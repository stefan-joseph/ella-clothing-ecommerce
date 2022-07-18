import styled from "styled-components";
import { BigLogo } from ".";
import { useAppContext } from "../context/appContext";

const TransitionCurtain = () => {
  const { showTransitionCurtain } = useAppContext();

  return (
    <Wrapper>
      <div className={showTransitionCurtain ? "curtain loading" : "curtain"}>
        <BigLogo />
      </div>
    </Wrapper>
  );
};

export default TransitionCurtain;

const Wrapper = styled.div`
  .curtain {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100vw;
    height: 100vh;
    transform: translateY(-102vh);
    transition: transform 1.2s cubic-bezier(0.075, 0.82, 0.165, 1);
    background-color: var(--backgroundColor);
    z-index: 99;
    animation: 1.2s cubic-bezier(0.075, 0.82, 0.165, 1) 0s 1 revealPage;
    box-shadow: 0 0 15px black;
  }

  @keyframes revealPage {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-102vh);
    }
  }

  .loading {
    transform: translateY(0);
  }
`;
