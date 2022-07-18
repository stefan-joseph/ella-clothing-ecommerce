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
import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === START_ROUTER_TRANSITION) {
    return {
      ...state,
      showTransitionCurtain: true,
    };
  }
  if (action.type === END_ROUTER_TRANSITION) {
    return {
      ...state,
      showTransitionCurtain: false,
      navMenu: false,
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === OPEN_LOGIN_MODAL) {
    return {
      ...state,
      showLoginModal: true,
      showAlert: "login",
      alertType: "success",
      alertText: action.payload,
    };
  }
  if (action.type === CLOSE_LOGIN_MODAL) {
    return {
      ...state,
      showLoginModal: false,
    };
  }

  if (action.type === OPEN_REVIEW_MODAL) {
    return {
      ...state,
      showReviewModal: action.payload,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === CLOSE_REVIEW_MODAL) {
    return {
      ...state,
      showReviewModal: false,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }

  if (action.type === HANDLE_QUERY_CHANGE) {
    return {
      ...state,
      pageQuery: 1,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === CLEAR_QUERY_PARAMS) {
    return {
      ...state,
      pageQuery: 1,
      colorQuery: "",
      sizeQuery: "",
      collectionQuery: "",
    };
  }

  if (action.type === FORCE_REFRESH) {
    return {
      ...state,
      forceRefresh: state.forceRefresh + 1,
    };
  }

  if (action.type === REGISTER_USER_RESPONSE) {
    return {
      ...state,
      loading: false,
      user: action.payload.user || state.user,
      showAlert: "login",
      alertType: action.payload.type,
      alertText: action.payload.msg,
    };
  }

  if (action.type === LOGIN_USER_RESPONSE) {
    return {
      ...state,
      loading: false,
      user: action.payload.user || state.user,
      shoppingCart: action.payload.shoppingCart || state.shoppingCart,
      showAlert: "login",
      alertType: action.payload.type,
      alertText: action.payload.msg,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      shoppingCart: [],
    };
  }

  if (action.type === UPDATE_USER_RESPONSE) {
    return {
      ...state,
      loading: false,
      user: action.payload.user || state.user,
      showAlert: "info",
      alertType: action.payload.type,
      alertText: action.payload.msg,
    };
  }

  if (action.type === UPDATE_USER_PASSWORD_RESPONSE) {
    return {
      ...state,
      loading: false,
      showAlert: "password",
      alertType: action.payload.type,
      alertText: action.payload.msg,
    };
  }

  if (action.type === UPDATE_USER_ADDRESS_RESPONSE) {
    return {
      ...state,
      loading: false,
      showAlert: "address",
      alertType: action.payload.type,
      alertText: action.payload.msg,
      forceRefresh: state.forceRefresh + 1,
    };
  }

  if (action.type === USER_REVIEW_RESPONSE) {
    return {
      ...state,
      loading: false,
      showAlert: "review",
      alertType: action.payload.type,
      alertText: action.payload.msg,
      forceRefresh: state.forceRefresh + 1,
    };
  }

  if (action.type === ADD_TO_CART_SUCCESS) {
    return {
      ...state,
      loading: false,
      shoppingCart: action.payload.shoppingCart,
      showAlert: false,
    };
  }
  if (action.type === ADD_TO_CART_ERROR) {
    return {
      ...state,
      loading: false,
      showAlert: "cart",
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === UPDATE_CART_SUCCESS) {
    return {
      ...state,
      loading: false,
      shoppingCart: action.payload.shoppingCart,
      showAlert: false,
    };
  }
  if (action.type === UPDATE_CART_ERROR) {
    return {
      ...state,
      loading: false,
      showAlert: "cart",
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === DELETE_FROM_CART_SUCCESS) {
    return {
      ...state,
      loading: false,
      shoppingCart: action.payload.shoppingCart,
      showAlert: false,
    };
  }
  if (action.type === DELETE_FROM_CART_ERROR) {
    return {
      ...state,
      loading: false,
      showAlert: "cart",
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_ALL_PRODUCTS_SUCCESS) {
    return {
      ...state,
      loading: false,
      productsResponse: action.payload.data,
    };
  }
  if (action.type === GET_ALL_PRODUCTS_ERROR) {
    return {
      ...state,
      loading: false,
      showAlert: "products",
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      loading: false,
      singleProduct: action.payload.data,
    };
  }
  if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    return {
      ...state,
      loading: false,
      showAlert: "product",
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_FEATURED_PRODUCTS_SUCCESS) {
    return {
      ...state,
      loading: false,
      featuredProducts: action.payload.data.featured,
    };
  }
  if (action.type === GET_FEATURED_PRODUCTS_ERROR) {
    return {
      ...state,
      loading: false,
      showAlert: "featured",
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_ALL_USER_ORDERS_SUCCESS) {
    return {
      ...state,
      loading: false,
      orders: action.payload.data.orders,
    };
  }
  if (action.type === GET_ALL_USER_ORDERS_ERROR) {
    return {
      ...state,
      loading: false,
      showAlert: "orders",
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  if (action.type === GET_ALL_USER_REVIEWS_SUCCESS) {
    return {
      ...state,
      loading: false,
      userReviews: action.payload.data.reviews,
    };
  }
  if (action.type === GET_ALL_USER_REVIEWS_ERROR) {
    return {
      ...state,
      loading: false,
      showAlert: "reviews",
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }

  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
