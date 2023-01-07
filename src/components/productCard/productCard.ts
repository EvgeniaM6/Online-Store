// import { CreateNode } from '../../utilities';
import { CardsViews, IProducts, Routes } from '../../models';
import { createElem } from '../../utilities';
import './productCard.scss';

export default class ProductCard {
  createProductCardElem(obj: IProducts, isView2: boolean): HTMLElement {
    const card = createElem('div', 'products__card card');
    if (isView2) {
      card.classList.add(CardsViews[1]);
    }
    card.innerHTML = this.drawProductCard(obj);
    const hasBasketProduct = window.app.dataBase.checkProductInBasket(obj);
    const btnAdd = card.querySelector('.add-to-cart-btn') as HTMLElement;
    if (hasBasketProduct) {
      btnAdd.classList.add('added');
    }
    btnAdd.textContent = hasBasketProduct ? 'Drop from Cart' : 'Add to Cart';
    btnAdd.addEventListener('click', (e) => this.addProductToBasket(e.target as HTMLElement, obj.id));
    const btnDetails = card.querySelector('.details-btn') as HTMLElement;
    btnDetails.addEventListener('click', () => this.showProductDetails(obj.id));
    return card;
  }

  showProductDetails(id: number): void {
    window.app.router.changeHref(Routes.Details, id);
  }

  addProductToBasket(eTarget: HTMLElement, id: number): void {
    const isProductAddedToBasket = eTarget?.classList.contains('added');
    if (isProductAddedToBasket) {
      window.app.dataBase.deleteProductFromBasket(id);
      eTarget?.classList.remove('added');
    } else {
      window.app.dataBase.addProductToBasket(id);
      eTarget?.classList.add('added');
    }
    const textBtn = isProductAddedToBasket ? 'Add to Cart' : 'Drop from Cart';
    eTarget.textContent = textBtn;
    this.updatePage();
  }

  updatePage(): void {
    window.app.header.updateData();
  }

  //parent-block: ".products__cards"
  drawProductCard(obj: IProducts): string {
    return ` 
            <div class="card__img">
              <img src="${obj.thumbnail}" alt="${obj.title}" />
            </div>
            <div class="card__main-info">
              <div class="card__title">${obj.title}</div>
              <div class="card__price">${obj.price}&nbsp;$</div>
            </div>
            <ul class="card__info">
              <li class="card__category"><span>Category: </span>${obj.category}</li>
              <li class="card__brand"><span>Brand: </span>${obj.brand}</li>
              <li class="card__discount-percent"><span>Discount: </span>${obj.discountPercentage}%</li>
              <li class="card__rating"><span>Rating: </span>${obj.rating}</li>
              <li class="card__stock"><span>Stock: </span>${obj.stock}</li>
            </ul>
            <div class="card__btns">
              <button class="card__btn add-to-cart-btn btn"></button>
              <button class="card__btn details-btn btn btn--col-5">Details</button>
            </div>
      `;
  }
}
