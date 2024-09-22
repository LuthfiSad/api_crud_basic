import { UserModelTypes } from "./userTypes";

export const userMapper = (acaras: UserModelTypes[]) => {
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
