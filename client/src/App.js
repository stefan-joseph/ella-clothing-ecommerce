import { Routes, Route } from "react-router-dom";
import { useAppContext } from "./context/appContext";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { lightTheme, darkTheme } from "./styles/Themes";
import { TransitionCurtain } from "./components";
import useScrollToTop from "./hooks/useScrollToTop";
import {
  Home,
  Shop,
  Product,
  About,
  Error,
  SharedLayout,
  Login,
  Cart,
  Account,
  ProtectedRoute,
  Checkout,
  Success,
} from "./pages";

function App() {
  useScrollToTop();
  const { darkMode, transitionLoader } = useAppContext();

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <TransitionCurtain transitionLoader={transitionLoader} />
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:category" element={<Shop />} />
          <Route
            path="shop/:category/:productTitle/:productColor"
            element={<Product />}
          />
          <Route path="cart" element={<Cart />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="/success" element={<Success />} />
          <Route
            path="account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Route>
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
