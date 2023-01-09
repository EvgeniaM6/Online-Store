import './basketPage.scss';
import { IProducts } from '../../models/types';
import { arrProductsInCart } from '../../data/testData'; //test data
import ModalPayment from '../modalPayment/modalPayment';

const promoCodes: [string, number][] = [
  ['test', 10],
  ['RS', 25],
];
export default class BasketPage {
  drawBasketPage(): void {
    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = this.basketPageTemplate();

    //show items from arrProductsInCart
    let basketItems = '';
    arrProductsInCart.forEach((obj, index) => {
      basketItems += this.basketPageItemTemplate(obj, index);
    });
    const basketPageItems = document.querySelector('.basket-page__items') as HTMLElement;
    basketPageItems.innerHTML = basketItems;

    // ==========
    //add-remove countProduct(item) in cart, update for product amountSum
    if (basketPageItems) {
      basketPageItems.addEventListener('click', (e) => {
        const currBtn = e.target as HTMLElement;
        const currBasketPageItem = currBtn.closest('.basket-page__item');

        const stockCurrProducts = currBasketPageItem?.querySelector('.basket-product-info__stock') as HTMLElement;
        const valStockCurrProducts = Number(stockCurrProducts.textContent?.trim().slice(7));

        const countCurrProducts = currBasketPageItem?.querySelector('.basket-product-info__amount') as HTMLElement;
        let currCount = Number(countCurrProducts.textContent);

        const currAmountSum = currBasketPageItem?.querySelector('.basket-product-info__amount-sum') as HTMLElement;
        const currPriceElem = currBasketPageItem?.querySelector('.basket-product-info__price') as HTMLElement;
        const currPrice = Number(currPriceElem.textContent?.trim().slice(7, -2));

        if (currBtn.id === 'add-product-btn') {
          if (currCount < valStockCurrProducts) {
            currCount++;
            countCurrProducts.textContent = `${currCount}`;
          }
        }

        if (currBtn.id === 'remove-product-btn') {
          if (currCount > 0) {
            currCount--;
            countCurrProducts.textContent = `${currCount}`;
          }
        }

        //update data
        currAmountSum.textContent = `Total: ${currPrice * currCount} $`;
        if (currCount === 0) {
          currBasketPageItem?.remove();
          //TODO: удалить товар из arrТоваров корзины
          //TODO: обновить порядковый номер товара в списке
        }
        //TODO: обновить данные о кол-ве товаров и цены в arrТоваров в Header
        //TODO: обновить данные о кол-ве товаров и цены в arrТоваров в Summary
      });
    }

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
  }

  basketPageItemTemplate(obj: IProducts, index: number): string {
    return `
    <div class="basket-page__item">
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
        <div class="basket-product-info__price"><span>Price: </span>${obj.price}&nbsp;$</div>
        <div class="basket-product-info__amount-info">
          <button class="basket-product-info__btn btn btn--cart" id="remove-product-btn"> - </button>
          <span class="basket-product-info__amount amount-of amount-of--dark-bg">1</span>
          <button class="basket-product-info__btn btn btn--cart" id="add-product-btn"> + </button>
        </div>
        <div class="basket-product-info__amount-sum"><span>Total: </span>${obj.price}&nbsp;$</div>
      </div>
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
                <div class="basket-summary__products-amount" id="products-amount-start"><span>Total: </span>2500.00 $
                </div>
                <div class="basket-summary__products-amount promo-amount hide" id="products-amount-promo"><span>Total:
                  </span>2250.00 $</div>
              </div>
              <div class="basket-summary__promo-code promo-code">
                <div class="promo-code__input">
                  <input class="input--payment" id="promo-code" type="search" placeholder="enter promo code">
                </div>
                <div class="promo-code__applied hide">
                  <h3 class="promo-code__applied-title">Apply promo code</h3>
                  <div class="promo-code__row">
                    <div class="promo-code__applied-text">test -10%</div>
                    <button class="promo-code__applied-btn btn btn--mini">Apply</button>
                  </div>
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
