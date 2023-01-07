import { Routes } from '../../models';
import { createElem } from '../../utilities';
import './header.scss';

export default class Header {
  clientTotalSum: HTMLElement;
  clientBasketNum: HTMLElement;

  constructor() {
    this.clientTotalSum = createElem('span', 'total__sum');
    this.clientBasketNum = createElem('div', 'basket__num');
  }

  drawLayout(): void {
    const header: HTMLElement | null = document.querySelector('.header');
    const headerContainer: HTMLElement = createElem('div', 'container header__container', header);
    const headerEl: HTMLElement = createElem('div', 'header__block', headerContainer);

    const logoBlock: HTMLElement = createElem('div', 'logo', headerEl);
    createElem('div', 'logo__image', logoBlock);
    createElem('h1', 'logo__title', logoBlock, 'Online Store');
    logoBlock.addEventListener('click', () => this.buildPage(Routes.Main));

    const clientBlock: HTMLElement = createElem('div', 'client', headerEl);
    const clientTotalBlock: HTMLElement = createElem('div', 'client__total total', clientBlock);
    createElem('span', 'total__text', clientTotalBlock, 'Cart total:');
    createElem('span', 'total__currency', clientTotalBlock, '€');
    clientTotalBlock.append(this.clientTotalSum);

    const clientBasketBlock: HTMLElement = createElem('div', 'client__basket basket', clientBlock);
    const clientBasketContainer: HTMLElement = createElem('div', 'basket__container', clientBasketBlock);
    const clientBasketNumBlock: HTMLElement = createElem('div', 'basket__num-block', clientBasketContainer);
    clientBasketNumBlock.append(this.clientBasketNum);
    clientBasketBlock.addEventListener('click', () => this.buildPage(Routes.Basket));

    this.updateData();
  }

  updateData(): void {
    const totalSum = window.app.dataBase.countBasketTotal();
    this.updateTotalSum(totalSum);
    const totalAmount = window.app.dataBase.countProductsInBasket();
    this.updateTotalAmount(totalAmount);
  }

  updateTotalSum(totalSum: number): void {
    const totalSumStr = this.convertSumToStr(totalSum);
    this.clientTotalSum.textContent = totalSumStr;
  }

  updateTotalAmount(totalAmount: number): void {
    const totalAmountStr = `${totalAmount}`;
    this.clientBasketNum.textContent = totalAmountStr;
  }

  convertSumToStr(num: number): string {
    let str = `${num}`;
    if (!str.includes('.')) str = `${str}.00`;
    const indexDot = str.indexOf('.');
    if (str.slice(indexDot + 1).length < 2) str = `${str}0`;

    if (num >= 1000) {
      const arrDigitsAndComma: Array<string> = [];
      const [strInteger, strFrac] = str.split('.');
      const lastDigitIndex = strInteger.length - 1;
      strInteger
        .split('')
        .reverse()
        .forEach((digit, i) => {
          arrDigitsAndComma.push(digit);
          if (i && !((i + 1) % 3) && i < lastDigitIndex) arrDigitsAndComma.push(',');
        });
      const strIntegerComma = arrDigitsAndComma.reverse().join('');
      str = `${strIntegerComma}.${strFrac}`;
    }
    return str;
  }

  buildPage(page: string): void {
    window.app.router.changeHref(page);
  }
}
