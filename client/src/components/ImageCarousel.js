import { useLayoutEffect, useEffect, useState } from "react";
import styled from "styled-components";

const ImageCarousel = ({ imgPath, id }) => {
  const [carousel, setCarousel] = useState(0);
  const [imgWidth, setImgWidth] = useState(0);

  useEffect(() => {
    const images = document.getElementsByClassName(`carousel-images-for-${id}`);
    setImgWidth(
      document.getElementsByClassName(`carousel-images-for-${id}`)[0]
        .offsetWidth
    );

    for (let i = 0; i < images.length; i++) {
      images[i].style.transform = `translateX(-${imgWidth * carousel}px)`;
    }
  }, [carousel, imgWidth, id]);

  useLayoutEffect(() => {
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onResize = () => {
    const images = document.getElementsByClassName(`carousel-images-for-${id}`);

    setImgWidth(
      document.getElementsByClassName(`carousel-images-for-${id}`)[0]
        .offsetWidth
    );
    for (let i = 0; i < images.length; i++) {
      images[i].style.transform = `translateX(-${imgWidth * carousel}px)`;
    }
  };

  return (
    <Wrapper className="image-carousel" imgWidth={imgWidth}>
      <div
        className="left-arrow"
        onClick={(e) => {
          setCarousel(carousel === 0 ? imgPath.length - 2 : carousel - 1);
          e.stopPropagation();
        }}
      >
        ╱╲
      </div>
      <div
        className="right-arrow"
        onClick={(e) => {
          setCarousel(carousel === imgPath.length - 2 ? 0 : carousel + 1);
          e.stopPropagation();
        }}
      >
        ╱╲
      </div>

      {imgPath.map((item, index) => {
        if (index !== 0) {
          return (
            <img
              key={index}
              src={`../../images/${item}`}
              alt=""
              id={item}
              className={`carousel-images-for-${id}`}
            />
          );
        }
        return null;
      })}
    </Wrapper>
  );
};

export default ImageCarousel;

const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  .left-arrow,
  .right-arrow {
    font-family: serif;
    position: absolute;
    top: 50%;
    color: black;
    font-size: 0.5rem;
    z-index: 1;
    cursor: pointer;
    font-weight: 900;
    border-radius: 50%;
    padding: 0.6rem 0.4rem 0.8rem 0.4rem;
    background-color: rgba(255, 255, 255, 0.4);
  }

  .left-arrow {
    left: 0.5rem;
    transform: rotate(270deg);
    font-weight: 900;
  }
  .right-arrow {
    right: 0.5rem;
    font-weight: 900;
    transform: rotate(90deg);
  }

  img {
    object-fit: cover;
    width: 100%;
    transition: transform 0.8s cubic-bezier(0.22, 0.61, 0.38, 1);
  }
`;
