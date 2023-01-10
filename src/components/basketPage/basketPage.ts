import './basketPage.scss';
import ModalPayment from '../modalPayment/modalPayment';
import { IProducts, IBasketProduct, IFiltersElems, TPromo } from '../../models';
import { createElem } from '../../utilities';

export default class BasketPage {
  productsItemNumElem: IFiltersElems = {};
  promoCodes: TPromo = {
    test: {
      percent: 10,
      isUsed: false,
      description: 'Promo test',
    },
    rs: {
      percent: 25,
      isUsed: false,
      description: 'Rolling Scopes School',
    },
  };

  drawBasketPage(): void {
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = this.basketPageTemplate();

    const basket = this.getBasketProductsArr();
    this.productsItemNumElem = {};
    const basketPageItems = document.querySelector('.basket-page__items') as HTMLElement;

    basketPageItems.innerHTML = '';
    if (!basket.length) {
      createElem('div', 'empty-basket', basketPageItems, 'Card is empty');
    } else {
      basket.forEach((basketProduct, index) => {
        const id = basketProduct.product.id;
        const price = basketProduct.product.price;
        const basketItemBlock = createElem('div', 'basket-page__item');
        basketItemBlock.innerHTML = this.basketPageItemTemplate(basketProduct.product, index, basketProduct.amount);
        const keyBlock = `${id}_block`;
        this.productsItemNumElem[keyBlock] = basketItemBlock;

        const productAmountElem = basketItemBlock.querySelector('.basket-product-info__amount') as HTMLElement;
        const keyAmountElem = `${id}_amount`;
        this.productsItemNumElem[keyAmountElem] = productAmountElem;

        const removeBtn = basketItemBlock.querySelector('#remove-product-btn') as HTMLButtonElement;
        const addBtn = basketItemBlock.querySelector('#add-product-btn') as HTMLButtonElement;

        removeBtn.addEventListener('click', (e) => this.addOrRemoveProduct(e, id, price));
        addBtn.addEventListener('click', (e) => this.addOrRemoveProduct(e, id, price));

        const currAmountSum = basketItemBlock.querySelector('.basket-product-info__amount-sum') as HTMLElement;
        const keyTotal = `${id}_total`;
        this.productsItemNumElem[keyTotal] = currAmountSum;

        basketPageItems.append(basketItemBlock);
      });
    }

    this.summaryData();

    // ==========
    //add-remove countProduct(item) in cart, update for product amountSum

    //Summary block
    const summaryBasketPage = document.querySelector('.basket-page__summary') as HTMLElement;

    if (summaryBasketPage) {
      summaryBasketPage.addEventListener('click', (e) => {
        const currSummaryBtn = e.target as HTMLElement;

        if (currSummaryBtn.id === 'basket-page__buy-now-btn') {
          const modalPayment = new ModalPayment();
          modalPayment.drawModalPayment();
        }
      });
    }

    const inputPayment = document.querySelector('.input--payment') as HTMLInputElement;
    inputPayment.addEventListener('input', (e) => this.checkPromo(e));
  }

  summaryData() {
    const summaryBasketPage = document.querySelector('.basket-page__summary') as HTMLElement;
    const productsCount = summaryBasketPage.querySelector('.basket-summary__products-count') as HTMLElement;
    const productsAmountStart = summaryBasketPage.querySelector('#products-amount-start') as HTMLElement;

    const arrAmount = document.querySelectorAll<HTMLElement>('.basket-product-info__amount');
    let sumProducts = 0;
    [...arrAmount].map((el) => {
      const val = Number(el.textContent?.trim());
      sumProducts += val;
    });
    productsCount.textContent = `Products: ${sumProducts}`;

    const arrAmountSum = document.querySelectorAll<HTMLElement>('.basket-product-info__amount-sum');
    let sumTotalAmountSum = 0;
    [...arrAmountSum].map((el) => {
      const val = Number(el.textContent?.trim().slice(7, -2));
      sumTotalAmountSum += val;
    });
    productsAmountStart.textContent = `Total: ${sumTotalAmountSum}€`;
  }

  getBasketProductsArr(): Array<IBasketProduct> {
    return window.app.dataBase.getBasket();
  }

  addOrRemoveProduct(e: Event, id: number, price: number): void {
    const currBtn = e.target as HTMLButtonElement;
    const valStockCurrProducts = this.getProductStockById(id);
    const countCurrProducts = this.productsItemNumElem[`${id}_amount`] as HTMLElement;
    const currAmountSum = this.productsItemNumElem[`${id}_total`] as HTMLElement;
    let currCount = countCurrProducts ? (countCurrProducts.textContent ? +countCurrProducts.textContent : 0) : 0;
    let isPlus = false;

    if (currBtn.id === 'add-product-btn') {
      if (currCount === valStockCurrProducts) return;
      currCount += 1;
      countCurrProducts.textContent = `${currCount}`;
      isPlus = true;
    } else if (currBtn.id === 'remove-product-btn') {
      if (currCount > 1) {
        currCount--;
        countCurrProducts.textContent = `${currCount}`;
      } else {
        const currBasketPageItem = this.productsItemNumElem[`${id}_block`] as HTMLElement;
        currBasketPageItem?.remove();
        this.checkItemsContainer();
        this.updateNumsProductsByOrder();
      }
    }
    this.changeProductInBasket(id, isPlus);

    //update data
    currAmountSum.textContent = `Total: ${price * currCount} €`;
    this.updateHeader();
    this.summaryData();
    this.updateTotal();
  }

  checkItemsContainer(): void {
    const basketPageItems = document.querySelector('.basket-page__items') as HTMLElement;
    if (basketPageItems) {
      const innHtml = basketPageItems.innerHTML;
      if (!innHtml) {
        createElem('div', 'empty-basket', basketPageItems, 'Card is empty');
      }
    }
  }

  getProductStockById(id: number): number {
    const productObj = window.app.dataBase.getProductById(id);
    return productObj?.stock || 0;
  }

  changeProductInBasket(id: number, isPlus?: boolean): void {
    window.app.dataBase.changeAmountInBasket(id, isPlus);
  }

  updateNumsProductsByOrder(): void {
    const numElemsCollection = document.querySelectorAll('.basket-page__item-num');
    numElemsCollection.forEach((numElem, index) => {
      numElem.textContent = `${index + 1}`;
    });
  }

  updateHeader(): void {
    window.app.header.updateData();
  }

  checkPromo(e: Event): void {
    const value = (e.target as HTMLInputElement).value.toLowerCase();
    const isCorrectPromo = Object.keys(this.promoCodes).some((keyPromo) => {
      return keyPromo.toLowerCase() === value && !this.promoCodes[keyPromo].isUsed;
    });
    if (!isCorrectPromo) return;
    this.renderPromoBlock(value);
  }

  renderPromoBlock(promo: string): void {
    const prodAmountPromo = document.querySelector('.promo-code__applied') as HTMLElement;
    prodAmountPromo.classList.remove('hide');
    createElem('h3', 'promo-code__applied-title', prodAmountPromo, 'Apply promo code');
    const row = createElem('div', 'promo-code__row', prodAmountPromo);
    const text = `${this.promoCodes[promo].description} -${this.promoCodes[promo].percent}%`;
    createElem('div', 'promo-code__applied-text', row, text);
    const btn = createElem('button', 'promo-code__applied-btn btn btn--mini', prodAmountPromo, 'Apply');
    this.promoCodes[promo].isUsed = true;
    btn.addEventListener('click', () => this.addPromo(prodAmountPromo, promo));
  }

  addPromo(prodAmountPromo: HTMLElement, promo: string): void {
    const inputPromo = document.querySelector('#promo-code') as HTMLInputElement;
    inputPromo.value = '';

    prodAmountPromo.innerHTML = '';
    prodAmountPromo.classList.add('hide');

    const container = document.querySelector('.codes__container') as HTMLElement;
    const code = createElem('div', 'code', container);
    const codeText = `${this.promoCodes[promo].description} - ${this.promoCodes[promo].percent}%`;
    createElem('span', 'code__span', code, codeText);
    const codeBtn = createElem('button', 'code__btn btn', code, 'Drop');
    codeBtn.addEventListener('click', () => this.dropPromo(code, promo));

    this.updateTotal();
  }

  dropPromo(code: HTMLElement, promo: string): void {
    this.promoCodes[promo].isUsed = false;
    code.remove();
    this.updateTotal();
  }

  updateTotal(): void {
    const hasPromo = Object.keys(this.promoCodes).some((keyPromo) => {
      return this.promoCodes[keyPromo].isUsed;
    });
    const promoAmount = document.querySelector('.promo-amount') as HTMLElement;
    const appliedCodesEl = document.querySelector('.basket-summary__applied-codes') as HTMLElement;
    const prodAmStart = document.querySelector('#products-amount-start') as HTMLElement;
    if (hasPromo) {
      promoAmount.classList.remove('hide');
      appliedCodesEl.classList.remove('hide');
      prodAmStart.classList.add('old');
      let amount = window.app.dataBase.countBasketTotal();
      promoAmount.innerHTML = `<span>Total: </span>${amount} €`;
      Object.keys(this.promoCodes).forEach((keyPromo) => {
        if (this.promoCodes[keyPromo].isUsed) {
          amount = (amount * (100 - this.promoCodes[keyPromo].percent)) / 100;
        }
      });
      promoAmount.innerHTML = `<span>Total: </span>${amount} €`;
    } else {
      promoAmount.classList.add('hide');
      appliedCodesEl.classList.add('hide');
      prodAmStart.classList.remove('old');
    }
  }

  basketPageItemTemplate(obj: IProducts, index: number, amount: number): string {
    return `
      <div class="basket-page__item-num">${index + 1}</div>
      <div class="basket-page__item-info basket-product-info">
        <div class="basket-product-info__img">
          <img src="${obj.thumbnail}" alt="${obj.title}" />
        </div>
        <ul class="basket-product-info__details">   
          <li class="basket-product-info__title">${obj.title}</li>
          <li class="basket-product-info__category"><span>Category: </span>${obj.category}</li>
          <li class="basket-product-info__brand"><span>Brand: </span>${obj.brand}</li>
          <li class="basket-product-info__discount-percent"><span>Discount: </span>${obj.discountPercentage}%</li>
          <li class="basket-product-info__rating"><span>Rating: </span>${obj.rating}</li>
          <li class="basket-product-info__stock"><span>Stock: </span>${obj.stock}</li>
        </ul>
      </div>
      <div class="basket-product-info__summary">
        <div class="basket-product-info__price"><span>Price: </span>${obj.price}&nbsp;€</div>
        <div class="basket-product-info__amount-info">
          <button class="basket-product-info__btn btn btn--cart" id="remove-product-btn"> - </button>
          <span class="basket-product-info__amount amount-of amount-of--dark-bg">${amount}</span>
          <button class="basket-product-info__btn btn btn--cart" id="add-product-btn"> + </button>
        </div>
        <div class="basket-product-info__amount-sum"><span>Total: </span>${obj.price * amount}&nbsp;€</div>
      </div>
    `;
  }

  basketPageTemplate(): string {
    return `
      <div class="basket-page">
        <div class="container">
          <div class="basket-page__container">
            <div class="basket-page__products">
              <div class="basket-page__header">
                <h2 class="basket-page__title">Shopping Cart</h2>
                <div class="basket-page__limit-show-products">
                  <label class="basket-page__subtitle" for="limit-show-products">limit show</label>
                  <input class="input--num" id="limit-show-products" type="number" min="1" max="4" value="1">
                </div>
                <div class="basket-page__pagination pagination">
                  <span class="basket-page__subtitle">page</span>
                  <button class="pagination__btn btn btn--cart"> &#129044; </button>

                  <span class="pagination__count amount-of" id="pagination-count">1</span>
                  <button class="pagination__btn btn btn--cart"> &#129046; </button>
                </div>

              </div>
              <div class="basket-page__items">
                <!-- basket-page__item  -->
              </div>    
            </div>
            <div class="basket-page__summary basket-summary">
              <h2 class="basket-summary__title">Summary</h2>
              <div class="basket-summary__products-count"><span>Products: </span>10</div>
              <div class="basket-summary__amount-row">
                <div class="basket-summary__products-amount" id="products-amount-start"><span>Total: </span>2500.00 €
                </div>
                <div class="basket-summary__products-amount promo-amount hide" id="products-amount-promo">
                  <span>
                    Total:
                  </span>
                  2250.00 €
                </div>
              </div>
              <div class="basket-summary__applied-codes codes hide">
                <h3 class="codes__title">Applied codes</h3>
                <div class="codes__container"></div>
              </div>
              <div class="basket-summary__promo-code promo-code">
                <div class="promo-code__input">
                  <input class="input--payment" id="promo-code" type="search" placeholder="enter promo code">
                </div>
                <div class="promo-code__applied hide">
                </div>
                <div class="promo-code__test-promo-code">Promo for test: "test", "RS"</div>
              </div>
              <button class="basket-summary__btn buy-now-btn btn btn--col-3 btn--big" id="basket-page__buy-now-btn">Buy
                now</button>

            </div>
          </div>
        </div>
      </div>
    `;
  }
}
