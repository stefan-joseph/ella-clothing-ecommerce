import styled from "styled-components";

const About = () => {
  return (
    <Wrapper>
      <div className="brand-title">
        <h1>
          <span className="title-main">
            <span>■ </span>ΙΞ L L Λ<span> ■</span>
          </span>
          <span>clothing /</span>
          <span>garments /</span>
          <span>threads.</span>
        </h1>
      </div>
      <div className="img-container">
        <img src="../../images/about1.jpg" alt="woman designing" />
      </div>
      <div className="text-container">
        <h2>■ ▢ ■ Who we are</h2>
        <p>
          Offal slow-carb literally, salvia exercitation tousled direct trade ut
          disrupt mixtape sint chia minim. Esse exercitation sed, etsy snackwave
          irony vaporware. Kombucha photo booth tacos dolore yr hexagon.
        </p>
        <p>
          Godard raclette DSA deserunt coloring book, officia hella hammock
          cold-pressed. Ipsum brooklyn sustainable adaptogen af yuccie, pok pok
          cillum tonx. Snackwave single-origin coffee four loko typewriter,
          slow-carb venmo cupidatat.
        </p>
      </div>
      <div className="img-container">
        <img src="../../images/about2.jpg" alt="woman designing" />
      </div>
      <div className="text-container">
        <h2>■ ▢ ■ What we make</h2>
        <p>
          Offal slow-carb literally, salvia exercitation tousled direct trade ut
          disrupt mixtape sint chia minim. Esse exercitation sed, etsy snackwave
          irony vaporware. Kombucha photo booth tacos dolore yr hexagon.
        </p>
        <p>
          Godard raclette DSA deserunt coloring book, officia hella hammock
          cold-pressed. Ipsum brooklyn sustainable adaptogen af yuccie, pok pok
          cillum tonx. Snackwave single-origin coffee four loko typewriter,
          slow-carb venmo cupidatat.
        </p>
      </div>
      <div className="img-container">
        <img src="../../images/about4.jpg" alt="woman designing" />
      </div>
      <div className="text-container">
        <h2>■ ▢ ■ Why we make it</h2>
        <p>
          Offal slow-carb literally, salvia exercitation tousled direct trade ut
          disrupt mixtape sint chia minim. Esse exercitation sed, etsy snackwave
          irony vaporware. Kombucha photo booth tacos dolore yr hexagon.
        </p>
        <p>
          Godard raclette DSA deserunt coloring book, officia hella hammock
          cold-pressed. Ipsum brooklyn sustainable adaptogen af yuccie, pok pok
          cillum tonx. Snackwave single-origin coffee four loko typewriter,
          slow-carb venmo cupidatat.
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: var(--appWidth);
  padding-top: var(--navbarHeight);
  margin-bottom: 5rem;
  min-height: 100vh;
  font-size: 0.8rem;
  text-transform: uppercase;
  @media (min-width: 320px) {
    font-size: 1rem;
  }
  @media (min-width: 500px) {
    font-size: 1.1rem;
  }
  @media (min-width: 600px) {
    font-size: 1.3rem;
  }
  @media (min-width: 800px) {
    font-size: 2.1rem;
  }
  @media (min-width: 1000px) {
    font-size: 2.4rem;
    /* grid-template-columns: 1fr 1fr; */
  }
  .brand-title {
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    @media (min-width: 1000px) {
      justify-content: left;
    }
  }

  h1 {
    display: grid;
    width: fit-content;
    font-size: 2em;
    font-weight: 100;
    text-transform: lowercase;
  }

  span {
    margin-left: auto;
  }

  .title-main {
    display: flex;
    align-items: center;
    gap: 2rem;
    font-size: 2em;
    text-transform: uppercase;
    span {
      font-size: 0.8em;
    }
  }

  .img-container {
    margin: 1rem 0;
  }

  img {
    object-fit: cover;
    width: 100%;
    border-radius: var(--photoBorderRadius);
  }

  .text-container {
    border-top: var(--borderWidth) solid var(--mainColor);

    > * {
      margin-top: 1rem;
    }
  }

  p {
    text-indent: 5rem;
  }

  h2 {
    border-bottom: var(--appWidth) solid black;
    text-transform: initial;
  }
`;

export default About;
