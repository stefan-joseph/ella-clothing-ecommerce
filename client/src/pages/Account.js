import { useState } from "react";
import { Info, Password, AddressTab, ReviewsTab, Orders } from "../components";
import { useAppContext } from "../context/appContext";
import styled from "styled-components";

const Account = () => {
  const { darkMode } = useAppContext();

  const [tab, setTab] = useState("profile");

  return (
    <Wrapper darkMode={darkMode}>
      <nav>
        <div className="tabs">
          <button
            className={tab === "profile" ? "open" : "closed"}
            onClick={() => setTab("profile")}
          >
            Profile
          </button>
          <button
            className={tab === "shipping address" ? "open" : "closed"}
            onClick={() => setTab("shipping address")}
          >
            Address
          </button>
          <button
            className={tab === "reviews" ? "open" : "closed"}
            onClick={() => setTab("reviews")}
          >
            Reviews
          </button>
          <button
            className={tab === "orders" ? "open" : "closed"}
            onClick={() => setTab("orders")}
          >
            Orders
          </button>
        </div>
        <div className="tab-extender"></div>
      </nav>
      <h2 className="title">{tab}</h2>
      {tab === "profile" && (
        <>
          <Info />
          <Password />
        </>
      )}
      {tab === "shipping address" && <AddressTab checkout={false} />}
      {tab === "reviews" && <ReviewsTab />}
      {tab === "orders" && <Orders />}
    </Wrapper>
  );
};

export default Account;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: var(--appWidth);
  padding-top: var(--navbarHeight);
  min-height: 100vh;

  nav {
    display: flex;
    margin-top: 2rem;
    .tabs {
      flex: 2;
      display: grid;
      grid-template-columns: repeat(80, 1fr);
      button:nth-child(1) {
        grid-column: 1/21;
        grid-row: 1;
      }
      button:nth-child(2) {
        grid-column: 20/41;
        grid-row: 1;
      }
      button:nth-child(3) {
        grid-column: 40/61;
        grid-row: 1;
      }
      button:nth-child(4) {
        grid-column: 60/81;
        grid-row: 1;
      }

      button {
        font-size: 1rem;
        border: var(--borderWidth) solid var(--mainColor);
        border-top-left-radius: 20%;
        border-top-right-radius: 40%;
        flex: 1;
        height: 3rem;
        background-color: var(--backgroundColor);
        @media (min-width: 400px) {
          font-size: 1.2rem;
        }
      }
      .open {
        border-bottom: none;
        cursor: default;
        z-index: 4;
      }
      .closed {
        color: var(--secondaryColor);
        border: var(--borderWidth) solid var(--secondaryColor);
        border-bottom: var(--borderWidth) solid var(--mainColor);
        box-shadow: inset 1em -0.4em 8px 8px ${({ darkMode }) => (darkMode ? "#171717" : "#f5f5f5")};
        box-shadow: inset 0.3em -0.1em 7px 1px ${({ darkMode }) => (darkMode ? "#171717" : "#e5e5e5")};
        z-index: 3;
      }
      .closed:hover {
        color: var(--mainColor);
      }

      .closed + .closed {
        z-index: 2;
      }
      .closed + .closed + .closed {
        z-index: 1;
      }
    }
    .tab-extender {
      border-bottom: var(--borderWidth) solid var(--mainColor);
      flex: 0;
      @media (min-width: 901px) {
        flex: 1;
      }
    }
  }
  .title {
    font-size: 3rem;
    margin: 3rem 0 2rem 0;
  }
`;
