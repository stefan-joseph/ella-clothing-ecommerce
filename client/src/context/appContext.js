import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  HANDLE_CHANGE,
  START_ROUTER_TRANSITION,
  END_ROUTER_TRANSITION,
  CLEAR_ALERT,
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
  OPEN_REVIEW_MODAL,
  CLOSE_REVIEW_MODAL,
  HANDLE_QUERY_CHANGE,
  CLEAR_QUERY_PARAMS,
  FORCE_REFRESH,
  REGISTER_USER_RESPONSE,
  LOGIN_USER_RESPONSE,
  LOGOUT_USER,
  UPDATE_USER_RESPONSE,
  UPDATE_USER_PASSWORD_RESPONSE,
  UPDATE_USER_ADDRESS_RESPONSE,
  USER_REVIEW_RESPONSE,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_ERROR,
  UPDATE_CART_SUCCESS,
  UPDATE_CART_ERROR,
  DELETE_FROM_CART_SUCCESS,
  DELETE_FROM_CART_ERROR,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
  GET_FEATURED_PRODUCTS_SUCCESS,
  GET_FEATURED_PRODUCTS_ERROR,
  GET_ALL_USER_ORDERS_SUCCESS,
  GET_ALL_USER_ORDERS_ERROR,
  GET_ALL_USER_REVIEWS_SUCCESS,
  GET_ALL_USER_REVIEWS_ERROR,
} from "./actions";

const user = localStorage.getItem("user");
let shoppingCart = sessionStorage.getItem("shoppingCart");
if (localStorage.getItem("shoppingCart")) {
  shoppingCart = localStorage.getItem("shoppingCart");
}

const initialState = {
  darkMode: false,
  showTransitionCurtain: false,
  navMenu: false,
  loading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  showLoginModal: false,
  showReviewModal: false,
  forceRefresh: 0,
  user: user ? JSON.parse(user) : null,
  shoppingCart: shoppingCart ? JSON.parse(shoppingCart) : [],
  productsResponse: [],
  colorQuery: "",
  sizeQuery: "",
  collectionQuery: "",
  sortQuery: "Recently Added",
  pageQuery: 1,
  singleProduct: {},
  featuredProducts: [],
  orders: [],
  userReviews: [],
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  //axios

  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  //axios response

  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const handleStateChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const transitionRouter = async (route) => {
    dispatch({ type: START_ROUTER_TRANSITION });
    setTimeout(() => {
      clearAlert();
      navigate(route);
      dispatch({ type: END_ROUTER_TRANSITION });
    }, 1000);
  };

  const clearAlert = () => {
    dispatch({ type: CLEAR_ALERT });
  };

  const openLoginModal = (alertText) => {
    dispatch({ type: OPEN_LOGIN_MODAL, payload: alertText });
  };

  const closeLoginModal = () => {
    dispatch({ type: CLOSE_LOGIN_MODAL, payload: "" });
  };

  const openReviewModal = ({ type, review }) => {
    dispatch({ type: OPEN_REVIEW_MODAL, payload: { type, review } });
  };

  const closeReviewModal = () => {
    dispatch({ type: CLOSE_REVIEW_MODAL });
  };

  const handleQueryChange = ({ name, value }) => {
    dispatch({ type: HANDLE_QUERY_CHANGE, payload: { name, value } });
  };

  const clearQueryParams = () => {
    dispatch({ type: CLEAR_QUERY_PARAMS });
  };

  const handleForceRefresh = () => {
    dispatch({ type: FORCE_REFRESH });
  };

  const addUserToLocalStorage = ({ user, shoppingCart }) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
    if (shoppingCart) {
      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    }
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("shoppingCart");
  };

  const addCartToSessionStorage = ({ shoppingCart }) => {
    sessionStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
  };

  // const clearCartFromSessionStorage = () => {
  //   sessionStorage.removeItem("shoppingCart");
  // };

  const registerUser = async (currentUser) => {
    handleStateChange({ name: "loading", value: "login" });
    // const sessionShoppingCart = state.shoppingCart;
    try {
      const { data } = await axios.post("/api/v1/auth/register", currentUser);
      const { user } = data;
      dispatch({
        type: REGISTER_USER_RESPONSE,
        payload: { user, msg: "User Created! Redirecting...", type: "success" },
      });
      addUserToLocalStorage({ user });
      // if (sessionShoppingCart) {
      //   addSessionCartToUserCart(sessionShoppingCart);
      //   clearCartFromSessionStorage();
      // }
    } catch (error) {
      dispatch({
        type: REGISTER_USER_RESPONSE,
        payload: { msg: error.response.data.msg, type: "danger" },
      });
    }
  };

  const loginUser = async (currentUser) => {
    handleStateChange({ name: "loading", value: "login" });
    // const sessionShoppingCart = state.shoppingCart;
    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);
      const { user, shoppingCart } = data;
      dispatch({
        type: LOGIN_USER_RESPONSE,
        payload: {
          user,
          shoppingCart,
          msg: "Login Successful! Redirecting...",
          type: "success",
        },
      });
      addUserToLocalStorage({ user, shoppingCart });
      // if (sessionShoppingCart) {
      //   addSessionCartToUserCart(sessionShoppingCart);
      //   clearCartFromSessionStorage();
      // }
    } catch (error) {
      dispatch({
        type: LOGIN_USER_RESPONSE,
        payload: { msg: error.response.data.msg, type: "danger" },
      });
    }
  };

  const logoutUser = async () => {
    dispatch({ type: LOGOUT_USER });
    try {
      await axios.get("/api/v1/auth/logout");
    } catch (error) {}
    removeUserFromLocalStorage();
    transitionRouter("/login");
  };

  const updateUser = async (currentUser) => {
    handleStateChange({ name: "loading", value: "info" });
    try {
      const { data } = await authFetch.patch("/users/updateUser", currentUser);
      const { user } = data;
      dispatch({
        type: UPDATE_USER_RESPONSE,
        payload: { user, msg: "Profile updated!", type: "success" },
      });
      addUserToLocalStorage({ user });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_RESPONSE,
          payload: { msg: error.response.data.msg, type: "danger" },
        });
      }
    }
  };

  const updateUserPassword = async (passwords) => {
    handleStateChange({ name: "loading", value: "password" });
    try {
      const { data } = await authFetch.patch(
        "/users/updateUserPassword",
        passwords
      );
      dispatch({
        type: UPDATE_USER_PASSWORD_RESPONSE,
        payload: { msg: data.msg, type: "success" },
      });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_PASSWORD_RESPONSE,
          payload: { msg: error.response.data.msg, type: "danger" },
        });
      }
    }
  };

  const updateUserAddress = async (address) => {
    handleStateChange({ name: "loading", value: true });
    try {
      const { data } = await authFetch.patch(
        "/users/updateUserAddress",
        address
      );
      dispatch({
        type: UPDATE_USER_ADDRESS_RESPONSE,
        payload: { msg: data.msg, type: "success" },
      });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ADDRESS_RESPONSE,
          payload: { msg: error.response.data.msg, type: "danger" },
        });
      }
    }
  };

  const postReview = async (review) => {
    handleStateChange({ name: "loading", value: "review" });
    try {
      const { data } = await axios.post("/api/v1/reviews", review);
      dispatch({
        type: USER_REVIEW_RESPONSE,
        payload: { msg: data.msg, type: "success" },
      });
    } catch (error) {
      dispatch({
        type: USER_REVIEW_RESPONSE,
        payload: { msg: error.response.data.msg, type: "danger" },
      });
    }
  };

  const updateReview = async (review) => {
    handleStateChange({ name: "loading", value: "review" });
    try {
      const { data } = await axios.patch(
        `/api/v1/reviews/${review.id}`,
        review
      );
      dispatch({
        type: USER_REVIEW_RESPONSE,
        payload: { msg: data.msg, type: "success" },
      });
    } catch (error) {
      dispatch({
        type: USER_REVIEW_RESPONSE,
        payload: { msg: error.response.data.msg, type: "danger" },
      });
    }
  };

  const deleteReview = async (review) => {
    handleStateChange({ name: "loading", value: "review" });
    try {
      const { data } = await axios.delete(`/api/v1/reviews/${review.id}`);
      dispatch({
        type: USER_REVIEW_RESPONSE,
        payload: { msg: data.msg, type: "success" },
      });
    } catch (error) {
      dispatch({
        type: USER_REVIEW_RESPONSE,
        payload: { msg: error.response.data.msg, type: "danger" },
      });
    }
  };

  const addToSessionCart = (cartItem) => {
    handleStateChange({ name: "loading", value: "cart" });
    const { productId, size, quantity } = cartItem;

    const productAlreadyExistsInCart = state.shoppingCart.find(
      (item) => item.productId === productId && item.size === size
    );

    let shoppingCart;
    if (productAlreadyExistsInCart) {
      shoppingCart = state.shoppingCart.map((item) => {
        if (item.productId === productId && item.size === size) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      });
    } else {
      shoppingCart = [...state.shoppingCart, cartItem];
    }
    dispatch({ type: ADD_TO_CART_SUCCESS, payload: { shoppingCart } });
    addCartToSessionStorage({ shoppingCart });
  };

  const addToUserCart = async (cartItem) => {
    const { _id, size, quantity } = cartItem;
    handleStateChange({ name: "loading", value: "cart" });
    try {
      const { data } = await authFetch.post(`/users/cart/${_id}`, {
        size,
        quantity,
      });
      const { shoppingCart } = data;
      dispatch({ type: ADD_TO_CART_SUCCESS, payload: { shoppingCart } });
      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    } catch (error) {
      dispatch({
        type: ADD_TO_CART_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  // const addSessionCartToUserCart = async (sessionShoppingCart) => {
  //   for (const item of sessionShoppingCart) {
  //     await addToUserCart(item);
  //   }
  // };

  const updateCart = async (product) => {
    const { productId, quantity, size } = product;
    handleStateChange({ name: "loading", value: "cart" });
    if (!state.user) {
      const shoppingCart = state.shoppingCart.map((item) => {
        if (item.productId === productId && item.size === size) {
          return { ...item, quantity: quantity };
        }
        return item;
      });
      dispatch({ type: UPDATE_CART_SUCCESS, payload: { shoppingCart } });
      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    } else {
      try {
        const { data } = await authFetch.patch(`/users/cart/${productId}`, {
          size,
          quantity,
        });
        const { shoppingCart } = data;
        dispatch({ type: UPDATE_CART_SUCCESS, payload: { shoppingCart } });
        addCartToSessionStorage({ shoppingCart });
      } catch (error) {
        dispatch({
          type: UPDATE_CART_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
  };

  const deleteFromCart = async (product) => {
    const { productId, size } = product;
    handleStateChange({ name: "loading", value: "cart" });
    if (!state.user) {
      const shoppingCart = state.shoppingCart.filter((item) => {
        if (item.productId === productId && item.size === size) return null;
        return item;
      });
      dispatch({ type: DELETE_FROM_CART_SUCCESS, payload: { shoppingCart } });
      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    } else {
      try {
        const { data } = await authFetch.delete(
          `/users/cart/${productId}?size=${size}`
        );
        const { shoppingCart } = data;
        dispatch({ type: DELETE_FROM_CART_SUCCESS, payload: { shoppingCart } });
        addCartToSessionStorage({ shoppingCart });
      } catch (error) {
        dispatch({
          type: DELETE_FROM_CART_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
  };

  const getAllProducts = async ({ category, featured, page, limit }) => {
    handleStateChange({ name: "loading", value: "products" });
    const { colorQuery, sizeQuery, collectionQuery, sortQuery } = state;
    let url = `/api/v1/products?`;

    if (category) url = url + `category=${category}&`;

    if (colorQuery) url = url + `color=${colorQuery}&`;

    if (sizeQuery) url = url + `size=${sizeQuery}&`;

    if (sortQuery) url = url + `sort=${sortQuery}&`;

    if (collectionQuery) url = url + `collection=${collectionQuery}&`;

    if (featured) url = url + `featured=${featured}&`;

    if (page) url = url + `page=${page}&`;

    if (limit) url = url + `limit=${limit}&`;

    try {
      const { data } = await axios(url);
      // const { products } = data;

      dispatch({
        type: GET_ALL_PRODUCTS_SUCCESS,
        payload: {
          data,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_PRODUCTS_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
  };

  const getSingleProduct = async ({ slug, color }) => {
    handleStateChange({ name: "loading", value: "product" });
    try {
      const { data } = await axios(`/api/v1/products/${slug}?&color=${color}`);
      dispatch({
        type: GET_SINGLE_PRODUCT_SUCCESS,
        payload: {
          data,
        },
      });
    } catch (error) {
      dispatch({
        type: GET_SINGLE_PRODUCT_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
  };

  const getFeaturedProducts = async () => {
    handleStateChange({ name: "loading", value: "featured" });
    try {
      const { data } = await axios("/api/v1/products/featured");
      dispatch({
        type: GET_FEATURED_PRODUCTS_SUCCESS,
        payload: { data },
      });
    } catch (error) {
      dispatch({
        type: GET_FEATURED_PRODUCTS_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
  };

  const getAllUserOrders = async () => {
    handleStateChange({ name: "loading", value: "orders" });
    try {
      const { data } = await axios("/api/v1/orders/showAllUserOrders");
      dispatch({ type: GET_ALL_USER_ORDERS_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({
        type: GET_ALL_USER_ORDERS_ERROR,
        payload: {
          msg: error.response.data.msg,
        },
      });
    }
  };

  const getAllUserReviews = async () => {
    handleStateChange({ name: "loading", value: "review" });
    try {
      const { data } = await axios(`/api/v1/reviews/user`);
      dispatch({ type: GET_ALL_USER_REVIEWS_SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({ type: GET_ALL_USER_REVIEWS_ERROR });
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleStateChange,
        transitionRouter,
        clearAlert,
        openLoginModal,
        closeLoginModal,
        openReviewModal,
        closeReviewModal,
        handleQueryChange,
        clearQueryParams,
        handleForceRefresh,
        registerUser,
        loginUser,
        logoutUser,
        updateUser,
        updateUserPassword,
        updateUserAddress,
        postReview,
        updateReview,
        deleteReview,
        addToUserCart,
        addToSessionCart,
        updateCart,
        deleteFromCart,
        getAllProducts,
        getSingleProduct,
        getFeaturedProducts,
        getAllUserOrders,
        getAllUserReviews,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
