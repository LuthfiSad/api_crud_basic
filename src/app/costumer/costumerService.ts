import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, Meta } from "../../utils/Response.Mapper";
import { CustomerModelTypes, IFilterCustomer } from "./costumerTypes"; // Ubah import sesuai dengan interface yang sudah diperbarui
import { createCustomer, deleteCustomer, getCustomer, getCustomerById, getCustomerCount, updateCustomer } from "./costumerRepository";
import { createCustomerValidate, updateCustomerValidate } from "./costumerValidate";

export const getCustomerService = async ({ search, page = 1, perPage = 10, incomeFrom, incomeTo, gender, profession }: IFilterCustomer) => {
  const [customers, totalData] = await Promise.all([
    getCustomer({ search, page, perPage, incomeFrom, incomeTo, gender, profession }),
    getCustomerCount({ search, incomeFrom, incomeTo, gender, profession }),
  ]);

  // if (!customers.length) {
  //   return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.CUSTOMER, 404, MESSAGE_CODE.NOT_FOUND);
  // }

  const response = { data: customers, meta: Meta(page, perPage, totalData) };
  return response;
};

export const getCustomerByIdService = async (id: string) => {
  if (!id) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
  }

  const customer = await getCustomerById(id);
  if (!customer) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.CUSTOMER, 404, MESSAGE_CODE.NOT_FOUND);
  }
  return customer;
};

export const createCustomerService = async ({
  customerId,
  gender,
  age,
  annualIncome, 
  spendingScore,
  profession,
  workExperience,
  familySize,
}: CustomerModelTypes) => {
  const validate = await createCustomerValidate({ customerId, gender, age, annualIncome, spendingScore, profession, workExperience, familySize });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code);
  }

  const response = await createCustomer({
    customerId,
    gender,
    age: parseInt(String(age), 10),
    annualIncome: parseFloat(String(annualIncome)),
    spendingScore: parseInt(String(spendingScore), 10),
    profession,
    workExperience: parseInt(String(workExperience), 10),
    familySize: parseInt(String(familySize), 10),
  }); 

  return response;
};

export const updateCustomerService = async ({
  id,
  customerId,
  gender,
  age,
  annualIncome,
  spendingScore,
  profession,
  workExperience,
  familySize,
}: Partial<CustomerModelTypes>) => {
  if (!id) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
  }

  const customer = await getCustomerById(id);
  if (!customer) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.CUSTOMER, 404, MESSAGE_CODE.NOT_FOUND);
  }

  const validate = await updateCustomerValidate({ customerId, gender, age, annualIncome, spendingScore, profession, workExperience, familySize });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code);
  }

  
  const updatedFields: Partial<CustomerModelTypes> = {};
  
  if (customerId) updatedFields.customerId = parseInt(String(customerId), 10);
  if (gender) updatedFields.gender = gender;
  if (age) updatedFields.age = parseInt(String(age), 10);
  if (annualIncome) updatedFields.annualIncome = parseFloat(String(annualIncome));
  if (spendingScore) updatedFields.spendingScore = parseInt(String(spendingScore), 10);
  if (profession) updatedFields.profession = profession;
  if (workExperience) updatedFields.workExperience = parseInt(String(workExperience), 10);
  if (familySize) updatedFields.familySize = parseInt(String(familySize), 10);

  const response = await updateCustomer(id, updatedFields);
  return response;
};

export const deleteCustomerService = async (id: string) => {
  if (!id) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
  }

  const customer = await getCustomerById(id);
  if (!customer) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.CUSTOMER, 404, MESSAGE_CODE.NOT_FOUND);
  }

  const response = await deleteCustomer(id);
  return response;
};
