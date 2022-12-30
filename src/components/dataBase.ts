import { dataGoods } from '../data/data';
import { IProducts, Filters } from '../models/';

export default class DataBase {
  private data: Array<IProducts>;

  constructor() {
    console.log('DataBase');
    this.data = dataGoods.products;
  }

  getAllProducts(): Array<IProducts> {
    return this.data;
  }

  getProductById(id?: number): IProducts | null {
    const correctProduct = this.data.find((productObj) => productObj.id === id);
    return correctProduct || null;
  }

  getProductsByParams(queryParams?: URLSearchParams): Array<IProducts> {
    if (!queryParams) return [];
    let data: Array<IProducts> = [...this.data];
    data = this.filterProductsByParam(data, Filters.Category, queryParams);
    data = this.filterProductsByParam(data, Filters.Brand, queryParams);
    data = this.filterProductsByParam(data, Filters.Price, queryParams);
    data = this.filterProductsByParam(data, Filters.Stock, queryParams);
    return data;
  }

  private filterProductsByParam(data: Array<IProducts>, param: string, queryParams: URLSearchParams): Array<IProducts> {
    let filteredData = [...data];
    const params = queryParams.get(param);
    if (params) {
      if (param === Filters.Category || param === Filters.Brand) {
        const paramValuesArr: Array<string> = params.split('*');
        filteredData = filteredData.filter((productObj: IProducts) => {
          return paramValuesArr.some((paramValue: string) => paramValue === productObj[param as keyof IProducts]);
        });
      } else {
        const [paramValueMin, paramValueMax]: Array<string> = params.split('*');
        filteredData = filteredData.filter((productObj: IProducts) => {
          const isMoreThanMin = productObj[param as keyof IProducts] > +paramValueMin;
          const isLessThanMax = productObj[param as keyof IProducts] < +paramValueMax;
          return isMoreThanMin && isLessThanMax;
        });
      }
    }
    return filteredData;
  }
}
