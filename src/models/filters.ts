export enum Filters {
  Category = 'category',
  Brand = 'brand',
  Price = 'ds_price',
  Stock = 'ds_stock',
  Search = 'search',
  Sort = 'sort',
  View = 'view',
}

export enum SortDirections {
  PriceASC = 'price-ASC',
  PriceDESC = 'price-DESC',
  RatingASC = 'rating-ASC',
  RatingDESC = 'rating-DESC',
  DiscountASC = 'discount-ASC',
  DiscountDESC = 'discount-DESC',
}

export enum CardsViews {
  'view-1',
  'view-2',
}

export interface IFiltersElems {
  [key: string]: HTMLElement;
}
