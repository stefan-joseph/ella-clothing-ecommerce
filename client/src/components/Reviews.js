import styled from "styled-components";
import { useAppContext } from "../context/appContext";
import { StarRating, Loading } from ".";
import { FaUserCircle } from "react-icons/fa";
import { IoCreateOutline } from "react-icons/io5";

const Reviews = ({ type, reviews }) => {
  const { openReviewModal, transitionRouter, loading } = useAppContext();

  if (loading === "review") {
    return <Loading text="loading reviews" />;
  }

  if (reviews.length < 1) {
    return (
      <Wrapper>
        <p className="no-reviews">
          {type === "user"
            ? "You haven't posted any reviews. Feel free to speak your mind!"
            : "There are no reviews yet. Please consider adding one!"}
        </p>
      </Wrapper>
    );
  }

  return (
    <Wrapper type={type}>
      <ul className="review-list">
        {console.log(reviews)}
        {reviews.map(
          ({
            _id,
            title,
            comment,
            user: { firstName },
            name,
            rating,
            updatedAt,
            product: { category, slug, color, imgPath },
          }) => {
            return (
              <li key={_id} className="review-container">
                <div className="review-container-1">
                  {type === "user" && (
                    <button
                      className="img-container"
                      onClick={() =>
                        transitionRouter(
                          `/shop/${category}/${slug}/${color.name}`
                        )
                      }
                    >
                      <img
                        src={`../../../images/${imgPath[0]}`}
                        alt="product"
                      />
                    </button>
                  )}
                  <div key={_id} className="review-text">
                    <div className="title-rating">
                      <StarRating rating={rating} />
                      <h5 className="review-title">{title}</h5>
                    </div>
                    <div className="date">
                      {new Date(updatedAt.split("T")[0]).toLocaleDateString(
                        "en-US",
                        {
                          timeZone: "UTC",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </div>
                    {type === "product" && (
                      <>
                        <p className="name">
                          <FaUserCircle className="user-icon" />
                          <span>{firstName} says...</span>
                        </p>
                        <p className="comment">{comment}</p>
                      </>
                    )}
                  </div>
                </div>
                {type === "user" && (
                  <div className="review-container-2">
                    <p className="comment">{comment}</p>
                    <div className="user-btns">
                      <button
                        className="reg-btn highlight"
                        onClick={() =>
                          openReviewModal({
                            type: "patch",
                            review: {
                              id: _id,
                              rating,
                              title,
                              comment,
                            },
                          })
                        }
                      >
                        edit
                        <IoCreateOutline className="btn-icon" />
                      </button>
                      <button
                        className="reg-btn delete-btn highlight"
                        onClick={() =>
                          openReviewModal({
                            type: "delete",
                            review: {
                              id: _id,
                              rating,
                              title,
                              comment,
                            },
                          })
                        }
                      >
                        delete <span className="btn-icon">✕</span>
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          }
        )}
      </ul>
    </Wrapper>
  );
};

export default Reviews;

const Wrapper = styled.div`
  ::first-letter {
    text-transform: capitalize;
  }
  p::first-letter {
    text-transform: capitalize;
  }

  h3 {
    font-size: 3rem;
    margin: 3rem 0;
  }

  .review-list {
    display: flex;
    flex-direction: column;
    max-width: 60rem;
    border-top: var(--borderWidth) solid var(--secondaryColor);
  }

  .review-container {
    display: flex;
    flex-direction: ${({ type }) => type === "user" && "column"};
    gap: 1rem;
    position: relative;
    padding: 1rem 0;
    border-bottom: var(--borderWidth) solid var(--secondaryColor);
  }

  .review-container-1 {
    display: flex;
    gap: 1rem;
  }

  .review-container-2 {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  img {
    object-fit: cover;
    height: 8rem;
    border-radius: var(--photoBorderRadius);
  }

  .review-text {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
    flex: 1;
  }

  .title-rating {
    display: flex;
    flex-direction: ${({ type }) => type === "user" && "column-reverse"};
    align-items: ${({ type }) => type === "product" && "center"};
    gap: 1rem;
    @media (max-width: 650px) {
      flex-direction: column-reverse;
      align-items: unset;
    }
  }

  .review-title {
    font-size: 1.5rem;
    font-weight: bolder;
    text-transform: unset;
    ::first-letter {
      text-transform: capitalize;
    }
  }

  .date {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }

  .name {
    display: flex;
    align-items: center;
  }

  .user-icon {
    font-size: 1.5rem;
    margin-right: 1rem;
  }

  .user-btns {
    display: flex;
    gap: 1rem;
    align-items: flex-end;
  }

  .reg-btn {
    display: flex;
    font-size: 0.9rem;
    color: inherit;
    :hover {
      background: none;
    }
  }

  .delete-btn {
    color: var(--dangerColor);
  }
  .btn-icon {
    margin-left: 0.6rem;
  }

  .no-reviews {
    font-size: 1.5rem;
  }
`;
