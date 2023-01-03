import { IProducts } from '../../models';
import './detailsProduct.scss';

function drawImagesDetailsProduct(obj: IProducts) {
  const arrImages: string[] = obj.images;
  let listImages = '';

  arrImages.forEach((img, index) => {
    if (index === 0) {
      listImages += `<img class="active" src="${img}" alt="${obj.title}" />`;
    } else {
      listImages += `<img src="${img}" alt="${obj.title}" />`;
    }
  });
  return listImages;
}

export default function drawDetailsProduct(obj: IProducts): string {
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
                    ${drawImagesDetailsProduct(obj)}
                  </div>
                  <div class="product-details__image">
                    <img
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
                  <button class="product-details__btn add-to-cart-btn btn">Add to Cart</button>
                  <button class="product-details__btn  buy-now-btn btn btn--col-3">Buy now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
  `;
}
