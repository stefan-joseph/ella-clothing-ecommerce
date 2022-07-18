import { useEffect, useLayoutEffect } from "react";
import styled from "styled-components";
import Banner from "../components/Banner";
import { HomeBanners } from "../utils/BannerData";
import { useAppContext } from "../context/appContext";
import { Loading } from "../components";

const Home = () => {
  const { getFeaturedProducts, featuredProducts, loading, transitionRouter } =
    useAppContext();

  useEffect(() => {
    getFeaturedProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [featuredProducts]);

  const onScroll = () => {
    const imgs = document.getElementsByClassName("featured-product-image");
    for (let i = 0; i < imgs.length; i++) {
      imgs[i].style.objectPosition = `0 ${
        ((imgs[i].getBoundingClientRect().top - 90) / window.innerHeight) * 100
      }%`;
    }
    const banner = document.getElementById("home-banner");
    const footer = document
      .getElementById("footer-unique")
      .getBoundingClientRect();

    if (footer.top <= window.innerHeight) {
      banner.style.visibility = "hidden";
    } else if (footer.top > window.innerHeight) {
      banner.style.visibility = "unset";
    }
  };

  return (
    <Wrapper>
      <div id="home-banner">
        <Banner
          main={true}
          height="100vh"
          position="fixed"
          bannerData={HomeBanners}
        />
      </div>
      <div className="about-section">
        <h2 className="title">■ ▢ ■ About Us</h2>
        <p className="about">
          Duis elit tempor enim dolor consequat ut fugiat non ut qui sit. Esse
          ullamco ad cupidatat tempor veniam veniam eiusmod cupidatat ut
          pariatur. In commodo cillum est reprehenderit excepteur ipsum ullamco
          sunt quis sit tempor adipisicing voluptate. Do aliquip tempor officia
          ad fugiat cupidatat laboris labore.
        </p>
        <div className="more-about">
          <p>
            Vivamus felis dui, aliquet ut faucibus a, maximus id nulla. Integer
            nisl nulla, interdum fringilla felis sed, rhoncus porttitor lorem.
            Vestibulum vel metus mi. Vestibulum vel lectus sed mi facilisis
            gravida?
          </p>
          <button
            className="link-animation about-link"
            onClick={() => transitionRouter(`/about`)}
          >
            more about us <span>→</span>
          </button>
        </div>
      </div>
      <div className="featured-section">
        <h2 className="title">■ ▢ ■ Featured Products</h2>
        {loading === "featured" ? (
          <div className="loading-container">
            <Loading text="loading some cool things" />
          </div>
        ) : !featuredProducts ? (
          <h3>No products to display...</h3>
        ) : (
          <div className="featured-products">
            {featuredProducts.map((group, index) => {
              return (
                <div
                  key={group[0]._id}
                  className={
                    index % 2 ? "featured-product" : "featured-product reverse"
                  }
                >
                  <div
                    className={
                      index % 2
                        ? "featured-images"
                        : "featured-images reverse-image"
                    }
                  >
                    <button
                      className="img-container-big"
                      onClick={() =>
                        transitionRouter(
                          `/shop/${group[0].category}/${group[0].slug}/${group[0].color.name}`
                        )
                      }
                    >
                      <img
                        className="featured-product-image"
                        src={`../../images/${group[0].imgPath[0]}`}
                        alt=""
                      />
                    </button>
                    <button
                      className="img-container-small"
                      onClick={() =>
                        transitionRouter(
                          `/shop/${group[1].category}/${group[1].slug}/${group[1].color.name}`
                        )
                      }
                    >
                      <img
                        className="featured-product-image"
                        src={`../../images/${group[1].imgPath[0]}`}
                        alt=""
                      />
                    </button>
                  </div>
                  <div className="text-container">
                    <h3>Our {group[1].category}</h3>
                    <p>{group[1].description}</p>

                    <button
                      className="all-link link-animation"
                      onClick={() =>
                        transitionRouter(`/shop/${group[0].category}`)
                      }
                    >
                      all {group[0].category} <span>→</span>
                    </button>
                  </div>
                  <div className="dead-space"></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  .about-section,
  .featured-section {
    display: flex;
    flex-direction: column;
    margin: var(--appWidth);
    margin-bottom: 5rem;
    padding-bottom: 2rem;
    position: relative;
    border-top: var(--borderWidth) solid var(--mainColor);
  }

  .title {
    padding: 1rem 0;
    width: 100%;
  }

  .about {
    font-size: 3rem;
    text-indent: 10%;
    text-transform: uppercase;
    padding-right: 15%;
    @media (max-width: 699px) {
      font-size: 2rem;
    }
    @media (max-width: 499px) {
      font-size: 1.6rem;
    }
  }

  .more-about {
    margin-top: 4rem;
    width: 100%;
    margin-left: auto;
    font-size: 1.1rem;

    @media (min-width: 650px) {
      width: 25rem;
    }
  }
  .about-link {
    margin-top: 3rem;
    width: 100%;
  }

  .featured-products {
    display: flex;
    flex-direction: column;
    .featured-product {
      margin: 6rem 0 5rem 0;
      display: flex;
      gap: 3vw;
      @media (max-width: 750px) {
        flex-direction: column;
      }
      @media (max-width: 550px) {
        margin: 4rem 0;
      }
      .featured-images {
        flex: 3;
        display: flex;
        gap: 3vw;
        .img-container-big {
          flex: 3;
          img {
            object-fit: cover;
            width: 100%;
            height: auto;
            aspect-ratio: 8/10;
            border-radius: var(--photoBorderRadius);
            margin-bottom: 4rem;
          }
        }
        .img-container-small {
          flex: 2;
          align-self: flex-end;
          img {
            object-fit: cover;
            width: 100%;
            height: auto;
            aspect-ratio: 8/10;
            border-radius: var(--photoBorderRadius);
          }
        }
      }

      .text-container {
        flex: 3;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;

        @media (max-width: 1000px) {
          flex: 2;
        }
        h3 {
          font-size: 2rem;
          margin-bottom: 1.2rem;
        }
        p {
          font-size: 1rem;
          padding-right: 0;
          margin-bottom: 1.4rem;
        }

        .all-link {
          margin-top: 5%;
        }
      }
      .dead-space {
        flex: 1;
        @media (max-width: 1100px) {
          display: none;
        }
      }
    }
    .reverse {
      flex-direction: row-reverse;
      @media (max-width: 750px) {
        flex-direction: column;
      }
    }
    .reverse-image {
      flex-direction: row-reverse;
    }
  }

  .loading-container {
    display: flex;
    align-self: center;
    height: 80vh;
  }

  .link-animation {
    border-bottom: var(--borderWidth) solid var(--secondaryColor);
    text-align: left;
    padding-bottom: 0.5rem;
    font-size: 1.5rem;
    display: flex;
    justify-content: space-between;
    position: relative;
    text-transform: capitalize;

    span {
      font-size: 1.3rem;
      color: var(--secondaryColor);
      transition: color 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
  }

  .link-animation::after {
    content: "";
    position: absolute;
    z-index: 1;
    right: 0;
    width: 0;
    bottom: -0.5px;
    background: var(--mainColor);
    height: var(--borderWidth);
    transition: width 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .link-animation:hover span {
    color: inherit;
  }
  .link-animation:hover::after {
    left: 0;
    right: auto;
    width: 100%;
  }
`;
