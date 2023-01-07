import { Filters } from '../../models';
import { createElem } from '../../utilities';
import './filter.scss';

export default class Filter {
  drawFilter(): void {
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
      const filterItemElem = this.createFilterItemElem(filterValue, isChecked);
      filterList.append(filterItemElem);
    });
    filterForm.addEventListener('change', (e) => this.filterProducts(e));
    return filterElem;
  }

  createFilterItemElem(filterValue: string, isChecked: boolean): HTMLElement {
    const filterItemElem = createElem('div', 'filter__item');
    const input = createElem('input', null, filterItemElem) as HTMLInputElement;
    input.id = filterValue;
    input.name = filterValue;
    input.type = 'checkbox';
    input.checked = isChecked;
    const label = createElem('label', null, filterItemElem, filterValue) as HTMLLabelElement;
    label.setAttribute('for', filterValue);
    const textSpan = '(5/5)';
    createElem('span', null, filterItemElem, textSpan) as HTMLElement;
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
}
