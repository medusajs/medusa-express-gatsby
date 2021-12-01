import { Box, Button, Text, Flex } from "@theme-ui/components"
import React, { useContext, useState } from "react"
import Contact from "./contact"
import Delivery from "./delivery"
import Payment from "../payment"
import { useFormik } from "formik"
import * as Yup from "yup"
import OrderContext from "../../../context/order-context"
import Total from "../total"
import Review from "../review"

const Forms = ({ country, region }) => {
  const {
    contact,
    delivery,
    setDelivery,
    setContact,
    setDetails,
    setCountryName,
  } = useContext(OrderContext)

  const [isValid, setIsValid] = useState({
    contact: false,
    delivery: false,
  })
  const formik = useFormik({
    initialValues: {
      contact: {
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone,
      },
      delivery: {
        address_1: delivery.address_1,
        postal_code: delivery.postal_code,
        city: delivery.city,
        country_code: delivery.country_code,
        shipping_option: delivery.shipping_option,
      },
    },
    validationSchema: Yup.object({
      contact: Yup.object({
        first_name: Yup.string().required("Required"),
        last_name: Yup.string().required("Required"),
        email: Yup.string()
          .email("Please provide a valid email address")
          .required("Required"),
        phone: Yup.string().optional(),
      }),
      delivery: Yup.object({
        address_1: Yup.string().required("Required"),
        postal_code: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        country_code: Yup.string().required("Required"),
        shipping_option: Yup.string().required("Required"),
      }),
    }),
    onSubmit: async (values) => {
      console.log("submitting")
      setIsValid({ delivery: true, contact: true })
      setDelivery(values.delivery)
      setContact(values.contact)
      return await setDetails(values.contact, values.delivery)
    },
  })
  return (
    <Box>
      {isValid.delivery && isValid.contact && (
        <Box pt={2}>
          <Text sx={{ fontWeight: 550 }}>Your order</Text>
          <Box mt={3}>
            <Review /> <Total />
          </Box>
        </Box>
      )}
      <Box mb={4}>
        <Contact formik={formik} isValid={isValid} setIsValid={setIsValid} />
      </Box>

      <Box pt={1}>
        <Delivery
          region={region}
          country={country}
          formik={formik}
          isValid={isValid}
          setIsValid={setIsValid}
        />
      </Box>

      <Box mt={4}>
        {isValid.delivery && isValid.contact ? (
          <Payment />
        ) : (
          <Button
            onClick={(e) => {
              e.preventDefault()
              formik.submitForm()
            }}
            variant="cta"
            sx={{
              cursor: "pointer",
              width: "100%",
              fontWeight: 300,
              padding: "25px",
            }}
          >
            Go to payment
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default Forms
