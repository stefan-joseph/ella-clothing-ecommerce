import React from "react";
import styled from "styled-components";
import { BsCheck } from "react-icons/bs";

const ProgressBar = ({ currentStep, steps }) => {
  const progress = steps.indexOf(currentStep);
  console.log(progress);
  return (
    <Wrapper>
      <div className="icon-bar">
        {steps.map((step, i, a) => {
          return (
            <React.Fragment key={step}>
              <div
                className={
                  i > progress && progress >= 0 ? "step step-inactive" : "step"
                }
              >
                <div
                  className={
                    i < progress || progress < 0 ? "icon icon-complete" : "icon"
                  }
                >
                  {i >= progress && progress >= 0 ? i + 1 : <BsCheck />}
                </div>
              </div>
              {a.length - 1 !== i && (
                <div
                  className={
                    i < progress || progress < 0
                      ? "progress-line progress-line-complete"
                      : " progress-line"
                  }
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
      <div className="text-bar">
        {steps.map((step, i, a) => (
          <h6
            key={step}
            style={
              progress < i && progress >= 0
                ? { color: "var(--tertiaryColor)" }
                : { color: "var(--mainColor)" }
            }
            className={i === 0 ? null : i === a.length - 1 ? "right" : "center"}
          >
            {step}
          </h6>
        ))}
      </div>
    </Wrapper>
  );
};

export default ProgressBar;

const Wrapper = styled.div`
  .icon-bar,
  .text-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
  }

  .step {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    color: var(--mainColor);
  }

  .step-inactive {
    color: var(--tertiaryColor);
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    border: var(--borderWidth) solid;
    border-radius: var(--borderRadius);
    height: 2rem;
    width: 2rem;
    font-size: 1.2rem;
  }

  .progress-line {
    flex: 1;
    background-color: var(--tertiaryColor);
    border-radius: var(--borderRadius);
    height: 0.1rem;
    margin: 0 1rem;
  }

  .icon-complete {
    background-color: var(--mainColor);
    color: var(--backgroundColor);
    border-color: var(--mainColor);
    font-size: 1.6rem;
  }

  .step-active {
    color: var(--mainColor);
  }

  .progress-line-complete {
    background-color: var(--mainColor);
    height: 0.2rem;
  }

  .text-bar {
    h6 {
      flex: 1 1 0px;
      font-size: 1rem;
      text-transform: uppercase;
    }
    .center {
      text-align: center;
    }
    .right {
      text-align: right;
    }
  }
`;
