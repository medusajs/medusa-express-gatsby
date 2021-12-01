import React from "react";
import { Image, Flex, Text } from "@theme-ui/components";

const OrderConfirmation = ({ order }) => {
  console.log(order);
  return (
    <Flex>
      <Flex>#{order.display_id}</Flex>
      <Flex>
        {order.items.map((i) => {
          <Flex key={i.id}>
            <Image
              sx={{
                height: ["150px", "200px"],
              }}
              src={i.thumbnail}
              alt={i.title}
            />
            <Flex>
              <Text>{i.title}</Text>
              <Text>
                {i.quantity} x {i.unit_price}
              </Text>
            </Flex>
          </Flex>;
        })}
      </Flex>
      <Flex>
        <Text>Total</Text>
        <Text>{order.total}</Text>
      </Flex>
    </Flex>
  );
};

export default OrderConfirmation;
