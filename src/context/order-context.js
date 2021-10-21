import React, { useReducer, useEffect } from "react";

import { client } from "../utils/client";

const actions = {
  SET_CART: "SET_CART",
  CREATE_CART: "CREATE_CART",
  SET_REGION: "SET_REGION",
  SET_VARIANT: "SET_VARIANT",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  SET_CONTACT: "SET_CONTACT",
  CLEAR_CONTACT: "CLEAR_CONTACT",
  SET_DELIVERY: "SET_DELIVERY",
  SET_SHIPPING: "SET_SHIPPING",
};

export const defaultOrderContext = {
  selectedRegion: {
    tax_rate: 0,
    currency_code: "",
  },
  variantId: null,
  quantity: 1,
  cart: {
    items: [],
  },
  contact: {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  },
  delivery: {
    address_1: "",
    postal_code: "",
    city: "",
    country_code: "",
    shipping_option: "",
  },
  shipping: [],
  selectRegion: () => {},
  selectVariant: () => {},
  updateQuantity: () => {},
  createCart: async () => {},
  setContact: () => {},
  clearContact: () => {},
  setDelivery: () => {},
  dispatch: () => {},
};

const OrderContext = React.createContext(defaultOrderContext);
export default OrderContext;

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_REGION:
      return {
        ...state,
        selectedRegion: action.payload,
      };
    case actions.UPDATE_QUANTITY:
      return {
        ...state,
        quantity: action.payload,
      };
    case actions.SET_VARIANT:
      return {
        ...state,
        variantId: action.payload,
      };
    case actions.SET_CONTACT:
      return {
        ...state,
        contact: action.payload,
      };
    case actions.CLEAR_CONTACT:
      return {
        ...state,
        contact: {
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
        },
      };
    case actions.SET_DELIVERY:
      return {
        ...state,
        delivery: action.payload,
      };
    case actions.SET_SHIPPING:
      return {
        ...state,
        shipping: action.payload,
      };
    case actions.SET_CART:
      if (localStorage) {
        localStorage.setItem("cart_id", action.payload.id);
      }
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, defaultOrderContext);

  useEffect(() => {
    const fetchOptions = async () => {
      if (state.cart.id) {
        const options = await client.shippingOptions
          .listCartOptions(state.cart.id)
          .then(({ shipping_options }) => shipping_options);
        dispatch({ type: actions.SET_SHIPPING, payload: options });
      }
    };
    fetchOptions();
  }, [state.cart.id]);

  useEffect(() => {
    const retrieveCart = async () => {
      const id = localStorage.getItem("cart_id");

      const cart = await client.carts
        .retrieve(id)
        .then(({ cart }) => cart)
        .catch((_) => undefined);

      if (cart) {
        dispatch({ type: actions.SET_CART, payload: cart });
      } else {
        localStorage.removeItem("cart_id");
      }
    };

    if (localStorage) {
      retrieveCart();
    }
  }, []);

  const selectRegion = (region) => {
    dispatch({ type: actions.SET_REGION, payload: region });
  };

  const selectVariant = (id) => {
    dispatch({ type: actions.SET_VARIANT, payload: id });
  };

  const updateQuantity = (quantity) => {
    dispatch({ type: actions.UPDATE_QUANTITY, payload: quantity });
  };

  const createCart = async () => {
    const { variantId, quantity, selectedRegion } = state;

    if (variantId) {
      const { id } = await client.carts
        .create({
          region_id: selectedRegion.id,
        })
        .then(({ cart }) => cart);

      const cart = await client.carts.lineItems
        .create(id, { variant_id: variantId, quantity: quantity })
        .then(({ cart }) => cart);

      dispatch({ type: actions.SET_CART, payload: cart });
    }
  };

  const setContact = (contact) => {
    dispatch({ type: actions.SET_CONTACT, payload: contact });
  };

  const setDelivery = (delivery) => {
    dispatch({ type: actions.SET_DELIVERY, payload: delivery });
  };

  const clearContact = () => {
    dispatch({ type: actions.CLEAR_CONTACT });
  };

  return (
    <OrderContext.Provider
      value={{
        ...state,
        clearContact,
        setContact,
        setDelivery,
        createCart,
        selectRegion,
        selectVariant,
        updateQuantity,
        dispatch,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
