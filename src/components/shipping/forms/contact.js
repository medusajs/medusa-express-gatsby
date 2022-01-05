import { Box, Flex, Text } from "@theme-ui/components"
import React, { useContext } from "react"
import OrderContext from "../../../context/order-context"
import Field from "./field"
import FieldSplitter from "./field-splitter"

const Contact = ({ formik, summarize = false }) => {
  const { contact } = useContext(OrderContext)

  return (
    <Box as="form">
      <Text
        as="h2"
        sx={{
          mb: "8px",
        }}
        variant="subheading"
      >
        Contact
      </Text>
      {!summarize ? (
        <>
          <FieldSplitter
            split="50/50"
            left={
              <Field
                formik={formik}
                placeholder={"First name"}
                value={formik.values.contact.first_name}
                name={"first_name"}
                set={"contact"}
              />
            }
            right={
              <Field
                formik={formik}
                placeholder={"Last name"}
                value={formik.values.contact.last_name}
                name={"last_name"}
                set={"contact"}
              />
            }
          />
          <Field
            formik={formik}
            placeholder={"Email"}
            value={formik.values.contact.email}
            name={"email"}
            set={"contact"}
          />
          <Field
            formik={formik}
            placeholder={"Phone number"}
            value={formik.values.contact.phone}
            name={"phone"}
            set={"contact"}
          />
        </>
      ) : (
        <Flex
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Flex
            sx={{
              flexDirection: "column",
            }}
          >
            <Text variant="summary">{`${contact.first_name} ${contact.last_name}`}</Text>
            <Text variant="summary">{contact.email}</Text>
            <Text variant="summary">{contact.phone}</Text>
          </Flex>
          {/* <Button
            variant="edit"
            onClick={(e) => {
              e.preventDefault();
              setIsValid({ ...isValid, contact: false });
            }}
          >
            Edit
          </Button> */}
        </Flex>
      )}
    </Box>
  )
}

export default Contact
