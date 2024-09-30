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
  name?: string;
  price?: number;
  stock?: number;
  description?: string;
  imageUrl?: string;
}
