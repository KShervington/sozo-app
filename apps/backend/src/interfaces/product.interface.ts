export interface Product {
  name: string;
  price: number;
  stock: number;
  description: string;
  imageUrl: string;
  nftId: string;
  seller: string;
  createdAt: Date;
}

export interface ProductPatch {
  username?: string;
  email?: string;
  password?: string;
  bio?: string;
}
