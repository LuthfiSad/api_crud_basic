import { NextFunction, Request, Response } from "express";
import { MESSAGES } from "../../utils/Messages";
import { ErrorApp, HandleResponseApi } from "../../utils/Response.Mapper";
import { createProductService, deleteProductService, getProductByIdService, getProductService, updateProductService } from "./productService";
import { MESSAGE_CODE } from "../../utils/MessageCode";
import { getLinkImage, getPathImage } from "../../config/multerConfig";

export const getProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { search, page, perPage } = req.query;

  const product = await getProductService({
    search: search as string,
    page: page ? Number(page) : undefined,
    perPage: perPage ? Number(perPage) : undefined,
    // openAbsen: openAbsen as string,
    // openRegister: openRegister as string
  });

  if (product instanceof ErrorApp) {
    next(product);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.PRODUCT.GET, product.data, product.meta);
};

export const getProductByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const product = await getProductByIdService(id);

  if (product instanceof ErrorApp) {
    next(product);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.PRODUCT.GET, product);
};

export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const [linkImage, pathImage] = getLinkImage(req, "product");  
  
  const product = await createProductService({...req.body, image: req.file, linkImage, pathImage});

  if (product instanceof ErrorApp) {
    next(product);
    return;
  }
  HandleResponseApi(res, 201, MESSAGE_CODE.SUCCESS, MESSAGES.CREATED.PRODUCT);
};

export const updateProductController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const [linkImage, pathImage] = getLinkImage(req, "products"); 

  const product = await updateProductService({...req.body, id, image: req.file, linkImage, pathImage});

  if (product instanceof ErrorApp) {
    next(product);
    return;
  }

  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.PRODUCT.UPDATE, product);
}

export const deleteProductController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const product = await deleteProductService(id);
  if (product instanceof ErrorApp) {
    next(product);
  }
  HandleResponseApi(res, 200, MESSAGE_CODE.SUCCESS, MESSAGES.SUCCESS.PRODUCT.DELETE)
}

export const getImageController = async (req: Request, res: Response, next: NextFunction) => {
  const { path } = req.params;

  const fullPath = getPathImage(path, 'products');

    // Mengirimkan file gambar
    res.sendFile(fullPath, (err) => {
        if (err) { 
          next(new ErrorApp(MESSAGES.ERROR.NOT_FOUND.ROUTE, 404, MESSAGE_CODE.NOT_FOUND))
        }
    });
}