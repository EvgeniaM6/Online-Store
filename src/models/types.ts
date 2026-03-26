export interface IProducts {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export type DataGoods = {
  products: IProducts[];
  total: number;
  skip: number;
  limit: number;
};

export type TPromo = {
  [key: string]: IPromoValues;
};

interface IPromoValues {
  percent: number;
  isUsed: boolean;
  description: string;
}
