import styled from "styled-components";
import { IoIosStarOutline, IoIosStar } from "react-icons/io";

const StarRatingSelect = ({ rating, handleChange, disabled, error }) => {
  const numOfStars = 5;
  const stars = [...Array(numOfStars + 1).keys()].slice(1);

  const partialStarPercentage = (rating - Math.floor(rating)) * 100;

  const handleStarType = ({ star, rating }) => {
    if (star < rating) return "full-star-select filled";
    if (star === rating) return "full-star-select filled";
    if (star === Math.ceil(rating)) return "full-star-select partial";
    if (star > Math.ceil(rating)) return "full-star-select empty";
  };

  const handleStarHover = ({ e, star }) => {
    const fullStars = document.getElementsByClassName("full-star-select");
    for (let i = 0; i < fullStars.length; i++) {
      if (e.type === "mouseover") {
        if (fullStars[i].id.replace(/\D/g, "") <= star) {
          fullStars[i].classList.replace("empty", "filled");
        } else {
          fullStars[i].classList.replace("filled", "empty");
        }
      } else if (e.type === "mouseleave") {
        if (fullStars[i].id.replace(/\D/g, "") > rating) {
          fullStars[i].classList.replace("filled", "empty");
        } else {
          fullStars[i].classList.replace("empty", "filled");
        }
      }
    }
  };

  return (
    <Wrapper partialStarPercentage={partialStarPercentage} disabled={disabled}>
      <div className="rating-selector">
        {stars.map((star) => {
          return (
            <label
              key={star}
              className={disabled ? "star" : "star cursor"}
              onMouseOver={
                !disabled ? (e) => handleStarHover({ e, star }) : null
              }
              onMouseLeave={
                !disabled ? (e) => handleStarHover({ e, star }) : null
              }
            >
              <input
                type="radio"
                name="rating"
                value={star}
                onChange={handleChange}
                disabled={disabled}
              />
              <IoIosStarOutline className="empty-star" />
              <IoIosStar
                className={handleStarType({ star, rating })}
                id={`star-${star}`}
              />
            </label>
          );
        })}
      </div>
      <div className="numerical-rating">{rating} / 5</div>
      <p className="form-error">{error ? error : " "}</p>
    </Wrapper>
  );
};

export default StarRatingSelect;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  color: ${({ disabled }) => disabled && "var(--tertiaryColor)"};

  label {
    position: relative;
  }

  .cursor {
    cursor: pointer;
  }

  input[type="radio"] {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    overflow: hidden;
    padding: 0;
    position: absolute !important;
    white-space: nowrap;
    width: 1px;
  }

  .empty-star {
  }

  .full-star-select {
    position: absolute;
    left: 0;
  }
  .empty {
    display: none;
  }

  .partial {
    width: ${({ partialStarPercentage }) => `${partialStarPercentage}%`};
    overflow: hidden;
  }

  .rating-selector {
    width: fit-content;
  }

  .numerical-rating {
    font-size: 80%;
    padding-bottom: 0.3rem;
  }

  .form-error {
    position: absolute;
    bottom: -0.8rem;
    left: 0;
  }
`;
