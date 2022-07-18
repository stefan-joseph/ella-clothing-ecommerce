import styled from "styled-components";

import { useAppContext } from "../context/appContext";

const MenuButton = () => {
  const { handleStateChange, navMenu } = useAppContext();

  return (
    <Wrapper>
      <button
        className={navMenu ? "nav-open" : null}
        onClick={(e) => {
          handleStateChange({ name: "navMenu", value: !navMenu });
        }}
      >
        <div className="top">|</div>
        <div className="bottom">|</div>
      </button>
    </Wrapper>
  );
};

export default MenuButton;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  font-size: 180%;
  font-weight: 300;
  margin-right: 0.3rem;

  button {
    display: flex;
    transform: rotate(90deg);

    .top {
      transform: translateX(-1px);
      transition: transform 0.6s cubic-bezier(0.075, 0.82, 0.165, 1);
      transform-origin: 60% 100%;
    }
    .bottom {
      transform: translateX(1px);
      transition: transform 0.6s cubic-bezier(0.075, 0.82, 0.165, 1);
      transform-origin: 100% 80%;
    }
  }
  button:hover .top {
    transform: translateX(-4px);
  }
  button:hover .bottom {
    transform: translateX(4px);
  }

  .nav-open {
    .top {
      transform: translateX(-4px) rotate(45deg);
      transform-origin: 60% 100%;
    }
    .bottom {
      transform: translateX(4px) rotate(-45deg);
      transform-origin: 100% 80%;
    }
  }
  .nav-open:hover .top {
    transform: translateX(-4px) rotate(45deg);
    transform-origin: 60% 100%;
  }
  .nav-open:hover .bottom {
    transform: translateX(4px) rotate(-45deg);
    transform-origin: 100% 80%;
  }
`;
