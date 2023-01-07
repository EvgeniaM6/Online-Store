import { IProducts } from '../../models';
import { CreateNode } from '../../utilities';
import './mainPageTemplate.scss';

export default class MainPageTemplate {
  drawMainPageTemplate(queryParams?: URLSearchParams): void {
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = '';
    const mainPageTemplate = new CreateNode(main, 'div', 'products container', '');
    mainPageTemplate.node.innerHTML = this.mainTemplate();
    const data = window.app.dataBase.getProductsByParams(queryParams);
    this.updateFoundProductsNumber(data.length);
    this.renderProductCards(data);
    this.renderFilters();
  }

  renderProductCards(data: Array<IProducts>): void {
    this.clearCardsContainer();
    const cardsContainer = document.querySelector('.products__cards') as HTMLElement;
    data.forEach((obj) => {
      const cardElem = window.app.productCard.createProductCardElem(obj);
      cardsContainer.append(cardElem);
    });
  }

  renderFilters(): void {
    window.app.filter.drawFilter();
  }

  clearCardsContainer(): void {
    const cardsContainer = document.querySelector('.products__cards') as HTMLElement;
    cardsContainer.innerHTML = '';
  }

  updateFoundProductsNumber(num: number): void {
    const numberElem = document.querySelector('#found-products-num');
    if (!numberElem) return;
    numberElem.textContent = `${num}`;
  }

  mainTemplate(): string {
    return `
      <div class="products__filters">
        <div class="reset-copy-url-block">
          <button class="reset-btn btn">Reset filters</button>
          <button class="copy-url-btn btn">Copy link</button>
        </div>
        <div class="filters-block">
        </div>
        <div class="dual-sliders-block">
        </div>
      </div>
      <div class="products__main">
        <div class="products__sorting-block">
          <div class="sort-by">
            <select class="sort-by__select input--big" name="" id="">
              <option class="sort-name" value="sort-title" disabled selected>Sort options:</option>
              <option value="price-ASC">Sort by price ASC</option>
              <option value="price DESC">Sort by price DESC</option>
              <option value="rating-ASC">Sort by rating ASC</option>
              <option value="rating-DESC">Sort by rating DESC</option>
              <option value="discount-ASC">Sort by discount ASC</option>
              <option value="discount-DESC">Sort by discount DESC</option>
            </select>
          </div>
          <div class="found-products">Found: <span id="found-products-num"></span></div>
          <div class="search-bar">
            <input class="search-filter input--big" type="search" placeholder="Search product..." />
          </div>
          <div class="view-cards">
            <div class="view-card active view-card__1">view-1</div>
            <div class="view-card view-card__2">view-2</div>
          </div>
        </div>
        <div class="products__cards">
        </div>
      </div>
    `;
  }
}
