// import { CreateNode } from '../../utilities';
import { IProducts } from '../../models/types';
import './productCard.scss';

//parent-block: ".products__cards"
export default function drawProductCard(obj: IProducts): string {
  return ` 
    <div class="products__card card">
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
            <button class="card__btn add-to-cart-btn btn">Add to Cart</button>
            <button class="card__btn details-btn btn btn--col-5">Details</button>
          </div>
        </div>
    `;
}
