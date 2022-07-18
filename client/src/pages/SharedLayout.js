import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import {
  Modal,
  Navbar,
  NavMenu,
  LoginForm,
  WriteReview,
  Footer,
} from "../components";
import { useAppContext } from "../context/appContext";
import styled from "styled-components";

const SharedLayout = () => {
  const {
    showLoginModal,
    closeLoginModal,
    showReviewModal,
    closeReviewModal,
    showTransitionCurtain,
  } = useAppContext();

  useEffect(() => {
    // stop scrolling behind modal
    if (showLoginModal || showReviewModal) {
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.position = "fixed";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [showLoginModal, showReviewModal]);

  return (
    <Wrapper>
      <NavMenu />
      {!showTransitionCurtain && <Navbar bannerNavbar={false} />}
      {showLoginModal && (
        <Modal
          window={<LoginForm modal={true} />}
          onClose={() => closeLoginModal()}
        />
      )}
      {showReviewModal && (
        <Modal window={<WriteReview />} onClose={() => closeReviewModal()} />
      )}
      <div className={showTransitionCurtain ? "content" : "content animate"}>
        <Outlet />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </Wrapper>
  );
};

export default SharedLayout;

const Wrapper = styled.div`
  .animate {
    animation: 1s cubic-bezier(0, 1.17, 0.84, 0.97) 0s 1 fadeInContent;
  }
  @keyframes fadeInContent {
    0% {
      transform: translateY(10%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .footer {
    z-index: 99;
  }
`;
