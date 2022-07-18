import { useAppContext } from "../context/appContext";
import styled from "styled-components";

const CartItem = ({ item }) => {
  const {
    productId,
    title,
    size,
    color,
    quantity,
    price,
    salePrice,
    imgPath,
    slug,
    category,
  } = item;

  const { deleteFromCart, updateCart, transitionRouter } = useAppContext();
  return (
    <Wrapper className="cart-item">
      <button
        className="img-container"
        onClick={() =>
          transitionRouter(`/shop/${category}/${slug}/${color.name}`)
        }
      >
        <img src={`../../../images/${imgPath[0]}`} alt="product" />
      </button>
      <div className="product-info">
        <h3>{title}</h3>
        <p>
          {color.name} - {size}
        </p>

        <div className="quantity-selector">
          <button
            type="button"
            onClick={() => {
              const newQuantity = quantity - 1;
              if (newQuantity < 1) {
                deleteFromCart({ productId, size });
              } else {
                updateCart({
                  productId,
                  size,
                  quantity: newQuantity,
                });
              }
            }}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            onClick={() => {
              const newQuantity = quantity + 1;
              updateCart({ productId, size, quantity: newQuantity });
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className="cart-item-end">
        <button
          type="button"
          onClick={() => deleteFromCart({ productId, size })}
        >
          Remove
        </button>
        <div>
          {salePrice && (
            <span className="sale-price">${quantity * salePrice}</span>
          )}
          <span className={salePrice ? "old-price" : "price"}>
            ${quantity * price}
          </span>
        </div>
      </div>
    </Wrapper>
  );
};

export default CartItem;

const Wrapper = styled.li`
  display: flex;
  height: 10rem;
  padding: 1rem 0.2rem;
  border-bottom: 1px solid var(--tertiaryColor);
  width: 100%;

  img {
    object-fit: cover;
    height: 100%;
    border-radius: var(--photoBorderRadius);
  }

  .product-info {
    display: flex;
    flex-direction: column;
    margin-left: 2%;
    text-transform: capitalize;
    width: 100%;
    h3 {
      margin-bottom: 0.25rem;
      text-align: top;
      padding: 0;
      font-size: 2.5rem;
      white-space: nowrap;
      @media (max-width: 699px) {
        font-size: 2rem;
      }
      @media (max-width: 450px) {
        font-size: 1.5rem;
      }
      @media (max-width: 400px) {
        font-size: 1.2rem;
      }
    }
    p {
      color: var(--secondaryColor);
      @media (max-width: 400px) {
        font-size: 0.9rem;
      }
    }

    .quantity-selector {
      display: flex;
      align-items: center;
      margin-top: auto;
      border: 1px solid var(--tertiaryColor);
      border-radius: 2.625rem;
      padding: 0.2rem 1rem;
      margin-bottom: 0.25rem;
      width: fit-content;
      button {
        font-size: 1.5rem;
      }
      span {
        width: 3rem;
        text-align: center;
      }
    }
  }

  .cart-item-end {
    margin-left: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: right;
    font-size: 1.2rem;

    button {
      font-size: 1rem;
      align-self: flex-end;
      width: fit-content;
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
`;
