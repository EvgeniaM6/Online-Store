import { CardsViews, Filters, IUrl, Routes } from '../models';

export default class Router {
  currentUrl: IUrl = this.getRoute();

  constructor() {
    this.currentUrl.hash = '';
    window.addEventListener('hashchange', () => this.checkHref());
  }

  checkHref(): void {
    if (location.href.slice(0, -1) === location.origin || !location.hash) {
      this.changeHref(Routes.Main);
      return;
    }
    const urlObj: IUrl = this.getRoute();
    this.renderRoute(urlObj);
  }

  changeHref(page: string, id?: number): void {
    if (this.currentUrl.hash === page) return;
    let newHref = `${location.origin}#${page}`;
    newHref = id ? `${newHref}/${id}` : newHref;
    location.href = newHref;
  }

  getRoute(): IUrl {
    const [hashFull, queries] = location.hash.slice(1).split('?');
    const [hash, id] = hashFull.split('/');
    const url: IUrl = {
      hash,
    };
    if (id) {
      url.id = +id;
    }
    if (queries) url.queries = new URLSearchParams(queries);
    return url;
  }

  updateCurrentUrl(): void {
    this.currentUrl = this.getRoute();
  }

  renderRoute(url: IUrl): void {
    const isSamePage = this.currentUrl.hash === url.hash;
    switch (url.hash) {
      case Routes.Main:
        this.drawMain(isSamePage, url.queries);
        break;
      case Routes.Basket:
        this.drawBasket();
        break;
      case Routes.Details:
        this.drawDetails(url.id);
        break;
      default:
        this.draw404();
    }
    this.updateCurrentUrl();
  }

  drawMain(isSamePage: boolean, queryParams?: URLSearchParams): void {
    if (isSamePage) {
      window.app.mainPageTemplate.updateMainPage(queryParams);
    } else {
      window.app.mainPageTemplate.drawMainPageTemplate(queryParams);
    }
  }

  drawBasket(): void {
    window.app.currentPage.drawBasketPage();
  }

  drawDetails(id?: number): void {
    window.app.currentPage.drawDetailPage(id);
  }

  draw404(): void {
    window.app.currentPage.drawError404();
  }

  changeHrefByQueryParam(queryParamType: string, queryParamValue: string): void {
    const currentUrl = this.getRoute();
    const queryParamsObj = currentUrl.queries;
    let newHref;
    if (!queryParamsObj) {
      newHref = `${location.href}?${queryParamType.toLowerCase()}=${queryParamValue.toLowerCase()}`;
    } else {
      const queryParam = queryParamsObj.get(queryParamType);
      if (queryParam) {
        const queryParamArr = queryParam.split('*');
        if (!queryParamArr.includes(queryParamValue)) {
          const newQueryParam = `${queryParam}*${queryParamValue}`;
          queryParamsObj.set(queryParamType, newQueryParam);
        } else {
          const newQueryParamArr = queryParamArr.filter((queryParam) => queryParam !== queryParamValue);
          const newQueryParam = newQueryParamArr.join('*');
          if (newQueryParam) {
            queryParamsObj.set(queryParamType, newQueryParam);
          } else {
            queryParamsObj.delete(queryParamType);
          }
        }
      } else {
        queryParamsObj.set(queryParamType, queryParamValue);
      }
      const queryParamsStr = `${queryParamsObj.toString().toLowerCase()}`;
      newHref = `${location.origin}#${Routes.Main}`;
      newHref = queryParamsStr ? `${newHref}?${queryParamsStr}` : `${newHref}`;
    }
    location.href = newHref;
    this.updateCurrentUrl();
  }

  resetHref(): void {
    location.href = `${location.origin}#${Routes.Main}`;
    this.updateCurrentUrl();
  }

  changeHrefBySearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement)?.value;
    const currentUrl = this.getRoute();
    const queryParamsObj = currentUrl.queries;
    let newHref;
    if (!queryParamsObj) {
      newHref = `${location.href}?${Filters.Search}=${value.toLowerCase()}`;
    } else {
      if (value) {
        queryParamsObj.set(Filters.Search, value);
      } else {
        queryParamsObj.delete(Filters.Search);
      }
      const queryParamsStr = `${queryParamsObj.toString().toLowerCase()}`;
      newHref = `${location.origin}#${Routes.Main}`;
      newHref = queryParamsStr ? `${newHref}?${queryParamsStr}` : `${newHref}`;
    }
    location.href = newHref;
    this.updateCurrentUrl();
  }

  changeHrefBySort(selectedOption: string): void {
    const currentUrl = this.getRoute();
    const queryParamsObj = currentUrl.queries;
    let newHref;
    if (!queryParamsObj) {
      newHref = `${location.href}?${Filters.Sort}=${selectedOption}`;
    } else {
      queryParamsObj.set(Filters.Sort, selectedOption);
      const queryParamsStr = `${queryParamsObj.toString()}`;
      newHref = `${location.origin}#${Routes.Main}?${queryParamsStr}`;
    }
    location.href = newHref;
    this.updateCurrentUrl();
  }

  changeHrefByView(i: number): void {
    const currentUrl = this.getRoute();
    const queryParamsObj = currentUrl.queries;
    let newHref;
    if (!queryParamsObj) {
      newHref = `${location.href}?${Filters.View}=${CardsViews[i]}`;
    } else {
      queryParamsObj.set(Filters.View, CardsViews[i]);
      const queryParamsStr = `${queryParamsObj.toString()}`;
      newHref = `${location.origin}#${Routes.Main}?${queryParamsStr}`;
    }
    location.href = newHref;
    this.updateCurrentUrl();
  }

  changeHrefBySlider(sliderType: string, from: number, to: number) {
    const currentUrl = this.getRoute();
    const queryParamsObj = currentUrl.queries;
    let newHref;
    const fullSliderType = `ds_${sliderType}`;
    if (!queryParamsObj) {
      newHref = `${location.href}?${fullSliderType}=${from}*${to}`;
    } else {
      queryParamsObj.set(fullSliderType, `${from}*${to}`);
      const queryParamsStr = `${queryParamsObj.toString()}`;
      newHref = `${location.origin}#${Routes.Main}?${queryParamsStr}`;
    }
    location.href = newHref;
    this.updateCurrentUrl();
  }
}
