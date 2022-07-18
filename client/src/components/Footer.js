import { useAppContext } from "../context/appContext";
import styled from "styled-components";
import { RiVisaLine } from "react-icons/ri";
import { FaCcPaypal, FaAmazonPay, FaApplePay } from "react-icons/fa";
import { SocialLinks } from ".";
import { categories } from "../utils/categories";

const Footer = () => {
  const { user, transitionRouter, logoutUser } = useAppContext();

  return (
    <Wrapper id="footer-unique">
      <div className="top">
        <div className="main-menu">
          <h6>Menu</h6>
          <ul>
            <li>
              <button
                className="highlight"
                onClick={() => transitionRouter("shop/all")}
              >
                Shop
              </button>
            </li>
            <li>
              <button
                className="highlight"
                onClick={() => transitionRouter("/about")}
              >
                About
              </button>
            </li>
            <li>
              <button
                className="highlight"
                onClick={() => transitionRouter("/cart")}
              >
                Cart
              </button>
            </li>
            <li>
              <button
                className="highlight"
                onClick={() => transitionRouter("/account")}
              >
                Account
              </button>
            </li>
            <li>
              {user ? (
                <button className="highlight" onClick={logoutUser}>
                  Sign out
                </button>
              ) : (
                <button
                  className="highlight"
                  onClick={() => transitionRouter("/login")}
                >
                  Sign in
                </button>
              )}
            </li>
          </ul>
        </div>
        <div className="shop-menu">
          <h6>Shop</h6>
          <ul>
            {categories.map((c) => {
              return (
                <li key={c}>
                  <button
                    className="highlight"
                    onClick={() => transitionRouter(`/shop/${c}`)}
                  >
                    {c}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="social-links">
          <SocialLinks />
        </div>
      </div>
      <div className="bottom">
        <div className="payment-options">
          <RiVisaLine />
          <FaApplePay />
          <FaCcPaypal />
          <FaAmazonPay />
        </div>
        <div className="copyright-author">
          <div className="copyright">Copyright © Ella Clothing</div>
          <div className="author">Website by Stefan Joseph</div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  padding: var(--appWidth);
  padding-top: 3rem;
  padding-bottom: 1rem;
  box-shadow: inset 0px 8px 16px -7px rgba(0, 0, 0, 0.8);
  text-transform: capitalize;

  h6 {
    margin-bottom: 1.5rem;

    color: var(--secondaryColor);
    text-transform: uppercase;
  }

  li {
    margin-bottom: 0.5rem;
  }

  button {
    text-transform: capitalize;
  }

  .top {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    font-size: 1.2rem;
    padding-bottom: 1rem;
  }

  .social-links {
    margin-top: 2rem;
    font-size: 1rem;
  }

  .bottom {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 1rem;
    border-top: var(--borderWidth) solid var(--tertiaryColor);
  }

  .payment-options {
    display: flex;
    justify-content: space-around;
    font-size: 2.6rem;
  }

  .copyright-author {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 0.4rem;
    align-items: center;
    font-size: 0.7rem;
  }

  @media (min-width: 700px) {
    .top {
      grid-template-columns: repeat(3, 1fr);
    }
    .social-links {
      margin-top: auto;
    }
    .bottom {
      flex-direction: unset;
      justify-content: space-between;
    }

    .payment-options {
      justify-content: unset;
      gap: 2rem;
      flex: 1;
    }

    .copyright-author {
      flex-direction: unset;
      flex: 2;
    }
  }
`;
export default Footer;
