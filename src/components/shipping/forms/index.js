import { Box, Button, Divider, Text } from "@theme-ui/components"
import { useFormik } from "formik"
import React, { useContext, useState } from "react"
import * as Yup from "yup"
import OrderContext from "../../../context/order-context"
import Contact from "./contact"
import Delivery from "./delivery"

const Forms = ({ country, region, nextStep }) => {
  const { contact, delivery, setDelivery, setContact, setDetails } =
    useContext(OrderContext)

  const [isValid, setIsValid] = useState({
    contact: false,
    delivery: false,
  })

  const handleSubmit = e => {
    e.preventDefault()
    formik.submitForm()
  }

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
    onSubmit: async values => {
      setIsValid({ delivery: true, contact: true })
      setDelivery(values.delivery)
      setContact(values.contact)
      return setDetails(values.contact, values.delivery).finally(() =>
        nextStep()
      )
    },
  })

  return (
    <Box>
      <Text variant="header3">Shipping and info</Text>
      <Box mb={4} sx={{ mb: 4, mt: "16px" }}>
        <Contact formik={formik} summarize={false} setIsValid={setIsValid} />
      </Box>

      <Box pt={1}>
        <Delivery
          region={region}
          country={country}
          formik={formik}
          isValid={isValid}
          summarize={false}
          setIsValid={setIsValid}
        />
      </Box>

      <Box>
        <>
          <Divider sx={{ color: "#E5E7EB", my: "16px" }} />
          <Button onClick={handleSubmit} variant="cta">
            Go to payment
          </Button>
        </>
      </Box>
    </Box>
  )
}

export default Forms
