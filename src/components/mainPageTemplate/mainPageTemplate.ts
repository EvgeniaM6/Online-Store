import { CardsViews, Filters, IProducts, SortDirections } from '../../models';
import { createElem, CreateNode } from '../../utilities';
import './mainPageTemplate.scss';

export default class MainPageTemplate {
  canCopy = true;
  numberElem: HTMLElement | null = null;
  viewBtnsArr: Array<HTMLElement> = [];
  selectElem: HTMLSelectElement | null = null;
  searchInputElem: HTMLInputElement | null = null;
  cardsContainer: HTMLElement | null = null;

  drawMainPageTemplate(queryParams?: URLSearchParams): void {
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = '';
    const mainPageTemplate = new CreateNode(main, 'div', 'products container', '');
    mainPageTemplate.node.innerHTML = this.mainTemplate();
    this.numberElem = document.querySelector('#found-products-num');
    const resetBtn = mainPageTemplate.node.querySelector('.reset-btn') as HTMLElement;
    resetBtn.addEventListener('click', () => this.resetHref());
    const copyBtn = mainPageTemplate.node.querySelector('.copy-url-btn') as HTMLElement;
    copyBtn.addEventListener('click', (e) => this.copyLink(e.target as HTMLButtonElement));
    this.searchInputElem = mainPageTemplate.node.querySelector('.search-filter') as HTMLInputElement;
    let sortValue = '';
    let viewValue = '';
    if (queryParams) {
      const searchValue = queryParams.get(Filters.Search);
      this.searchInputElem.value = searchValue || '';
      if (searchValue) {
        this.searchInputElem.focus();
      }
      sortValue = queryParams.get(Filters.Sort) || '';
      viewValue = queryParams.get(Filters.View) || '';
    }
    this.searchInputElem.addEventListener('input', (e) => this.searchInput(e));
    const data = window.app.dataBase.getProductsByParams(queryParams);
    this.drawOptions(sortValue);
    this.createViewButtons(viewValue);
    this.updateFoundProductsNumber(data.length);
    this.renderProductCards(data, viewValue);
    this.renderFilters(data);
    this.renderDualFilter(data);
  }

  renderProductCards(data: Array<IProducts>, viewValue: string): void {
    this.clearCardsContainer();
    this.cardsContainer = document.querySelector('.products__cards') as HTMLElement;
    this.cardsContainer.innerHTML = '';
    this.cardsContainer.classList.remove('empty');
    const isView2 = viewValue === CardsViews[1];
    if (isView2) {
      this.cardsContainer.classList.add(CardsViews[1]);
    } else {
      this.cardsContainer.classList.remove(CardsViews[1]);
    }
    if (!data.length) {
      this.drawNoProductsFound();
    } else {
      data.forEach((obj) => {
        const cardElem = window.app.productCard.createProductCardElem(obj, isView2);
        this.cardsContainer?.append(cardElem);
      });
    }
  }

  renderFilters(data: Array<IProducts>): void {
    window.app.filter.drawFilter(data);
  }

  clearCardsContainer(): void {
    const cardsContainer = document.querySelector('.products__cards') as HTMLElement;
    cardsContainer.innerHTML = '';
  }

  updateFoundProductsNumber(num: number): void {
    if (!this.numberElem) return;
    this.numberElem.textContent = `${num}`;
  }

  resetHref(): void {
    window.app.router.resetHref();
  }

  searchInput(event: Event): void {
    window.app.router.changeHrefBySearchInput(event);
  }

  drawOptions(sortValue: string): void {
    this.selectElem = document.querySelector('.sort-by__select') as HTMLSelectElement;
    const isSelected = !sortValue;
    const optionDefault = new Option('Sort options:', 'sort-title', isSelected, isSelected);
    optionDefault.className = 'sort-name';
    optionDefault.disabled = true;
    this.selectElem.append(optionDefault);
    Object.values(SortDirections).forEach((sortDirection) => {
      const isSelected = sortValue === sortDirection;
      const text = `Sort by ${sortDirection.replace('-', ' ')}`;
      const option = new Option(text, sortDirection, isSelected, isSelected);
      if (this.selectElem) {
        this.selectElem.append(option);
      }
    });
    this.selectElem.addEventListener('change', (e) => this.changeSorting(e));
  }

  updateOptions(sortValue: string) {
    if (!this.selectElem) return;
    const optionsCollection = this.selectElem.options;
    if (!sortValue) {
      this.selectElem.options[0].defaultSelected = true;
      this.selectElem.options[0].selected = true;
    } else {
      Array.from(optionsCollection).forEach((option) => {
        option.defaultSelected = option.value === sortValue;
        option.selected = option.value === sortValue;
      });
    }
  }

  changeSorting(event: Event): void {
    const optionsCollection = (event.target as HTMLSelectElement).options;
    const selectedIndex = optionsCollection.selectedIndex;
    const selectedOption = optionsCollection[selectedIndex].value;
    window.app.router.changeHrefBySort(selectedOption);
  }

  createViewButtons(viewValue: string): void {
    const viewCardsContainer = document.querySelector('.view-cards') as HTMLElement;
    const viewNum = viewValue ? +viewValue.split('-')[1] : 1;
    this.viewBtnsArr = [];
    for (let i = 0; i < 2; i += 1) {
      const viewBtn = createElem('div', `view-card view-card__${i + 1}`, viewCardsContainer, CardsViews[i]);
      if (viewNum - 1 === i) {
        viewBtn.classList.add('active');
      }
      viewBtn.addEventListener('click', () => this.changeView(i));
      this.viewBtnsArr.push(viewBtn);
    }
  }

  changeView(i: number): void {
    this.changeHrefByView(i);
    // this.changeClassOnViewBtn(i);
  }

  changeClassOnViewBtn(i: number): void {
    this.viewBtnsArr.forEach((btnElem, index) => {
      if (index === i) {
        btnElem.classList.add('active');
      } else {
        btnElem.classList.remove('active');
      }
    });
  }

  changeHrefByView(i: number): void {
    window.app.router.changeHrefByView(i);
  }

  renderDualFilter(data: Array<IProducts>): void {
    window.app.dualFilter.createDualFilterElems(data);
  }

  copyLink(eTarget: HTMLButtonElement): void {
    if (!this.canCopy) return;
    this.canCopy = false;
    navigator.clipboard.writeText(location.toString());
    eTarget.textContent = 'Link copied!';
    eTarget.classList.add('copied');
    setTimeout(() => {
      eTarget.textContent = 'Copy link';
      this.canCopy = true;
      eTarget.classList.remove('copied');
    }, 1500);
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
        <div class="dual-sliders">
        </div>
      </div>
      <div class="products__main">
        <div class="products__sorting-block">
          <div class="sort-by">
            <select class="sort-by__select input--big" name="" id="">
            </select>
          </div>
          <div class="found-products">Found: <span id="found-products-num"></span></div>
          <div class="search-bar">
            <input class="search-filter input--big" type="search" placeholder="Search product..." />
          </div>
          <div class="view-cards">
          </div>
        </div>
        <div class="products__cards">
        </div>
      </div>
    `;
  }

  drawNoProductsFound() {
    if (!this.cardsContainer) return;
    this.cardsContainer?.classList.add('empty');
    this.cardsContainer.innerHTML = '';
    const text = 'No products found';
    createElem('div', 'unfound', this.cardsContainer, text);
  }

  updateDualSlider(data: Array<IProducts>): void {
    window.app.dualFilter.updateDualSlider(data);
  }

  updateMainPage(queryParams?: URLSearchParams): void {
    const sortValue = queryParams?.get(Filters.Search) || '';
    const viewValue = queryParams?.get(Filters.View) || '';
    const viewValueNum = viewValue ? +viewValue.slice(-1) - 1 : 0;
    const searchValue = queryParams?.get(Filters.Search) || '';
    if (this.searchInputElem) {
      this.searchInputElem.value = searchValue;
      if (searchValue) {
        this.searchInputElem.focus();
      }
    }
    const data = window.app.dataBase.getProductsByParams(queryParams);
    this.updateFoundProductsNumber(data.length);
    window.app.filter.updateNumberFilters(data);
    this.renderProductCards(data, viewValue);
    this.changeClassOnViewBtn(viewValueNum);
    this.updateOptions(sortValue);
    this.updateDualSlider(data);
  }
}
