import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import { shippingRates } from "../utils/ShippingRates";

const OrderSummary = ({ clientOrder, values }) => {
  const { shoppingCart, transitionRouter } = useAppContext();

  let listOfItems;

  if (clientOrder) {
    listOfItems = clientOrder.orderItems;
  } else {
    listOfItems = shoppingCart;
  }

  const calculateSubtotal = (cart) =>
    parseInt(
      cart
        .reduce((previous, current) => {
          if (current.salePrice) {
            return previous + current.quantity * current.salePrice;
          }
          return previous + current.quantity * current.price;
        }, 0)
        .toFixed(2)
    );

  const calculateTax = (cart) =>
    parseInt((calculateSubtotal(cart) * 0.15).toFixed(2));
  const calculateShipping = (state) => shippingRates.USA[`${state}`];

  const calculateTotal = (cart, state) =>
    calculateSubtotal(cart) + calculateTax(cart) + calculateShipping(state);

  return (
    <Wrapper>
      {!clientOrder ? (
        <button
          onClick={() => transitionRouter("/cart")}
          className="back-btn cart-btn"
        >
          Back to cart
        </button>
      ) : (
        <div className="shipping-info">
          <p>
            {clientOrder.shippingInfo.firstName}
            {clientOrder.shippingInfo.lastName}
          </p>
          <div className="shipping-address">
            <p>{clientOrder.shippingInfo.street}</p>
            <p>
              {clientOrder.shippingInfo.city}, {clientOrder.shippingInfo.state}
            </p>
            <p>{clientOrder.shippingInfo.country}</p>
            <p>{clientOrder.shippingInfo.zip}</p>
          </div>
          <p>{clientOrder.shippingInfo.tel}</p>
          <p>{clientOrder.shippingInfo.email}</p>
        </div>
      )}
      <ul className="order-summary">
        {listOfItems.map(
          ({
            _id,
            imgPath,
            title,
            color,
            size,
            quantity,
            price,
            salePrice,
          }) => {
            return (
              <li key={imgPath}>
                <img src={`../../../images/${imgPath[0]}`} alt="product" />
                <div className="product-info">
                  <h3 className="product-title">{title}</h3>
                  <p>
                    {color.name} - {size}
                  </p>
                  <div className="price-summary">
                    <p className="quantity">
                      Quantity: <span>{quantity}</span>
                    </p>
                    <div>
                      {salePrice && (
                        <span className="sale-price">
                          ${quantity * salePrice}
                        </span>
                      )}
                      <span className={salePrice ? "old-price" : "price"}>
                        ${quantity * price}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            );
          }
        )}
      </ul>
      {clientOrder ? (
        <>
          <div className="receipt-line">
            <div>
              Subtotal<span>${(clientOrder.subtotal / 100).toFixed(2)}</span>
            </div>
          </div>
          <div className="receipt-line">
            <div>
              Tax<span>${(clientOrder.tax / 100).toFixed(2)}</span>
            </div>
          </div>
          <div className="receipt-line">
            <div>
              Shipping<span>${(clientOrder.shippingFee / 100).toFixed(2)}</span>
            </div>
          </div>
          <div className="total">
            <div>
              Total<span>${(clientOrder.total / 100).toFixed(2)}</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="receipt-line">
            <div>
              Subtotal<span>${calculateSubtotal(shoppingCart).toFixed(2)}</span>
            </div>
          </div>
          <div className="receipt-line">
            <div>
              Tax<span>${calculateTax(shoppingCart).toFixed(2)}</span>
            </div>
          </div>
          <div className="receipt-line">
            <div>
              Shipping
              {values.state ? (
                <span>${calculateShipping(values.state).toFixed(2)}</span>
              ) : (
                <span className="not-selected">select state</span>
              )}
            </div>
          </div>
          <div className="total">
            <div>
              Total
              {values.state ? (
                <span>
                  ${calculateTotal(shoppingCart, values.state).toFixed(2)}
                </span>
              ) : (
                <span className="not-selected">select state</span>
              )}
            </div>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default OrderSummary;

const Wrapper = styled.section`
  width: 100%;
  @media (max-width: 900px) {
    margin-top: 1.5rem;
  }

  .shipping-info {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    opacity: 0.9;
  }

  .order-summary {
    border-top: 1px solid var(--tertiaryColor);
    margin: 2rem 0;
    li {
      display: flex;
      height: 9rem;
      padding: 1rem 0;
      gap: 1rem;
      border-bottom: 1px solid var(--tertiaryColor);
      img {
        border-radius: var(--photoBorderRadius);
        object-fit: cover;
      }
      .product-info {
        display: flex;
        flex-direction: column;
        width: 100%;

        .product-title {
          font-size: 1.5rem;
          margin-bottom: 0.5rem;
        }
        p {
          text-transform: capitalize;
          color: var(--secondaryColor);
        }
        .price-summary {
          display: flex;
          align-items: flex-end;
          height: 100%;
          .quantity {
            margin-right: auto;
          }
          .sale-price {
            color: var(--dangerColor);
            margin-right: 0.5rem;
          }
          .old-price {
            text-decoration-line: line-through;
            text-decoration-thickness: 0.1rem;
            text-decoration-color: var(--dangerColor);
          }
        }
      }
    }
  }

  .receipt-line,
  .total {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 1rem;
    margin-left: 30%;
    @media (max-width: 400px) {
      margin-left: 0;
    }
    div {
      display: flex;
      width: 100%;
      font-size: 1.2rem;
      color: var(--secondaryColor);
      span {
        margin-left: auto;
        color: initial;
      }
    }
    .not-selected {
      font-size: 0.9rem;
    }
  }

  .total {
    padding-top: 1rem;
    border-top: 1px solid var(--tertiaryColor);
    div {
      font-size: 2rem;
      color: var(--mainColor);
      span {
        font-size: 2rem;
      }
    }
  }

  .cart-btn {
    width: fit-content;
    margin: 0;
    margin-top: unset;
    margin-left: unset;
  }
`;
