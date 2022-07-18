import { useAppContext } from "../context/appContext";
import styled from "styled-components";

const Error = () => {
  const { transitionRouter } = useAppContext();
  return (
    <Wrapper>
      <div>
        Oops! Nothing to see here. Try changing course or{" "}
        <button className="highlight" onClick={() => transitionRouter("/")}>
          click here
        </button>{" "}
        to navigate home.
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  min-height: 110vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  margin: var(--appWidth);
  text-align: center;
  button {
    text-decoration-line: underline;
  }
`;

export default Error;
