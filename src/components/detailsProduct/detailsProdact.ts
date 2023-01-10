import { IFiltersElems, IProducts } from '../../models';
import { createElem } from '../../utilities';
import ModalPayment from '../modalPayment/modalPayment';
import './detailsProduct.scss';

export default class Details {
  btnAdd: HTMLButtonElement | null = null;
  imagesElems: IFiltersElems = {};

  renderDetails(id?: number): void {
    if (!id) {
      this.renderPage404();
      return;
    }
    const productObj = this.getProductById(id);
    if (!productObj) {
      this.renderPage404();
      return;
    }

    const main = document.querySelector('.main') as HTMLElement;
    if (!main) return;
    main.innerHTML = this.drawDetailsProduct(productObj);
    this.drawImagesDetailsProduct(productObj, main);

    const hasBasketProduct = window.app.dataBase.checkProductInBasket(productObj);
    this.btnAdd = main.querySelector('.add-to-cart-btn') as HTMLButtonElement;
    if (hasBasketProduct) {
      this.btnAdd.classList.add('added');
    }
    this.btnAdd.textContent = hasBasketProduct ? 'Drop from Cart' : 'Add to Cart';
    this.btnAdd.addEventListener('click', (e) => this.addProductToBasket(e.target as HTMLElement, productObj.id));
    const btnBuy = main.querySelector('.buy-now-btn') as HTMLElement;
    btnBuy.addEventListener('click', () => this.buyNow(productObj.id));
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
    window.app.header.updateData();
  }

  buyNow(id: number): void {
    const productObj = this.getProductById(id);
    if (!productObj) return;
    const hasBasketProduct = window.app.dataBase.checkProductInBasket(productObj);
    if (!hasBasketProduct) {
      window.app.dataBase.addProductToBasket(id);
      window.app.header.updateData();
    }
    window.app.basketPage.drawBasketPage();
    const modalPayment = new ModalPayment();
    modalPayment.drawModalPayment();
  }

  renderPage404(): void {
    window.app.page404.renderPage404();
  }

  getProductById(id: number): IProducts | null {
    return window.app.dataBase.getProductById(id);
  }

  drawImagesDetailsProduct(obj: IProducts, main: HTMLElement): void {
    const imagesBlock = main.querySelector('.product-details__images-mini') as HTMLElement;

    obj.images.forEach((img, index) => {
      const imgElem = createElem('img', null, imagesBlock) as HTMLImageElement;
      imgElem.src = img;
      imgElem.alt = obj.title;
      if (!index) {
        imgElem.classList.add('active');
      }
      imgElem.addEventListener('click', () => this.chooseImage(index));
      this.imagesElems[index] = imgElem;
    });
  }

  chooseImage(index: number): void {
    const mainImg = document.querySelector('#main-img') as HTMLImageElement;
    Object.keys(this.imagesElems).forEach((key) => {
      const imgElem = this.imagesElems[key] as HTMLImageElement;
      if (+key === index) {
        imgElem.classList.add('active');
        mainImg.src = imgElem.src;
      } else {
        imgElem.classList.remove('active');
      }
    });
  }

  drawDetailsProduct(obj: IProducts): string {
    return `
        <div class="product-details">
          <div class="container">
            <div class="product-details__content">
              <ul class="bread-crumbs">
                <li class="bread-crumbs__item"><a href="#main">main</a></li>
                <li class="bread-crumbs__item bread-crumbs__category">${obj.category}</li>
                <li class="bread-crumbs__item bread-crumbs__brand">${obj.brand}</li>
                <li class="bread-crumbs__item active bread-crumbs__product-title">${obj.title}</li>
              </ul>
              <h1 class="product-details__title">${obj.title}</h1>
              <div class="product-details__card">
                <div class="product-details__data">
                  <div class="product-details__images">
                    <div class="product-details__images-mini">
                    </div>
                    <div class="product-details__image">
                      <img
                        id="main-img"
                        src="${obj.images[0]}"
                        width="340"
                        height="191"
                        alt="${obj.title}"
                      />
                    </div>
                  </div>
                  <div class="product-details__product-info">
                    <div class="product-info__item">
                      <div class="product-info__title product-info__description">Description:</div>
                      <p class="product-info__info product-info__description-info">
                        ${obj.description}
                      </p>
                    </div>
                    <div class="product-info__item">
                      <div class="product-info__title product-info__discount-percentage">Discount percentage:</div>
                      <p class="product-info__info product-info__discount-percentage-info">${obj.discountPercentage}</p>
                    </div>
                    <div class="product-info__item">
                      <div class="product-info__title product-info__rating">Rating:</div>
                      <p class="product-info__info product-info__rating-info">${obj.rating}</p>
                    </div>
                    <div class="product-info__item">
                      <div class="product-info__title product-info__stock">Stock:</div>
                      <p class="product-info__info product-info__stock-info">${obj.stock}</p>
                    </div>
                    <div class="product-info__item">
                      <div class="product-info__title product-info__brand">Brand:</div>
                      <p class="product-info__info product-info__brand-info">${obj.brand}</p>
                    </div>
                    <div class="product-info__item">
                      <div class="product-info__title product-info__category">Category:</div>
                      <p class="product-info__info product-info__category-info">${obj.category}</p>
                    </div>
                  </div>
                  <div class="product-details__btns">
                    <div class="product-details__price">${obj.price} $</div>
                    <button class="product-details__btn add-to-cart-btn btn"></button>
                    <button class="product-details__btn  buy-now-btn btn btn--col-3">Buy now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>  
    `;
  }
}
