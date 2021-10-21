import { Flex, Select, Text, Button } from "@theme-ui/components";
import React, { useContext, useEffect, useMemo, useState } from "react";
import OrderContext from "../../../context/order-context";

const OptionSelector = ({ product }) => {
  const { quantity, updateQuantity, selectVariant } = useContext(OrderContext);
  const [options, setOptions] = useState([]);
  const [selection, setSelection] = useState(JSON.stringify({}));

  useEffect(() => {
    const opts = [];
    for (const option of product.options) {
      const opt = {
        title: option.title,
        id: option.id,
        values: [...new Set(option.values.map((v) => v.value))],
      };
      opts.push(opt);
    }
    setOptions(opts);

    const select = {};
    for (const opt of opts) {
      select[opt.id] = opt.values[0];
    }
    setSelection(JSON.stringify(select));
  }, [product]);

  const handleQuantity = (update) => {
    const newQuantity = quantity + update;

    if (newQuantity > 0) {
      updateQuantity(newQuantity);
    }
  };

  const handleSelect = (e) => {
    const pair = JSON.parse(e.target.value);
    const tmp = JSON.parse(selection);
    tmp[pair.option] = pair.value;
    setSelection(JSON.stringify(tmp));
  };

  const createVariantSet = (options, variants) => {
    const set = [];
    for (const variant of variants) {
      const optionSet = {};
      for (const option of variant.options) {
        const { id } = options.find((o) => o.id === option.option_id);
        optionSet[id] = option.value;
      }
      optionSet["id"] = variant.id;
      set.push(optionSet);
    }
    return set;
  };

  const variantSet = useMemo(() => {
    if (product?.options && product?.variants) {
      return createVariantSet(product.options, product.variants);
    } else {
      return [];
    }
  }, [product]);

  useEffect(() => {
    const select = JSON.parse(selection);
    for (const variant of variantSet) {
      const keys = Object.keys(variant).filter((k) => k !== "id");
      let count = 0;
      for (const key of keys) {
        count = select[key] === variant[key] ? count + 1 : 0;
      }

      if (count === keys.length) {
        selectVariant(variant.id);
      }
    }
  }, [selection]);

  return (
    <Flex
      sx={{
        flexDirection: "column",
      }}
    >
      {options.map((o, i) => {
        return (
          <Flex
            key={i}
            sx={{
              alignItems: "center",
              justifyContent: "space-between",
              pt: "1em",
            }}
          >
            <Text
              sx={{
                fontSize: "1.1em",
              }}
            >
              {o.title}
            </Text>
            <Select
              sx={{
                minWidth: "170px",
              }}
              onChange={handleSelect}
            >
              {o.values.map((v, i) => {
                return (
                  <option
                    key={i}
                    value={JSON.stringify({ option: o.id, value: v })}
                  >
                    {v}
                  </option>
                );
              })}
            </Select>
          </Flex>
        );
      })}
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          pt: "1em",
        }}
      >
        <Text
          sx={{
            fontSize: "1.1em",
          }}
        >
          Quantity
        </Text>
        <Flex
          sx={{
            width: "120px",
            alignItems: "center",
            bg: "cool",
            borderRadius: "4px",
            height: "33px",
            p: "8px 0",
          }}
        >
          <Button variant="decrementor" onClick={() => handleQuantity(-1)}>
            –
          </Button>
          <Text
            sx={{
              width: "50px",
              textAlign: "center",
            }}
          >
            {quantity}
          </Text>
          <Button variant="incrementor" onClick={() => handleQuantity(1)}>
            +
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default OptionSelector;
