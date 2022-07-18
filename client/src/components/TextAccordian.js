import { useState, useLayoutEffect } from "react";
import styled from "styled-components";

const TextAccordian = ({ title, body, id }) => {
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelHeight, setPanelHeight] = useState(0);

  useLayoutEffect(() => {
    const panel = document.getElementById(`${id}`);
    setPanelHeight(panel.scrollHeight);
  }, [panelHeight, panelOpen, id]);

  return (
    <Wrapper panelOpen={panelOpen} panelHeight={panelHeight}>
      <button onClick={() => setPanelOpen(!panelOpen)} className="highlight">
        <h4>{title}</h4>
        <div>{panelOpen ? "－" : "＋"}</div>
      </button>
      <div className="panel" id={id}>
        {typeof body === "string" ? <p>{body}</p> : <div>{body}</div>}
      </div>
    </Wrapper>
  );
};

export default TextAccordian;

const Wrapper = styled.div`
  margin: 2rem 0;
  border-bottom: var(--borderWidth) solid
    ${({ panelOpen }) =>
      panelOpen ? "var(--mainColor)" : "var(--secondaryColor)"};
  :hover {
    border-bottom: var(--borderWidth) solid var(--mainColor);
  }
  button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 1rem;
    h4 {
      font-size: 1.5rem;
    }
    div {
      font-size: 2rem;
      font-weight: 100;
    }
  }

  .panel {
    max-height: ${({ panelOpen, panelHeight }) =>
      panelOpen ? `${panelHeight}px` : "0"};
    transition: max-height 0.6s cubic-bezier(0.075, 0.82, 0.165, 1);
    overflow: hidden;

    > * {
      padding-bottom: 1.2rem;
    }
  }
`;
