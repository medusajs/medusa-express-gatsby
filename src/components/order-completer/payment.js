import React, { useContext, useMemo } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Flex, Text } from "@theme-ui/components";

import OrderContext from "../../context/order-context";

import PaymentForm from "./payment-form";

const STRIPE_KEY =
  process.env.GATSBY_STRIPE_KEY || "pk_live_51J2gafDoyH7ENvmSmGx717vdoALz7leX3tvsWRZieYTP94eXz6JVdPbcQ8k393zFUflWnhMWOF6rIJMBtY1Ktdvk005SH31aqz";
const stripePromise = loadStripe(STRIPE_KEY);

const Payment = () => {
  const { cart } = useContext(OrderContext);
  
  const stripeSession = useMemo(() => {
    if (cart.payment_sessions) {
      return cart.payment_sessions.find((s) => s.provider_id === "stripe");
    }

    return null;
  }, [cart.payment_sessions]);

  console.log(stripeSession)
  if (!stripeSession) {
    return null;
  }

  const options = {
    client_secret: stripeSession.data.client_secret,
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentForm session={stripeSession} />
    </Elements>
  );
};

export default Payment;
