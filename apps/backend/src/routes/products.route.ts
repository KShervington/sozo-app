import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ProductController } from '@/controllers/product.controller';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { ProductDto, ProductPatchDto } from '@/dtos/product.dto';

export class ProductRoute implements Routes {
  public router = Router();
  public product = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/products', this.product.getProductList);
    this.router.get('/products/:id', this.product.getProduct);
    this.router.post('/products', ValidationMiddleware(ProductDto), this.product.createProduct);
    this.router.patch('/products/:id', ValidationMiddleware(ProductPatchDto), this.product.updateProduct);
    this.router.delete('/products/:id', this.product.deleteProduct);
  }
}
