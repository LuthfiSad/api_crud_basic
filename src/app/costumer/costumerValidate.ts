import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp } from "../../utils/Response.Mapper";
import { CustomerResponseBodyDTO } from "./costumerTypes"; // Ubah import sesuai dengan interface yang sudah diperbarui

export const createCustomerValidate = async ({
    customerId,
    gender,
    age,
    annualIncome,
    spendingScore,
    profession,
    workExperience,
    familySize,
  }: CustomerResponseBodyDTO) => {
    if (customerId === undefined) {
      return new ErrorApp(MESSAGES.ERROR.REQUIRED.CUSTOMER_ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    const customerIdNumber = parseInt(String(customerId), 10);
    if (isNaN(customerIdNumber)) {
      return new ErrorApp(MESSAGES.ERROR.INVALID.CUSTOMER_ID, 400, MESSAGE_CODE.BAD_REQUEST);
    }
  
    if (!gender) {
      return new ErrorApp(MESSAGES.ERROR.REQUIRED.GENDER, 400, MESSAGE_CODE.BAD_REQUEST);
    }
    
    if (!["Male", "Female"].includes(gender)) {
      return new ErrorApp(MESSAGES.ERROR.INVALID.GENDER, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if(!age) {
      return new ErrorApp(MESSAGES.ERROR.REQUIRED.AGE, 400, MESSAGE_CODE.BAD_REQUEST);
    }
  
    const ageNumber = parseInt(String(age), 10);
    if (age < 0 || isNaN(ageNumber)) {
      return new ErrorApp(MESSAGES.ERROR.INVALID.AGE, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if(!annualIncome) {
      return new ErrorApp(MESSAGES.ERROR.REQUIRED.ANNUAL_INCOME, 400, MESSAGE_CODE.BAD_REQUEST);
    }
  
    const annualIncomeNumber = parseFloat(String(annualIncome));
    if (annualIncome === undefined || annualIncome < 0 || isNaN(annualIncomeNumber)) {
      return new ErrorApp(MESSAGES.ERROR.INVALID.ANNUAL_INCOME, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if(!spendingScore) {
      return new ErrorApp(MESSAGES.ERROR.REQUIRED.SPENDING_SCORE, 400, MESSAGE_CODE.BAD_REQUEST);
    }
  
    const spendingScoreNumber = parseInt(String(spendingScore), 10);
    if (spendingScore < 1 || spendingScore > 100 || isNaN(spendingScoreNumber)) {
      return new ErrorApp(MESSAGES.ERROR.INVALID.SPENDING_SCORE, 400, MESSAGE_CODE.BAD_REQUEST);
    }
  
    if (!profession) {
      return new ErrorApp(MESSAGES.ERROR.REQUIRED.PROFESSION, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (typeof profession !== "string") {
      return new ErrorApp(MESSAGES.ERROR.INVALID.PROFESSION, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if(!workExperience) {
      return new ErrorApp(MESSAGES.ERROR.REQUIRED.WORK_EXPERIENCE, 400, MESSAGE_CODE.BAD_REQUEST);
    }
  
    const professionNumber = parseInt(String(workExperience), 10);
    if (workExperience < 0 || isNaN(professionNumber)) {
      return new ErrorApp(MESSAGES.ERROR.INVALID.WORK_EXPERIENCE, 400, MESSAGE_CODE.BAD_REQUEST);
    }

    if (!familySize) {
      return new ErrorApp(MESSAGES.ERROR.REQUIRED.FAMILY_SIZE, 400, MESSAGE_CODE.BAD_REQUEST);
    }
  
    const familySizeNumber = parseInt(String(familySize), 10);
    if (familySize < 0 || isNaN(familySizeNumber)) {
      return new ErrorApp(MESSAGES.ERROR.INVALID.FAMILY_SIZE, 400, MESSAGE_CODE.BAD_REQUEST);
    }
  };
  
  export const updateCustomerValidate = async ({
    customerId,
    gender,
    age,
    annualIncome,
    spendingScore,
    profession,
    workExperience,
    familySize,
  }: CustomerResponseBodyDTO) => {
    if (customerId) {
      const customerIdNumber = parseInt(String(customerId), 10);
      if (isNaN(customerIdNumber)) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.CUSTOMER_ID, 400, MESSAGE_CODE.BAD_REQUEST);
      }
    }

    if (gender && !["Male", "Female"].includes(gender)) {
      return new ErrorApp(MESSAGES.ERROR.INVALID.GENDER, 400, MESSAGE_CODE.BAD_REQUEST);
    }
  
    if (age) {
      const ageNumber = parseInt(String(age), 10);
      if (age < 0 || isNaN(ageNumber)) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.AGE, 400, MESSAGE_CODE.BAD_REQUEST);
      }
    }
  
    if (annualIncome) {
      const annualIncomeNumber = parseFloat(String(annualIncome));
      if (annualIncome < 0 || isNaN(annualIncomeNumber)) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.ANNUAL_INCOME, 400, MESSAGE_CODE.BAD_REQUEST);
      }
    }
  
    if (spendingScore) {
      const spendingScoreNumber = parseInt(String(spendingScore), 10);
      if (spendingScore < 1 || spendingScore > 100 || isNaN(spendingScoreNumber)) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.SPENDING_SCORE, 400, MESSAGE_CODE.BAD_REQUEST);
      }
    }
  
    if (profession && typeof profession !== 'string') {
      return new ErrorApp(MESSAGES.ERROR.INVALID.PROFESSION, 400, MESSAGE_CODE.BAD_REQUEST);
    }
  
    if (workExperience) {
      const workExperienceNumber = parseInt(String(workExperience), 10);
      if (workExperience < 0 || isNaN(workExperienceNumber)) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.WORK_EXPERIENCE, 400, MESSAGE_CODE.BAD_REQUEST);
      }
    }
  
    if (familySize) {
      const familySizeNumber = parseInt(String(familySize), 10);
      if (familySize < 0 || isNaN(familySizeNumber)) {
        return new ErrorApp(MESSAGES.ERROR.INVALID.FAMILY_SIZE, 400, MESSAGE_CODE.BAD_REQUEST);
      }
    }
  };
  
