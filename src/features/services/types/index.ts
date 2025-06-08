
export interface ServiceProvider {
  id: string;
  name: string;
  businessName: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
  image: string;
  description: string;
  price: string;
  verified: boolean;
}

export interface CategoryMap {
  [key: string]: string;
}
