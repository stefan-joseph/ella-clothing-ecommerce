import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { categories } from "../utils/categories";
import styled from "styled-components";
import { RiVisaLine } from "react-icons/ri";
import { FaCcPaypal, FaAmazonPay, FaApplePay } from "react-icons/fa";
import SocialLinks from "./SocialLinks";

const NavMenu = () => {
  const {
    navMenu,
    user,
    logoutUser,
    shoppingCart,
    transitionRouter,
    handleStateChange,
  } = useAppContext();

  useEffect(() => {
    if (navMenu) {
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.position = "fixed";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [navMenu]);

  return (
    <Wrapper navMenu={navMenu}>
      {navMenu && (
        <div
          onClick={() => handleStateChange({ name: "navMenu", value: false })}
          className="overlay"
        ></div>
      )}
      <div className="menu-top">
        <nav>
          <div className="shop-menu menu-list">
            <h3>shop</h3>
            <ul className="category-list">
              {categories.map((c) => {
                return (
                  <button
                    key={c}
                    className="category-link highlight"
                    onClick={() => transitionRouter(`/shop/${c}`)}
                  >
                    <li>{c}</li>
                  </button>
                );
              })}
            </ul>
          </div>
          <ul className="main-menu menu-list">
            <button
              onClick={() => transitionRouter("/shop/all")}
              className="highlight shop-link"
            >
              <li>
                <h3>shop</h3>
              </li>
            </button>
            <button
              onClick={() => transitionRouter("/about")}
              className="highlight"
            >
              <li>
                <h3>about</h3>
              </li>
            </button>
            <button
              onClick={() => transitionRouter("/cart")}
              className="highlight"
            >
              <h3>
                cart<sup>{shoppingCart.length}</sup>
              </h3>
            </button>
            <button
              onClick={() => transitionRouter("/account")}
              className="highlight"
            >
              <h3>account</h3>
            </button>

            {user ? (
              <button
                onClick={() => {
                  logoutUser();
                  transitionRouter("/login");
                }}
                className="highlight"
              >
                <h3>Sign Out</h3>
              </button>
            ) : (
              <button
                onClick={() => transitionRouter("/login")}
                className="highlight"
              >
                <h3>Sign In</h3>
              </button>
            )}
          </ul>
        </nav>
      </div>
      <div className="menu-bottom">
        <div className="payment-menu">
          <RiVisaLine />
          <FaApplePay />
          <FaCcPaypal />
          <FaAmazonPay />
        </div>
        <div className="social-menu">
          <SocialLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default NavMenu;

const Wrapper = styled.aside`
  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 90;
    visibility: visible;
  }

  .menu-top {
    position: fixed;
    display: flex;
    justify-content: flex-end;
    padding: var(--appWidth);
    top: 0px;
    height: 350px;
    width: 100vw;
    z-index: 91;
    transform: ${({ navMenu }) =>
      navMenu ? "translateY(-0px)" : "translateY(-365px)"};
    transition: transform 1.2s var(--transitionTiming)
      ${({ navMenu }) => navMenu && "0.15s"};
    text-transform: capitalize;
    box-shadow: 0 0 15px black;

    h3 {
      font-size: 1.6rem;
      height: 3rem;
    }

    button {
      width: fit-content;
      text-transform: capitalize;
    }

    nav {
      display: flex;
      justify-content: center;
      margin-top: 100px;
      width: 94%;
    }
    .menu-list {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding-left: 2%;
    }

    .shop-menu {
      display: none;
      .category-list {
        display: flex;
        flex-direction: column;
        border-left: var(--borderWidth) solid var(--tertiaryColor);
        margin-left: 1rem;
        padding-left: 0.8rem;
      }
      .category-link {
        height: 2rem;
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        border-bottom: var(--borderWidth) solid var(--tertiaryColor);
      }
      @media (min-width: 700px) {
        display: inherit;
      }
    }

    .main-menu {
      .shop-link {
        @media (min-width: 700px) {
          display: none;
        }
      }

      > * {
        height: 3rem;
      }
    }
  }

  .menu-bottom {
    position: fixed;
    display: flex;
    align-items: flex-end;
    padding: var(--appWidth);
    padding-bottom: 1rem;
    top: 0px;
    height: 450px;
    width: 100vw;

    z-index: 90;
    background-color: var(--backgroundColor);
    transform: ${({ navMenu }) =>
      navMenu ? "translateY(0px)" : "translateY(-465px)"};
    transition: transform 1.2s var(--transitionTiming)
      ${({ navMenu }) => !navMenu && "0.15s"};
    box-shadow: 0 0 20px black;

    .payment-menu {
      display: none;
      flex: 2;
      align-items: center;
      gap: 2rem;
      height: 3rem;
      font-size: 3rem;
    }
    .social-menu {
      display: flex;
      align-items: center;
      font-size: 1.2rem;
      height: 3rem;
      width: 100%;
      width: fit-content;
      margin-left: auto;
      margin-right: 2rem;
    }
    @media (min-width: 700px) {
      .payment-menu {
        display: inherit;
      }
      .social-menu {
      }
    }
  }
`;
