import { ProductModelTypes } from "./productTypes";

export const productMapper = (acaras: ProductModelTypes[]) => {
  const mapper = acaras.map((acara) => {
    const { createdAt, updatedAt, ...rest } = acara;
    return {
      ...rest,
      createdAt,
      updatedAt,
    };
  });
  return mapper;
};
