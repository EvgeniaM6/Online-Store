import { dataGoods } from '../data/data';
import { IProducts, Filters, SortDirections, IBasketProduct } from '../models/';

export default class DataBase {
  private data: Array<IProducts>;
  private basket: Array<IBasketProduct>;

  constructor() {
    this.data = dataGoods.products;
    this.basket = [];
  }

  getAllProducts(): Array<IProducts> {
    return this.data;
  }

  getProductById(id?: number): IProducts | null {
    const correctProduct = this.data.find((productObj) => productObj.id === id);
    return correctProduct || null;
  }

  getProductsByParams(queryParams?: URLSearchParams): Array<IProducts> {
    if (!queryParams) return this.getAllProducts();
    let data: Array<IProducts> = [...this.data];
    Object.values(Filters).forEach((filterType) => {
      data = this.filterProductsByParam(data, filterType, queryParams);
    });
    return data;
  }

  private filterProductsByParam(
    data: Array<IProducts>,
    paramType: string,
    queryParams: URLSearchParams
  ): Array<IProducts> {
    let filteredData = [...data];
    const paramValues = queryParams.get(paramType);
    if (filteredData.length && paramValues && paramType !== Filters.View) {
      if (paramType === Filters.Sort) {
        if ((Object.values(SortDirections) as string[]).includes(paramValues)) {
          this.sortDataBy(filteredData, paramValues);
        }
      } else if (paramType === Filters.Search) {
        filteredData = filteredData.filter((productObj: IProducts) => {
          return productObj.description.toLocaleLowerCase().includes(paramValues);
        });
      } else if (paramType.slice(0, 3) !== 'ds:') {
        const paramValuesArr: Array<string> = paramValues.split('*');
        filteredData = filteredData.filter((productObj: IProducts) => {
          return paramValuesArr.some(
            (paramValue: string) => paramValue === (productObj[paramType as keyof IProducts] as string).toLowerCase()
          );
        });
      } else {
        const [paramValueMin, paramValueMax]: Array<string> = paramValues.split('*');
        filteredData = filteredData.filter((productObj: IProducts) => {
          const isMoreThanMin = productObj[paramType as keyof IProducts] > +paramValueMin;
          const isLessThanMax = productObj[paramType as keyof IProducts] < +paramValueMax;
          return isMoreThanMin && isLessThanMax;
        });
      }
    }
    return filteredData;
  }

  sortDataBy(data: Array<IProducts>, sortIndicator: string): void {
    switch (sortIndicator) {
      case SortDirections.PriceASC:
        data.sort((obj1, obj2) => obj1.price - obj2.price);
        break;
      case SortDirections.PriceDESC:
        data.sort((obj1, obj2) => obj2.price - obj1.price);
        break;
      case SortDirections.RatingASC:
        data.sort((obj1, obj2) => obj1.rating - obj2.rating);
        break;
      case SortDirections.RatingDESC:
        data.sort((obj1, obj2) => obj2.rating - obj1.rating);
        break;
      case SortDirections.DiscountASC:
        data.sort((obj1, obj2) => obj1.discountPercentage - obj2.discountPercentage);
        break;
      case SortDirections.DiscountDESC:
        data.sort((obj1, obj2) => obj2.discountPercentage - obj1.discountPercentage);
        break;
      default:
        break;
    }
  }

  addProductToBasket(id: number): void {
    const product = this.getProductById(id);
    if (!product) return;
    const newBasketProduct: IBasketProduct = {
      product: product,
      amount: 1,
    };
    this.basket.push(newBasketProduct);
  }

  deleteProductFromBasket(id: number): void {
    const basketProductIndex = this.basket.findIndex((basketProduct) => basketProduct.product.id === id);
    if (!(basketProductIndex + 1)) return;
    this.basket.splice(basketProductIndex, 1);
  }

  changeAmountInBasket(id: number, isPlus?: boolean): void {
    const basketProduct = this.basket.find((basketProduct) => basketProduct.product.id === id);
    if (!basketProduct) return;
    if (isPlus) {
      basketProduct.amount += 1;
    } else if (basketProduct.amount > 1) {
      basketProduct.amount -= 1;
    } else {
      this.deleteProductFromBasket(id);
    }
  }

  checkProductInBasket(obj: IProducts): boolean {
    return this.basket.some((basketProduct) => basketProduct.product === obj);
  }

  countBasketTotal(): number {
    return this.basket.reduce((acc, basketProduct) => {
      acc += basketProduct.amount * basketProduct.product.price;
      return acc;
    }, 0);
  }

  countProductsInBasket(): number {
    return this.basket.reduce((acc, basketProduct) => {
      acc += basketProduct.amount;
      return acc;
    }, 0);
  }

  getFiltersList(filterType: string): Array<string> {
    const values: Array<string> = [];
    this.data.forEach((productObj) => {
      const key = productObj[filterType as keyof IProducts] as string;
      const hasValue = values.some((value) => value.toLowerCase() === key.toLowerCase());
      if (!hasValue) {
        values.push(key);
      }
    });
    return values;
  }

  countProductsByParam(filterType: string, filterValue: string): number {
    const arr = this.data.filter((productObj) => {
      return (productObj[filterType as keyof IProducts] as string).toLowerCase() === filterValue.toLowerCase();
    });
    return arr.length;
  }
}
