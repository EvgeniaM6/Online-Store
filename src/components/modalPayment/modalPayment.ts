import './modalPayment.scss';
import { CreateNode } from '../../utilities';
import * as invoiceCard from '../../assets/png/payment-system/invoice.png';
import * as americanExpressCard from '../../assets/png/payment-system/american-express.png';
import * as visaCard from '../../assets/png/payment-system/visa.png';
import * as mastercardCard from '../../assets/png/payment-system/mastercard.png';

const cardImg = invoiceCard;
export default class ModalPayment {
  value?: string;

  drawModalPayment() {
    const popup = new CreateNode(document.body, 'div', 'popup', '');
    popup.node.innerHTML = this.modalPaymentTemplate();

    //close modal-window on click on dark area
    popup.node.addEventListener('click', (e) => {
      const clickedElem = e.target as HTMLElement;
      if (clickedElem.classList.contains('popup')) {
        popup.destroy();
      }
    });

    const form = document.querySelector('#payment-form');
    form?.addEventListener('submit', (e) => {
      e.preventDefault();

      const popupMessage = new CreateNode(document.body, 'div', 'popup popup-message', '');
      popupMessage.node.innerHTML = this.modalInfoMessage('Заказ оформлен!');

      setTimeout(() => {
        popupMessage.destroy();
        popup.destroy();
        window.location.hash = '#main';
      }, 3000);
      //TODO: очистить корзину
    });

    // const cardNumber = document.querySelector('#card-number') as HTMLInputElement;
    // cardNumber.addEventListener('input', this.changeImgPaymentSistem);

    // input.oninvalid = function (event) {
    //   event.target.setCustomValidity('Username should only contain lowercase letters. e.g. john');
    // };

    //input validation
    form?.addEventListener('input', (e) => {
      const currInput = e.target as HTMLInputElement;

      if (currInput.id === 'card-number') {
        this.maskCardNumber.call(currInput);
        this.changeImgPaymentSystem.call(currInput);
      }
      if (currInput.id === 'valid-thru') {
        this.maskCardDataValidThru.call(currInput);
      }
    });

    //customize message for invalid value
    const cardDataValidThru = document.querySelector('#valid-thru') as HTMLInputElement;
    cardDataValidThru.addEventListener('invalid', (e) => {
      const currInput = e.target as HTMLInputElement;
      currInput.setCustomValidity('Month cannot be more than 12');
    });
  }

  maskCardNumber() {
    if (this.value) {
      let val = this.value.replace(/[^0-9]/g, '');
      val = val !== '' ? val.match(/.{1,4}/g)!.join(' ') : '';
      this.value = val;
    }
  }

  maskCardDataValidThru(): void {
    if (this.value) {
      let val = this.value.replace(/[^0-9]/g, '');
      val = val.length >= 2 ? `${val.slice(0, 2)}/${val.slice(2, 4)}` : val;
      this.value = val;
    }
  }

  //change img of payment system depending on first-char
  changeImgPaymentSystem() {
    const cardDataImg = document.querySelector('.card-data__card-number img') as HTMLImageElement;
    const firstChar = this.value?.trim().slice(0, 1);
    if (firstChar === '3') {
      cardDataImg.src = americanExpressCard;
    } else if (firstChar === '4') {
      cardDataImg.src = visaCard;
    } else if (firstChar === '5') {
      cardDataImg.src = mastercardCard;
    } else {
      cardDataImg.src = invoiceCard;
    }
  }

  modalPaymentTemplate(): string {
    return `
      <div class="popup__content">
        <form id="payment-form" class="form" action="/" method="post">
          <div class="form__person-details">
            <h2 class="form__title">Personal details</h2>
            <input
              class="form__item input--payment"
              name="customer-name"
              type="text"
              placeholder="Name and surname"
              required
              pattern="\\b[a-zA-Z]{3}[a-zA-Z]*\\b\\s\\b[a-zA-Z]{3}[a-zA-Z]*\\b(\\s*|-*)\\b[a-zA-Z]*\\b";
              maxlength="35"
              title="Username should contain only latin letters, 2-3 words"
            />
            <input
              class="form__item input--payment"
              name="phone-number"
              type="tel"
              placeholder="Phone number +480000000"
              required
              pattern="^\\+\\d{9}\\d*"
              maxlength="15"
              title="Phone number must start with + and contain at least 9 digits"
            />
            <input
              class="form__item input--payment"
              name="address"
              type="text"
              placeholder="Delivery address"
              required
              pattern="\\b\\w{5}\\w*\\b\\s\\b\\w{5}\\w*\\b\\s\\b\\w{5}\\w*\\b\\s*\\b\\w*\\b\\s*\\b\\w*\\b"
              maxlength="50"
              title="enter min 3 to 5 words by latin"
            />
            <input
              class="form__item input--payment"
              name="email"
              type="email"
              placeholder="E-mail"
              required
              pattern="\\w+@\\w+\\.\\w+"
            />
          </div>
          <div class="form__card-details">
            <h2 class="form__title">Credit card details</h2>
            <div class="form__data card-data">
              <div class="card-data__card-number">
                <img src=${cardImg} alt="credit-card" />
                <input
                  id="card-number"
                  name="card-number"
                  class="input--payment"
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  required
                  pattern="\\d{4}\\s\\d{4}\\s\\d{4}\\s\\d{4}"
                  maxlength="19"
                  title="enter 16 digits"
                />
              </div>
              <div class="card-data__info">
                <div class="card-data__valid-data">
                  <label for="valid-thru">valid</label>
                  <input
                    id="valid-thru"
                    class="input--payment"
                    type="text"
                    name="valid-thru"
                    placeholder="10/23"
                    required
                    pattern="[0-1][0-2][\\/]\\d{2}"
                    maxlength="5"
                  />
                </div>
                <div class="card-data__valid-data">
                  <label for="code-cvv">cvv</label>
                  <input
                    id="code-cvv"
                    class="input--payment"
                    type="text"
                    name="code-cvv"
                    placeholder="000"
                    required
                    pattern="\\d{3}"
                    maxlength="3"
                    title="enter 3 digits"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="form__btn">
            <button type="submit" class="btn btn--col-3">Confirm</button>
          </div>
        </form>
      </div>
  `;
  }

  modalInfoMessage(message: string) {
    return `
      <div class="popup-message__content">
        <div class="popup-message__message-info">${message}</div>
      </div>
    `;
  }
}
