import { useLayoutEffect, useState } from "react";
import { useAppContext } from "../context/appContext";
import styled from "styled-components";
import { MenuButton, BigLogo, SmallLogo } from ".";
import { IoMoonSharp } from "react-icons/io5";

const Navbar = () => {
  const {
    handleStateChange,
    navMenu,
    darkMode,
    user,
    shoppingCart,
    showTransitionCurtain,
    transitionRouter,
  } = useAppContext();

  const [bannerNavbar, setBannerNavbar] = useState(true);

  useLayoutEffect(() => {
    window.addEventListener("scroll", updateNavbar);
    updateNavbar();
    const root = document.getElementById("root");
    const config = { attributes: true, childList: true, subtree: true };
    const observer = new MutationObserver(updateNavbar);
    observer.observe(root, config);
    return () => {
      window.removeEventListener("scroll", updateNavbar);
      observer.disconnect();
    };
  }, []);

  const updateNavbar = () => {
    const bannerContainer = document.getElementById("unique-banner-container");
    const navbar = document.getElementById("unique-navbar");
    if (
      bannerContainer?.getBoundingClientRect().bottom - 50 < 0 ||
      !bannerContainer
    ) {
      navbar.style.top = "-3rem";
      navbar.style.position = "fixed";
      navbar.style.transform = "translateY(3rem)";
      setBannerNavbar(false);
    } else if (bannerContainer?.getBoundingClientRect().top < -150) {
      navbar.style.top = "-3rem";
      navbar.style.position = "fixed";
      navbar.style.transform = "translateY(0)";
    } else {
      navbar.style.top = "0";
      navbar.style.position = "absolute";
      navbar.style.transform = "translateY(0)";
      setBannerNavbar(true);
    }
  };

  return (
    <Wrapper
      id="unique-navbar"
      bannerNavbar={bannerNavbar}
      navMenu={navMenu}
      darkMode={darkMode}
    >
      <button
        className={
          showTransitionCurtain ? "brand highlight" : "brand animate highlight"
        }
        onClick={() => transitionRouter("/")}
      >
        <div className="big-logo">
          <BigLogo />
        </div>
        <div className="small-logo">
          <SmallLogo />
        </div>
      </button>
      <div
        className={
          showTransitionCurtain
            ? "darkMode-container"
            : "darkMode-container animate"
        }
      >
        {!bannerNavbar && (
          <button
            className="highlight"
            onClick={(e) =>
              handleStateChange({ name: "darkMode", value: !darkMode })
            }
          >
            {darkMode ? (
              "☀ Light"
            ) : (
              <span>
                <IoMoonSharp className="moon" /> Dark
              </span>
            )}{" "}
            Mode
          </button>
        )}
      </div>
      <div
        className={showTransitionCurtain ? "nav-items" : "nav-items animate"}
      >
        <div className="nav-items-left">
          <button
            className="nav-menu-hide highlight"
            onClick={() => transitionRouter("/shop/all")}
          >
            Shop
          </button>
        </div>
        <div className="nav-items-right">
          {user ? (
            <button
              className="nav-menu-hide highlight cart"
              onClick={() => transitionRouter("/account")}
            >
              Account
            </button>
          ) : (
            <button
              className="nav-menu-hide highlight"
              onClick={() => transitionRouter("/login")}
            >
              Sign In
            </button>
          )}
          <button
            className="nav-menu-hide highlight"
            onClick={() => transitionRouter("/cart")}
          >
            Cart<sup>{shoppingCart.length}</sup>
          </button>

          <div>
            <MenuButton />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.nav`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  padding: var(--appWidth);
  width: 100%;
  height: var(--navbarHeight);
  background-color: ${({ bannerNavbar }) =>
    bannerNavbar ? "none" : "var(--backgroundColor)"};
  transition: transform 0.6s cubic-bezier(0.075, 0.82, 0.165, 1);
  z-index: 98;
  color: var(--mainColor);
  color: ${({ bannerNavbar, navMenu }) => bannerNavbar && !navMenu && "#fff"};
  white-space: nowrap;
  @media (min-width: 700px) and (max-width: 900px) {
    font-size: 1.1rem;
  }

  .brand {
    width: fit-content;
  }

  .big-logo {
    @media (max-width: 699px) {
      display: none;
    }
  }

  .small-logo {
    @media (min-width: 700px) {
      display: none;
    }
  }

  .darkMode-container {
    .moon {
      font-size: 80%;
    }
    @media (max-width: 900px) {
      text-align: center;
    }
  }

  .nav-items {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8vw;

    .nav-items-left,
    .nav-items-right {
      display: flex;
      align-items: center;
      gap: 2.6rem;
    }

    .nav-menu-hide {
      opacity: ${({ navMenu }) => (navMenu ? "0" : "1")};
      z-index: ${({ navMenu }) => (navMenu ? "-2" : "inherit")};
      transition: opacity 0.3s linear;
      @media (max-width: 900px) {
        display: none;
      }
    }
  }
  .animate {
    animation: 1.6s cubic-bezier(0, 1.17, 0.84, 0.97) 0.5s 1 fadeInNavbar;
  }
  @keyframes fadeInNavbar {
    0% {
      transform: translateY(300%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .highlight:hover {
    opacity: 0.6;
  }
`;
