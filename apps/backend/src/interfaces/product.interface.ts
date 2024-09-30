export interface Product {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  nftId: string;
  seller: string;
  createdAt: Date;
}

export interface ProductPatch {
  name?: string;
  price?: number;
  description?: string;
  imageUrl?: string;
}
