import styled from "styled-components";

const Loading = ({ text }) => {
  return (
    <Wrapper>
      <div>
        <span className="side-box" />
        <span className="title">ΙΞ</span>
        <span className="side-box" />
      </div>
      <p>
        {text && text}
        <span>...</span>
      </p>
    </Wrapper>
  );
};

export default Loading;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  /* flex-grow: 1; */
  gap: 0.8rem;

  div {
    display: flex;
    align-items: center;
    justify-content: center;

    .title {
      font-size: 1rem;
      border: var(--borderWidth) solid;
      border-radius: 15%;
      padding: 4px 6px;
      margin: 0 3px;
      animation: loading 0.8s steps(1) 0s infinite;
      width: fit-content;
      /* scale 0.8s steps(1) 0s infinite; */
    }
    .side-box {
      height: 1rem;
      width: 1rem;
      border: var(--borderWidth) solid;
      border-radius: 15%;
      padding: 0;
      margin: 0.2rem;
      animation: loading 0.8s steps(1) 0s infinite reverse,
        scale 0.8s steps(1) 0s infinite reverse;
      /* animation: scale 0.8s linear 0 infintite reverse; */
    }
  }
  p {
    font-size: 1rem;
    text-transform: uppercase;
  }
  @keyframes loading {
    0% {
      /* transform: scale(1); */
    }
    50% {
      /* transform: scale(1.1); */
      background-color: var(--mainColor);
      color: var(--backgroundColor);
      font-weight: 500;
    }
    100% {
      /* transform: scale(1); */
    }
  }
  @keyframes scale {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }
`;
