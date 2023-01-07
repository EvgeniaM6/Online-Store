import { Filters, IProducts } from '../../models';
import { createElem } from '../../utilities';
import './filter.scss';

export default class Filter {
  filteredData: Array<IProducts>;

  constructor() {
    this.filteredData = [];
  }

  drawFilter(filteredData: Array<IProducts>): void {
    this.filteredData = [...filteredData];
    const filterContainer = document.querySelector('.filters-block') as HTMLElement;
    Object.values(Filters).forEach((filterType) => {
      if (filterType === Filters.Category || filterType === Filters.Brand) {
        const filterElem = this.createFilterElem(filterType);
        filterContainer.append(filterElem);
      }
    });
  }

  createFilterElem(filterType: string): HTMLElement {
    const filterElem = createElem('div', 'filter');
    const filterForm = createElem('form', 'filter__form', filterElem) as HTMLFormElement;
    filterForm.name = filterType;
    createElem('div', 'filter__title', filterForm, filterType);
    const filterList = createElem('div', 'filter__list', filterForm);
    const filterValues = window.app.dataBase.getFiltersList(filterType);
    const queryParams = this.getQueryParam(filterType);
    let queryParamsArr: string[];
    if (queryParams) {
      queryParamsArr = queryParams.split('*');
    }
    filterValues.forEach((filterValue) => {
      const isChecked = queryParamsArr ? queryParamsArr.includes(filterValue.toLowerCase()) : false;
      const filterItemElem = this.createFilterItemElem(filterType, filterValue, isChecked);
      filterList.append(filterItemElem);
    });
    filterForm.addEventListener('change', (e) => this.filterProducts(e));
    return filterElem;
  }

  createFilterItemElem(filterType: string, filterValue: string, isChecked: boolean): HTMLElement {
    const filterItemElem = createElem('div', 'filter__item');
    const input = createElem('input', null, filterItemElem) as HTMLInputElement;
    input.id = filterValue.toLowerCase();
    input.name = filterValue.toLowerCase();
    input.type = 'checkbox';
    input.checked = isChecked;
    const label = createElem('label', null, filterItemElem, filterValue) as HTMLLabelElement;
    label.setAttribute('for', filterValue.toLowerCase());
    const productsNumElem = createElem('span', 'filter__numbers', filterItemElem) as HTMLElement;
    createElem('span', null, productsNumElem, '(') as HTMLElement;
    const filteredProductsNum = `${this.countFilteredProductsByParam(filterType, filterValue)}`;
    createElem('span', null, productsNumElem, filteredProductsNum) as HTMLElement;
    createElem('span', null, productsNumElem, '/') as HTMLElement;
    const productsNum = `${window.app.dataBase.countProductsByParam(filterType, filterValue)}`;
    createElem('span', null, productsNumElem, productsNum) as HTMLElement;
    createElem('span', null, productsNumElem, ')') as HTMLElement;
    return filterItemElem;
  }

  filterProducts(event: Event): void {
    event.stopPropagation();
    const filterType = (event.currentTarget as HTMLFormElement).name;
    const filterValue = (event.target as HTMLInputElement).name;
    window.app.router.changeHrefByQueryParam(filterType, filterValue);
  }

  getQueryParam(param: string): string | undefined {
    const urlObj = window.app.router.getRoute();
    const queries = urlObj.queries;
    return queries?.get(param) || undefined;
  }

  countFilteredProductsByParam(filterType: string, filterValue: string): number {
    const arr = this.filteredData.filter((productObj) => {
      return (productObj[filterType as keyof IProducts] as string).toLowerCase() === filterValue.toLowerCase();
    });
    return arr.length;
  }
}
