import styled from "styled-components";
import {
  CarouselProvider,
  Slider,
  Slide,
  Image,
  Dot,
  ButtonBack,
  ButtonNext,
  ImageWithZoom,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const ProductDisplay = ({ images }) => {
  return (
    <Wrapper>
      <CarouselProvider
        className="carousel"
        naturalSlideWidth={10}
        naturalSlideHeight={10}
        totalSlides={images.length}
        infinite={true}
        touchEnabled={true}
        isIntrinsicHeight={true}
      >
        <div className="dots-container">
          {images.map((item, index) => {
            return (
              <Dot key={index} slide={index} className="dot-container">
                <Image src={`../../../images/${item}`} className="dot-image" />
              </Dot>
            );
          })}
        </div>

        <div className="slider-shell">
          <Slider
            classNameAnimation="transition-properties"
            className="slider-container"
          >
            {images.map((item, index) => {
              return (
                <Slide
                  key={index}
                  index={index + 1}
                  className="slide-container"
                >
                  <div>
                    <ImageWithZoom
                      src={`../../../images/${item}`}
                      className="slide-image"
                    />
                  </div>
                </Slide>
              );
            })}
          </Slider>

          <ButtonBack className="left-arrow">╱╲</ButtonBack>
          <ButtonNext className="right-arrow">╱╲</ButtonNext>
        </div>
      </CarouselProvider>
    </Wrapper>
  );
};

export default ProductDisplay;

const Wrapper = styled.div`
  margin-right: 3%;
  .carousel {
    display: flex;
    /* grid-template-columns: auto; */
    /* border: 1px solid red; */
    position: relative;

    .dots-container {
      flex: 0 0 19%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .dot-container {
        aspect-ratio: 2/3;
        border-radius: var(--photoBorderRadius);

        .dot-image {
          object-fit: cover;
          width: 100%;
          height: auto;
          aspect-ratio: 2/3;
          border-radius: var(--photoBorderRadius);
          /* overflow: hidden; */
        }
      }
    }

    .slider-shell {
      flex: 0 0 81%;
      margin-left: 2.7%;
      /* border: 2px solid var(--backgroundColor); */
      border-radius: var(--photoBorderRadius);
      overflow: hidden;
      position: relative;

      .slider-container {
        .slide-container {
          background-color: lightgray;
          /* min-height: 500px; */

          div {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
          }
          .slide-image {
            aspect-ratio: 2/3;
            height: auto;
          }
        }
      }
      .left-arrow,
      .right-arrow {
        position: absolute;
        top: 50%;
        color: black;
      }

      .left-arrow {
        left: 1%;
        transform: rotate(270deg);
      }

      .right-arrow {
        right: 1%;
        transform: rotate(90deg);
      }
      .transition-properties {
        transition: transform 0.8s cubic-bezier(0.22, 0.61, 0.38, 1);
      }
    }
  }
`;
