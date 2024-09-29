import { Router } from 'express';
import { Routes } from '@interfaces/routes.interface';
import { ProductController } from '@/controllers/product.controller';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { ProductDto, ProductPatchDto } from '@/dtos/product.dto';

export class ProductRoute implements Routes {
  public router = Router();
  public user = new ProductController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/products', this.user.getUserList);
    this.router.get('/products/:id', this.user.getProduct);
    this.router.post('/products', ValidationMiddleware(ProductDto), this.user.createProduct);
    this.router.patch('/products/:id', ValidationMiddleware(ProductPatchDto), this.user.updateUser);
    this.router.delete('/products/:id', this.user.deleteUser);
  }
}
