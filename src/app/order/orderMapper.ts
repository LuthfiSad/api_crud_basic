import { OrderModelTypes } from "./orderTypes";

export const orderMapper = (acaras: OrderModelTypes[]) => {
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
