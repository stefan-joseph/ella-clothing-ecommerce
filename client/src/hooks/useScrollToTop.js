import {
  NavigationType,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { useEffect } from "react";

const useBackButton = () => {
  const navType = useNavigationType();
  return navType === NavigationType.Pop;
};

const useScrollToTop = () => {
  const location = useLocation();
  const { pathname, hash } = location;

  const isPop = useBackButton();

  const scrollToTop = () => window.scrollTo(0, 0);

  useEffect(() => {
    if (!hash) {
      scrollToTop();
    }
  }, [pathname, isPop, hash]);

  useEffect(() => {
    window.addEventListener("beforeunload", scrollToTop);
    return () => {
      window.removeEventListener("beforeunload", scrollToTop);
    };
  }, []);
};

export default useScrollToTop;
