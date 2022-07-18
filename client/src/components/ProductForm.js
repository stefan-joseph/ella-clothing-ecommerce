import { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import useForm from "../hooks/useForm";
import validateForm from "../utils/validateForm";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ProductForm = () => {
  const navigate = useNavigate();
  const { category, productTitle, productColor } = useParams();

  const {
    singleProduct,
    user,
    addToUserCart,
    addToSessionCart,
    transitionRouter,
    loading,
  } = useAppContext();

  const { singleProductData, availableColors } = singleProduct;

  const [formValues, setFormValues] = useState({
    size: "",
    color: "",
    quantity: 1,
  });

  useEffect(() => {
    setFormValues({ ...formValues, color: productColor });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productColor]);

  const submitForm = (values) => {
    if (user) {
      addToUserCart({
        ...singleProductData,
        size: values.size,
        quantity: parseInt(values.quantity),
      });
    } else {
      addToSessionCart({
        productId: singleProductData._id,
        title: singleProductData.title,
        color: singleProductData.color,
        price: singleProductData.price,
        salePrice: singleProductData.salePrice,
        imgPath: singleProductData.imgPath,
        slug: singleProductData.slug,
        category: singleProductData.category,
        size: values.size,
        quantity: parseInt(values.quantity),
      });
    }
    transitionRouter("/cart");
  };
  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validateForm,
    formValues,
    [formValues]
  );
  return (
    <Wrapper onSubmit={handleSubmit} noValidate>
      <h4>
        Color:<span className="choice">{values.color}</span>
      </h4>
      <div className="color-list">
        {availableColors.map(({ name, code }) => {
          return (
            <label
              key={code}
              className={
                values.color === name
                  ? "color-selected color-label"
                  : "color-label"
              }
            >
              <div
                style={{ backgroundColor: code }}
                className="color-container"
              >
                <input
                  type="radio"
                  className="color-radio"
                  name="color"
                  defaultChecked={values.color === name}
                  value={values.color}
                  onChange={
                    values.color === name
                      ? null
                      : () =>
                          navigate(`/shop/${category}/${productTitle}/${name}`)
                  }
                ></input>
              </div>
            </label>
          );
        })}
      </div>

      <h4>
        Size:
        {!values.size ? (
          <span className="form-error">{errors.size}</span>
        ) : (
          <span className="choice">{values.size}</span>
        )}
      </h4>
      <div className="size-list">
        {singleProductData.inventory.map(({ size, text, quantity }) => {
          return (
            <label
              key={size}
              className={
                quantity < 1
                  ? "size-label size-disabled"
                  : text === values.size
                  ? "size-label size-selected"
                  : "size-label highlight"
              }
            >
              {size}
              <input
                className="size-radio"
                type="radio"
                name="size"
                value={text}
                onChange={handleChange}
                disabled={quantity < 1}
              ></input>
            </label>
          );
        })}
      </div>

      <h4>
        Quantity:
        {!values.quantity || parseInt(values.quantity) < 1 ? (
          <span className="form-error">{errors.quantity}</span>
        ) : (
          <span className="choice">{values.quantity}</span>
        )}
      </h4>
      <div className="quantity-btn">
        <button
          type="button"
          className="highlight-reverse"
          value={parseInt(values.quantity) - 1 || 1}
          name="quantity"
          onClick={handleChange}
        >
          －
        </button>
        <input
          type="number"
          min="1"
          max="99"
          name="quantity"
          value={values.quantity}
          onChange={handleChange}
        ></input>
        <button
          type="button"
          className="highlight-reverse"
          value={parseInt(values.quantity) + 1 || 1}
          name="quantity"
          onClick={handleChange}
        >
          ＋
        </button>
      </div>

      <button className="submit-btn cart-btn" type="submit" disabled={loading}>
        Add to cart
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.form`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  @media (max-width: 699px) {
    margin-top: 4rem;
  }
  //universals
  input[type="radio"] {
    position: absolute;
    opacity: 0;
    visibility: hidden;
  }

  h4 {
    font-size: 1.3rem;
    margin-top: 5%;
    margin-bottom: 1%;
    text-transform: uppercase;
  }

  .color-label,
  .size-label,
  .category-label,
  .collection-label {
    position: relative;
    border: var(--borderWidth) solid;
    border-radius: var(--borderRadius);
    cursor: pointer;
  }

  .choice {
    font-size: 1.1rem;
    margin-left: 1rem;
    opacity: 0.7;
  }

  .form-error {
    text-transform: none;
    margin-left: 1rem;
  }
  // color

  .color-arrow {
  }

  .color-list {
    display: flex;
    gap: 1rem;
  }

  .color-label {
    border: none;
    width: 2rem;
    height: 2rem;
    padding: ${({ darkMode }) => (darkMode ? "0.15rem" : "0.1rem")};
  }

  .color-selected {
    border: 1px solid;
    cursor: default;
  }

  .color-container {
    width: 100%;
    height: 100%;
    border: var(--borderWidth) solid;
    border-radius: var(--borderRadius);
  }

  .color-radio {
  }

  // size

  .size-list {
    display: flex;
    gap: 1rem;
  }

  .size-label {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2rem;
    height: 2rem;
    text-transform: uppercase;
  }

  .size-selected {
    background-color: var(--mainColor);
    color: var(--backgroundColor);
    font-weight: 400;
  }

  .size-disabled {
    text-decoration: line-through;
    opacity: 0.5;
    cursor: auto;
  }

  //quantity

  .quantity-btn {
    display: flex;
    align-items: center;
    border: var(--borderWidth) solid var(--mainColor);
    border-radius: var(--borderRadius);
    padding: 0.2rem 1rem;
    width: fit-content;
    height: 2.2rem;
    button {
      font-size: 1.2rem;
    }

    span {
      width: 3rem;
      text-align: center;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    display: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  input[type="number"] {
    -moz-appearance: textfield; /* Firefox */
    background-color: inherit;
    color: inherit;
    border: none;
    width: 2rem;
    text-align: center;
    :focus {
      outline: none;
    }
  }

  // submit-btn

  .submit-btn {
    bottom: 0;
    right: 0;
    margin-top: 1.5rem;
    margin-bottom: auto;
    width: fit-content;
    @media (min-width: 350px) {
      margin-left: auto;
      position: absolute;
    }
  }
`;

export default ProductForm;
