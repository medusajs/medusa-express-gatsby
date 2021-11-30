import React, { useContext } from "react";
import { Box, Text, Flex, Button } from "@theme-ui/components";
import Field from "./field";
import OrderContext from "../../../context/order-context";
import FieldSplitter from "./field-splitter";

const Contact = ({ formik, isValid, setIsValid }) => {
  const { contact } = useContext(OrderContext);

  return (
    <Box as="form">
      <Text
        as="h2"
        sx={{
          mb: "1em",
          fontSize: "1.1em",
          fontWeight: 550,
        }}
      >
        Contact
      </Text>
      {!isValid.contact ? (
        <>
          <FieldSplitter
            split="50/50"
            left={
              <Field
                formik={formik}
                placeholder={"First Name"}
                value={formik.values.contact.first_name}
                name={"first_name"}
                set={"contact"}
              />
            }
            right={
              <Field
                formik={formik}
                placeholder={"Last Name"}
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
            placeholder={"Phone"}
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
              fontSize: ".8em",
            }}
          >
            <Text variant="summary">{`${contact.first_name} ${contact.last_name}`}</Text>
            <Text variant="summary">{contact.email}</Text>
            <Text variant="summary">{contact.phone}</Text>
          </Flex>
          <Button
            sx={{
              bg: "transparent",
              color: "primary",
              textDecoration: "underline",
              cursor: "pointer",
              padding: "0",
            }}
            onClick={(e) => {
              e.preventDefault();
              setIsValid({ ...isValid, contact: false });
            }}
          >
            Edit
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default Contact;
