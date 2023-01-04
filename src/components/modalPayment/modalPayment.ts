import './modalPayment.scss';

export default function drawModalPayment(): string {
  return `
    <div class="popup">
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
            />
            <input
              class="form__item input--payment"
              name="phone-number"
              type="tel"
              placeholder="Phone number +480000000"
              required
              pattern="^\\+\\d{9}\\d*"
              maxlength="15"
            />
            <input
              class="form__item input--payment"
              name="address"
              type="text"
              placeholder="Delivery address"
              required
              pattern="\\b\\w{5}\\w*\\b\\s\\b\\w{5}\\w*\\b\\s\\b\\w{5}\\w*\\b\\s*\\b\\w*\\b\\s*\\b\\w*\\b"
              maxlength="50"
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
                <img src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png" alt="credit-card" />
                <input
                  class="input--payment"
                  type="text"
                  placeholder="0000 0000 0000 0000"
                  required
                  pattern="\\d{4}\\s\\d{4}\\s\\d{4}\\s\\d{4}"
                  maxlength="19"
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
    </div>
  `;
}
