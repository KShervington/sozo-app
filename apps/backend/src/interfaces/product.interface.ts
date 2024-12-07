export interface Product {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  tokenId: string;
  contractAddress: string;
  seller: string;
  status: 'available' | 'sold' | 'pending';
  createdAt: Date;
}

export interface ProductPatch {
  name?: string;
  price?: number;
  description?: string;
  imageUrl?: string;
  status?: 'available' | 'sold' | 'pending';
}
