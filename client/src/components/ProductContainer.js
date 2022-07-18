import { useLayoutEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import styled from "styled-components";
import { ImageCarousel } from ".";

const ProductContainer = ({ product }) => {
  const { imgPath, title, price, category, _id, color, slug, salePrice } =
    product;

  const { productsQuery, darkMode, transitionRouter } = useAppContext();

  const [hover, setHover] = useState(false);

  useLayoutEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsQuery]);

  const onScroll = () => {
    const img = document.getElementById(`${imgPath[0]}`);
    img.style.objectPosition = `0 ${
      ((img.getBoundingClientRect().top - 90) / window.innerHeight) * 100
    }%`;
  };

  return (
    <Wrapper
      hover={hover}
      darkMode={darkMode}
      className="product-container"
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        onClick={() => {
          transitionRouter(`../shop/${category}/${slug}/${color.name}`);
        }}
      >
        <img id={imgPath[0]} src={`../../images/${imgPath[0]}`} alt="product" />
        <div className="product-info">
          <p className="title">{title}</p>
          <div>
            {salePrice && <span className="sale-price">${salePrice}</span>}
            <span className={salePrice ? "old-price" : "price"}>${price}</span>
          </div>
        </div>
        <p className="shop-this submit-btn">shop this</p>
        <div className="product-more">
          <ImageCarousel imgPath={imgPath} id={_id} />
        </div>
      </button>
    </Wrapper>
  );
};

export default ProductContainer;

const Wrapper = styled.div`
  position: relative;
  img {
    object-fit: cover;
    width: 100%;
    height: auto;
    aspect-ratio: 8/10;
    border-radius: 0.4rem;
  }
  .product-info {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
    margin-bottom: 1rem;
    text-transform: capitalize;
    font-size: 1.2rem;
    .title {
      font-weight: 500;
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
  .shop-this {
    width: 100%;
    opacity: ${({ hover }) => (hover ? "1" : "0")};
    transition: opacity 0.2s;
    text-transform: uppercase;
    text-align: center;
  }
  .product-more {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0;
    width: 100%;
    height: auto;
    background-color: lightgrey;
    border-radius: 0.4rem;
    aspect-ratio: 8/10;
    color: ${({ darkMode }) =>
      darkMode ? " var(--backgroundColor)" : "var(--mainColor)"};
    opacity: ${({ hover }) => (hover ? "1" : "0")};
    transition: opacity 0.1s linear;
  }
`;
