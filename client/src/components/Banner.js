import { useState, useLayoutEffect } from "react";
import { useAppContext } from "../context/appContext";
import styled from "styled-components";

const Banner = ({ main, height, bannerData, position }) => {
  const { transitionRouter, showTransitionCurtain } = useAppContext();
  const [banner, setBanner] = useState(1);

  useLayoutEffect(() => {
    window.addEventListener("scroll", onScroll, false);
    const banner = document.getElementById("unique-banner-container");
    const arrows = document.getElementsByClassName("banner-arrow");
    if (bannerData.length > 1) {
      window.addEventListener("mousemove", onMouseMove, false);
      banner?.addEventListener("touchstart", onTouchStart, false);
      banner?.addEventListener("touchmove", onTouchMove, false);
      banner?.addEventListener("touchend", onTouchEnd, false);
      for (let i = 0; i < arrows.length; i++) {
        arrows[i].addEventListener("mouseleave", onMouseLeaveArrow, false);
        arrows[i].addEventListener("mouseover", onMouseOverArrow, false);
      }
    }
    return () => {
      window.removeEventListener("scroll", onScroll, false);
      if (bannerData.length > 1) {
        window.removeEventListener("mousemove", onMouseMove, false);
        banner.removeEventListener("touchstart", onTouchStart, false);
        banner.removeEventListener("touchmove", onTouchMove, false);
        banner.removeEventListener("touchend", onTouchEnd, false);
        for (let i = 0; i < arrows.length; i++) {
          arrows[i].removeEventListener("mouseleave", onMouseLeaveArrow, false);
          arrows[i].removeEventListener("mouseover", onMouseOverArrow, false);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    const bannerContainer = document.getElementById("banners-image-container");
    const textContainer = document.getElementById("banners-text-container");
    bannerContainer.style.transform = `translateX(${(banner - 1) * -100}vw)`;
    textContainer.style.transform = `translateX(${(banner - 1) * -100}vw)`;
  }, [banner]);

  let initialX = null;
  let currentX = null;
  let initialBanner = null;

  const onTouchStart = (e) => {
    initialX = e.touches[0].clientX;
    currentX = e.touches[0].clientX;
    const bannerContainer = document.getElementById("banners-image-container");
    let currentPosition = getComputedStyle(bannerContainer).transform;
    let matrix = new DOMMatrix(currentPosition);
    initialBanner = matrix.m41;
  };

  const onTouchMove = (e) => {
    if (initialX === null || initialBanner === null) {
      return;
    }
    currentX = e.touches[0].clientX;
    let diffX = initialX - currentX;
    const bannerContainer = document.getElementById("banners-image-container");
    const textContainer = document.getElementById("banners-text-container");
    bannerContainer.style.transform = `translateX(${
      initialBanner - Math.round(diffX)
    }px)`;
    textContainer.style.transform = `translateX(${
      initialBanner - Math.round(diffX)
    }px)`;
  };

  const onTouchEnd = (e) => {
    const bannerContainer = document.getElementById("banners-image-container");
    const textContainer = document.getElementById("banners-text-container");

    let ratio = (initialX - currentX) / window.innerWidth;

    if (Math.abs(ratio) > 0.2) {
      if (ratio < 0) {
        setBanner((banner) => (banner === 1 ? bannerData.length : banner - 1));
      } else if (ratio > 0) {
        setBanner((banner) => (banner === bannerData.length ? 1 : banner + 1));
      } else {
      }
    } else {
      bannerContainer.style.transform = `translateX(${initialBanner}px)`;
      textContainer.style.transform = `translateX(${initialBanner}px)`;
    }
  };

  //arrows remain if mouse over
  let isMouseHover = false;
  const onMouseLeaveArrow = () => {
    isMouseHover = false;
  };

  const onMouseOverArrow = () => {
    isMouseHover = true;
  };

  //arrows appear on mouse move
  let timer;
  const onMouseMove = () => {
    const arrows = document.getElementById("banner-arrows-unique");
    if (arrows) {
      arrows.style.opacity = "1";
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (!isMouseHover) {
          arrows.style.opacity = "0";
        }
      }, 1000);
    }
  };

  // image fade on scroll
  const onScroll = () => {
    const bannerContainer = document.getElementById("unique-banner-container");
    const allMainBanners = document.getElementsByClassName("all-banner-images");
    for (let i = 0; i < allMainBanners.length; i++) {
      allMainBanners[i].style.opacity =
        (bannerContainer.getBoundingClientRect().bottom - 50) /
        (bannerContainer.getBoundingClientRect().height - 50);
    }
  };

  return (
    <Wrapper
      id="unique-banner-container"
      bannerHeight={height}
      position={position}
    >
      {bannerData.length > 1 && (
        <>
          <div id="banner-arrows-unique">
            <div
              className="left-arrow banner-arrow"
              onClick={() =>
                setBanner(banner === 1 ? bannerData.length : banner - 1)
              }
            >
              ╱╲
            </div>
            <div
              className="right-arrow banner-arrow"
              onClick={() =>
                setBanner(banner === bannerData.length ? 1 : banner + 1)
              }
            >
              ╱╲
            </div>
          </div>
          <div className="banner-selector">
            {bannerData.map(({ id }) => {
              if (id === banner)
                return (
                  <span
                    key={id}
                    className="selected"
                    onClick={() => setBanner(id)}
                  >
                    ●
                  </span>
                );
              return (
                <span key={id} onClick={() => setBanner(id)}>
                  ⭘
                </span>
              );
            })}
          </div>
        </>
      )}
      <div id="banners-image-container">
        {bannerData.map(({ id, img }, index, array) => {
          return (
            <img
              key={id}
              src={`../../images/${img}`}
              alt="main banner"
              className="all-banner-images"
            />
          );
        })}
      </div>
      <div id="banners-text-container">
        {bannerData.map(
          ({ id, title, subtitle, link, description, css }, index, array) => {
            return (
              <div key={id} className="banner-container">
                {title && (
                  <div
                    className="title-banner"
                    style={{ top: css.title.top, left: css.title.left }}
                  >
                    {title.split(" ").map((word, index) => {
                      return (
                        <div key={index}>
                          <h2
                            className={
                              !showTransitionCurtain && id === banner
                                ? "title-line animate"
                                : "title-line"
                            }
                          >
                            {word}
                          </h2>
                        </div>
                      );
                    })}
                    {main && (
                      <button
                        className="submit-btn shop-btn"
                        onClick={() => transitionRouter(link)}
                      >
                        shop now
                      </button>
                    )}
                  </div>
                )}

                {subtitle && (
                  <div
                    className="subtitle-banner"
                    style={{ top: css.subtitle.top, left: css.subtitle.left }}
                  >
                    <div
                      className={
                        !showTransitionCurtain && id === banner
                          ? "animate"
                          : null
                      }
                    >
                      {subtitle.map((word, index) => {
                        return <h3 key={index}>{word}</h3>;
                      })}
                    </div>
                  </div>
                )}
                {link && (
                  <div
                    className={
                      !showTransitionCurtain && id === banner
                        ? "animate link-description-banner"
                        : "link-description-banner"
                    }
                    style={{ top: css.link.top, left: css.link.left }}
                  >
                    <div>
                      <p style={{ width: css.link.width }}>{description}</p>
                      <button
                        className="submit-btn shop-btn"
                        onClick={() => transitionRouter(link)}
                      >
                        shop now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          }
        )}
      </div>
    </Wrapper>
  );
};

export default Banner;

const Wrapper = styled.div`
  position: relative;
  height: ${({ bannerHeight }) => bannerHeight};
  overflow: hidden;
  color: white;
  #banner-arrows-unique {
    transition: color 1s linear;
    z-index: 10;

    .banner-arrow {
      position: absolute;
      top: 50%;
      font-size: 3rem;
      z-index: 10;
      cursor: pointer;
    }
    .left-arrow {
      left: 0;
      transform: rotate(270deg);
    }
    .right-arrow {
      right: 0;
      transform: rotate(90deg);
    }
  }

  .banner-selector {
    display: flex;
    gap: 100%;
    z-index: 2;
    position: absolute;
    top: 90vh;
    right: 25%;

    > * {
      cursor: pointer;
    }
    .selected {
      font-size: 150%;
      position: relative;
      top: -7px;
    }
  }

  #banners-image-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    transition: transform 0.8s cubic-bezier(0, 0, 0.15, 1.04);
    position: ${({ position }) => position};

    img {
      top: 0px;
      object-fit: cover;
      height: ${({ bannerHeight }) => bannerHeight};
      width: 100vw;
      flex-wrap: nowrap;
      z-index: 0;
    }
  }

  #banners-text-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    overflow: hidden;
    z-index: 1;
    position: absolute;
    transition: transform 0.8s cubic-bezier(0, 0, 0.15, 1.04);

    .banner-container {
      width: 100vw;
      height: 100vh;
      position: relative;

      .title-banner {
        position: absolute;
        width: fit-content;
        div {
          overflow: hidden;
        }
        h2 {
          font-size: 4.5rem;
          text-decoration-line: underline;
          text-decoration-thickness: 0.15rem;
          text-decoration-style: double;
          text-underline-offset: 0.3rem;
        }
        button {
          display: none;
          margin-left: auto;
        }
        .animate {
          animation: 2s cubic-bezier(0.21, 1.06, 0.28, 1.01) 0s 1 fadeInText;
        }

        @media (max-width: 700px) {
          position: relative;
          display: flex;
          flex-direction: column;

          button {
            margin-top: 3.5rem;
            display: block;
            border: 1px solid rgba(255, 255, 255, 0.6);
          }
        }
      }

      .subtitle-banner {
        position: absolute;
        overflow: hidden;
        h3 {
          font-size: 2.5rem;
          text-transform: uppercase;
          text-align: right;
        }
        .animate {
          animation: 3s cubic-bezier(0.21, 1.06, 0.28, 1.01) 0s 1 fadeInText;
        }
        @media (max-width: 700px) {
          h3 {
            display: none;
          }
        }
      }

      .link-description-banner {
        position: absolute;
        p {
          margin-bottom: 1.5rem;
        }
        button {
          border: 1px solid rgba(255, 255, 255, 0.6);
        }

        @media (max-width: 700px) {
          display: none;
        }
      }
      .animate {
        animation: 2s cubic-bezier(0.21, 1.06, 0.28, 1.01) 0s 1 fadeInText;
      }

      button:hover {
        border: 1px solid rgba(255, 255, 255, 0.4);
        background-color: rgba(0, 0, 0, 0.05);
      }

      @keyframes fadeInText {
        0% {
          transform: translateY(80%);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }
    .shop-btn {
      background: unset;
      color: white;
    }
  }

  .current-banner {
    transform: translateX(0%);
  }
  .left-100 {
    transform: translateX(-100%);
  }
  .left-200 {
    transform: translateX(-200%);
  }
  .right-100 {
    transform: translateX(100%);
  }
  .right-200 {
    transform: translateX(200%);
  }
`;
