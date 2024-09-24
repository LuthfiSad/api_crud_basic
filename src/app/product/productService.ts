import { deleteImage, ImageUploadBodyDTO, uploadImage } from "../../config/multerConfig";
import { MESSAGE_CODE } from "../../utils/MessageCode";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, Meta } from "../../utils/Response.Mapper";
import { ProductModelTypes } from "./productTypes"; // Ubah import sesuai dengan interface yang sudah diperbarui
import { createProduct, deleteProduct, getProduct, getProductById, getProductCount, updateProduct } from "./productRepository";
import { IFilterProduct } from "./productTypes";
import { createProductValidate, updateProductValidate } from "./productValidate";

export const getProductService = async ({ search, page = 1, perPage = 10 }: IFilterProduct) => {
  const [products, totalData] = await Promise.all([
    getProduct({ search, page, perPage }),
    getProductCount({ search })
  ]);

  if (!products.length) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.PRODUCT, 404, MESSAGE_CODE.NOT_FOUND);
  }

  const response = { data: products, meta: Meta(page, perPage, totalData) };
  return response;
};

export const getProductByIdService = async (id: string) => {
  if (!id) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
  }

  const product = await getProductById(id);
  if (!product) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.PRODUCT, 404, MESSAGE_CODE.NOT_FOUND);
  }
  return product;
};

export const createProductService = async ({
  name,
  description,
  price,
  stock,
  image,
  linkImage,
  pathImage
}: ProductModelTypes & ImageUploadBodyDTO) => {
  const validate = await createProductValidate({ name, price, stock, image });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code);
  }

  uploadImage(image, pathImage, "products");

  const response = await createProduct({
    name,
    description,
    price: parseFloat(String(price)),
    stock: parseInt(String(stock), 10),
    image: linkImage,
  });
  return response;
};



export const updateProductService = async ({
  name,
  description,
  price,
  stock,
  id,
  image,
  linkImage,
  pathImage
}: ImageUploadBodyDTO & ProductModelTypes) => {
  if (!id) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
  }

  const product = await getProductById(id);
  if (!product) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.PRODUCT, 404, MESSAGE_CODE.NOT_FOUND);
  }

  const validate = await updateProductValidate({ price, stock });
  if (validate instanceof ErrorApp) {
    return new ErrorApp(validate.message, validate.statusCode, validate.code);
  }

  const updateFields: Partial<ProductModelTypes> = {};

  if (name) updateFields.name = name;
  if (description) updateFields.description = description;
  if (price) updateFields.price = parseFloat(String(price));
  if (stock) updateFields.stock = parseInt(String(stock), 10);
  if (image) {
    uploadImage(image, pathImage, "products");
    deleteImage(product.image, "products");
    updateFields.image = linkImage;
  }

  const response = await updateProduct(id, updateFields);
  return response;
};

export const deleteProductService = async (id: string) => {
  if (!id) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.ID, 400, MESSAGE_CODE.BAD_REQUEST);
  }

  const product = await getProductById(id);
  if (!product) {
    return new ErrorApp(MESSAGES.ERROR.NOT_FOUND.PRODUCT, 404, MESSAGE_CODE.NOT_FOUND);
  }

  const image = await deleteImage(product.image, "products");
  if (!image) {
    return new ErrorApp(MESSAGES.ERROR.INVALID.FILE_PATH, 400, MESSAGE_CODE.BAD_REQUEST);
  }

  const response = await deleteProduct(id);
  return response;
};
