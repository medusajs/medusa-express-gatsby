import React, { useContext, useState } from "react";
import { Text, Button } from "@theme-ui/components";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import OrderContext from "../../context/order-context";

const PaymentForm = ({ session }) => {
  const [errorMessage, setErrorMessage] = useState();
  const { cart, completeOrder } = useContext(OrderContext);

  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { client_secret } = session.data;
    const email = cart.email;
    const address = cart.shipping_address;

    return stripe
      .confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: address.fullName,
            email: email,
            phone: address.phone,
            address: {
              city: address.city,
              country: address.country,
              line1: address.line1,
              line2: address.line2,
              postal_code: address.postal,
            },
          },
        },
      })
      .then(({ error, paymentIntent }) => {
        if (error) {
          const pi = error.payment_intent;

          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            return completeOrder();
          }

          setErrorMessage(error.message);
          return;
        }

        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent.status === "succeeded"
        ) {
          return completeOrder();
        }

        return;
      });
  };

  return (
    <form onSubmit={handlePayment}>
      {errorMessage && <Text>{errorMessage}</Text>}
      <CardElement />
      <Button
        sx={{
          mt: "1rem",
          cursor: "pointer",
          borderRadius: 0,
          bg: "#454545",
          "&:hover": {
            bg: "#000",
          },
          width: "100%",
          minWidth: ["", "500px"],
          fontFamily: "Helvetica Neue",
          fontWeight: 300,
          fontSize: "16px",
        }}
      >
        Complete order
      </Button>
    </form>
  );
};
export default PaymentForm;
