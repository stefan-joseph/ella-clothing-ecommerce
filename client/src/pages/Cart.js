import { useAppContext } from "../context/appContext";
import { CartItem, Alert } from "../components";
import styled from "styled-components";

const Cart = () => {
  const { shoppingCart, transitionRouter, showAlert } = useAppContext();
  return (
    <Wrapper>
      <h2>Shopping Cart</h2>
      <button
        className="back-btn"
        onClick={() => transitionRouter("/shop/all")}
      >
        continue shopping
      </button>
      {showAlert === "cart" && <Alert />}
      <ul>
        {shoppingCart.length > 0 ? (
          shoppingCart.map((item) => {
            return <CartItem key={item.productId + item.size} item={item} />;
          })
        ) : (
          <li className="no-items">There are no items in your cart...</li>
        )}
      </ul>
      <div className="cart-summary">
        <div className="subtotal">
          <p>Subtotal</p>
          <p>
            $
            {shoppingCart
              .reduce((previous, current) => {
                if (current.salePrice) {
                  return previous + current.quantity * current.salePrice;
                }
                return previous + current.quantity * current.price;
              }, 0)
              .toFixed(2)}
          </p>
        </div>
        <div className="checkout">
          <p>Taxes and shipping calculated at checkout</p>
          <button
            onClick={() => transitionRouter("/checkout")}
            className="submit-btn"
            disabled={shoppingCart.length < 1}
          >
            Checkout
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cart;

const Wrapper = styled.section`
  padding-top: var(--navbarHeight);
  display: flex;
  flex-direction: column;
  margin: var(--appWidth);
  min-height: 110vh;
  > * {
    margin-bottom: 2.5rem;
  }

  h2 {
    margin-top: 1rem;
    font-size: 7rem;
    @media (max-width: 699px) {
      font-size: 5rem;
    }
    @media (max-width: 400px) {
      font-size: 3rem;
    }
  }

  ul {
    border-top: 1px solid var(--tertiaryColor);
    .border-top {
      border-top: 1px solid var(--tertiaryColor);
    }
    button {
      color: var(--tertiaryColor);
    }
    button:hover {
      color: inherit;
    }
    .no-items {
      font-size: 2rem;
      margin-top: 2rem;
    }
  }
  .cart-summary {
    display: flex;
    flex-direction: column;
    margin-left: auto;
    width: 40rem;
    @media (max-width: 699px) {
      width: 100%;
    }
    .subtotal {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      width: 100%;
      p {
        font-size: 1.4rem;
      }
    }
    .checkout {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-top: 2rem;
      width: 100%;
      /* @media (max-width: 699px) {
        width: 100%;
      } */
      p {
        font-size: 0.9rem;
      }
    }
  }
`;
