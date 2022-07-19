import { useEffect, useRef } from "react";
import { useAppContext } from "../context/appContext";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  ProductDisplay,
  TextAccordian,
  Reviews,
  StarRating,
  Loading,
  ProductForm,
  Alert,
} from "../components";
import { v4 as uuidv4 } from "uuid";

const Product = () => {
  const reviewsRef = useRef(null);
  const { productTitle, productColor } = useParams();

  const {
    loading,
    user,
    getSingleProduct,
    singleProduct,
    openLoginModal,
    forceRefresh,
    openReviewModal,
    darkMode,
    showAlert,
  } = useAppContext();

  const { singleProductData } = singleProduct;

  useEffect(() => {
    getSingleProduct({ slug: productTitle, color: productColor });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productTitle, productColor, forceRefresh]);

  if (loading === "product") {
    return (
      <Wrapper>
        <div className="loading-container">
          <Loading text="loading the details" />
        </div>
      </Wrapper>
    );
  }

  if (showAlert === "product") {
    return (
      <Wrapper>
        <Alert />
      </Wrapper>
    );
  }

  if (singleProductData) {
    const {
      title,
      price,
      salePrice,
      description,
      imgPath,
      _id,
      averageRating,
      numOfReviews,
      reviews,
    } = singleProductData;

    return (
      <Wrapper darkMode={darkMode}>
        <div className="product-main">
          <ProductDisplay images={imgPath} />
          <div className="product-info">
            <div className="product-title">
              <h3>{title}</h3>
              <div>
                {salePrice && <span className="sale-price">${salePrice}</span>}
                <span className={salePrice ? "old-price" : "price"}>
                  ${price}
                </span>
              </div>
            </div>
            <div className="product-rating">
              <div className="rating-conatiner">
                <StarRating rating={averageRating} />
                {numOfReviews > 0 && <span>{averageRating} / 5</span>}
                {numOfReviews > 0 ? (
                  <button
                    className="highlight-reverse"
                    onClick={() =>
                      reviewsRef.current.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    {numOfReviews} reviews
                  </button>
                ) : (
                  <p>No reviews yet</p>
                )}
              </div>
              <button
                className="add-review-btn reg-btn highlight"
                onClick={() => {
                  if (!user) {
                    openLoginModal(
                      "Please sign in or register to write a review."
                    );
                  } else {
                    openReviewModal({
                      type: "post",
                      review: {
                        id: _id,
                      },
                    });
                  }
                }}
              >
                Add a review
              </button>
            </div>
            <div className="product-details">
              <h4>Product Details</h4>
              <p>{description}</p>
            </div>
            <ProductForm />
          </div>
        </div>
        <div className="product-details-bottom">
          <TextAccordian
            title="Product Details"
            body={description}
            id={uuidv4()}
          />
        </div>
        <div className="shipping-info">
          <TextAccordian
            title="Shipping & Returns"
            body="Marfa lumbersexual austin, pickled occupy pinterest banh mi
            aesthetic shaman tumeric ennui. Gluten-free pok pok food truck tofu
            neutra. Subway tile vice tousled humblebrag poutine organic
            meditation godard vape locavore succulents. Vaporware cold-pressed
            succulents 3 wolf moon polaroid fam."
            id={uuidv4()}
          />
        </div>
        <div className="reviews">
          <h3 className="reviews-title" ref={reviewsRef}>
            Reviews
          </h3>
          <Reviews type="product" reviews={reviews} />
        </div>
      </Wrapper>
    );
  }
  return null;
};

export default Product;

const Wrapper = styled.section`
  padding-top: var(--navbarHeight);
  margin: var(--appWidth);
  margin-bottom: 10rem;
  min-height: 110vh;

  .product-main {
    display: grid;
    grid-template-columns: 9fr 12fr;
    gap: 2%;
    margin-top: 1rem;
    height: fit-content;

    margin-bottom: 5rem;
    @media (max-width: 900px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 699px) {
      grid-template-columns: 1fr;
    }
  }

  h4 {
    font-size: 1.3rem;
  }

  .product-info {
    display: flex;
    flex-direction: column;
    margin-bottom: auto;
    height: 100%;
    position: relative;

    .product-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 2rem;

      h3 {
        font-size: 3rem;
      }

      .sale-price {
        color: var(--dangerColor);
        margin-left: 1rem;
      }
      .old-price {
        margin-left: 0.5rem;
        text-decoration-line: line-through;
        text-decoration-thickness: 0.15rem;
        text-decoration-color: var(--dangerColor);
      }
    }
    .product-rating {
      display: flex;
      flex-direction: column;

      .rating-conatiner {
        display: flex;
        align-items: center;
        gap: 1rem;
        p {
          font-size: 0.8rem;
          color: var(--secondaryColor);
        }
      }

      .add-review-btn {
        margin-top: 0.5rem;
        font-size: 0.8rem;
      }
    }
    .product-details {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      gap: 0.3rem;
      margin-top: 0.6rem;
      font-size: 0.9rem;
      @media (max-width: 1100px) {
        display: none;
      }
    }
  }

  .product-details-bottom {
    @media (min-width: 1101px) {
      display: none;
    }
  }

  // reviews

  .reviews {
  }
  .reviews-title {
    font-size: 3rem;
    margin: 5rem 0 1rem 0;
  }

  .loading-container {
    display: flex;
    justify-content: center;
    height: 100vh;
  }
`;
