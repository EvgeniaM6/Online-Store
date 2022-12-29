import { IUrl, Routes } from '../models';

export default class Router {
  currentUrl: IUrl = this.getRoute();

  constructor() {
    console.log('Router!!!');
    this.checkHref();
  }

  checkHref(): void {
    console.log(0, 'checkHref()', location);
    if (location.href.slice(0, -1) === location.origin || !location.hash) {
      this.changeHref(Routes.Main);
      return;
    }
    const urlObj: IUrl = this.getRoute();
    this.renderRoute(urlObj);
  }

  changeHref(page: string, id?: number): void {
    console.log(0, 'changeHref()');
    if (this.currentUrl.hash === page) return;
    // console.log('currentUrl =', this.currentUrl, 'page=', page);
    let newHref = `${location.origin}#${page}`;
    newHref = id ? `${newHref}/${id}` : newHref;
    console.log('newHref=', newHref);
    location.href = newHref;
    this.updateCurrentUrl();
  }

  getRoute(): IUrl {
    console.log(0, 'getRoute()');
    const [hashFull, queries] = location.hash.slice(1).split('?');
    console.log('hashFull=', hashFull, 'queries=', queries);
    const [hash, id] = hashFull.split('/');
    const url: IUrl = {
      hash,
    };
    console.log('id=', id);
    if (id) {
      url.id = +id;
    }
    if (queries) url.queries = new URLSearchParams(queries);
    console.log('url=', url);
    console.log('queryParams=', url.queries?.get('ggg'));
    return url;
  }

  updateCurrentUrl(): void {
    this.currentUrl = this.getRoute();
    console.log('updated this.currentUrl=', this.currentUrl);
  }

  renderRoute(url: IUrl): void {
    console.log(0, 'renderRoute()', 'url=', url);
    if (url.hash === Routes.Main) {
      this.drawMain();
    } else if (url.hash === Routes.Basket) {
      this.drawBasket();
    } else {
      this.draw404();
    }
  }

  drawMain(): void {
    const main: HTMLElement | null = document.querySelector('.main');
    if (main) {
      main.style.background = 'white';
    }
  }

  drawBasket(): void {
    const main: HTMLElement | null = document.querySelector('.main');
    if (main) {
      main.style.background = 'blue';
    }
  }

  draw404(): void {
    const main: HTMLElement | null = document.querySelector('.main');
    if (main) {
      main.style.background = 'red';
    }
  }
}
