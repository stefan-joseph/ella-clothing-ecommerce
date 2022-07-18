import styled from "styled-components";
import { IoIosStarOutline, IoIosStar } from "react-icons/io";

const StarRating = ({ rating }) => {
  const numOfStars = 5;
  const stars = [...Array(numOfStars + 1).keys()].slice(1);

  const partialStarPercentage = (rating - Math.floor(rating)) * 100;

  const handleStarType = ({ star, rating }) => {
    if (star < rating) return "full-star filled";
    if (star === rating) return "full-star filled";
    if (star === Math.ceil(rating)) return "full-star partial";
    if (star > Math.ceil(rating)) return "full-star empty";
  };
  return (
    <Wrapper partialStarPercentage={partialStarPercentage}>
      {stars.map((star) => {
        return (
          <div className="star" key={star}>
            <span className="empty-star">
              <IoIosStarOutline />
            </span>
            <span className={handleStarType({ star, rating })}>
              <IoIosStar />
            </span>
          </div>
        );
      })}
    </Wrapper>
  );
};

export default StarRating;

const Wrapper = styled.div`
  display: flex;

  .star {
    position: relative;
  }

  .empty-star {
    /* z-index: 20; */
  }

  .full-star {
    position: absolute;
    left: 0;
    /* color: var(--secondaryColor); */
    /* color: gray; */
    /* z-index: -1; */
  }
  .empty {
    display: none;
  }
  .partial {
    width: ${({ partialStarPercentage }) => `${partialStarPercentage}%`};
    overflow: hidden;
  }
`;
