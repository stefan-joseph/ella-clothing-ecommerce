import useForm from "../hooks/useForm";
import validateForm from "../utils/validateForm";
import styled from "styled-components";
import { FormRow, FormRowText, StarRatingSelect, Loading, Alert } from ".";
import { useAppContext } from "../context/appContext";

const WriteReview = ({ product }) => {
  const {
    closeReviewModal,
    showReviewModal,
    postReview,
    updateReview,
    deleteReview,
    loading,
    showAlert,
  } = useAppContext();

  const { type, review } = showReviewModal;

  const formValues = {
    rating: review.rating || 0,
    title: review.title || "",
    comment: review.comment || "",
    id: review.id || "",
  };

  const submitForm = async (values) => {
    if (type === "post") {
      postReview(values);
    } else if (type === "patch") {
      updateReview(values);
    } else if (type === "delete") {
      deleteReview(values);
    }

    setTimeout(() => {
      closeReviewModal();
    }, 4000);
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validateForm,
    formValues,
    []
  );

  return (
    <Wrapper>
      {showAlert === "review" ? (
        <Alert />
      ) : (
        <form className="review-window form" onSubmit={handleSubmit}>
          <h3>
            {type === "post"
              ? "Write a review!"
              : type === "patch"
              ? "Update your review?"
              : "Delete your review?"}
          </h3>
          <div className="rating">
            <StarRatingSelect
              rating={parseInt(values.rating)}
              handleChange={handleChange}
              value={values.rating}
              error={errors.rating}
              disabled={type === "delete" || loading}
            />
          </div>
          <FormRow
            type="text"
            name="title"
            value={values.title}
            error={errors.title}
            handleChange={handleChange}
            disabled={type === "delete" || loading}
          />
          <FormRowText
            type="text"
            name="comment"
            value={values.comment}
            error={errors.comment}
            handleChange={handleChange}
            disabled={type === "delete" || loading}
          />
          <button
            type="submit"
            className={
              type === "delete" ? "submit-btn delete-btn" : "submit-btn"
            }
            disabled={loading || (formValues === values && type !== "delete")}
          >
            {type === "post" ? "post" : type === "patch" ? "update" : "delete"}{" "}
            your review
          </button>
          {loading === "review" && (
            <div className="status-container">
              <Loading
                text={`Please wait a moment while we ${
                  type === "patch" ? "update" : type
                } your review`}
              />
            </div>
          )}
        </form>
      )}
    </Wrapper>
  );
};

export default WriteReview;

const Wrapper = styled.aside`
  position: relative;
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
    max-width: 400px;
    background-color: var(--backgroundColor);
    z-index: 98;
  }

  h3 {
    align-self: center;
    font-size: 1.8rem;
    text-transform: none;
  }

  .rating {
    font-size: 2rem;
  }

  .submit-btn {
    margin-left: auto;
  }

  .status-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--backgroundColor);
    font-size: 1.2rem;
    padding: 2rem;
    border-radius: var(--borderRadius);
    text-align: center;
  }

  .delete-btn {
    color: var(--dangerColor);
    background-color: unset;
    :hover {
      opacity: 0.6;
    }
  }
`;
