// import { CreateNode } from '../utilities/createNode';

export default class DrawElements {
  constructor() {
    //
  }

  drawMainPage(queryParams?: URLSearchParams): void {
    // нарисовать главную страницу с фильтрами
    window.app.mainPageTemplate.drawMainPageTemplate();
    console.log('drawMainPage works', queryParams?.toString());
    window.app.dataBase.getProductsByParams(queryParams);
  }

  changeFilters(): void {
    // перерисовать главную страницу с фильтрами
  }

  drawBasketPage(): void {
    // нарисовать корзину
    console.log('drawBasketPage works');
  }

  drawDetailPage(id?: number): void {
    console.log('drawDetailPage works', id); // нарисовать карточку товара по переданному id
  }

  drawPayWindow(): void {
    // нарисовать окно для платежа
  }

  drawError404(): void {
    console.log('404 works'); // нарисовать окно для платежа
  }
}
